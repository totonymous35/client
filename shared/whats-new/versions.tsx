import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import NewFeatureRow from './new-feature-row'

/* Include images */
/* const imageName = require('../images/release/MAJ.MIN.PATCH/name.png') */
const testingImage = require('../images/releases/4.7.0/pinned-message.png')

type VersionProps = {
  seen: boolean
  onNavigate: (props: {}, selected: string) => void
  onNavigateExternal: (url: string) => void
}

const Version = ({children}: {children: React.ReactNode}) => {
  return (
    // Always pass `seen` prop to children of a version to show row-level badging
    <Kb.Box2 direction="vertical" alignItems="flex-start" fullWidth={true}>
      {children}
    </Kb.Box2>
  )
}

const VersionTitle = ({title}: {title: string}) => (
  <Kb.Box2 direction="vertical" alignItems="flex-start" fullWidth={true}>
    <Kb.Text type="BodySemibold" style={styles.versionTitle}>
      {title}
    </Kb.Text>
  </Kb.Box2>
)

export const CurrentVersion = ({seen, onNavigate, onNavigateExternal}: VersionProps) => {
  return (
    <Version>
      <NewFeatureRow text="hi testing" noSeparator={true} seen={seen} />
      <NewFeatureRow
        text="testing testing testing testing testing testing testing testing
testing testing testing testing testing testing testing testing testing testing
testing testing testing testing testing testing testing testing testing testing
testing testing testing testing testing testing"
        image={testingImage}
        imageStyle={Styles.collapseStyles([
          styles.roundedImage,
          // Need to set fixed width on native to get image width not to be set to maxWidth
          Styles.isMobile && {borderRadius: 100, width: 100},
        ])}
        seen={seen}
        primaryButtonText="Read the doc"
        onPrimaryButtonClick={() => {
          onNavigateExternal('https://keybase.io/docs')
        }}
        secondaryButtonText="Try it out"
        onSecondaryButtonClick={() => {
          onNavigate({}, 'walletOnboarding')
        }}
      />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
      <NewFeatureRow text="hi testing" seen={seen} />
    </Version>
  )
}

export const LastVersion = (props: VersionProps) => {
  return (
    <Version>
      <VersionTitle title="Last" />
      <NewFeatureRow text="hi testing" noSeparator={true} seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
    </Version>
  )
}

export const LastLastVersion = (props: VersionProps) => {
  return (
    <Version>
      <VersionTitle title="Last Last" />
      <NewFeatureRow text="hi testing" noSeparator={true} seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
      <NewFeatureRow text="hi testing" seen={props.seen} />
    </Version>
  )
}

const styles = Styles.styleSheetCreate(() => ({
  roundedImage: Styles.platformStyles({
    common: {
      borderColor: Styles.globalColors.grey,
      borderWidth: Styles.globalMargins.xxtiny,
    },
    isElectron: {
      // Pass borderRadius as a number to the image on mobile using collapseStyles
      borderRadius: '100%',
      borderStyle: 'solid',
    },
  }),
  versionTitle: {
    color: Styles.globalColors.black_50,
    marginBottom: Styles.globalMargins.tiny,
    marginTop: Styles.globalMargins.xsmall,
  },
}))
