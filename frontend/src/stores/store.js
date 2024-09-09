import {configureStore} from "@reduxjs/toolkit";
import auth from './auth.js';
import search from './search.js';
import open from './modalOpen.js';
import authSlice from './reducer.js';


export default configureStore({
    reducer:{
        auth:auth,
        search:search,
        openModal:open,
        authSlice:authSlice,

    }
});


