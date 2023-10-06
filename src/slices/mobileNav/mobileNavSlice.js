import { createSlice } from '@reduxjs/toolkit'

const initialState = { left: false, right: false }

const mobileNavSlice = createSlice({
  name: 'mobileNav',
  initialState,
  reducers: {
    resetMobileNavState: state => {
      state.left = false
      state.right = false
    },
    activateMobileNavLeft: state => {
      state.left = !state.left
      state.right = false
    },
    activateMobileNavRight: state => {
      state.right = !state.right
      state.left = false
    }
  }
})

export default mobileNavSlice.reducer
export const {
  resetMobileNavState,
  activateMobileNavLeft,
  activateMobileNavRight
} = mobileNavSlice.actions
