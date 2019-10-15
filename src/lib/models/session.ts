export interface Accounts {
  account: {
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
      decimalDigits: 0
    }
  },
  systemPayments: [
    {
      id: string,
      name: string,
      internalName: string,
      related: {
        id: string,
        name: string,
        internalName: string
      }
    }
  ],
  userPayments: [
    {
      id: string,
      name: string,
      internalName: string,
      related: {
        id: string,
        name: string,
        internalName: string
      }
    }
  ],
  selfPayments: [
    {
      id: string,
      name: string,
      internalName: string,
      related: {
        id: string,
        name: string,
        internalName: string
      }
    }
  ],
  posPayments: [
    {
      id: string,
      name: string,
      internalName: string,
      related: {
        id: string,
        name: string,
        internalName: string
      }
    }
  ]
}

export interface Session {
  user: {
    id: string,
    display: string,
    shortDisplay: string,
    image: {
      id: string,
      name: string,
      contentType: string,
      length: 0,
      url: string,
      width: 0,
      height: 0
    },
    user: {}
  },
  language: {
    id: string,
    version: 0
  },
  global: boolean,
  role: string,
  systemAdministrator: boolean,
  aliasOperator: boolean,
  permissions: {
    users: {
      search: boolean,
      viewProfile: boolean,
      map: boolean,
      contacts: boolean
    },
    banking: {
      accounts: [Accounts],
      payments: {
        user: boolean,
        system: boolean,
        self: boolean,
        pos: boolean
      },
      scheduledPayments: {
        view: boolean
      },
      recurringPayments: {
        view: boolean
      },
      externalPayments: {
        view: boolean
      },
      paymentRequests: {
        view: boolean
      },
      tickets: {
        view: boolean,
        create: boolean,
        cancel: boolean,
        accept: boolean
      }
    },
    marketplace: {
      search: boolean,
      ownAdvertisements: boolean,
      manageOwnAdvertisements: boolean
    },
    passwords: {
      manage: boolean,
      passwords: [
        {
          type: {
            id: string,
            name: string,
            internalName: string,
            global: boolean,
            mode: string
          },
          change: boolean,
          enable: boolean,
          reset: boolean,
          unblock: boolean
        }
      ]
    },
    records: {
      user: [
        {
          type: {
            id: string,
            name: string,
            internalName: string,
            pluralName: string,
            layout: string
          },
          create: boolean,
          update: boolean,
          remove: boolean,
          singleId: string
        }
      ],
      system: [
        {
          type: {
            id: string,
            name: string,
            internalName: string,
            pluralName: string,
            layout: string
          },
          create: boolean,
          update: boolean,
          remove: boolean,
          singleId: string
        }
      ]
    },
    operations: {
      user: [
        {
          operation: {
            id: string,
            name: string,
            internalName: string,
            scope: string,
            resultType: string,
            icon: string,
            label: string
          },
          run: boolean
        }
      ],
      system: [
        {
          operation: {
            id: string,
            name: string,
            internalName: string,
            scope: string,
            resultType: string,
            icon: string,
            label: string
          },
          run: boolean
        }
      ]
    },
    accounts: [Accounts],
    userRecords: [
      {
        id: string,
        name: string,
        internalName: string,
        pluralName: string,
        layout: string
      }
    ],
    systemRecords: [
      {
        id: string,
        name: string,
        internalName: string,
        pluralName: string,
        layout: string
      }
    ]
  },
  sessionToken: string,
  accessClient: {
    id: string,
    name: string,
    internalName: string
  },
  principalType: {
    id: string,
    name: string,
    internalName: string
  },
  principal: string,
  expiredPassword: boolean,
  pendingAgreements: boolean,
  expiredSecondaryPassword: boolean,
  pendingSecondaryPassword: boolean,
  configuration: {
    id: string,
    version: 0
  }
}