{
  /* import fs from 'fs' */
}
{
  /* import path from 'path' */
}
{
  /* import readline from 'readline' */
}

const commands = {
  'create-release': {
    code: createRelease,
    help: 'Add release information to "What\'s New"',
  },
}

/*
 * TODO Developer Notes
 *
 * - Need to represent the series of questions as a static variable to be iterated on
 */

/*
 * Questions
 *
 * 1. *required <string> What is the version of the new release?
 * 2. *required <number> How many new features are being hihglighted?
 * 3. LOOP for {n} features
 *    1. *required <string> "What is the feature text?"
 *    2. *optional <boolean> "Is there an image to include in this feature? (y/n)"
 *        1. *required <string> "What is the path of the image?" (must be in client/shared/images)
 *          - Test that the path is valid and an image exists there
 *          - (?) Perhaps enforce that images are `.png` as well?
 *    3. *optional* <boolean> "Is there a primary button to include in this feature? (y/n)"
 *        1. *required <string> "What is the button text?"
 *        2. *required <string> "What path should the button open?"
 *        3. *required <boolean> "Is this path external (web URL)? (y/n)"
 *    4. *optional <boolean> [if primary = true] "Is there a secondary button to include in this feature? (y/n)"
 *        1. *required <string> "What is the button text?"
 *        2. *required <string> "What path should the button open?"
 *        3. *required <boolean> "Is this path external (web URL)? (y/n)"
 *
 * 4. Confirm that the *oldest* (lastLast) version will be removed from the
 * JSON file and its assets located in `client/shared/iamges/releases` will be
 * deleted
 *
 */

function createRelease() {}

export default commands
