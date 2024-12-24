import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import { obtenerDatosAleatorios } from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import Calendario2Anual from '../components/Calendario2Anual';
// import dereck from '../assets/img/calendar/dereck.png';
import dereckAcostado from '../assets/img/calendar/dereckAcostado.png';
// import thor from '../assets/img/calendar/Thor.png';
import thorAcostado from '../assets/img/calendar/thorAcostado.png';
// import thorMirando from '../assets/img/calendar/thorMirando.png';

interface ContextType {
    viewMode: '1' | '2' | '3' | '4';
    rowView: boolean;
    distribucion: boolean;
    darkMode: boolean;
    screenType: string;
    isTodayAndPast: boolean;
}

interface CalendarioData {
    imagen: { id: number; tituloImagen: string; ruta: string; direction: string; style: string };
    mensaje: { id: number; message: string; tituloMensaje: string; clasificacion: string };
}

// const generarCalendario = (mes: number, anio: number) => {
//     const diasEnMes = new Date(anio, mes + 1, 0).getDate();
//     let primerDiaSemana = new Date(anio, mes, 1).getDay(); // Domingo (0) a Sábado (6)
//     primerDiaSemana = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1; // Ajuste para que lunes sea 0 y domingo sea 6

//     const calendario = [];
//     let dia = 1;

//     for (let semana = 0; dia <= diasEnMes; semana++) {
//         const fila = [];
//         for (let i = 0; i < 7; i++) {
//             if (semana === 0 && i < primerDiaSemana) {
//                 fila.push(null); // Espacios vacíos antes del primer día del mes
//             } else if (dia > diasEnMes) {
//                 fila.push(null); // Espacios vacíos después del último día del mes
//             } else {
//                 fila.push(dia++);
//             }
//         }
//         calendario.push(fila);
//     }
//     return calendario;
// };

const rendererImagenes = (images: CalendarioData[], screenType: string) => {
    const imagesUniques = Array.from(new Set(images.map(img => img.imagen.ruta))).slice(0, 3);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    useEffect(() => {

        switch (screenType) {
            case 'mobile':
                setImageWidth(100)
                setImageHeight(100)
                break;

            case 'tablet':
                setImageWidth(200)
                setImageHeight(200)
                break;

            case 'laptop':
                setImageWidth(300)
                setImageHeight(300)
                break;

            case 'television':
                setImageWidth(300)
                setImageHeight(300)
                break;

            default:
                setImageWidth(100)
                setImageHeight(100)

        }
    }, [screenType])

    return (
        <div className="d-flex justify-content-around align-items-center flex-wrap">
            {imagesUniques.map((ruta, index) => {

                console.log(index);

                return (
                    <div className='d-flex justify-content-end' style={{}}>
                        {
                            index == 2 &&
                            <>
                                {/* <img src={thorMirando} alt="logo-minera" style={{ width: "30%"}} /> */}
                            </>
                        }
                        <div
                            key={index}
                            className="column"
                            style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", paddingBlock: 20, background: "lightgrey", borderRadius: 10, paddingInline: "10px" }}
                        >
                            <img
                                src={ruta}
                                alt={`Imagen ${index + 1}`}
                                style={{ width: `${imageWidth}px`, height: `${imageHeight}px`, objectFit: 'cover', marginBlock: '5px' }}
                            />
                            <FontAwesomeIcon
                                icon={faSolidHeart}
                                className="text-danger"
                                style={{ fontSize: 40, paddingTop: 10 }}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

const CalendarioGeneralPage: React.FC = () => {
    const [anioActual, setAnioActual] = useState<number>(2025);
    // const [calendarioSize, setCalendarioSize] = useState<number>(100);
    const { distribucion, darkMode, screenType } = useOutletContext<ContextType>();
    const [calendariosPorAnio, setCalendariosPorAnio] = useState<{ [key: number]: CalendarioData[] }>({});
    const [isMobile, setIsMobile] = useState(false);
    // const [mesActual, setMesActual] = useState(new Date().getMonth());
    // const mesActual = new Date().getMonth();

    useEffect(() => {
        const precargarAnios = () => {
            const nuevosDatos: { [key: number]: CalendarioData[] } = {};
            for (let anio = 2015; anio < 2036; anio++) {
                nuevosDatos[anio] = obtenerDatosAleatorios(12);
            }
            setCalendariosPorAnio(nuevosDatos);
        };

        precargarAnios();
    }, []);

    useEffect(() => {
        switch (screenType) {
            case 'mobile':
            case 'tablet':
                setIsMobile(true);
                break;
            default:
                setIsMobile(false);
        }
        console.log(isMobile);

    }, [screenType]);

    // const diasSemana = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setCalendarioSize(parseInt(e.target.value, 10));
    // };

    const cambiarAnio = (incremento: number) => {
        setAnioActual((prevAnio) => prevAnio + incremento);
    };

    // const calcularTamaño = (valor: number): number => {
    //     switch (true) {
    //         case valor <= 75:
    //             return 50;
    //         case valor <= 125:
    //             return 100;
    //         default:
    //             return 150;
    //     }
    // };

    // const renderMes = (mes: string, index: number) => {
    //     const calendario = generarCalendario(index, anioActual);
    //     const fontSizeDay = isMobile ? 12 : 15;
    //     const paddingMes = isMobile ? 10 : 20;

    //     return (
    //         <Col
    //             key={index}
    //             xs={12}
    //             sm={6}
    //             md={4}
    //             className="mb-4"
    //             style={{ padding: `${paddingMes}px` }}
    //         >
    //             <div className="calendario border text-center p-2 rounded">
    //                 <h6 className="fw-bold text-danger">{mes}</h6>
    //                 <div className="text-muted">
    //                     <div className="d-flex justify-content-between fw-bold mb-2">
    //                         {diasSemana.map((dia, i) => (
    //                             <span key={i} style={{ width: '14%' }}>{dia}</span>
    //                         ))}
    //                     </div>
    //                     {calendario.map((semana, i) => (
    //                         <div key={i} className="d-flex justify-content-between">
    //                             {semana.map((dia, j) => (
    //                                 <span key={j} style={{ width: '14%', fontSize: fontSizeDay }}>
    //                                     {dia || ''}
    //                                 </span>
    //                             ))}
    //                         </div>
    //                     ))}
    //                 </div>
    //             </div>
    //         </Col>
    //     );
    // };

    // const obtenerFilaActual = () => {
    //     const cantidad = parseInt(viewMode, 10);
    //     const inicio = (mesActual - Math.floor(cantidad / 2) + 12) % 12;
    //     return [...Array(cantidad)].map((_, i) => (inicio + i) % 12);
    // };

    const datosCalendario = calendariosPorAnio[anioActual] || [];

    return (
        <div className="pt-5 pb-5">
            <div className="calendario-general">
                <Card className="p-3 shadow-sm">


                    <div className="d-flex justify-content-between mb-4 mt-3">
                        <Button variant="outline-light" className='btn btn-primary' onClick={() => cambiarAnio(-1)}>- Año Anterior</Button>
                        <Button variant="outline-light" className='btn btn-primary' onClick={() => cambiarAnio(1)}>+ Año Siguiente</Button>
                    </div>

                    <div className="header text-center mb-3">
                        <h2>Por un {anioActual}</h2>
                        <h3>juntos mi amor ❤️</h3>
                    </div>

                    {/* <div className="d-flex justify-content-center">

                        <Form className="my-4 w-50">
                            <Form.Label className="fw-bold">Tamaño del Calendario</Form.Label>
                            <Form.Range
                                min={50}
                                max={150}
                                step={10}
                                value={calendarioSize}
                                onChange={handleSizeChange}
                                style={{
                                    accentColor: '#FF4D4F',
                                    background: `linear-gradient(90deg, #FF4D4F ${(calendarioSize - 50) / 100 * 100}%, #E0E0E0 ${(calendarioSize - 50) / 100 * 100}%)`,
                                    borderRadius: '10px',
                                    height: '8px',
                                }}
                            />
                        </Form>
                    </div> */}

                    <div className="mb-4">
                        {rendererImagenes(calendariosPorAnio[anioActual] || [], screenType)}
                    </div>

                    <div className="header text-center  justify-content-around d-flex align-items-center" >
                        <img src={thorAcostado} alt="logo-minera" style={{ width: "20%", paddingBottom: 10 }} />
                        <h1>Camila ❤️ Isaias</h1>
                        <img src={dereckAcostado} alt="logo-minera" style={{ width: "20%", paddingBottom: 10 }} />
                    </div>

                    <Row>
                        {datosCalendario.map((data, index) => (
                            <Col key={index} xs={12 / 3}>
                                <Calendario2Anual
                                    diaEspecial={12}
                                    mesAniversario={6}
                                    mesEspecial={meses[index]}
                                    mesMostrar={index}
                                    anioMostrar={anioActual}
                                    imagen={data.imagen}
                                    mensaje={data.mensaje}
                                    distribucion={distribucion}
                                    darkMode={darkMode}
                                    viewMode={"3"}
                                    screenType={screenType}
                                />
                            </Col>
                        ))}
                    </Row>

                    <div className="d-flex justify-content-between mb-4 mt-3">
                        <Button variant="outline-light" className='btn btn-primary' onClick={() => cambiarAnio(-1)}>- Año Anterior</Button>
                        <Button variant="outline-light" className='btn btn-primary' onClick={() => cambiarAnio(1)}>+ Año Siguiente</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default CalendarioGeneralPage;
