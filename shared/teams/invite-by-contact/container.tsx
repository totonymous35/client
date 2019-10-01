import * as Constants from '../../constants/teams'
import * as Contacts from 'expo-contacts'
import * as Container from '../../util/container'
import * as React from 'react'
import * as SettingsConstants from '../../constants/settings'
import * as SettingsGen from '../../actions/settings-gen'
import * as TeamsGen from '../../actions/teams-gen'
import {e164ToDisplay} from '../../util/phone-numbers'
import {NativeModules} from 'react-native'
import {TeamRoleType} from '../../constants/types/teams'
import logger from '../../logger'

import {ContactProps, ContactRowProps, InviteByContact} from '.'

type OwnProps = Container.RouteProps<{teamname: string}>

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
  const maybeNumber = matches && matches[1] && matches[1].replace(/[^0-9+]/g, '')
  return maybeNumber ? SettingsConstants.getE164(maybeNumber, region) : null
}

// Extract either emails or phone numbers from team invites, to match to
// contacts and show whether the contact is invited already or not. Returns a
// mapping of potential contact values to invite IDs.
const mapExistingInvitesToValues = (
  invites: ReturnType<typeof Constants.getTeamInvites>,
  region: string
): Map<string, string> => {
  const ret = new Map<string, string>()
  invites.forEach(invite => {
    if (invite.email) {
      // Email invite - just use email as the key.
      ret.set(invite.email, invite.id)
    } else if (invite.name) {
      // Seitan invite. Extract phone number from invite name and use as the
      // key. The extracted phone number will be full E164.
      const val = extractPhoneNumber(invite.name, region)
      if (val) {
        ret.set(val, invite.id)
      }
    }
  })
  return ret
}

const TeamInviteByContact = (props: OwnProps) => {
  const dispatch = Container.useDispatch()
  const nav = Container.useSafeNavigation()
  const teamname = Container.getRouteProps(props, 'teamname', '')

  const [contacts, setContacts] = React.useState([] as Array<ContactProps>)
  const [region, setRegion] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
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
          setErrorMessage(null)
        },
        err => {
          logger.warn('Error fetching contaxts:', err)
          setErrorMessage(err.message)
        }
      )
    }
  }, [dispatch, setErrorMessage, setContacts, permStatus])

  React.useEffect(() => {
    if (permStatus === 'unknown' || permStatus === 'undetermined') {
      dispatch(SettingsGen.createRequestContactPermissions({thenToggleImportOn: false}))
    }
  }, [dispatch, permStatus])

  const onBack = React.useCallback(() => {
    dispatch(nav.safeNavigateUpPayload())
    dispatch(TeamsGen.createSetEmailInviteError({malformed: [], message: ''}))
  }, [dispatch, nav])

  const onRoleChange = React.useCallback(
    (role: TeamRoleType) => {
      setSelectedRole(role)
    },
    [setSelectedRole]
  )

  const onInviteContact = React.useCallback(
    (contact: ContactProps) => {
      dispatch(TeamsGen.createSetEmailInviteError({malformed: [], message: ''}))
      if (contact.type === 'email') {
        dispatch(
          TeamsGen.createInviteToTeamByEmail({
            invitees: contact.value,
            loadingKey: contact.value,
            role: selectedRole,
            teamname,
          })
        )
      } else if (contact.type === 'phone') {
        dispatch(
          TeamsGen.createInviteToTeamByPhone({
            fullName: contact.name,
            loadingKey: contact.value,
            phoneNumber: contact.valueFormatted || contact.value,
            role: selectedRole,
            teamname,
          })
        )
      }
      dispatch(TeamsGen.createGetTeams())
    },
    [dispatch, selectedRole, teamname]
  )

  const onCancelInvite = React.useCallback(
    (inviteID: string) => {
      dispatch(TeamsGen.createSetEmailInviteError({malformed: [], message: ''}))
      dispatch(
        TeamsGen.createRemoveMemberOrPendingInvite({
          email: '',
          inviteID,
          loadingKey: inviteID,
          teamname,
          username: '',
        })
      )
    },
    [dispatch, teamname]
  )

  const onSetFilter = React.useCallback(
    (s: string) => {
      setFilter(s)
    },
    [setFilter]
  )

  // ----

  const teamAlreadyInvited = mapExistingInvitesToValues(teamInvites, region)

  let listItems: Array<ContactRowProps> = contacts.map(contact => {
    // `id` is the key property for Kb.List
    const id = [contact.type, contact.value, contact.name].join('+')
    const inviteID = teamAlreadyInvited.get(contact.value)

    // `loadingKey` is inviteID when invite already (so loading is canceling the
    // invite), or contact.value when loading is adding an invite.
    const loadingKey = inviteID || contact.value
    const loading = loadingInvites.get(loadingKey, false)

    const onClick = inviteID ? () => onCancelInvite(inviteID) : () => onInviteContact(contact)

    return {
      ...contact,
      alreadyInvited: !!inviteID,
      id,
      loading,
      onClick,
    }
  })

  if (filter) {
    listItems = listItems.filter(row =>
      [row.name, row.value, row.valueFormatted].some(
        s =>
          s &&
          s
            .replace(/^[^a-z0-9@._+()]/i, '')
            .toLowerCase()
            .includes(filter)
      )
    )
  }

  return (
    <InviteByContact
      errorMessage={errorMessage}
      filter={filter}
      listItems={listItems}
      onBack={onBack}
      onRoleChange={onRoleChange}
      onSetFilter={onSetFilter}
      selectedRole={selectedRole}
      teamName={teamname}
    />
  )
}

export default TeamInviteByContact
