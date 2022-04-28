import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signinUser, signupUser } from "../../API/userApi";

export const signin = createAsyncThunk('users/signin', 
  async(data, {rejectWithValue}) => {
    try {
      const response = await signinUser(data)
      return response
    } catch (error) {
      return rejectWithValue([], error)
    }
  }
)

export const signup = createAsyncThunk(
  'users/signup',
  async(data, {rejectWithValue}) => {
    try {
      const response = await signupUser(data)
      return response
    } catch (error) {
      return rejectWithValue([], error)
    }
  }
)


export const userSlice = createSlice({
  name:'users',
  initialState:{
    userDetails:{},
    isLoggedin:false,
    isRegistered:false,
    isLoading:false,
    isError:false,
    errorMessage:'' 
  }, 
  reducers:{
    clearState: (state) => {
      state.isLoading = false
      state.isError = false
    }
  },
  extraReducers:{
    [signin.pending]: (state) => {
      state.isLoading = true;
    },
    [signin.fulfilled]: (state, {payload}) => {
      console.log(payload)
      state.isLoading = false
      if (payload.message) {
        state.isError = true;
        state.errorMessage = payload.message
      } else {
        state.userDetails = payload;
        state.isLoggedin = true
        state.errorMessage = ''
      }
    },
    [signin.rejected]: (state, {payload}) => {
      state.isLoading = false
      state.isError = true;
      state.errorMessage = payload.message
    },
    
    [signup.pending]: state => {state.isLoading = true},
    [signup.fulfilled]: (state, {payload}) => {
      state.isLoading = false
      if (payload.message) {
        state.isError = true
        state.errorMessage = payload.message
      } else {
        state.isRegistered = true;
      }
    },
    [signup.rejected]: (state, {payload}) => {
      state.isLoading = false
      state.isError = true;
      state.errorMessage = payload.message
    } 
  }
})


export const {clearState}  = userSlice.actions
export const userSelector = state => state.users