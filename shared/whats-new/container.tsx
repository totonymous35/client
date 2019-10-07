import * as RouteTreeGen from '../actions/route-tree-gen'
import * as Container from '../util/container'
import WhatsNew from '.'
// import {currentVersion, lastVersion, lastLastVersion} from './releases'

/*
 * TODO Developer Notes
 *
 * 1. Make an RPC (ON OPEN) to gregor to get the user's last seen version string
 * 2. Make an RPC (ON CLOSE) to gregor to set the user's last seen version to the current one
 * 3. Read the releses JSON information
 * 4. Combining the latest version with the JSON information, set the "seen state"
 *
 */

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

export default Container
