import React from 'react'
import {capitalize} from 'lodash-es'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import {Release as ReleaseType, Feature as FeatureType} from '../constants/types/whats-new'
import NewFeatureRow from './new-feature-row'

/*
 * TODO: Development Notes
 *
 * 1. When a container is created for this component we will need to merge the
 * static JSON contents of the update file with gregor badged state for each
 * update
 *
 * 2. Need to make a "Release" component that holds just the features of that version
 * 3. Need to make a "Section Header" to separate the version groupings
 *
 */

type Props = {
  releases: {
    current: ReleaseType
    last: ReleaseType
    lastLast: ReleaseType
  }
  onNavigate: (path: string, external: boolean) => null
}

const featureToRowProps = (feature: FeatureType) => ({
  imageSrc: feature.image,
  primaryButton: !!feature.primaryButton,
  primaryButtonExternal: feature.primaryButton ? feature.primaryButton.external : undefined,
  primaryButtonPath: feature.primaryButton ? feature.primaryButton.path : undefined,
  primaryButtonText: feature.primaryButton ? feature.primaryButton.text : undefined,
  secondaryButton: !!feature.secondaryButton,
  secondaryButtonExternal: feature.secondaryButton ? feature.secondaryButton.external : undefined,
  secondaryButtonPath: feature.secondaryButton ? feature.secondaryButton.path : undefined,
  secondaryButtonText: feature.secondaryButton ? feature.secondaryButton.text : undefined,
  // TODO @jacob: Update this
  seen: false,
  text: feature.text,
})

const Release = ({isCurrent, title, release, onNavigate}) => (
  <Kb.Box2 direction="vertical" alignItems="flex-start" fullWidth={true}>
    {!isCurrent && (
      <Kb.Text type="BodySemibold" style={styles.versionTitle}>
        {title}
      </Kb.Text>
    )}
    {release.features.map((feature: FeatureType, index: number) => (
      <NewFeatureRow key={index} onNavigate={onNavigate} {...featureToRowProps(feature)} />
    ))}
  </Kb.Box2>
)

const WhatsNew = (props: Props) => {
  const releaseKeys = Object.keys(props.releases)
  return (
    <Kb.Box2 direction="vertical" alignItems="flex-start" alignSelf="flex-start" style={styles.container}>
      {releaseKeys.map(key => {
        const release: ReleaseType = props.releases[key]
        const isCurrent = key === 'current'
        const title = capitalize(key)
        return (
          <Release
            key={release.version}
            isCurrent={isCurrent}
            title={title}
            release={release}
            onNavigate={props.onNavigate}
          />
        )
      })}
    </Kb.Box2>
  )
}

const modalWidth = 284
const modalHeight = 424
const styles = Styles.styleSheetCreate(() => ({
  container: {
    backgroundColor: Styles.globalColors.blueGrey,
    maxHeight: modalHeight,
    maxWidth: modalWidth,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  versionTitle: {
    color: Styles.globalColors.black_50,
    marginBottom: Styles.globalMargins.tiny,
    marginTop: Styles.globalMargins.xsmall,
  },
}))

export default WhatsNew
