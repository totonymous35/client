import React from 'react'
import * as Kb from '../common-adapters'
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
  attachTo: () => Kb.Icon | null
  onHidden: () => void
  position: Position
}

const Popup = (props: Props) => {
  return (
    <Kb.FloatingBox attachTo={props.attachTo} position={props.position} onHidden={props.onHidden}>
      <WhatsNew />
    </Kb.FloatingBox>
  )
}

export default Popup
