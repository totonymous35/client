import React from 'react'
import * as Sb from '../stories/storybook'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import HeaderIcon from './header-icon/'
import NewFeatureRow from './new-feature-row'
import WhatsNew from '.'

const commonNewFeatureProps = {
  primaryButton: null,
  secondaryButton: null,
  seen: false,
  text: '',
}

const newFeatures = [
  {
    ...commonNewFeatureProps,
    text: 'Some short text',
  },
  {
    ...commonNewFeatureProps,
    text:
      'Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever.',
  },
  {
    ...commonNewFeatureProps,
    primaryButton: {
      text: 'Try it out',
    },
    secondaryButton: {
      text: 'Read the docs',
    },
    text:
      'Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever.',
  },
  {
    ...commonNewFeatureProps,
    primaryButton: {
      text: 'Lots to do on this button',
    },
    secondaryButton: {
      text: 'Lots here as well',
    },
    text: 'Short text but long button text',
  },
]

const HeaderIconWrapper = props => (
  <Kb.Box2
    direction="vertical"
    style={styles.iconContainer}
    className={Styles.classNames('hover_container', 'hover_background_color_black_10')}
  >
    {props.children}
  </Kb.Box2>
)

const NewFeatureRowWrapper = ({children}) => (
  <Kb.Box2 direction="vertical" alignItems="flex-start" style={styles.newFeatureContainer}>
    {children}
  </Kb.Box2>
)

const load = () => {
  Sb.storiesOf('Whats New', module)
    .addDecorator(Sb.scrollViewDecorator)
    .add('Radio Icon - Nothing New', () => (
      <HeaderIconWrapper>
        <HeaderIcon newRelease={false} onClick={Sb.action('onClick')} />
      </HeaderIconWrapper>
    ))
    .add('Radio Icon - New Features', () => (
      <HeaderIconWrapper>
        <HeaderIcon newRelease={true} onClick={Sb.action('onClick')} />
      </HeaderIconWrapper>
    ))
    .add('New Feature Row', () => {
      const unseen = newFeatures.map((feature, index) => (
        <NewFeatureRowWrapper key={index}>
          <NewFeatureRow
            onPrimaryButtonClick={Sb.action('onPrimaryButtonClick')}
            onSecondaryButtonClick={Sb.action('onSecondaryButtonClick')}
            {...feature}
          />
        </NewFeatureRowWrapper>
      ))

      const seen = newFeatures.map((feature, index) => (
        <NewFeatureRowWrapper key={index}>
          <NewFeatureRow
            onPrimaryButtonClick={Sb.action('onPrimaryButtonClick')}
            onSecondaryButtonClick={Sb.action('onSecondaryButtonClick')}
            {...feature}
            seen={true}
          />
        </NewFeatureRowWrapper>
      ))

      return [...unseen, ...seen]
    })
    .add('Whats New List', () => (
      <WhatsNew
        onNavigate={Sb.action('onNavigate')}
        onNavigateExternal={Sb.action('onNavigateExternal')}
        seenVersions={{
          '1.1.1': false,
          '2.2.2': false,
          '3.3.3': false,
        }}
      />
    ))
}

const modalWidth = 284
const modalHeight = 424

const styles = Styles.styleSheetCreate(() => ({
  iconContainer: {
    alignItems: 'center',
    borderRadius: Styles.borderRadius,
    height: 25,
    justifyContent: 'center',
    margin: Styles.globalMargins.small,
    padding: Styles.globalMargins.xtiny,
    // Needed to position blue badge
    position: 'relative',
    // Fix width since story container wants to be width: 100%
    width: 24,
  },
  newFeatureContainer: {
    backgroundColor: Styles.globalColors.blueGrey,
    marginTop: 20,
    maxHeight: modalHeight,
    maxWidth: modalWidth,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
}))

export default load
