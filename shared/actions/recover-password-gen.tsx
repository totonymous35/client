// NOTE: This file is GENERATED from json files in actions/json. Run 'yarn build-actions' to regenerate

import * as RPCTypes from '../constants/types/rpc-gen'
import * as Types from '../constants/types/provision'
import HiddenString from '../util/hidden-string'

// Constants
export const resetStore = 'common:resetStore' // not a part of recover-password but is handled by every reducer. NEVER dispatch this
export const typePrefix = 'recover-password:'
export const abortDeviceSelect = 'recover-password:abortDeviceSelect'
export const abortPaperKey = 'recover-password:abortPaperKey'
export const displayDeviceSelect = 'recover-password:displayDeviceSelect'
export const displayError = 'recover-password:displayError'
export const restartRecovery = 'recover-password:restartRecovery'
export const setPaperKeyError = 'recover-password:setPaperKeyError'
export const setPasswordError = 'recover-password:setPasswordError'
export const showExplainDevice = 'recover-password:showExplainDevice'
export const startRecoverPassword = 'recover-password:startRecoverPassword'
export const submitDeviceSelect = 'recover-password:submitDeviceSelect'
export const submitPaperKey = 'recover-password:submitPaperKey'
export const submitPassword = 'recover-password:submitPassword'
export const submitResetPrompt = 'recover-password:submitResetPrompt'

// Payload Types
type _AbortDeviceSelectPayload = void
type _AbortPaperKeyPayload = void
type _DisplayDeviceSelectPayload = {readonly devices: Array<Types.Device>}
type _DisplayErrorPayload = {readonly error: HiddenString}
type _RestartRecoveryPayload = void
type _SetPaperKeyErrorPayload = {readonly error: HiddenString}
type _SetPasswordErrorPayload = {readonly error: HiddenString}
type _ShowExplainDevicePayload = {readonly type: RPCTypes.DeviceType; readonly name: string}
type _StartRecoverPasswordPayload = {readonly username: string; readonly abortProvisioning?: boolean}
type _SubmitDeviceSelectPayload = {readonly id: string}
type _SubmitPaperKeyPayload = {readonly paperKey: HiddenString}
type _SubmitPasswordPayload = {readonly password: HiddenString}
type _SubmitResetPromptPayload = {readonly action: RPCTypes.ResetPromptResponse}

// Action Creators
export const createAbortDeviceSelect = (payload: _AbortDeviceSelectPayload): AbortDeviceSelectPayload => ({
  payload,
  type: abortDeviceSelect,
})
export const createAbortPaperKey = (payload: _AbortPaperKeyPayload): AbortPaperKeyPayload => ({
  payload,
  type: abortPaperKey,
})
export const createDisplayDeviceSelect = (
  payload: _DisplayDeviceSelectPayload
): DisplayDeviceSelectPayload => ({payload, type: displayDeviceSelect})
export const createDisplayError = (payload: _DisplayErrorPayload): DisplayErrorPayload => ({
  payload,
  type: displayError,
})
export const createRestartRecovery = (payload: _RestartRecoveryPayload): RestartRecoveryPayload => ({
  payload,
  type: restartRecovery,
})
export const createSetPaperKeyError = (payload: _SetPaperKeyErrorPayload): SetPaperKeyErrorPayload => ({
  payload,
  type: setPaperKeyError,
})
export const createSetPasswordError = (payload: _SetPasswordErrorPayload): SetPasswordErrorPayload => ({
  payload,
  type: setPasswordError,
})
export const createShowExplainDevice = (payload: _ShowExplainDevicePayload): ShowExplainDevicePayload => ({
  payload,
  type: showExplainDevice,
})
export const createStartRecoverPassword = (
  payload: _StartRecoverPasswordPayload
): StartRecoverPasswordPayload => ({payload, type: startRecoverPassword})
export const createSubmitDeviceSelect = (payload: _SubmitDeviceSelectPayload): SubmitDeviceSelectPayload => ({
  payload,
  type: submitDeviceSelect,
})
export const createSubmitPaperKey = (payload: _SubmitPaperKeyPayload): SubmitPaperKeyPayload => ({
  payload,
  type: submitPaperKey,
})
export const createSubmitPassword = (payload: _SubmitPasswordPayload): SubmitPasswordPayload => ({
  payload,
  type: submitPassword,
})
export const createSubmitResetPrompt = (payload: _SubmitResetPromptPayload): SubmitResetPromptPayload => ({
  payload,
  type: submitResetPrompt,
})

// Action Payloads
export type AbortDeviceSelectPayload = {
  readonly payload: _AbortDeviceSelectPayload
  readonly type: typeof abortDeviceSelect
}
export type AbortPaperKeyPayload = {
  readonly payload: _AbortPaperKeyPayload
  readonly type: typeof abortPaperKey
}
export type DisplayDeviceSelectPayload = {
  readonly payload: _DisplayDeviceSelectPayload
  readonly type: typeof displayDeviceSelect
}
export type DisplayErrorPayload = {readonly payload: _DisplayErrorPayload; readonly type: typeof displayError}
export type RestartRecoveryPayload = {
  readonly payload: _RestartRecoveryPayload
  readonly type: typeof restartRecovery
}
export type SetPaperKeyErrorPayload = {
  readonly payload: _SetPaperKeyErrorPayload
  readonly type: typeof setPaperKeyError
}
export type SetPasswordErrorPayload = {
  readonly payload: _SetPasswordErrorPayload
  readonly type: typeof setPasswordError
}
export type ShowExplainDevicePayload = {
  readonly payload: _ShowExplainDevicePayload
  readonly type: typeof showExplainDevice
}
export type StartRecoverPasswordPayload = {
  readonly payload: _StartRecoverPasswordPayload
  readonly type: typeof startRecoverPassword
}
export type SubmitDeviceSelectPayload = {
  readonly payload: _SubmitDeviceSelectPayload
  readonly type: typeof submitDeviceSelect
}
export type SubmitPaperKeyPayload = {
  readonly payload: _SubmitPaperKeyPayload
  readonly type: typeof submitPaperKey
}
export type SubmitPasswordPayload = {
  readonly payload: _SubmitPasswordPayload
  readonly type: typeof submitPassword
}
export type SubmitResetPromptPayload = {
  readonly payload: _SubmitResetPromptPayload
  readonly type: typeof submitResetPrompt
}

// All Actions
// prettier-ignore
export type Actions =
  | AbortDeviceSelectPayload
  | AbortPaperKeyPayload
  | DisplayDeviceSelectPayload
  | DisplayErrorPayload
  | RestartRecoveryPayload
  | SetPaperKeyErrorPayload
  | SetPasswordErrorPayload
  | ShowExplainDevicePayload
  | StartRecoverPasswordPayload
  | SubmitDeviceSelectPayload
  | SubmitPaperKeyPayload
  | SubmitPasswordPayload
  | SubmitResetPromptPayload
  | {type: 'common:resetStore', payload: {}}
