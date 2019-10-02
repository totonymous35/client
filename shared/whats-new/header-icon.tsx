import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'

type Props = {
  newFeatures: boolean
  onClick: () => void
}

// TODO @jacob: Remove this when rainbow gradient is added as a PNG asset
const realCSS = `
  .rainbowGradient {
    -webkit-background-clip: text !important;
  }
`

// Forward the ref of the icon so we can attach the FloatingBox on desktop to this component
const HeaderIcon = React.forwardRef<Kb.Icon, Props>((props, ref) => {
  return props.newFeatures ? (
    <>
      <Kb.DesktopStyle style={realCSS} />
      <Kb.Icon
        type="iconfont-radio"
        style={styles.rainbowColor}
        className="rainbowGradient"
        ref={ref}
        onClick={props.onClick}
      />
    </>
  ) : (
    <Kb.Icon type="iconfont-radio" color={Styles.globalColors.black} ref={ref} onClick={props.onClick} />
  )
})

const styles = Styles.styleSheetCreate(() => ({
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
