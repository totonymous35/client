import semver from 'semver'
import {WhatsNewVersion, WhatsNewVersions} from '../constants/types/whats-new'

type seenVersionsMap = {[key in WhatsNewVersion]: boolean}

export const isVersionValid = (version: string) => {
  return version ? semver.valid(version) : false
}

export const anyVersionsUnseen = (lastSeenVersion: string, versions: WhatsNewVersions): boolean =>
  Object.values(getSeenVersions(lastSeenVersion, versions)).some(seen => !seen)

export const getSeenVersions = (lastSeenVersion: string, versions: WhatsNewVersions): seenVersionsMap => {
  const [currentVersion, lastVersion, lastLastVersion] = versions
  const initialMap: seenVersionsMap = {
    [currentVersion]: false,
    [lastLastVersion]: false,
    [lastVersion]: false,
  }

  // User has no entry in Gregor for lastSeenVersion, so mark all as unseen
  if (!lastSeenVersion || !semver.valid(lastSeenVersion)) {
    return initialMap
  }

  // last and lastLast versions might not be set
  const validVersions = versions.filter(isVersionValid)

  // Unseen versions are ones that are greated than the lastSeenVersion
  // seen =  lastLastVersion >= version
  const seenVersions = validVersions.reduce(
    (acc, version) => ({
      ...acc,
      [version]: semver.gte(lastSeenVersion, version),
    }),
    initialMap
  )

  return seenVersions
}
