import mensajes from '../assets/json/mensajes.json';
import imagenes from '../assets/json/imagenes.json';
import calendarioData from '../assets/json/calendario.json';

interface CalendarioJSON {
    [anio: string]: {
        [mes: string]: {
            comienza: string;
            termina: string;
        };
    };
}

const calendario: CalendarioJSON = calendarioData.calendario;


// Función para obtener datos aleatorios (1 o 12 elementos)
export const obtenerDatosAleatorios = (cantidad: number = 1) => {
    const mensajesAleatorios = [...mensajes].sort(() => Math.random() - 0.5).slice(0, cantidad);
    const imagenesAleatorias = [...imagenes].sort(() => Math.random() - 0.5).slice(0, cantidad);

    const datos = mensajesAleatorios.map((mensaje, index) => ({
        mensaje,
        imagen: imagenesAleatorias[index % imagenesAleatorias.length]
    }));

    // console.log("Datos generados:", datos); // Verifica la salida
    return datos;
};


// Función para obtener un dato específico por ID
export const obtenerDatoPorId = (id: number) => {
    const mensaje = mensajes.find(msg => msg.id === id);
    const imagen = imagenes.find(img => img.id === id);

    if (!mensaje || !imagen) return null;

    return { mensaje, imagen };
};

export const obtenerDatosCalendario = (anio: string, mes: string) => {
    // Validamos si existe el año en el calendario
    const datosAnio = calendario[anio];
    if (!datosAnio) return { error: 'Año no encontrado en el calendario.' };

    // Validamos si existe el mes en el año seleccionado
    const datosMes = datosAnio[mes.toLowerCase()];
    if (!datosMes) return { error: 'Mes no encontrado en el calendario.' };

    // Extraemos comienzo y termino del mes
    return {
        comienza: datosMes.comienza,
        termina: datosMes.termina
    };
};
