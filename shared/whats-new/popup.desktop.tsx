import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import WhatsNew from './container'
import {Position} from '../common-adapters/relative-popup-hoc.types'
// import * as Styles from '../styles'
// import * as Kb from '../common-adapters'

/*
 * TODO: Development Notes
 *
 * 1. We want to use a floating box here to put arbitrary things into it
 * 2. Need to look at what data we need
 * 3. Make sure how we are rendering the new feature rows can be used across iOS and desktop
 *
 */

type Props = {
  attachTo: () => Kb.Box2 | null
  onHidden: () => void
  position: Position
  positionFallbacks?: Position[]
}

const Popup = (props: Props) => {
  return (
    <Kb.FloatingBox
      position={props.position}
      positionFallbacks={props.positionFallbacks}
      containerStyle={styles.container}
      onHidden={props.onHidden}
      attachTo={props.attachTo}
    >
      <WhatsNew />
    </Kb.FloatingBox>
  )
}

const styles = Styles.styleSheetCreate(() => ({
  container: {
    ...Styles.globalStyles.rounded,
    marginRight: Styles.globalMargins.tiny,
  },
}))

export default Popup
