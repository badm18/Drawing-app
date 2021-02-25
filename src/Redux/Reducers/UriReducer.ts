import { createSlice } from '@reduxjs/toolkit';


export const CanvasSlice = createSlice({
    name: 'uri',
    initialState: {
        link: {
            uri: ''
        }
    },
    reducers: {
        changeUri: (state, action) => {
            state.link.uri = action.payload
        },

    }
})


export const { changeUri} = CanvasSlice.actions
export const uriSettings = (state: any) => state.uri

export default CanvasSlice.reducer