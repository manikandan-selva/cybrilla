import { CartActionType } from "service/actionType"

const initialState = {
    data: 0
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case CartActionType.updateCartData:
            return {
                ...state,
                data: payload
            }
        default:
            return state
    }

}