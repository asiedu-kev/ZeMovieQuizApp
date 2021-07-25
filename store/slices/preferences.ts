import { PartialState } from "@react-navigation/native";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 type State = {
     base_url: string,
     size: string,
     bestScore: number
 };

 const initialState : State = {base_url: '', size: '', bestScore: 0};
 const PreferencesSlice = createSlice({
     name: 'preferences',
     initialState,
     reducers : {
         setPreferences(state: State, action: PayloadAction<Partial<State>>) {
             return {...state, ...action.payload };
         }
     }
 })
 export default PreferencesSlice ;