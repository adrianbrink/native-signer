'use strict'

import { NEW_SCANNED_TX, SIGN_TX } from '../constants/TransactionActions'

const initialState = {
  pendingTransaction: {
    transaction: {},
    rlpHash: ''
  },
  signedTransaction: {
    signature: ''
  }
}

export default function transactions (state = initialState, action) {
  switch (action.type) {
    case NEW_SCANNED_TX:
      return Object.assign({}, state, {
        pendingTransaction: {
          rlpHash: action.rlpHash,
          transaction: action.transaction
        }
      })
    case SIGN_TX:
      return Object.assign({}, state, {
        signedTransaction: {
          signature: action.signature
        }
      })
    default:
      return state
  }
}
