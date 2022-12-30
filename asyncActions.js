const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const initialState = {
    loading : false,
    users:[],
    error : ''
}

//Actions

const FETCH_USERS_REQUEST=" FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS=" FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE=" FETCH_USERS_FAILURE";

const fetchUsersRequest=()=>{
    return{
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess=(users)=>{
    return{
        type: FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUsersFailure=(error)=>{
    return{
        type: FETCH_USERS_FAILURE,
        payload:error
    }
}





//Reducer

const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return{
                ...initialState,
                loading:true
            }
        case FETCH_USERS_SUCCESS:
            return{
                ...initialState,
                loading:false,
                users:action.payload,
                error:''
            }    
        case FETCH_USERS_FAILURE:
            return{
                ...initialState,
                loading:false,
                users:[],
                error:action.payload
            }    
    
    }
}

//Redux thunk middleware allows action creator to return a function instead of action , therefore the function can now perform asynchronous tasks

const fetchUsers = ()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            // console.log(response.data);
            const users = response.data.map(user=>user.id);
            dispatch(fetchUsersSuccess(users))
        })
        .catch((error)=>{
            dispatch(fetchUsersFailure(error.message));
        })
    }
}


const store = createStore(reducer,applyMiddleware(thunkMiddleware));
store.subscribe(()=>{console.log(store.getState())});
store.dispatch(fetchUsers());