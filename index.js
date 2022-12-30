


// First Principle
// "The state of your whole application is stored in an object tree within a single store"

// Second Principle
// "The only way to change the state is to emit an action, an object describing what happened"
// To update the state of your app, you need to let Redux know about that with an action

// Third Principle
// "To specify how the state tree is transformed by actions, you write pure reducers"
// Reducer - (previousState, action) => newState









// const redux = require("redux");
// const createStore = redux.createStore;

// //Actions are simple objects
// //It contains type property

// const BUY_CAKE="BUY_CAKE";

// //Action creator--Function that returns action

// const buyCake=()=>{
//     return{
//         type:BUY_CAKE,
//         info:"First Redux Action"
//     }
// }



// //Reducers specify how the apps state changes in response to the actions sent to the store
// //Function that accepts previous state and action as argument and returns the next state of the application

// //(prev State,action)=>new state

// //State
// const initialState = {
//     numOfCakes:10
// }

// //Reducer
// const reducer=(state=initialState,action)=>{
//     switch(action.type){
//         case BUY_CAKE : return {
//             ...state,
//             numOfCakes:state.numOfCakes-1
//         }

//         default: return state
//     }
// }

// //Responsibilites of Store
// // 1.Holds Application state
// // 2.Allows access to state via getState()
// // 3.Allows state to be updated via dispatch(action)
// // 4.Registers listeners via subscribe(listener)---Whenever there is change in the state then the listener will be invoked


// const store = createStore(reducer);
// console.log("Initial State",store.getState());
// const unsubscribe = store.subscribe(()=> console.log("Updated State",store.getState()));
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// unsubscribe();




//Whole Flow

// Redux Store(State)--->Javascript App ---->dispatch Action ---->Reducer---->New State------->Redux Store(newState)


//Cakes and Ice-cream




const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

//Actions are simple objects
//It contains type property

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//Action creator--Function that returns action

const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: "First Redux Action"
    }
}
const buyIceCream = () => {
    return {
        type: BUY_ICECREAM,
        info: "Second Redux Action"
    }
}



//Reducers specify how the apps state changes in response to the actions sent to the store
//Function that accepts previous state and action as argument and returns the next state of the application

//(prev State,action)=>new state

//State

// const initialState = {
//     numOfCakes:10,
//     numOfIceCreams:20
// }

//Splitted initial states(new)

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

//Reducer(Old Reducer)
// const reducer=(state=initialState,action)=>{
//     switch(action.type){
//         case BUY_CAKE : return {
//             ...state,
//             numOfCakes:state.numOfCakes-1
//         }

//         case BUY_ICECREAM : return {
//             ...state,
//             numOfIceCreams:state.numOfIceCreams-1
//         }

//         default: return state
//     }
// }


//Multiple reducers(new)
// --cakeReducer will bother only will cakes not with icecream 

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }

        default: return state
    }
}


const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {

        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }

        default: return state
    }
}

//Combine all the reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})



const store = createStore(rootReducer);
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() => console.log("Updated State", store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();
