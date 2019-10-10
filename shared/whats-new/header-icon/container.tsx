import * as Kb from '../../common-adapters'
import * as GregorGen from '../../actions/gregor-gen'
import * as Container from '../../util/container'
import {anyVersionsUnseen} from '../../constants/whats-new'
import {versions, currentVersion} from '../versions'
import HeaderIconComponent, {HeaderIconWithPopup as HeaderIconWithPopupComponent} from './index'

type OwnProps = {
  attachToRef: React.RefObject<Kb.Box2>
}

const mapStateToProps = (state: Container.TypedState) => ({
  lastSeenVersion: state.config.whatsNewLastSeenVersion,
})

// Just Whats New Icon connected for badge state
const HeaderIconContainer = Container.connectDEBUG(
  mapStateToProps,
  () => ({}),
  stateProps => ({
    // newRelease: anyVersionsUnseen(stateProps.lastSeenVersion, versions),
    newRelease: true,
  })
)(HeaderIconComponent)

// Whats New icon with popup that conneted to badge state and marking release as seen.
export const HeaderIconWithPopup = Container.connectDEBUG(
  mapStateToProps,
  (dispatch: Container.TypedDispatch) => ({
    _onSetLastSeenVersion: (lastSeenVersion: string) => {
      const action = GregorGen.createUpdateCategory({
        body: lastSeenVersion,
        category: 'whatsNewLastSeenVersion',
      })
      dispatch(action)
    },
  }),
  (stateProps, dispatchProps, ownProps: OwnProps) => {
    const newRelease = anyVersionsUnseen(stateProps.lastSeenVersion, versions)
    return {
      attachToRef: ownProps.attachToRef,
      newRelease,
      onClose: () => {
        if (newRelease) {
          dispatchProps._onSetLastSeenVersion(currentVersion)
        }
      },
    }
  }
)(HeaderIconWithPopupComponent)

export default HeaderIconContainer
