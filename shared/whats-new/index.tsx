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
      <Kb.Box2 direction="vertical" alignItems="flex-start" alignSelf="flex-start" style={styles.container}>
        <Kb.Box2
          direction="vertical"
          alignItems="flex-start"
          alignSelf="flex-start"
          style={styles.contentBackground}
        >
          <CurrentVersion seen={props.seenVersions[currentVersion]} />
          {lastVersion && lastVersion !== noVersion && <LastVersion seen={props.seenVersions[lastVersion]} />}
          {lastLastVersion && lastVersion !== noVersion && (
            <LastLastVersion seen={props.seenVersions[lastLastVersion]} />
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
  contentBackground: {
    backgroundColor: Styles.globalColors.blueGrey,
    paddingBottom: Styles.globalMargins.tiny,
    paddingLeft: Styles.globalMargins.tiny,
    paddingRight: Styles.globalMargins.tiny,
    paddingTop: Styles.globalMargins.tiny,
    width: '100%',
    ...Styles.globalStyles.rounded,
  },
  scrollView: Styles.platformStyles({
    common: {
      width: '100%',
    },
  }),
  versionTitle: {
    color: Styles.globalColors.black_50,
    marginBottom: Styles.globalMargins.tiny,
    marginTop: Styles.globalMargins.xsmall,
  },
}))

export default WhatsNew
