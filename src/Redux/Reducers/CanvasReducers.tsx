import { createSlice } from '@reduxjs/toolkit';


export const CanvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        brushSettings: {
            color: 'red',
            brushType: 'default',
            strokeWidth: 1,
            scale: 1,
        }
    },
    reducers: {
        changeColor: (state, action) => {
            state.brushSettings.color = action.payload
        },
        changeBrush: (state, action) => {
            state.brushSettings.brushType = action.payload
        },
        changeStrokeWidth: (state, action) => {
            state.brushSettings.strokeWidth = action.payload
        },
        scaleChange: (state, action) => {
            state.brushSettings.scale = action.payload
        }
    }
})


export const { changeColor, changeBrush, changeStrokeWidth, scaleChange } = CanvasSlice.actions
export const canvasSettings = (state: any) => state.canvas

export default CanvasSlice.reducer