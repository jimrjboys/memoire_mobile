export interface Account {
  id: string,
  number: string,
  type: {
    id: string,
    name: string,
    internalName: string
  },
  currency: {
    id: string,
    name: string,
    internalName: string,
    symbol: string,
    prefix: string,
    suffix: string,
    transactionNumberPattern: string,
    decimalDigits: number
  },
  status: {
    balance: string,
    creditLimit: string,
    upperCreditLimit: string,
    reservedAmount: string,
    availableBalance: string,
    negativeSince: string,
    aRate: string,
    dRate: string,
    rateBalanceCorrection: string,
    virtualRatedBalance: string
  }
}