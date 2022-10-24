import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state,action) => {

      state.value = action.payload
    },
    decrement: (state) => {
      state.value -= 1
    },
    
    
  },
})


export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer