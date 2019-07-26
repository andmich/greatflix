import React from 'react';

const AccountContext = React.createContext({
  UserId: ''
});

export const AccountProvider = AccountContext.Provider;
export const AccountConsumer = AccountContext.Consumer;
export default AccountContext;
