import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import NewFeatureRow from './new-feature-row'

type VersionProps = {
  seen: boolean
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

export const CurrentVersion = (props: VersionProps) => {
  return (
    <Version>
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
  versionTitle: {
    color: Styles.globalColors.black_50,
    marginBottom: Styles.globalMargins.tiny,
    marginTop: Styles.globalMargins.xsmall,
  },
}))
