import { useRef ,useEffect, useState } from "react";
import LecturaContext from "./context";


function LecturaProvider({ children }){
    const toast = useRef(null);
    const localKey = "lectura_db";
    const [mediciones, setMediciones] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem(localKey);
        if (data !== null) {
            setMediciones(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(localKey, JSON.stringify(mediciones));
    }, [mediciones]);

    const getMedicion = (medicion) => {
        setMediciones([...mediciones, medicion]);
    }

    const eliminarMedicion = (id) => {
        setMediciones(mediciones.filter(m => m.id !== id));
    }

    const globalState = {
        toast,
        mediciones,
        getMedicion,
        eliminarMedicion
    };

    return (
        <LecturaContext.Provider value={globalState}>
            {children}
        </LecturaContext.Provider>
    )
}

export default LecturaProvider