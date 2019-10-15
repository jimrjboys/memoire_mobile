export interface Phone {
  name?: string,
  number: string,
  extension?: string,
  enabledForSms?: boolean,
  verified?: boolean,
  kind?: string
}