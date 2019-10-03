/* eslint-disable sort-keys */
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import releasesJSON from '../../whats-new/releases-gen'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const commands = {
  'create-release': {
    code: createRelease,
    help: 'Update release information for "What\'s New" notifier',
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

type Questions = {
  [key: string]: {
    question: Question
    next: nextFn
  }
}

type Question = {
  required: boolean
  text: string
  validator: validatorFn
  success: successWithAccumulatorFn
}
type validatorFn = (answer: string) => {success: boolean; message: string}
type successWithAccumulatorFn = (acc: object, answer: string) => void
type nextFn = (acc: object) => string | null

// Source: https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
const formatQuestion = (question: string) => `${question}:\n`

let numFeatures = 1

const questions: Questions = {
  version: {
    question: {
      required: true,
      text: '(Required) What is version of this release? (MAJOR.MINOR.PATCH)',
      validator: answer => {
        const match = answer.match(semverRegex)
        const success = match ? !!match.length : false
        return success
          ? {success, message: ''}
          : {success, message: 'Version must match semantic vesioning (MAJOR.MINOR.PATCH)'}
      },
      success: (newVersion, answer) => {
        newVersion['version'] = answer
      },
    },
    next: () => 'numberOfFeatures',
  },
  numberOfFeatures: {
    question: {
      required: true,
      text: 'How many features to add to "What\'s New" in this release?',
      validator: answer => {
        return !isNaN(Number(answer))
          ? {success: true, message: ''}
          : {success: false, message: 'Must be a number'}
      },
      success: (_, answer) => {
        numFeatures = Number(answer)
      },
    },
    next: () => null,
  },
  // Questions are repeated {numberOfFeatures} times
  featureText: {
    question: {
      required: true,
      text: 'Enter a description of this feature',
      validator: answer => {
        return answer ? {success: true, message: ''} : {success: false, message: 'Enter a description'}
      },
      success: (newVersion, answer) => {
        newVersion['text'] = answer
      },
    },
    next: () => 'featureImage',
  },
  featureImage: {
    question: {
      required: false,
      text: '(Optional) Enter a path to an image asset.\nE.g. "./images/releases/{version}/image-name.png"',
      validator: answer => {
        const exists = fs.existsSync(answer)
        return exists
          ? {success: true, message: ''}
          : {success: false, message: `Image file at path ${path.resolve(answer)} does not exist.`}
      },
      success: (newVersion, answer) => {
        newVersion['image'] = answer
      },
    },
    next: () => 'featurePrimaryButton',
  },
  featurePrimaryButton: {
    question: {
      required: false,
      text: '(Optional) Does this feature have a primary button?',
      validator: answer => {
        // At this point we have an answer than is not an empty string, so it must be either 'y' or 'n'
        return answer === 'y'
          ? {success: true, message: ''}
          : answer === 'n'
          ? {success: true, message: ''}
          : {success: false, message: 'Enter either (y/n)'}
      },
      success: (newFeature, answer) => {
        if (answer === 'y') {
          // Initialize the primaryButton object
          newFeature['primaryButton'] = {}
        } else {
          newFeature['primaryButton'] = null
        }
      },
    },
    next: newFeature => (newFeature['primaryButton'] !== null ? 'featurePrimayButtonText' : null),
  },
  featurePrimayButtonText: {
    question: {
      required: true,
      text: '(Required) Enter text for the primary button',
      validator: answer => {
        return answer ? {success: true, message: ''} : {success: false, message: ''}
      },
      success: (newFeature, answer) => {
        newFeature['primaryButton']['text'] = answer
      },
    },
    next: () => 'featurePrimaryButtonPath',
  },
  featurePrimaryButtonExternal: {
    question: {
      required: true,
      text: '(Required) Will this button navigate to an web URL?',
      validator: answer => {
        // At this point we have an answer than is not an empty string, so it must be either 'y' or 'n'
        return answer === 'y'
          ? {success: true, message: ''}
          : answer === 'n'
          ? {success: true, message: ''}
          : {success: false, message: 'Enter either (y/n)'}
      },
      success: (newFeature, answer) => {
        if (answer === 'y') {
          newFeature['primaryButton']['external'] = true
        } else {
          newFeature['primaryButton']['external'] = false
        }
      },
    },
    next: () => 'featurePrimaryButtonExternal',
  },
  featurePrimaryButtonPath: {
    question: {
      required: true,
      text: '(Required) Enter the path the button will navigate to',
      validator: answer => {
        return answer ? {success: true, message: ''} : {success: false, message: ''}
      },
      success: (newFeature, answer) => {
        newFeature['primaryButton']['path'] = answer
      },
    },
    next: () => 'featureSecondaryButton',
  },
  featureSecondaryButton: {
    question: {
      required: false,
      text: '(Optional) Does this feature have a secondary button?',
      validator: answer => {
        // At this point we have an answer than is not an empty string, so it must be either 'y' or 'n'
        return answer === 'y'
          ? {success: true, message: ''}
          : answer === 'n'
          ? {success: true, message: ''}
          : {success: false, message: 'Enter either (y/n)'}
      },
      success: (newFeature, answer) => {
        if (answer === 'y') {
          // Initialize the secondaryButton object
          newFeature['secondaryButton'] = {}
        } else {
          newFeature['secondaryButton'] = null
        }
      },
    },
    next: newFeature => (newFeature['secondaryButton'] !== null ? 'featureSecondaryButtonText' : null),
  },
  featureSecondaryButtonText: {
    question: {
      required: true,
      text: '(Required) Enter text for the secondary button',
      validator: answer => {
        return answer ? {success: true, message: ''} : {success: false, message: ''}
      },
      success: (newFeature, answer) => {
        newFeature['secondaryButton']['text'] = answer
      },
    },
    next: () => 'featureSecondaryButtonPath',
  },
  featureSecondaryButtonExternal: {
    question: {
      required: true,
      text: '(Required) Will this button navigate to an web URL?',
      validator: answer => {
        // At this point we have an answer than is not an empty string, so it must be either 'y' or 'n'
        return answer === 'y'
          ? {success: true, message: ''}
          : answer === 'n'
          ? {success: true, message: ''}
          : {success: false, message: 'Enter either (y/n)'}
      },
      success: (newFeature, answer) => {
        if (answer === 'y') {
          newFeature['secondaryButton']['external'] = true
        } else {
          newFeature['secondaryButton']['external'] = false
        }
      },
    },
    next: () => 'featureSecondaryButtonPath', // marks the end
  },
  featureSecondaryButtonPath: {
    question: {
      required: true,
      text: '(Required) Enter the path the button will navigate to',
      validator: answer => {
        return answer ? {success: true, message: ''} : {success: false, message: ''}
      },
      success: (newFeature, answer) => {
        newFeature['secondaryButton']['path'] = answer
      },
    },
    next: () => null,
  },
}

const requiredQuestion = (...args: [string, validatorFn]): Promise<string> => {
  const [question, validator] = args
  const formattedQuestion = formatQuestion(question)
  return new Promise(resolve => {
    rl.question(formattedQuestion, answer => {
      console.log('DEBUG: rl.question answered', {question, answer})
      if (!answer) {
        console.log('Required: Please enter a value')
        resolve(requiredQuestion(...args))
      }
      const {success, message} = validator(answer)
      if (!success) {
        console.log(`${message}\n`)
        requiredQuestion(...args)
      }
      resolve(answer)
    })
  })
}

const optionalQuestion = (...args: [string, validatorFn]): Promise<string | null> => {
  const [question, validator] = args
  const formattedQuestion = formatQuestion(question)
  return new Promise(resolve => {
    rl.question(formattedQuestion, (answer: string) => {
      if (!answer) {
        resolve(null)
      }
      const {success, message} = validator(answer)
      if (!success) {
        console.log(`${message}\n`)
        resolve(optionalQuestion(...args))
      }
      resolve(answer)
    })
  })
}
const makeChainQuestions = (newObj: object) => {
  const chainQuestions = async (question: Question, next: nextFn) => {
    if (question.required) {
      const answer = await requiredQuestion(question.text, question.validator)
      console.log('DEBUG success', {newObj, answer})
      question.success(newObj, answer)

      const nextName = next(newObj)
      console.log('DEBUG: next question', {nextName})
      // End of feature questions
      if (!nextName) {
        console.log('DEBUG: next question returning')
        return
      }
      const {question: nextQuestion, next: nextNext} = questions[nextName]
      // Continue to next question
      await chainQuestions(nextQuestion, nextNext)
    } else {
      const answer = await optionalQuestion(question.text, question.validator)
      // User skipped optional questions
      if (!answer) {
        const nextName = next(newObj)
        // End of feature questions
        if (!nextName) {
          return
        }
        const {question: nextQuestion, next: nextNext} = questions[nextName]
        // Continue to next question
        await chainQuestions(nextQuestion, nextNext)
      } else {
        question.success(newObj, answer)
      }
    }
  }

  return chainQuestions
}

/*
 * createRelease will execute a chain of linked questions that take input via
 * STDIN and build a new release JSON file located at
 * 'client/shared/whats-new/releases-gen.tsx'
 *
 * It will also manage image assets for new versions by checking that they are
 * in the correct location as well as removing old assets when a version is no
 * longer included in 'What's New'
 */
async function createRelease() {
  const newVersion = {}

  // Kick off the release questions by starting with version and number of feature questions
  const {question: versionQuestion, next: versionNext} = questions.version
  const premlimChain = makeChainQuestions(newVersion)
  await premlimChain(versionQuestion, versionNext)

  console.log('DEBUG: finished prelim questions', {newVersion, numFeatures})

  // Create an array that has {numFeatures} objects populated by calling chainQuestions

  const newFeatures = Promise.all(
    Array(numFeatures)
      .fill(null)
      .map(async () => {
        const newFeature = {}
        const {question: featureTextQuestion, next: featureTextNext} = questions.featureText
        const featureChain = makeChainQuestions(newFeature)
        await featureChain(featureTextQuestion, featureTextNext)
        console.log('DEBUG: Done with one iteration of features', {newFeatures})
        return await newFeature
      })
  )
}

export default commands
