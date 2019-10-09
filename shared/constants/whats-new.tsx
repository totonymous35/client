import semver from 'semver'
import {WhatsNewVersion, WhatsNewVersions} from '../constants/types/whats-new'

type seenVersionsMap = {[key in WhatsNewVersion]: boolean}

export const isVersionValid = (version: string) => {
  return version ? semver.valid(version) : false
}

export const anyVersionsUnseen = (lastSeenVersion: string, versions: WhatsNewVersions): boolean =>
  Object.values(getSeenVersions(lastSeenVersion, versions)).some(seen => !seen)

export const getSeenVersions = (lastSeenVersion: string, versions: WhatsNewVersions): seenVersionsMap => {
  console.log('JRY getSeenVersions', {
    lastSeenVersion,
    versions,
  })
  const [currentVersion, lastVersion, lastLastVersion] = versions
  const initialMap: seenVersionsMap = {
    [currentVersion]: false,
    [lastLastVersion]: false,
    [lastVersion]: false,
  }

  // User has no entry in Gregor for lastSeenVersion, so mark all as unseen
  if (!lastSeenVersion || !semver.valid(lastSeenVersion)) {
    console.log('JRY getSeenVersions - user does not have a last seen version entry')
    return initialMap
  }

  // Unseen versions are ones that are greated than the lastSeenVersion
  // unseen = lastSeenVersion > version
  const seenVersions = versions.reduce(
    (acc, version) => ({
      ...acc,
      [version]: semver.gt(lastSeenVersion, version),
    }),
    initialMap
  )

  return seenVersions
}
