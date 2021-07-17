import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import { combineReducers } from 'redux';
import PreferencesSlice from './slices/preferences';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
    preferences : PreferencesSlice.reducer,
});


const persistedReducer = persistReducer ({
    key: 'app-state',
    version : 1,
    storage: AsyncStorage,
}, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions : [FLUSH,REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }),
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;

export default store;