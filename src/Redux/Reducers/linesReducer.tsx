import { createSlice } from '@reduxjs/toolkit';



export const linesSlice = createSlice({
    name: 'lines',
    initialState: {
        clear: 'false'
    },
    reducers: {
        clearPage: (state: any, action: any) => {
            state.clear = action.payload
        },

    }
})

export const { clearPage } = linesSlice.actions
export const linesNstyle = (state: any) => state.lines

export default linesSlice.reducer