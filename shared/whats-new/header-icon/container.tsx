import * as Container from '../../util/container'
import HeaderIconComponent, {HeaderIconWithPopup as HeaderIconWithPopupComponent} from './index'

// TODO @jacob: Check if there is a new release here and set the icon state & color

const mapStateToProps = (state: Container.TypedState) => ({})

const mapDispatchToProps = (_: Container.TypedDispatch) => ({})

const mergeProps = (stateProps, dispatchProps) => ({})

const HeaderIconContainer = Container.connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  HeaderIconComponent
)

const HeaderIconWithPopup = Container.connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  HeaderIconWithPopupComponent
)

export default HeaderIconContainer
export {HeaderIconWithPopup}
