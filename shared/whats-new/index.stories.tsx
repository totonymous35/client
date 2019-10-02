import React from 'react'
import * as Sb from '../stories/storybook'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import HeaderIcon from './header-icon'
import NewFeatureRow from './new-feature-row'
import WhatsNew from '.'

const commonNewFeatureProps = {
  primaryButton: false,
  secondaryButton: false,
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
    primaryButton: true,
    primaryButtonText: 'Try it out',
    secondaryButton: true,
    secondaryButtonText: 'No way',
    text:
      'Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever. Some very very long text that goes on forever and ever.',
  },
  {
    ...commonNewFeatureProps,
    primaryButton: true,
    primaryButtonText: 'Lots to do on this button',
    secondaryButton: true,
    secondaryButtonText: 'Lots here as well',
    text: 'Short text but long button text',
  },
]

const releases = {
  current: {
    features: [
      {
        image: '',
        primaryButton: {
          external: false,
          path: 'there',
          text: 'Feature',
        },
        secondaryButton: {
          external: true,
          path: 'https://keybase.io',
          text: 'Docs',
        },
        text: 'hi this is new',
      },
    ],
    version: '4.4',
  },
  last: {
    features: [
      {
        image: '',
        primaryButton: {
          external: false,
          path: 'there',
          text: 'Go there',
        },
        secondaryButton: {
          external: false,
          path: '/',
          text: 'Go back',
        },
        seen: true,
        text: 'hi this is new',
      },
    ],
    version: '4.3.0',
  },
  lastLast: {
    features: [],
    version: '4.1.0',
  },
}

const NewFeatureRowWrapper = ({children}) => (
  <Kb.Box2 direction="vertical" alignItems="flex-start" style={styles.newFeatureContainer}>
    {children}
  </Kb.Box2>
)

const load = () => {
  Sb.storiesOf('Whats New', module)
    .addDecorator(Sb.scrollViewDecorator)
    .add('Radio Icon - Nothing New', () => <HeaderIcon newFeatures={false} onClick={Sb.action('onClick')} />)
    .add('Radio Icon - New Features', () => <HeaderIcon newFeatures={true} onClick={Sb.action('onClick')} />)
    .add('New Feature Row', () => {
      const unseen = newFeatures.map((feature, index) => (
        <NewFeatureRowWrapper key={index}>
          <NewFeatureRow onNavigate={Sb.action('onNavigate')} {...feature} />
        </NewFeatureRowWrapper>
      ))

      const seen = newFeatures.map((feature, index) => (
        <NewFeatureRowWrapper key={index}>
          <NewFeatureRow onNavigate={Sb.action('onNavigate')} {...feature} seen={true} />
        </NewFeatureRowWrapper>
      ))

      return [...unseen, ...seen]
    })
    .add('Whats New List', () => <WhatsNew releases={releases} onNavigate={Sb.action('onNavigate')} />)
}

const modalWidth = 284
const modalHeight = 424

const styles = Styles.styleSheetCreate(() => ({
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
