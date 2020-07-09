const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case "GET_DATA":
            return{
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default userReducer;