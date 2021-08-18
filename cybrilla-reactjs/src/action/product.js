import { ProductManagementApi } from '../service/apiVariables';
import { addQuery } from '../service/helperFunctions';

export const getProductList = (query) => (dispatch, getState, { api }) => {

    return new Promise((resolve, reject) => {
        addQuery(query, ProductManagementApi.getProductList);
        api({ ...ProductManagementApi.getProductList }).then((data) => {
            resolve(data)
        }).catch(({ message }) => {
            reject(message)
        })
    })

}

export const addItemToCart = (body) => (dispatch, getState, { api }) => {

    return new Promise((resolve, reject) => {
        api({ ...ProductManagementApi.addItemToCart, body }).then((data) => {
            resolve(data)
        }).catch(({ message }) => {
            reject(message)
        })
    })

}