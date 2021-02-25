import { configureStore } from '@reduxjs/toolkit';
import CanvasReducer from '../Reducers/CanvasReducers'
import linesReducer from '../Reducers/linesReducer';
import UriReducer from '../Reducers/UriReducer';


export default configureStore({
    reducer: {
        canvas: CanvasReducer,
        uri: UriReducer,
        lines: linesReducer
    }
})