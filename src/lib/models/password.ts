export interface Password {
  type?: string,
  value?: string,
  checkConfirmation?: boolean,
  confirmationValue?: string,
  forceChange?: boolean
}