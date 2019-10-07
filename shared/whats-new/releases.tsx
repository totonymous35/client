import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
{
  /* import NewFeatureRow from './new-feature-row' */
}
//import openURL from '../util/open-url'

/*
 * IMPORTANT:
 *    Make sure that when making/adding to a new release the version is increased in some way
 *    otherwise the "seen" badging will pick up on release change.
 *
 * IMPORTANT:
 *
 */

export const currentVersion = ''
export const lastVersion = ''
export const lastLastVersion = ''

// type CurrentProps = {
//   seen: boolean
//   onSeen: (version: string) => void
// }

const ReleaseTitle = ({title}: {title: string}) => (
  <Kb.Box2 direction="vertical" alignItems="flex-start" fullWidth={true}>
    <Kb.Text type="BodySemibold" style={styles.versionTitle}>
      {title}
    </Kb.Text>
  </Kb.Box2>
)

export const CurrentRelease = () => {
  return <Kb.Box2 direction="vertical" alignItems="flex-start" fullWidth={true} />
}

export const LastRelease = () => {
  return (
    <Kb.Box2 direction="vertical" alignItems="flex-start" fullWidth={true}>
      <ReleaseTitle title="Last" />
    </Kb.Box2>
  )
}

export const LastLastRelease = () => {
  return (
    <Kb.Box2 direction="vertical" alignItems="flex-start" fullWidth={true}>
      <ReleaseTitle title="Last Last" />
    </Kb.Box2>
  )
}

const styles = Styles.styleSheetCreate(() => ({
  versionTitle: {
    color: Styles.globalColors.black_50,
    marginBottom: Styles.globalMargins.tiny,
    marginTop: Styles.globalMargins.xsmall,
  },
}))
