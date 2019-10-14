### How to Add a New Version

1. Update version numbers in the following locations
    1. `client/shared/constants/whats-new.tsx` for JavaScript values
    2. `client/shared/constants/types/whats-new.tsx` for literal type values

2. New new features in `client/shared/whats-new/releases.tsx` using the
   `NewFeatureRow` component.
    * Each feature row needs to take the `seen` prop to set its badge state
      correctly
    * Navigation can be done either internally to the application or externally
      to a Web URL. Use `onNavigate` to move to different routes in the app, and
      `onNavigateExternal` for external URLs like keybase.io
    * Images need to be required with `require('')`

3. Add any image assets to `client/shared/images/releases/M.M.P/{name}.png`
    * Images have to be PNGs
    * Limit file size since we will be bundling these assets with the desktop
      and mobile applications

### How to Remove a Version

### Important Notes

1. Make sure images from old release are removed from
   `client/shared/images/releases/M.M.P/{name}.png`

2. Version numbers matter in `client/shared/constants/whats-new.tsx`. They are
   used to sync the **most recent** version a user has seen and set the badge
   state of the radio icon.

3. Invariant: `currentVersion` > `lastVersion` > `lastLastVersion`
