export const accountReducer = (accountState, action) => {
  var newAccountState = accountState;
  switch (action.type) {
    case 'update':
      newAccountState.id = action.account.id;
      newAccountState.userId = action.account.userId;
      return newAccountState;
    default:
      return accountState;
  }
}
