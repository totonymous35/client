import * as Constants from '../../constants/teams'
import * as Contacts from 'expo-contacts'
import * as Container from '../../util/container'
import * as Kb from '../../common-adapters/mobile.native'
import * as React from 'react'
import * as SettingsConstants from '../../constants/settings'
import * as SettingsGen from '../../actions/settings-gen'
import * as Styles from '../../styles'
import * as TeamsGen from '../../actions/teams-gen'
import {e164ToDisplay} from '../../util/phone-numbers'
import {FloatingRolePicker} from '../role-picker'
import {NativeModules} from 'react-native'
import {pluralize} from '../../util/string'
import {TeamRoleType} from '../../constants/types/teams'
import logger from '../../logger'

type OwnProps = Container.RouteProps<{teamname: string}>

type ContactProps = {
  name: string
  pictureUri?: string
  type: 'phone' | 'email'
  value: string
  valueFormatted?: string
}

// for sorting
const strcmp = (a, b) => (a === b ? 0 : a > b ? 1 : -1)
const compareContacts = (a: ContactProps, b: ContactProps): number => {
  if (a.name === b.name) {
    return strcmp(a.value, b.value)
  }
  return strcmp(a.name, b.name)
}

const fetchContacts = async (): Promise<[Array<ContactProps>, string]> => {
  const contacts = await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.Name,
      Contacts.Fields.PhoneNumbers,
      Contacts.Fields.Emails,
      Contacts.Fields.ImageAvailable,
      Contacts.Fields.Image,
    ],
  })

  let defaultCountryCode: string = ''
  try {
    defaultCountryCode = await NativeModules.Utils.getDefaultCountryCode()
    if (__DEV__ && !defaultCountryCode) {
      // behavior of parsing can be unexpectedly different with no country code.
      // iOS sim + android emu don't supply country codes, so use this one.
      defaultCountryCode = 'us'
    }
  } catch (e) {
    logger.warn(`Error loading default country code: ${e.message}`)
  }

  const mapped = contacts.data.reduce<Array<ContactProps>>((ret, contact) => {
    const {name, phoneNumbers = [], emails = []} = contact
    let pictureUri: string | undefined
    if (contact.imageAvailable && contact.image && contact.image.uri) {
      pictureUri = contact.image.uri
    }
    phoneNumbers.forEach(pn => {
      if (pn.number) {
        const value = SettingsConstants.getE164(pn.number, pn.countryCode || defaultCountryCode)
        if (value) {
          const valueFormatted = e164ToDisplay(value)
          ret.push({name, pictureUri, type: 'phone', value, valueFormatted})
        }
      }
    })
    emails.forEach(em => {
      if (em.email) {
        ret.push({name, pictureUri, type: 'email', value: em.email})
      }
    })
    return ret
  }, [])
  mapped.sort(compareContacts)
  return [mapped, defaultCountryCode]
}

// Seitan invite names (labels) look like this: "[name] ([phone number])". Try
// to derive E164 phone number based on seitan invite name and user's region.
const extractPhoneNumber = (name: string, region: string): string | null => {
  const matches = /\((.*)\)/.exec(name)
  const maybeNumber = matches && matches[1] && matches[1].replace(/\D/g, '')
  return maybeNumber ? SettingsConstants.getE164(maybeNumber, region) : null
}

// Extract either emails or phone numbers from team invites, to match to
// contacts and show whether the contact is invited already or not.
const mapExistingInvitesToValues = (invites: ReturnType<typeof Constants.getTeamInvites>, region: string) => {
  return invites
    .map(invite => {
      if (invite.email) {
        return invite.email
      } else if (invite.name) {
        return extractPhoneNumber(invite.name, region)
      } else {
        return null
      }
    })
    .filter(Boolean)
}

type ContactRowProps = ContactProps & {
  id: string
  alreadyInvited: boolean
  loading: boolean
  onClick: () => void
}

const contactRow = (_: number, props: ContactRowProps) => {
  const hasThumbnail = !!props.pictureUri
  const source = props.pictureUri ? {uri: props.pictureUri} : null

  return (
    <Kb.Box
      style={{
        ...Styles.globalStyles.flexBoxRow,
        alignItems: 'center',
        height: 56,
        padding: Styles.globalMargins.small,
        width: '100%',
      }}
    >
      <Kb.Box style={{...Styles.globalStyles.flexBoxRow, alignItems: 'center', flex: 1}}>
        <Kb.Box style={{...Styles.globalStyles.flexBoxRow, alignItems: 'center', flex: 1}}>
          {!!hasThumbnail && !!source && (
            <Kb.NativeImage
              style={{borderRadius: 24, height: 48, marginRight: 16, width: 48}}
              source={source}
            />
          )}
          {!hasThumbnail && <Kb.Avatar size={48} style={{marginRight: 16}} />}
          <Kb.Box>
            <Kb.Box style={Styles.globalStyles.flexBoxRow}>
              <Kb.Text type="BodySemibold">{props.name}</Kb.Text>
            </Kb.Box>
            <Kb.Box style={Styles.globalStyles.flexBoxRow}>
              <Kb.Text type="BodySmall">{props.valueFormatted || props.value}</Kb.Text>
            </Kb.Box>
          </Kb.Box>
        </Kb.Box>
        <Kb.Box>
          <Kb.Button
            type="Success"
            mode={props.alreadyInvited ? 'Secondary' : 'Primary'}
            label={props.alreadyInvited ? 'Invited!' : 'Invite'}
            waiting={props.loading}
            small={true}
            onClick={props.onClick}
            style={{
              paddingLeft: Styles.globalMargins.small,
              paddingRight: Styles.globalMargins.small,
              width: 100,
            }}
          />
        </Kb.Box>
      </Kb.Box>
    </Kb.Box>
  )
}

const TeamInviteByContact = (props: OwnProps) => {
  const dispatch = Container.useDispatch()
  const nav = Container.useSafeNavigation()
  const teamname = Container.getRouteProps(props, 'teamname', '')

  const [contacts, setContacts] = React.useState([] as Array<ContactProps>)
  const [region, setRegion] = React.useState('')
  const [hasError, setHasError] = React.useState<string | null>(null)
  const [isRolePickerOpen, setIsRolePickerOpen] = React.useState(false)
  const [selectedRole, setSelectedRole] = React.useState('writer' as TeamRoleType)
  const [filter, setFilter] = React.useState('')

  const permStatus = Container.useSelector(s => s.settings.contacts.permissionStatus)
  const teamInvites = Container.useSelector(s => Constants.getTeamInvites(s, teamname))
  const loadingInvites = Container.useSelector(s => Constants.getTeamLoadingInvites(s, teamname))

  React.useEffect(() => {
    if (permStatus === 'granted') {
      fetchContacts().then(
        ([contacts, region]) => {
          setContacts(contacts)
          setRegion(region)
        },
        err => {
          logger.warn('Error fetching contaxts:', err)
          setHasError(err.message)
        }
      )
    }
  }, [dispatch, setHasError, setContacts, permStatus])

  React.useEffect(() => {
    if (permStatus === 'unknown' || permStatus === 'undetermined') {
      dispatch(SettingsGen.createRequestContactPermissions({thenToggleImportOn: false}))
    }
  }, [dispatch, permStatus])

  const onBack = React.useCallback(() => {
    dispatch(nav.safeNavigateUpPayload())
    dispatch(TeamsGen.createSetEmailInviteError({malformed: [], message: ''}))
  }, [dispatch, nav])
  const controlRolePicker = React.useCallback(
    (open: boolean) => {
      setIsRolePickerOpen(open)
    },
    [setIsRolePickerOpen]
  )
  const onRoleChange = React.useCallback(
    (role: TeamRoleType) => {
      setSelectedRole(role)
    },
    [setSelectedRole]
  )

  const teamAlreadyInvited = mapExistingInvitesToValues(teamInvites, region)

  const listItems = contacts.map(contact => {
    const id = [contact.type, contact.value, contact.name].join('+')
    const loading = contact.type === 'email' && loadingInvites.has(contact.value)
    const alreadyInvited = teamAlreadyInvited.has(contact.value)
    return {
      ...contact,
      id,
      alreadyInvited,
      loading,
      onClick: () => {},
    }
  })

  return (
    <Kb.Box2 direction="vertical" fullWidth={true} fullHeight={true}>
      <Kb.HeaderHocHeader onBack={onBack} title="Invite contacts" />
      <Kb.Box
        style={{...Styles.globalStyles.flexBoxColumn, flex: 1, paddingBottom: Styles.globalMargins.xtiny}}
      >
        <FloatingRolePicker
          confirmLabel={`Invite as ${pluralize(selectedRole)}`}
          selectedRole={selectedRole}
          onSelectRole={onRoleChange}
          onConfirm={() => controlRolePicker(false)}
          open={isRolePickerOpen}
          position="bottom center"
          disabledRoles={{owner: 'Cannot invite an owner via email.'}}
        />
        <Kb.List
          keyProperty="id"
          items={listItems}
          fixedHeight={56}
          ListHeaderComponent={
            <Kb.ClickableBox
              onClick={() => controlRolePicker(true)}
              style={{
                ...Styles.globalStyles.flexBoxColumn,
                alignItems: 'center',
                borderBottomColor: Styles.globalColors.black_10,
                borderBottomWidth: Styles.hairlineWidth,
                justifyContent: 'center',
                marginBottom: Styles.globalMargins.xtiny,
                padding: Styles.globalMargins.small,
              }}
            >
              <Kb.Text center={true} type="BodySmall">
                Users will be invited to {teamname} as
                <Kb.Text type="BodySmallPrimaryLink">{' ' + selectedRole + 's'}</Kb.Text>.
              </Kb.Text>
            </Kb.ClickableBox>
          }
          renderItem={contactRow}
          style={{alignSelf: 'stretch'}}
        />
      </Kb.Box>
    </Kb.Box2>
  )
}

export default TeamInviteByContact
