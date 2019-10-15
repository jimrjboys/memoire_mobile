export class PaymentType {
  public static readonly USER_TRADE = 'user.trade'
}
export interface Payment {
  amount?: number,
  description?: string,
  currency?: string,
  type?: string,
  customValues?: CustomValues,
  subject?: string,
  nfcChallence?: string,
  fromName?: string,
  toName?: string,
  scheduling?: string,
  installmentsCount?: number,
  firstInstallmentDate?: string,
  installments?: [
    {
      dueDate?: string,
      amount?: string
    }
  ],
  occurrencesCount?: 0,
  firstOccurrenceDate?: string,
  occurrenceInterval?: {
    amount?: 0,
    field?: string
  }
}

export interface CustomValues {
  transferFees?: string,
  idAgent?: string
}