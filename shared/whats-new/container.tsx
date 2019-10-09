import * as RouteTreeGen from '../actions/route-tree-gen'
import * as Container from '../util/container'
import openURL from '../util/open-url'
import {getSeenVersions} from '../constants/whats-new'
import {versions} from './versions'
import WhatsNew from '.'

const mapStateToProps = (state: Container.TypedState) => ({
  lastSeenVersion: state.config.lastSeenVersion,
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
})
const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>
) => {
  const seenVersions = getSeenVersions(stateProps.lastSeenVersion, versions)
  return {
    onNavigate: dispatchProps._onNavigate,
    onNavigateExternal: dispatchProps._onNavigateExternal,
    seenVersions,
  }
}
export default Container.connect(mapStateToProps, mapDispatchToProps, mergeProps)(WhatsNew)
