import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import {CurrentRelease, LastRelease, LastLastRelease} from './releases'

const WhatsNew = () => {
  return (
    <Kb.ScrollView style={styles.scrollView}>
      <Kb.Box2 direction="vertical" alignItems="flex-start" alignSelf="flex-start" style={styles.container}>
        <Kb.Box2
          direction="vertical"
          alignItems="flex-start"
          alignSelf="flex-start"
          style={styles.contentBackground}
        >
          <CurrentRelease />
          <LastRelease />
          <LastLastRelease />
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
  },
  scrollView: Styles.platformStyles({
    common: {
      width: '100%',
    },
    isElectron: {
      ...Styles.globalStyles.rounded,
    },
  }),
  versionTitle: {
    color: Styles.globalColors.black_50,
    marginBottom: Styles.globalMargins.tiny,
    marginTop: Styles.globalMargins.xsmall,
  },
}))

export default WhatsNew
