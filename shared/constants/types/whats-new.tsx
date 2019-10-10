export type CurretVersionId = '3.3.3'
export type LastVersionId = ''
export type LastLastVersionId = ''
export type WhatsNewVersion = CurretVersionId | LastVersionId | LastLastVersionId
export type WhatsNewVersions = [CurretVersionId, LastVersionId, LastLastVersionId]

export type ActionButton = {
  text: string
  onNavigate: () => void
}

export type Feature = {
  text: string
  primaryButton?: ActionButton | null
  secondaryButton?: ActionButton | null
  image?: string | null
}

export type FeatureWithSeenState = Feature & {seen: boolean}
