import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../ComponentsCss/Navbar.css'
import { canvasSettings, changeBrush, changeColor, changeStrokeWidth } from '../Redux/Reducers/CanvasReducers'
import CSS from 'csstype';
import { uriSettings } from '../Redux/Reducers/UriReducer';
import { clearPage } from '../Redux/Reducers/linesReducer';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export const Navbar: React.FC = () => {

    const dispatch = useDispatch();
    const brush = useSelector(canvasSettings)
    const uriRedux = useSelector(uriSettings)

    let tipAreaStyle = {
        height: '43px',
        width: '43px',
        background: brush.brushSettings.color,
    }

    let style: CSS.Properties = {
        visibility: 'hidden'
    }

    const [modalVisible, setVisible] = useState(style)


    const downloadURI = (uri: any, name: any) => {
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleExport = () => {
        console.log(uriRedux.link.uri)
        if (uriRedux.link.uri != '') {
            const uri = uriRedux.link.uri;
            downloadURI(uri, 'stage.png');
        }

    };


    return (
        //style прописывается прямо в теге, чтобы навбар при уменьшении масштаба не изменялся
        <div className="toolKit" style={{ minWidth: window.innerWidth - 18 }}>
            <div className="colors">
                <div className="itemsContainer">
                    <div className="colorItem red" onClick={() => dispatch(changeColor('red'))}></div>
                    <div className="colorItem orange" onClick={() => dispatch(changeColor('orange'))}></div>
                    <div className="colorItem yellow" onClick={() => dispatch(changeColor('yellow'))}></div>
                    <div className="colorItem green" onClick={() => dispatch(changeColor('green'))}></div>
                    <div className="colorItem blue" onClick={() => dispatch(changeColor('blue'))}></div>
                    <div className="colorItem indigo" onClick={() => dispatch(changeColor('indigo'))}></div>
                    <div className="colorItem purple" onClick={() => dispatch(changeColor('purple'))}></div>
                    <div className="colorItem brown" onClick={() => dispatch(changeColor('brown'))}></div>
                    <div className="colorItem black" onClick={() => dispatch(changeColor('black'))}></div>
                    <div className="colorItem pink" onClick={() => dispatch(changeColor('pink'))}></div>
                </div>
                <div className="sectionName"><p>Цвет</p></div>
            </div>


            <div className="tools">
                <div className="itemsContainer">
                    <div className="toolItem eraser" onClick={() => dispatch(changeBrush('eraser'))}>
                        <svg className="eraserIcon icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920">
                            <path className="st0" d="M1137.2 321.6l475.3 475.3-123 123-475.3-475.3 123-123zm-738.1 738.1L874.4 1535l615-615-475.3-475.3-615 615zm-3 3l-84.3 84.3c-67.5 67.5-67.5 176.9 0 244.3l230.9 230.9c67.5 67.5 176.9 67.5 244.4 0l84.3-84.3-475.3-475.2z" id="Layer_6" />
                            <g id="STROKES">
                                <path className="st1" d="M1014.1 444.6l123.1-123 475.2 475.3-123 123-615 615-475.3-475.2z" />
                                <path className="st1" d="M396.1 1062.7L871.4 1538l-84.3 84.3c-67.5 67.5-176.9 67.5-244.4 0l-230.9-230.9c-67.5-67.5-67.5-176.9 0-244.3l84.3-84.4z" />
                                <path className="st1" d="M1489.4 919.9l-475.3-475.3" />
                                <path className="st1" d="M960 1703.1h553" />
                                <path className="st1" d="M1049.6 1600.5h553" />
                                <path className="st1" d="M1142.6 1494.1h552.9" />
                            </g>
                        </svg>
                    </div>

                    <div className="toolItem pencil" onClick={() => dispatch(changeBrush('pencil'))}>
                        <svg className="pencilIcon icon" id="edit" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="32px" height="25px"><path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path></svg>
                    </div >

                    <div className="toolItem fillBucket" onClick={() => dispatch(changeBrush('fillBucket'))}>
                        <svg className="fillBucketIcon icon" id="Flat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                            <path d="M218.68652,124a13.90644,13.90644,0,0,0-4.10156-9.89941l-84.68555-84.687a14.01851,14.01851,0,0,0-19.79882.00049l-30.104,30.104-25.897-25.897a5.99971,5.99971,0,0,0-8.48438,8.48536L71.51184,68.00293,17.415,122.1001a13.99784,13.99784,0,0,0,0,19.79931l84.68555,84.68653v.00049a14.01792,14.01792,0,0,0,19.79882-.00049l92.68555-92.686A13.90841,13.90841,0,0,0,218.68652,124Zm-12.58593,1.41406L113.415,218.1001a2.00341,2.00341,0,0,1-2.83008,0v.00049l-84.68555-84.687a1.99869,1.99869,0,0,1,0-2.82763L79.997,76.48828l25.87512,25.875a25.99759,25.99759,0,0,0,40.5127,32.02734l.001-.00048a26.00281,26.00281,0,0,0-32.03491-40.51783L88.48169,68.00317,118.585,37.8999a2.0043,2.0043,0,0,1,2.83008-.00049l84.68555,84.687a1.99869,1.99869,0,0,1,0,2.82763ZM128,102.00586a13.99976,13.99976,0,1,1-9.90039,4.10059A13.90621,13.90621,0,0,1,128,102.00586Zm104.24316,49.752a6.00017,6.00017,0,0,0-8.48632,0C222.86816,152.64648,202,173.77637,202,196a26,26,0,0,0,52,0C254,173.77637,233.13184,152.64648,232.24316,151.75781ZM228,210a14.01572,14.01572,0,0,1-14-14c0-11.89209,8.60937-24.3208,14-30.937,5.3916,6.61767,14,19.04492,14,30.937A14.01572,14.01572,0,0,1,228,210Z" />
                        </svg>
                    </div>

                    <div className="toolItem loupe" onClick={() => dispatch(changeBrush('loupe'))}>
                        <svg className="loupeIcon icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512">
                            <g>
                                <g>
                                    <path d="m304.7,10.9c-108.5,0-196.4,87.9-196.4,196.4 0,46.9 16.4,89.9 43.8,123.7l-135,135c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l135-135c33.8,27.4 76.8,43.8 123.7,43.8 108.5,0 196.4-87.9 196.4-196.4s-88-196.4-196.4-196.4zm0,352c-85.9,0-155.6-69.7-155.6-155.6 0-85.9 69.7-155.6 155.6-155.6 85.9,0 155.6,69.7 155.6,155.6 5.68434e-14,85.9-69.7,155.6-155.6,155.6z" />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="sectionName"><p>Инструменты</p></div>
            </div >


            <div className="figures" >
                <div className="itemsContainer">

                    <div className="figureItem line" onClick={() => dispatch(changeBrush('line'))}>
                        <svg className="lineIcon icon" width="28" height="46" viewBox="0 0 28 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line id="line" x1="1.6902" y1="45.269" x2="26.0585" y2="1.60907" stroke="black" stroke-width="3" />
                        </svg>
                    </div>

                    <div className="figureItem rectangle" onClick={() => dispatch(changeBrush('rectangle'))}>
                        <svg className="rectangleIcon icon" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect id="rectangle" x="0.5" y="0.5" width="49" height="49" fill="#ECE3E2" stroke="black" />
                        </svg>
                    </div>

                    <div className="figureItem ellipse" onClick={() => dispatch(changeBrush('ellipse'))}>
                        <svg className="ellipseIcon icon" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle id="circle" cx="25" cy="25" r="24.5" fill="#ECE3E2" stroke="black" />
                        </svg>
                    </div>

                    <div className="figureItem star" onClick={() => dispatch(changeBrush('star'))}>
                        <svg className="starIcon icon" width="50" height="50" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="star" d="M24 1.61804L29.1373 17.4291L29.2496 17.7746H29.6129H46.2376L32.7879 27.5463L32.494 27.7599L32.6063 28.1054L37.7436 43.9164L24.2939 34.1446L24 33.9311L23.7061 34.1446L10.2564 43.9164L15.3937 28.1054L15.506 27.7599L15.2121 27.5463L1.76243 17.7746H18.3871H18.7504L18.8627 17.4291L24 1.61804Z" fill="#ECE3E2" stroke="black" />
                        </svg>
                    </div>
                </div>
                <div className="sectionName"><p>Фигуры</p></div>
            </div>


            <div className="lineWeight" onClick={() => {
                modalVisible.visibility === 'hidden' ?
                    setVisible({ visibility: 'visible' }) :
                    setVisible({ visibility: 'hidden' })
            }}>
                <div className="lineWeightConteiner">
                    <svg width="60" height="60" viewBox="0 0 179 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="8" y1="24" x2="170" y2="24" stroke="black" stroke-width="2" />
                        <line x1="9" y1="98.5" x2="171" y2="98.5" stroke="black" stroke-width="7" />
                        <line x1="9" y1="62" x2="171" y2="62" stroke="black" stroke-width="4" />
                    </svg>
                </div>

                <div className="sectionName"><p>Толщина</p></div>

                <div className="modalLineWeight" style={modalVisible}>
                    <p>Выберите толщину:</p>

                    <div className="modalLine" onClick={() => dispatch(changeStrokeWidth(1))}>
                        <svg className="tipLine" width="162" height="2" viewBox="0 0 162 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="1" x2="162" y2="1" stroke="black" stroke-width="2" />
                        </svg>
                    </div>

                    <div className="modalLine" onClick={() => dispatch(changeStrokeWidth(3))}>
                        <svg className="tipLine" width="162" height="4" viewBox="0 0 162 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="2" x2="162" y2="2" stroke="black" stroke-width="4" />
                        </svg>
                    </div>

                    <div className="modalLine" onClick={() => dispatch(changeStrokeWidth(5))}>
                        <svg className="tipLine" width="162" height="7" viewBox="0 0 162 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="3.5" x2="162" y2="3.5" stroke="black" stroke-width="7" />
                        </svg>
                    </div>

                </div>
            </div>





            <div className="tipArea">
                <div className="colorItems">
                    <div className="currentColor" style={tipAreaStyle}></div>
                    <div><p className="colorP">Цвет</p></div>
                </div>

                <div className="brushSettings">
                    <div className="shortInfo">
                        <p>Кисть:{brush.brushSettings.brushType}</p>
                        <p>Толщина:{brush.brushSettings.strokeWidth}</p>
                        <p>Масштаб:{brush.brushSettings.scale}</p>
                    </div>

                    <div className="navButtons">
                        <OverlayTrigger
                            key='bottom'
                            placement='bottom'
                            overlay={
                                <Tooltip id='tooltip-bottom'>
                                    Сохранить картинку
                             </Tooltip>
                            }
                        >
                            <Button
                                className="navBtn"
                                variant="primary"
                                size="sm"
                                onClick={handleExport}
                            >Скачать</Button>
                        </OverlayTrigger>
                        <Button
                            className="navBtn"
                            variant="primary"
                            size="sm"
                            onClick={() => dispatch(clearPage(true))}
                        >очистить холст</Button>
                        
                    </div>


                </div>
            </div>

        </div >
    )
}

