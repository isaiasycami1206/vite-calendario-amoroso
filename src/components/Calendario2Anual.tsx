import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import '../assets/css/CalendarioAnual.css';

interface CalendarioProps {
    diaEspecial: number;
    mesAniversario: number;
    mesEspecial: string;
    mesMostrar: number;
    anioMostrar: number;
    distribucion: boolean;
    darkMode: boolean;
    viewMode: string;
    screenType: string;
    imagen: {
        id: number;
        tituloImagen: string;
        ruta: string;
        style: string;
        direction: string
    };
    mensaje: {
        id: number;
        message: string;
        tituloMensaje: string;
        clasificacion: string;
    };
}

const Calendario2Anual: React.FC<CalendarioProps> = ({
    diaEspecial,
    mesAniversario,
    mesEspecial,
    mesMostrar,
    anioMostrar,
    distribucion,
    darkMode,
    viewMode,
    screenType,
}) => {
    const [tooltip, setTooltip] = useState<string | null>(null);
    // const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {

        // switch (screenType) {
        //     case 'mobile':
        //         setIsMobile(true)
        //         break;

        //     case 'tablet':
        //         setIsMobile(true)
        //         break;

        //     default:
        //         setIsMobile(false)

        // }
    }, [screenType])

    // Genera un calendario de días para un mes y un año
    const generarCalendario = (mes: number, anio: number) => {
        const diasEnMes = new Date(anio, mes + 1, 0).getDate();
        let primerDiaSemana = new Date(anio, mes, 1).getDay(); // Domingo (0) a Sábado (6)
        primerDiaSemana = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1; // Ajuste para que lunes sea 0 y domingo sea 6

        const calendario = [];
        let dia = 1;

        for (let semana = 0; dia <= diasEnMes; semana++) {
            const fila = [];
            for (let i = 0; i < 7; i++) {
                if (semana === 0 && i < primerDiaSemana) {
                    fila.push(null); // Espacios vacíos antes del primer día del mes
                } else if (dia > diasEnMes) {
                    fila.push(null); // Espacios vacíos después del último día del mes
                } else {
                    fila.push(dia++);
                }
            }
            calendario.push(fila);
        }
        return calendario;
    };

    const calendario = generarCalendario(mesMostrar, anioMostrar);

    const getDayClassAndIcon = (
        dia: number | null
    ) => {
        const clases = ["calendar-day", "text-center", "flex-grow-1"];
        let icono = null;

        // Día especial
        if (dia === diaEspecial) {
            clases.push("special");
            icono = mesMostrar === parseInt(mesEspecial) ? "faSolidHeart" : "faRegularHeart";
        }

        return { clases: clases.join(" "), icono };
    };

    const getStyleHeart = (): React.CSSProperties => {
        let style: React.CSSProperties = {};

        // Día pasado
        if (screenType == "mobile") {

            switch (viewMode) {
                case "1":
                    style = { bottom: "-8px", left: "-3px", fontSize: 25 };
                    break;

                case "2":
                    style = { bottom: "-12px", left: "6px" };
                    break;
                case "3":
                    style = { bottom: "-4px", left: "0px", fontSize: 21  };
                    break;

                default:
                    break;
            }
        } else {
            switch (viewMode) {
                case "1":
                    style = { bottom: "-10px", left: "10px", fontSize: 28 };
                    break;

                case "2":
                    style = { bottom: "-12px", left: "7px" };
                    break;

                case "3":
                    style = { bottom: "-16px", left: "8px" };
                    break;

                default:
                    break;
            }
        }


        return style;
    };

    const calcularTiempoRestante = (diaEspecial: Date, diaActual: Date): string => {
        const diferencia = diaEspecial.getTime() - diaActual.getTime();
        if (diferencia <= 0) return "El día especial ya llegó";

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const meses = Math.floor(dias / 30);
        const años = Math.floor(meses / 12);

        const diasRestantes = dias % 30;
        const mesesRestantes = meses % 12;

        const partes: string[] = [];
        if (años > 0) partes.push(`${años} ${años === 1 ? 'año' : 'años'}`);
        if (mesesRestantes > 0) partes.push(`${mesesRestantes} ${mesesRestantes === 1 ? 'mes' : 'meses'}`);
        if (diasRestantes > 0) partes.push(`${diasRestantes} ${diasRestantes === 1 ? 'día' : 'días'}`);

        return partes.join(', ');
    };

    const getDivStyles = (
        distribucion: boolean,
        screenType: string,
    ): { className: string; style: React.CSSProperties } => {
        const className = "";

        // console.log("screenType" , screenType);

        const style: React.CSSProperties = distribucion
            ? {
                display: "flex",
                paddingLeft: screenType === "mobile" ? 10 : 5,
                justifyContent: "center"
            }
            : {
                display: "flex",
                justifyContent: "center"
            };

        return { className, style };
    };

    return (
        <div
            className={`card calendar-container mb-3 ${darkMode ? "dark-calendar-container" : ""}`}
            style={{ height: "12em" , border: "none"}}>
            <div className="d-flex flex-column align-items-center">

                <div className={`calendar-content ${screenType == "mobile" ? "" : "w-75"}`}>
                    <div className={`${screenType == "mobile" ? "justify-content-between w-100" : "justify-content-center"}`}>

                        {(() => {
                            const { className, style } = getDivStyles(distribucion, screenType);
                            return (
                                <div className={className} style={style}>
                                    <h5 className="text-center" style={{ paddingRight: 5, color: "#ff3131" }}> {`${mesEspecial}`} </h5>
                                </div>
                            );
                        })()}

                        <div className="calendar" style={{}}>
                            <div className={`calendar-header bg-light ${darkMode ? "dark-calendar-header" : ""}`}>
                                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((dia, idx) => (
                                    <div key={idx} className="day-header text-center flex-grow-1" style={{color: "#ff3131"}}>
                                        {dia}
                                    </div>))}
                            </div>
                            {calendario.map((semana, semanaIdx) => (
                                <div key={semanaIdx} className="calendar-row d-flex">
                                    {semana.map((dia, diaIdx) => {

                                        const { clases, icono } = getDayClassAndIcon(dia);
                                        const styleHeart = getStyleHeart();

                                        const handleMouseEnter = () => {
                                            if (dia === diaEspecial) {
                                                const fechaEspecial = new Date(anioMostrar, mesMostrar - 1, diaEspecial);
                                                const fechaActual = new Date();
                                                setTooltip(calcularTiempoRestante(fechaEspecial, fechaActual));
                                            }
                                        };

                                        const handleMouseLeave = () => setTooltip(null);
                                        const isAniversario = mesAniversario == (mesMostrar + 1) ? true : false;

                                        return (

                                            <div
                                                key={diaIdx}
                                                className={clases}
                                            >
                                                {dia === diaEspecial && icono !== null ? (
                                                    <div className="content"
                                                        onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}
                                                        title={tooltip?.toString()}
                                                    >
                                                        <span className={distribucion ? "heart" : "heart-false"} style={styleHeart}>
                                                            <FontAwesomeIcon
                                                                icon={isAniversario ? faSolidHeart : icono == "faSolidHeart" ? faSolidHeart : faRegularHeart}
                                                                className=""
                                                                color='#ff3131'
                                                                style={{ zIndex: 1 }}
                                                            />

                                                        </span>
                                                        <span className="position-relative" style={{
                                                            zIndex: 2,
                                                            color: isAniversario ? "white" : darkMode ? "white" : "black",
                                                        }}>
                                                            {dia}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    dia || ''
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Calendario2Anual;
