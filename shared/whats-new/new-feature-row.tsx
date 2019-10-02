import React from 'react'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'

type Props = {
  text: string
  seen: boolean
  imageSrc?: string | null
  primaryButton: boolean
  primaryButtonText?: string
  primaryButtonPath?: string
  primaryButtonExternal?: boolean
  secondaryButton: boolean
  secondaryButtonText?: string
  secondaryButtonPath?: string
  secondaryButtonExternal?: boolean
  onNavigate: (path: string, external: boolean) => null
}

const makeOnClickHandler = (
  path: string,
  external: boolean,
  onNavigate: (p: string, e: boolean) => null
) => () => onNavigate(path, external)

const NewFeature = (props: Props) => {
  return (
    <Kb.Box2 direction="horizontal" fullWidth={true} style={styles.container}>
      {/* Badging */}
      {!props.seen && (
        <Kb.Badge height={8} badgeStyle={styles.badgeStyle} containerStyle={styles.badgeContainerStyle} />
      )}
      <Kb.Box2 direction="vertical" fullWidth={true} style={styles.contentContainer}>
        <Kb.Text type="Body">{props.text}</Kb.Text>
        <Kb.Box2 direction="vertical" style={styles.imageContainer}>
          {props.imageSrc && <Kb.Image src={props.imageSrc} style={styles.image} />}
        </Kb.Box2>
        <Kb.Box2 direction="horizontal" style={styles.buttonRowContainer} gap="tiny">
          {props.primaryButton &&
            props.primaryButtonText &&
            props.primaryButtonPath &&
            props.primaryButtonExternal !== undefined && (
              <Kb.Button
                type="Default"
                mode="Primary"
                label={props.primaryButtonText}
                onClick={makeOnClickHandler(
                  props.primaryButtonPath,
                  props.primaryButtonExternal,
                  props.onNavigate
                )}
                style={styles.buttons}
              />
            )}
          {props.secondaryButton &&
            props.secondaryButtonText &&
            props.secondaryButtonPath &&
            props.secondaryButtonExternal !== undefined && (
              <Kb.Button
                type="Default"
                mode="Secondary"
                label={props.secondaryButtonText}
                onClick={makeOnClickHandler(
                  props.secondaryButtonPath,
                  props.secondaryButtonExternal,
                  props.onNavigate
                )}
                style={styles.buttons}
              />
            )}
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
