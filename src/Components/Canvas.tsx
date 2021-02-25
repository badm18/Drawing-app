import React, { useState } from 'react'
import { Layer, Line, Rect, Stage, Ellipse, Star } from '../../node_modules/react-konva';
import { useDispatch, useSelector } from 'react-redux'
import { canvasSettings, scaleChange } from '../Redux/Reducers/CanvasReducers';
import { changeUri } from '../Redux/Reducers/UriReducer';
import { clearPage, linesNstyle } from '../Redux/Reducers/linesReducer';






export const Canvas: React.FC = () => {

    const brush = useSelector(canvasSettings)  //настройки кисти из redux
    const page = useSelector(linesNstyle)

    const [scale, setScale] = React.useState({ x: 1, y: 1 })
    const [size, setSize] = React.useState({ width: window.innerWidth, height: window.innerHeight })
    const [lines, setLines]: any[] = React.useState([]);
    const [currentLine, setCurrentLine]: any = useState([]);
    const [lineStyle, setStyle]: any[] = React.useState([])//используется для хранения настроек линии(цвет, кисть и т.д)
    const isDrawing = React.useRef(false);

    const stageRef = React.useRef<any>(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const checkSize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, [])

    React.useEffect(() => { //если нажата кнопка "очистить", то в redux меняется значение переменной и после этого срабатывает хук useEffect
        if (page.clear) {
            setLines([])
            setStyle([])
            dispatch(clearPage(false))
            dispatch(changeUri(''))
        }

    }, [page.clear])






    const changeScale = (e: any) => {
        if (brush.brushSettings.brushType === 'loupe') {
            if (e.evt.button === 0 && scale.x < 3) {
                setScale({
                    x: scale.x + 0.25,
                    y: scale.y + 0.25
                })
                dispatch(scaleChange(scale.x + 0.25))
            }
            if (e.evt.button === 2 && e.type === 'contextmenu' && scale.x > 0.25) {
                e.evt.preventDefault()
                //   e.evt.defaultPrevented=false
                setScale({
                    x: scale.x - 0.25,
                    y: scale.y - 0.25
                })
                dispatch(scaleChange(scale.x - 0.25))
            }

        }

    }

    const fillShape = async (e: any) => {

        if (brush.brushSettings.brushType === 'fillBucket') {

            //изменение свойства fill в массиве
            let upadatedStyle = lineStyle.map((item: any) => {
                if (item.id === lineStyle[e.target.index].id) {
                    return {
                        id: item.id,
                        color: brush.brushSettings.color,
                        brushType: item.brushType,
                        strokeWidth: item.strokeWidth,
                        fill: brush.brushSettings.color
                    }
                } else {
                    return item
                }

            })

            setStyle(upadatedStyle)
        }
        dispatch(changeUri(stageRef.current.toDataURL()))//изменение ссылки для скачивания картинки после заливки фигуры
    }


    const handleMouseDown = (e: any) => {


        changeScale(e) //нажатие левой кнопки мыши

        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();

        setCurrentLine({
            points: [pos.x / scale.x, pos.y / scale.y],
            firstPoint: [pos.x, pos.y],
            brushStyle: {
                strokeWidth: 5,
                color: brush.brushSettings.color,
                brushType: brush.brushSettings.brushType
            }
        })



    };

    const handleMouseMove = (e: any) => {




        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        const [x0, y0] = currentLine.firstPoint;


        if (brush.brushSettings.brushType === 'line') {

            setCurrentLine({
                points: [x0 / scale.x, y0 / scale.y, point.x / scale.x, point.y / scale.y],
                firstPoint: [x0, y0]
            })

        } else if (brush.brushSettings.brushType === 'rectangle') {
            setCurrentLine({
                // points: [x0 / scale.x, y0 / scale.y, point.x / scale.x, y0 / scale.y, point.x / scale.x, point.y / scale.y, x0 / scale.x, point.y / scale.y, x0 / scale.x, y0 / scale.y],
                points: [x0 / scale.x, y0 / scale.y, point.x / scale.x - x0 / scale.x, point.y / scale.x - y0 / scale.y],
                firstPoint: [x0, y0]
            })
        } else if (brush.brushSettings.brushType === 'ellipse') {
            setCurrentLine({
                points: [x0 / scale.x + ((point.x / scale.x - x0 / scale.x) / 2), y0 / scale.y + ((point.y / scale.y - y0 / scale.y) / 2), Math.abs((x0 / scale.x - point.x / scale.x) / 2), Math.abs((y0 / scale.y - point.y / scale.y) / 2)],
                //так как для правильной работы овала нужно высчитывать значение x и y, то значения x0 и y0 будут постоянно менятся из-за чего овал будет неправильно выводится
                firstPoint: [x0, y0]
            })
        } else if (brush.brushSettings.brushType === 'star') {
            setCurrentLine({
                points: [x0 / scale.x + ((point.x / scale.x - x0 / scale.x) / 2), y0 / scale.y + ((point.y / scale.y - y0 / scale.y) / 2), Math.abs(x0 / scale.x - point.x / scale.x), Math.abs(y0 / scale.y - point.y / scale.y)],
                firstPoint: [x0, y0]
            })
        } else if (brush.brushSettings.brushType === 'eraser') {
            setCurrentLine({
                points: [...currentLine.points].concat([point.x / scale.x, point.y / scale.y]),
                firstPoint: [x0, y0]
            })
        }
        else {
            if (brush.brushSettings.brushType != 'loupe' && brush.brushSettings.brushType != 'fillBucket') {
                setCurrentLine({
                    points: [...currentLine.points].concat([point.x / scale.x, point.y / scale.y]),
                    firstPoint: [x0, y0]
                })
            }

        }
    };

    const handleMouseUp = () => {

        dispatch(changeUri(stageRef.current.toDataURL())) //изменение ссылки для скачивания картинки

        if (brush.brushSettings.brushType !== 'fillBucket') {


            setStyle([...lineStyle, {
                id: Date.now(),
                color: brush.brushSettings.color,
                brushType: brush.brushSettings.brushType,
                strokeWidth: brush.brushSettings.strokeWidth,
                fill: null
            }]);
            setLines([...lines, currentLine.points]);
            isDrawing.current = false;
            setCurrentLine({   //используется для того, чтобы при использовании фигуры квадрат, не использовались точки которые были до этого
                points: [0, 0, 0, 0]
            })
        }

    };





    return (
        <div className="canvas">
            <Stage
                ref={stageRef}
                width={(size.width - 18) * scale.x}
                height={(size.height - 100) * scale.y}
                onMouseDown={(e) => handleMouseDown(e)}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onContextMenu={changeScale}
                onClick={fillShape}
                scaleX={scale.x}
                scaleY={scale.y}
            >


                <Layer >

                    {lines.map((line: any, i: any) => (

                        lineStyle[i].brushType === 'line' ? // +квадрат, так как он рисуется с помощью line
                            < Line
                                key={i}
                                points={line}
                                strokeWidth={lineStyle[i].strokeWidth}
                                stroke={lineStyle[i].color}
                                onClick={fillShape}
                            /> :
                            lineStyle[i].brushType === 'rectangle' ?
                                <Rect
                                    x={lines[i][0]}
                                    y={lines[i][1]}
                                    width={lines[i][2]}
                                    height={lines[i][3]}
                                    stroke={lineStyle[i].color}
                                    fill={lineStyle[i].fill}
                                    strokeWidth={lineStyle[i].strokeWidth}
                                    onClick={fillShape}
                                /> :
                                lineStyle[i].brushType === 'ellipse' ?
                                    <Ellipse
                                        x={line[0]}
                                        y={line[1]}
                                        radiusX={line[2]}
                                        radiusY={line[3]}
                                        fill={lineStyle[i].fill}
                                        stroke={lineStyle[i].color}
                                        strokeWidth={lineStyle[i].strokeWidth}
                                        onClick={fillShape}
                                    /> :
                                    lineStyle[i].brushType === 'star' ?
                                        <Star
                                            x={line[0]}
                                            y={line[1]}
                                            numPoints={5}
                                            innerRadius={line[2]}
                                            outerRadius={line[3]}
                                            fill={lineStyle[i].fill}
                                            stroke={lineStyle[i].color}
                                            strokeWidth={lineStyle[i].strokeWidth}
                                            onClick={fillShape}
                                        /> :
                                        < Line
                                            key={i}
                                            points={line}
                                            strokeWidth={lineStyle[i].strokeWidth}
                                            stroke={lineStyle[i].brushType === 'eraser' ? 'white' : lineStyle[i].color}
                                        // globalCompositeOperation={lineStyle[i].brushType !== 'eraser' ? 'source-out' : 'destination-out'}
                                        />


                    ))}
                </Layer>

                <Layer>


                    {brush.brushSettings.brushType === 'ellipse' ?
                        <Ellipse
                            x={currentLine.points[0]}
                            y={currentLine.points[1]}
                            radiusX={currentLine.points[2]}
                            radiusY={currentLine.points[3]}

                            stroke={brush.brushSettings.color}
                            strokeWidth={brush.brushSettings.strokeWidth}
                        /> :
                        brush.brushSettings.brushType === 'rectangle' ?
                            <Rect
                                x={currentLine.points[0]}
                                y={currentLine.points[1]}
                                width={currentLine.points[2]}
                                height={currentLine.points[3]}
                                stroke={brush.brushSettings.color}
                                strokeWidth={brush.brushSettings.strokeWidth}
                            /> :
                            brush.brushSettings.brushType === 'star' ?
                                <Star
                                    x={currentLine.points[0]}
                                    y={currentLine.points[1]}
                                    numPoints={5}
                                    innerRadius={currentLine.points[2]}
                                    outerRadius={currentLine.points[3]}
                                    stroke={brush.brushSettings.color}
                                    strokeWidth={brush.brushSettings.strokeWidth}
                                /> :
                                brush.brushSettings.brushType === 'line' ?
                                    <Line
                                        {...currentLine}
                                        strokeWidth={brush.brushSettings.strokeWidth}
                                        stroke={brush.brushSettings.color}
                                    /> :
                                    < Line {...currentLine} strokeWidth={brush.brushSettings.strokeWidth}
                                        stroke={brush.brushSettings.brushType === 'eraser' ? 'white' : brush.brushSettings.color}
                                    // globalCompositeOperation={'source-over'}
                                    />
                        // <Circle x={currentLine.points[0]} y={currentLine.points[1]} radius={currentLine.points[2]} fill="white" stroke={'black'} strokeWidth={3} lineJoin={'round'} /> :



                    }

                </Layer>
            </Stage>

        </div>
    );
}