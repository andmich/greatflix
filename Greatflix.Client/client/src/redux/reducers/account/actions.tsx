import {
    UPDATE_ACCOUNT
} from './types';

type updateAccountParamTypes = string | number;

export const updateAccount = (id: updateAccountParamTypes, userId: updateAccountParamTypes) => ({
    type: UPDATE_ACCOUNT,
    payload: {
        id, 
        userId
    }
});