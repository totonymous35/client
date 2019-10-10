import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import {FeatureWithSeenState} from '../constants/types/whats-new'

type Props = FeatureWithSeenState & {
  noSeparator?: boolean
}

const NewFeature = (props: Props) => {
  const primaryButton = props.primaryButton ? (
    <Kb.Button
      type="Default"
      mode="Primary"
      label={props.primaryButton.text}
      style={styles.buttons}
      onClick={() => props.primaryButton && props.primaryButton.onNavigate()}
    />
  ) : null

  const secondaryButton =
    props.primaryButton && props.secondaryButton ? (
      <Kb.Button
        type="Default"
        mode="Secondary"
        label={props.secondaryButton.text}
        style={styles.buttons}
        onClick={() => props.secondaryButton && props.secondaryButton.onNavigate()}
      />
    ) : null
  return (
    <Kb.Box2
      direction="horizontal"
      fullWidth={true}
      style={Styles.collapseStyles([styles.container, props.noSeparator ? {marginTop: 0} : {}])}
    >
      {/* Badging */}
      {!props.seen && (
        <Kb.Badge height={8} badgeStyle={styles.badgeStyle} containerStyle={styles.badgeContainerStyle} />
      )}
      <Kb.Box2 direction="vertical" fullWidth={true} style={styles.contentContainer}>
        <Kb.Text type="Body">{props.text}</Kb.Text>
        <Kb.Box2 direction="vertical" style={styles.imageContainer}>
          {props.image && <Kb.Image src={props.image} style={styles.image} />}
        </Kb.Box2>
        <Kb.Box2 direction="horizontal" style={styles.buttonRowContainer} gap="tiny">
          {primaryButton}
          {secondaryButton}
        </Kb.Box2>
      </Kb.Box2>
    </Kb.Box2>
  )
}

const styles = Styles.styleSheetCreate(() => ({
  badgeContainerStyle: {
    color: Styles.globalColors.transparent,
  },
  badgeStyle: {
    backgroundColor: Styles.globalColors.blue,
    marginRight: Styles.globalMargins.xsmall,
    marginTop: 13,
  },
  buttonRowContainer: {
    ...Styles.globalStyles.flexWrap,
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  buttons: {
    // Apply margins to buttons so that when they wrap there is vertical space between them
    marginTop: Styles.globalMargins.xsmall,
  },
  container: {
    ...Styles.globalStyles.fullWidth,
    alignSelf: 'flex-start',
    marginTop: Styles.globalMargins.tiny,
  },
  contentContainer: {
    backgroundColor: Styles.globalColors.white,
    paddingBottom: Styles.globalMargins.tiny,
    paddingLeft: Styles.globalMargins.small,
    paddingRight: Styles.globalMargins.small,
    paddingTop: Styles.globalMargins.tiny,
  },
  image: {
    alignSelf: 'center',
    maxHeight: 96,
    maxWidth: 216,
  },
  imageContainer: {},
}))

export default NewFeature
