import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'

type Props = {
  newFeatures: boolean
  onClick?: ((event: React.BaseSyntheticEvent) => void) | null
}

// TODO @jacob: Remove this when rainbow gradient is added as a PNG asset
const realCSS = `
  .rainbowGradient {
    -webkit-background-clip: text !important;
  }
`

const HeaderIcon = (props: Props) =>
  props.newFeatures ? (
    Styles.isMobile ? null : (
      <>
        <Kb.DesktopStyle style={realCSS} />
        <Kb.Icon
          type="iconfont-radio"
          style={styles.rainbowColor}
          className="rainbowGradient"
          onClick={props.onClick}
        />
      </>
    )
  ) : (
    <Kb.Icon type="iconfont-radio" color={Styles.globalColors.black} onClick={props.onClick} />
  )

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
