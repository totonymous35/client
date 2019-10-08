import * as RouteTreeGen from '../actions/route-tree-gen'
import * as Container from '../util/container'
import WhatsNew from '.'
// import {currentVersion, lastVersion, lastLastVersion} from './releases'

// TODO @jacob: Need to subscribe to the state of "seen" versions
// Probably need to make a reducer
const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch: Container.TypedDispatch) => ({
  _onNavigate: (props: {}, selected: string) => {
    dispatch(
      RouteTreeGen.createNavigateAppend({
        path: [{props, selected}],
      })
    )
  },
})
const mergeProps = (stateProps, dispatchProps) => ({
  onNavigate: dispatchProps._onNavigate,
})

const WhatsNewContainer = Container.connect(mapStateToProps, mapDispatchToProps, mergeProps)(WhatsNew)

export default WhatsNewContainer
