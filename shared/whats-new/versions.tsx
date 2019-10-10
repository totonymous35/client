import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import {WhatsNewVersions} from '../constants/types/whats-new'
import NewFeatureRow from './new-feature-row'

/*
 * IMPORTANT:
 *    1. currentVersion > lastVersion > lastLastVersion
 *    2. Must be semver compatible
 *    Source: https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
 *
 * HOW TO ADD A NEW RELEASE
 *    1. lastLastVersion = lastLastVersion
 *    2. lastLastVersion = currentVersion
 *    3. currentVersion = new version of release
 *    4. Update string-literal types in shared/constants/types/whats-new
 *    5. Add as many NewFeatureRows as needed
 */

export const currentVersion = '3.3.3'
export const lastVersion = ''
export const lastLastVersion = ''
export const versions: WhatsNewVersions = [currentVersion, lastVersion, lastLastVersion]

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
