export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

export interface AccountModel {
    id: string | number;
    userId: string | number;
}

export interface UpdateAccountAction {
    type: typeof UPDATE_ACCOUNT;
    payload: AccountModel
}

export type AccountActionTypes = UpdateAccountAction;