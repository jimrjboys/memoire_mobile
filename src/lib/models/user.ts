import { Address } from './address';
import { Phone } from './phone';
import { Password } from './password';
import { Captcha } from './captcha';
import { NFCToken } from './nfctoken';
import { CustomValues } from './customValues';
export interface User {
  name?: string,
  username ?: string,
  email?: string,
  customValues?: CustomValues,
  //customValues?: {},
  hiddenFields?: [string],
  group?: string,
  addresses?: [Address],
  mobilePhones?: [Phone],
  landLinePhones?: [Phone],
  passwords?: [Password],
  images?: [string],
  captcha?: Captcha,
  acceptAgreement?: true,
  skipActivationEmail?: true,
  asMember?: true,
  securityQuestion?: string,
  securityAnswer?: string,
  nfcToken?: NFCToken,
  version?:string
}
export interface UserProfile {
  id: string,
  display?: string,
  shortDisplay?: string,
  image?: {
    id?: string,
    name?: string,
    contentType?: string,
    length?: number,
    url?: string,
    width?: number,
    height?: number
  },
  user?: {
    id?: string,
    display?: string,
    shortDisplay?: string,
    image?: {
      id?: string,
      name?: string,
      contentType?: string,
      length?: number,
      url?: string,
      width?: number,
      height?: number
    },
    user?: {}
  },
  name?: string,
  username?: string,
  email?: string,
  address?: {
    id?: string,
    name?: string,
    addressLine1?: string,
    addressLine2?: string,
    street?: string,
    buildingNumber?: string,
    complement?: string,
    zip?: string,
    poBox?: string,
    neighborhood?: string,
    city?: string,
    region?: string,
    country?: string,
    location?: {
      latitude?: number,
      longitude?: number
    }
  },
  distance?: number,
  customValues?: {},
  phone?: string,
  accountNumber?: string,
  group?: {
    id?: string,
    name?: string,
    internalName?: string
  },
  groupSet?: {
    id?: string,
    name?: string,
    internalName?: string
  }
}