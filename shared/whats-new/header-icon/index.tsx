import React from 'react'
import * as Kb from '../../common-adapters'
import * as Styles from '../../styles'
import {keybaseFM} from '../../constants/whats-new'
import Popup from '../popup.desktop'

type Props = {
  newRelease: boolean
  onClick: () => void
}

type PopupProps = {
  newRelease: boolean
  // Desktop only
  attachToRef: React.RefObject<Kb.Box2>
  onClose: () => void
}

const badgeSize = 12
const badgeSizeInner = badgeSize - 4

// TODO @jacob: Remove this when rainbow gradient is added as a PNG asset
const realCSS = `
  .rainbowGradient {
    -webkit-background-clip: text !important;
  }
`

// Forward the ref of the icon so we can attach the FloatingBox on desktop to this component
const HeaderIcon = (props: Props) => {
  return props.newRelease ? (
    <>
      <Kb.DesktopStyle style={realCSS} />
      <Kb.Icon
        type="iconfont-radio"
        style={styles.rainbowColor}
        className="rainbowGradient"
        onClick={props.onClick}
      />
      <Kb.Badge
        border={true}
        leftRightPadding={0}
        height={badgeSize}
        containerStyle={styles.badgeContainerStyle}
        badgeStyle={styles.badgeStyles}
      />
    </>
  ) : (
    <Kb.Icon type="iconfont-radio" color={Styles.globalColors.black} onClick={props.onClick} />
  )
}

export const HeaderIconWithPopup = (props: PopupProps) => {
  const {newRelease, onClose, attachToRef} = props
  const [popupVisible, setPopupVisible] = React.useState(false)
  return (
    <>
      <Kb.WithTooltip disabled={popupVisible} tooltip={keybaseFM} position="bottom center">
        <HeaderIcon
          newRelease={newRelease}
          onClick={() => {
            popupVisible ? setPopupVisible(false) : !!attachToRef && setPopupVisible(true)
          }}
        />
      </Kb.WithTooltip>
      {!Styles.isMobile && popupVisible && (
        <Popup
          attachTo={() => attachToRef.current}
          position="bottom right"
          positionFallbacks={['bottom right', 'bottom center']}
          onHidden={() => {
            onClose()
            setPopupVisible(false)
          }}
        />
      )}
    </>
  )
}

const styles = Styles.styleSheetCreate(() => ({
  badgeContainerStyle: {
    position: 'absolute',
    right: -1,
    top: 1,
  },
  badgeStyles: {
    backgroundColor: Styles.globalColors.blue,
    // Manually set the innerSize of the blue circle to have a larger white border
    borderRadius: badgeSizeInner,
    height: badgeSizeInner,
    minWidth: badgeSizeInner,
  },
  rainbowColor: Styles.platformStyles({
    isElectron: {
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      background:
        'linear-gradient(to top, #ff0000, rgba(255, 216, 0, 0.94) 19%, #27c400 40%, #0091ff 60%, #b000ff 80%, #ff0098)',
    },
  }),
}))
export default HeaderIcon
