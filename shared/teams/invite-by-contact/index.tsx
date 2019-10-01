import * as Kb from '../../common-adapters/mobile.native'
import * as React from 'react'
import * as Styles from '../../styles'
import {FloatingRolePicker} from '../role-picker'
import {pluralize} from '../../util/string'
import {TeamRoleType} from '../../constants/types/teams'

// Contact info coming from the native contacts library.
export type ContactProps = {
  name: string
  pictureUri?: string
  type: 'phone' | 'email'
  value: string
  valueFormatted?: string
}

// Contact info + other things needed for list row.
export type ContactRowProps = ContactProps & {
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

export type InviteByContactProps = {
  onBack: () => void
  filter: string
  onSetFilter: (newFilter: string) => void
  selectedRole: TeamRoleType
  onRoleChange: (newRole: TeamRoleType) => void
  teamName: string
  listItems: Array<ContactRowProps>
  errorMessage: string | null
}

export const InviteByContact = (props: InviteByContactProps) => {
  const [isRolePickerOpen, setRolePickerOpen] = React.useState(false)
  const controlRolePicker = React.useCallback(
    (open: boolean) => {
      setRolePickerOpen(open)
    },
    [setRolePickerOpen]
  )

  return (
    <Kb.Box2 direction="vertical" fullWidth={true} fullHeight={true}>
      <Kb.HeaderHocHeader onBack={props.onBack} title="Invite contacts" />
      {!!props.errorMessage && (
        <Kb.Box2
          direction="horizontal"
          style={{
            alignItems: 'center',
            backgroundColor: Styles.globalColors.red,
            justifyContent: 'center',
            padding: Styles.globalMargins.tiny,
          }}
          fullWidth={true}
        >
          <Kb.Text center={true} type="BodySemibold" negative={true}>
            {props.errorMessage}
          </Kb.Text>
        </Kb.Box2>
      )}
      <Kb.Box
        style={{...Styles.globalStyles.flexBoxColumn, flex: 1, paddingBottom: Styles.globalMargins.xtiny}}
      >
        <Kb.Box
          style={{
            ...Styles.globalStyles.flexBoxRow,
            borderBottomColor: Styles.globalColors.black_10,
            borderBottomWidth: Styles.hairlineWidth,
          }}
        >
          <Kb.Input
            keyboardType="email-address"
            value={props.filter}
            onChangeText={props.onSetFilter}
            hintText="Search"
            hideUnderline={true}
            small={true}
            style={{width: '100%'}}
            errorStyle={{minHeight: 14}}
            inputStyle={{
              fontSize: 16,
              margin: Styles.globalMargins.small,
              textAlign: 'left',
            }}
          />
        </Kb.Box>
        <FloatingRolePicker
          confirmLabel={`Invite as ${pluralize(props.selectedRole)}`}
          selectedRole={props.selectedRole}
          onSelectRole={props.onRoleChange}
          onConfirm={() => controlRolePicker(false)}
          open={isRolePickerOpen}
          position="bottom center"
          disabledRoles={{owner: 'Cannot invite an owner via email.'}}
        />
        <Kb.List
          keyProperty="id"
          items={props.listItems}
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
                Users will be invited to {props.teamName} as
                <Kb.Text type="BodySmallPrimaryLink">{' ' + props.selectedRole + 's'}</Kb.Text>.
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
