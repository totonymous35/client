import * as Kb from '../../common-adapters'
import * as GregorGen from '../../actions/gregor-gen'
import * as Container from '../../util/container'
import {currentVersion, anyVersionsUnseen} from '../../constants/whats-new'
import HeaderIconComponent, {HeaderIconWithPopup as HeaderIconWithPopupComponent} from './index'

type OwnProps = {
  color?: string
  badgeColor?: string
}

type PopupOwnProps = OwnProps & {
  attachToRef: React.RefObject<Kb.Box2>
}

const mapStateToProps = (state: Container.TypedState) => ({
  lastSeenVersion: state.config.whatsNewLastSeenVersion,
})

// Just Whats New Icon connected for badge state
const HeaderIconContainer = Container.connect(
  mapStateToProps,
  () => ({}),
  (stateProps, _, ownProps: OwnProps) => ({
    badgeColor: ownProps.badgeColor,
    color: ownProps.color,
    newRelease: anyVersionsUnseen(stateProps.lastSeenVersion),
  })
)(HeaderIconComponent)

// Whats New icon with popup that conneted to badge state and marking release as seen.
export const HeaderIconWithPopup = Container.connect(
  mapStateToProps,
  (dispatch: Container.TypedDispatch) => ({
    _onUpdateLastSeenVersion: (lastSeenVersion: string) => {
      const action = GregorGen.createUpdateCategory({
        body: lastSeenVersion,
        category: 'whatsNewLastSeenVersion',
      })
      dispatch(action)
    },
  }),
  (stateProps, dispatchProps, ownProps: PopupOwnProps) => {
    const newRelease = anyVersionsUnseen(stateProps.lastSeenVersion)
    return {
      attachToRef: ownProps.attachToRef,
      badgeColor: ownProps.badgeColor,
      color: ownProps.color,
      newRelease,
      onClose: () => {
        if (newRelease) {
          dispatchProps._onUpdateLastSeenVersion(currentVersion)
        }
      },
    }
  }
)(HeaderIconWithPopupComponent)

export default HeaderIconContainer
