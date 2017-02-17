import { ADD_ACCOUNT, SELECT_ACCOUNT, DELETE_ACCOUNT } from '../constants/AccountActions'

const initialAccounts = {
  all: [{
    address: 'mock',
    name: 'dupa',
  }, {
    address: 'mock',
    name: 'Katar',
  }],
  selected: {},
}

export default function accounts(state = initialAccounts, action) {
  switch (action.type) {
      case ADD_ACCOUNT:
        return Object.assign({}, state, {
          all: [
            ...state.all,
            action.account,
          ]
        })

    case SELECT_ACCOUNT:
      return Object.assign({}, state, {
        selected: action.account,
      })

    case DELETE_ACCOUNT:
      return Object.assign({}, state, {
        all: state.all.filter((account) => { return action.account != account })
      })

    default:
      return state
  }
}
