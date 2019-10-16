import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import {currentVersion, lastLastVersion, lastVersion, noVersion} from '../constants/whats-new'
import {CurrentVersion, LastVersion, LastLastVersion} from './versions'

type Props = {
  onBack: () => void
  onNavigate: (props: {}, selected: string) => void
  onNavigateExternal: (url: string) => void
  seenVersions: {[key: string]: boolean}
}

// Need to switch the order of the scroll view on mobile and desktop so that contentBackground will fill the entire view
const Wrapper = ({children}: {children: React.ReactNode}) =>
  Styles.isMobile ? (
    <Kb.Box2 direction="vertical" alignItems="flex-start" alignSelf="flex-start" fullHeight={true}>
      <Kb.Box2
        direction="vertical"
        alignItems="flex-start"
        alignSelf="flex-start"
        fullHeight={true}
        style={styles.contentBackground}
      >
        <Kb.ScrollView style={styles.scrollView}>
          <Kb.Box2
            direction="vertical"
            alignItems="flex-start"
            alignSelf="flex-start"
            style={styles.scrollViewInner}
          >
            {children}
          </Kb.Box2>
        </Kb.ScrollView>
      </Kb.Box2>
    </Kb.Box2>
  ) : (
    <Kb.Box2
      direction="vertical"
      alignItems="flex-start"
      alignSelf="flex-start"
      fullHeight={true}
      style={styles.popupContainer}
    >
      <Kb.ScrollView style={styles.scrollView}>
        <Kb.Box2
          direction="vertical"
          alignItems="flex-start"
          alignSelf="flex-start"
          fullHeight={true}
          style={styles.contentBackground}
        >
          {children}
        </Kb.Box2>
      </Kb.ScrollView>
    </Kb.Box2>
  )

class WhatsNew extends React.PureComponent<Props> {
  static navigationOptions = {}
  componentWillUnmount() {
    this.props.onBack()
  }

  render() {
    return (
      <Wrapper>
        <CurrentVersion
          seen={this.props.seenVersions[currentVersion]}
          onNavigate={this.props.onNavigate}
          onNavigateExternal={this.props.onNavigateExternal}
        />
        {lastVersion && lastVersion !== noVersion && (
          <LastVersion
            seen={this.props.seenVersions[lastVersion]}
            onNavigate={this.props.onNavigate}
            onNavigateExternal={this.props.onNavigateExternal}
          />
        )}
        {lastLastVersion && lastVersion !== noVersion && (
          <LastLastVersion
            seen={this.props.seenVersions[lastLastVersion]}
            onNavigate={this.props.onNavigate}
            onNavigateExternal={this.props.onNavigateExternal}
          />
        )}
      </Wrapper>
    )
  }
}

const modalWidth = 288
const modalHeight = 424
const styles = Styles.styleSheetCreate(() => ({
  contentBackground: Styles.platformStyles({
    common: {
      backgroundColor: Styles.globalColors.blueGrey,
      ...Styles.globalStyles.rounded,
    },
    isElectron: {
      ...Styles.padding(Styles.globalMargins.tiny),
    },
  }),
  popupContainer: Styles.platformStyles({
    isElectron: {
      height: modalHeight,
      maxHeight: modalHeight,
      maxWidth: modalWidth,
      width: modalWidth,
    },
  }),
  scrollView: Styles.platformStyles({
    common: {
      width: '100%',
    },
  }),
  scrollViewInner: Styles.platformStyles({
    isMobile: {
      marginBottom: Styles.globalMargins.small,
      marginLeft: Styles.globalMargins.small,
      marginRight: Styles.globalMargins.small,
      marginTop: Styles.globalMargins.small + 2,
    },
  }),
  versionTitle: {
    color: Styles.globalColors.black_50,
    marginBottom: Styles.globalMargins.tiny,
    marginTop: Styles.globalMargins.xsmall,
  },
}))

export default WhatsNew
