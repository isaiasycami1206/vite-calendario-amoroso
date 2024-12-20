import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import { obtenerDatosAleatorios } from '../api/api';
import Calendario from '../components/Calendario';

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

const HomePage: React.FC = () => {
    const { viewMode, rowView, distribucion, darkMode, screenType, isTodayAndPast } = useOutletContext<ContextType>();
    const [calendariosPorAnio, setCalendariosPorAnio] = useState<{ [key: number]: CalendarioData[] }>({});
    const [mesActual, setMesActual] = useState(new Date().getMonth());
    const [anioActual, setAnioActual] = useState(new Date().getFullYear());
    // const [distribucion, setDistribucion] = useState(true);

    useEffect(() => {
        const precargarAnios = () => {
            const nuevosDatos: { [key: number]: CalendarioData[] } = {};
            for (let anio = 2015; anio <= 2035; anio++) {
                nuevosDatos[anio] = obtenerDatosAleatorios(12);
            }
            setCalendariosPorAnio(nuevosDatos);
        };

        precargarAnios();
    }, []);

    const cambiarMes = (direccion: 'anterior' | 'siguiente') => {
        setMesActual((prev) => {
            let nuevoMes = direccion === 'anterior' ? prev - 1 : prev + 1;
            let nuevoAnio = anioActual;

            if (nuevoMes < 0) {
                nuevoMes = 11;
                nuevoAnio -= 1;
                if (nuevoAnio >= 2015) {
                    setAnioActual(nuevoAnio);
                }
            } else if (nuevoMes > 11) {
                nuevoMes = 0;
                nuevoAnio += 1;
                if (nuevoAnio <= 2030) {
                    setAnioActual(nuevoAnio);
                }
            }

            return nuevoMes;
        });
    };

    const cambiarYear = (direccion: 'anterior' | 'siguiente') => {
        let nuevoAnio = anioActual;

        if (nuevoAnio > 2015 && direccion == "anterior") {
            nuevoAnio -= 1;
            setAnioActual(nuevoAnio);
            return
        }
        if (nuevoAnio <= 2035 && direccion == "siguiente") {
            nuevoAnio += 1;
            setAnioActual(nuevoAnio);
        }
    };

    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const obtenerFilaActual = () => {
        const cantidad = parseInt(viewMode, 10);
        const inicio = (mesActual - Math.floor(cantidad / 2) + 12) % 12;
        return [...Array(cantidad)].map((_, i) => (inicio + i) % 12);
    };

    const datosCalendario = calendariosPorAnio[anioActual] || [];

    return (
        <Card className={"pt-4 pb-4 shadow border-0 "} >
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">

                    {
                        rowView
                            ?
                            <>
                                <Button
                                    onClick={() => cambiarYear('anterior')}
                                    disabled={anioActual === 2015 && mesActual === 0}
                                    style={{paddingInline: 5}}
                                >
                                    &lt;{screenType !== "mobile" ? "Año Anterior" : "Anterior "}
                                </Button>

                                <h3>{anioActual}</h3>

                                <Button
                                    onClick={() => cambiarYear('siguiente')}
                                    disabled={anioActual === 2035 && mesActual === 11}
                                    style={{paddingInline: 5}}
                                >
                                    {screenType !== "mobile" ? "Año Siguiente" : "Siguiente "}&gt;
                                </Button>
                            </>
                            :
                            <>
                                <Button
                                    onClick={() => cambiarMes('anterior')}
                                    disabled={anioActual === 2015 && mesActual === 0}
                                    style={{paddingInline: 5}}
                                >
                                    &lt;{screenType !== "mobile" ? "Mes Anterior" : "Anterior "}

                                </Button>

                                <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: "column" }}>

                                    <h3 style={{ paddingRight: 5 }}> {meses[mesActual]} </h3>
                                    <h3>{anioActual}</h3>
                                </div>

                                <Button
                                    onClick={() => cambiarMes('siguiente')}
                                    disabled={anioActual === 2035 && mesActual === 11}
                                    style={{paddingInline: 5}}
                                >
                                    {screenType !== "mobile" ? "Mes Siguiente" : "Siguiente "}&gt;
                                </Button>
                            </>

                    }

                </div>

                <Row>
                    {rowView && datosCalendario.map((data, index) => (
                        <Col key={index} xs={12 / parseInt(viewMode, 10)}>
                            <Calendario
                                diaEspecial={12}
                                mesAniversario={6}
                                mesEspecial={meses[index]}
                                diaActual={new Date().getDate()}
                                mesMostrar={index}
                                anioMostrar={anioActual}
                                imagen={data.imagen}
                                mensaje={data.mensaje}
                                distribucion={distribucion}
                                darkMode={darkMode}
                                viewMode={viewMode}
                                screenType={screenType}
                                isTodayAndPast={isTodayAndPast}
                            />
                        </Col>
                    ))}

                    {!rowView && obtenerFilaActual().map((indice, pos) => {
                        let data = calendariosPorAnio[anioActual]?.[indice];
                        let anioMostrar = anioActual;

                        // console.log("viewMode", viewMode);

                        if (parseInt(viewMode) !== 1) {

                            // Manejo de condiciones especiales
                            if (pos === 2 && indice === 0) {
                                // Caso 10, 11, 0: Mes 0 del siguiente año
                                anioMostrar = anioActual + 1;
                                data = calendariosPorAnio[anioMostrar]?.[0];
                            } else if (pos === 0 && indice === 11) {
                                // Caso 11, 0, 1: Mes 11 del año anterior
                                anioMostrar = anioActual - 1;
                                data = calendariosPorAnio[anioMostrar]?.[11];
                            }
                        }

                        if (!data || !data.imagen || !data.mensaje) return null;

                        // console.log(`Imprimiendo mes ${indice} del año ${anioMostrar}`);

                        return (
                            <Col key={`${anioMostrar}-${indice}`} xs={12 / parseInt(viewMode, 10)}>
                                <Calendario
                                    diaEspecial={12}
                                    mesAniversario={6}
                                    mesEspecial={meses[indice]}
                                    diaActual={new Date().getDate()}
                                    mesMostrar={indice}
                                    anioMostrar={anioMostrar}
                                    imagen={data.imagen}
                                    mensaje={data.mensaje}
                                    distribucion={distribucion}
                                    darkMode={darkMode}
                                    viewMode={viewMode}
                                    screenType={screenType}
                                    isTodayAndPast={isTodayAndPast}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Card.Body>
        </Card>
    );
};

export default HomePage;
