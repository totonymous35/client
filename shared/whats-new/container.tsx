import * as RouteTreeGen from '../actions/route-tree-gen'
import * as Container from '../util/container'
import * as GregorGen from '../actions/gregor-gen'
import openURL from '../util/open-url'
import {currentVersion, getSeenVersions, anyVersionsUnseen, keybaseFM} from '../constants/whats-new'
import WhatsNew from '.'

const mapStateToProps = (state: Container.TypedState) => ({
  lastSeenVersion: state.config.whatsNewLastSeenVersion,
})
const mapDispatchToProps = (dispatch: Container.TypedDispatch) => ({
  // Navigate primary/secondary button click
  _onNavigate: (props: {}, selected: string) => {
    dispatch(
      RouteTreeGen.createNavigateAppend({
        path: [{props, selected}],
      })
    )
  },
  _onNavigateExternal: (url: string) => openURL(url),

  _onUpdateLastSeenVersion: (lastSeenVersion: string) => {
    const action = GregorGen.createUpdateCategory({
      body: lastSeenVersion,
      category: 'whatsNewLastSeenVersion',
    })
    dispatch(action)
  },
})
const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>
) => {
  const seenVersions = getSeenVersions(stateProps.lastSeenVersion)
  const newRelease = anyVersionsUnseen(stateProps.lastSeenVersion)
  return {
    onBack: () => {
      if (newRelease) {
        dispatchProps._onUpdateLastSeenVersion(currentVersion)
      }
    },
    onNavigate: dispatchProps._onNavigate,
    onNavigateExternal: dispatchProps._onNavigateExternal,
    seenVersions,
  }
}

// @ts-ignore
WhatsNew.navigationOptions = Container.isMobile
  ? {
      HeaderTitle: keybaseFM,
      header: undefined,
      title: keybaseFM,
    }
  : undefined

const WhatsNewContainer = Container.namedConnect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  'WhatsNewContainer'
)(WhatsNew)

export default WhatsNewContainer
