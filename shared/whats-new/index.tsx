import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import {currentVersion, lastLastVersion, lastVersion, noVersion} from '../constants/whats-new'
import {CurrentVersion, LastVersion, LastLastVersion} from './versions'

type Props = {
  onNavigate: (props: {}, selected: string) => void
  onNavigateExternal: (url: string) => void
  seenVersions: {[key: string]: boolean}
}

const WhatsNew = (props: Props) => {
  return (
    <Kb.ScrollView style={styles.scrollView}>
      <Kb.Box2
        direction="vertical"
        alignItems="flex-start"
        alignSelf="flex-start"
        fullHeight={Styles.isMobile}
        style={styles.container}
      >
        <Kb.Box2
          direction="vertical"
          alignItems="flex-start"
          alignSelf="flex-start"
          fullHeight={Styles.isMobile}
          style={styles.contentBackground}
        >
          <CurrentVersion
            seen={props.seenVersions[currentVersion]}
            onNavigate={props.onNavigate}
            onNavigateExternal={props.onNavigateExternal}
          />
          {lastVersion && lastVersion !== noVersion && (
            <LastVersion
              seen={props.seenVersions[lastVersion]}
              onNavigate={props.onNavigate}
              onNavigateExternal={props.onNavigateExternal}
            />
          )}
          {lastLastVersion && lastVersion !== noVersion && (
            <LastLastVersion
              seen={props.seenVersions[lastLastVersion]}
              onNavigate={props.onNavigate}
              onNavigateExternal={props.onNavigateExternal}
            />
          )}
        </Kb.Box2>
      </Kb.Box2>
    </Kb.ScrollView>
  )
}

const modalWidth = 284
const modalHeight = 424
const styles = Styles.styleSheetCreate(() => ({
  container: Styles.platformStyles({
    isElectron: {
      height: modalHeight,
      maxHeight: modalHeight,
      maxWidth: modalWidth,
      width: modalWidth,
    },
  }),
  contentBackground: Styles.platformStyles({
    common: {
      backgroundColor: Styles.globalColors.blueGrey,
      ...Styles.globalStyles.rounded,
    },
    isElectron: {
      ...Styles.padding(Styles.globalMargins.tiny),
    },
    isMobile: {
      ...Styles.padding(Styles.globalMargins.small),
    },
  }),
  scrollView: Styles.platformStyles({
    common: {
      width: '100%',
    },
    isMobile: {
      height: '100%',
      maxHeight: '100%',
    },
  }),
  versionTitle: {
    color: Styles.globalColors.black_50,
    marginBottom: Styles.globalMargins.tiny,
    marginTop: Styles.globalMargins.xsmall,
  },
}))

export default WhatsNew
