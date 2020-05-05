import {
    UPDATE_ACCOUNT, AccountActionTypes
} from './types';
import { AccountModel } from './types';

const initialState: AccountModel = {
    id: '',
    userId: ''
}

export default (state: AccountModel = initialState, action: AccountActionTypes) => {
    switch (action.type) {
        case UPDATE_ACCOUNT:
            const { id, userId } = action.payload;
            return {
                ...state,
                id,
                userId
            };
        default:
            return state;
    }
}