export type ActionButton = {
  text: string
  path: string
  external: boolean
}

export type Feature = {
  text: string
  primaryButton?: ActionButton | null
  secondaryButton?: ActionButton | null
  image?: string | null
}

export type FeatureWithSeenState = Feature & {seen: boolean}

export type Features = Array<Feature>

export type Release = {
  version: string
  features: Features
}
