import { CartManagementApi } from '../service/apiVariables';
import { addQuery } from '../service/helperFunctions';
import { CartActionType } from "service/actionType"

export const getCartList = (query) => (dispatch, getState, { api }) => {

    return new Promise((resolve, reject) => {
        addQuery(query, CartManagementApi.getCartList);
        api({ ...CartManagementApi.getCartList }).then((data) => {
            resolve(data)
            dispatch({ type: CartActionType.updateCartData, payload: data.data.cartDetails.length })
        }).catch(({ message }) => {
            reject(message)
        })
    })

}