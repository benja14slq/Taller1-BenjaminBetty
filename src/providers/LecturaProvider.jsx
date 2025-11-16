import { useRef ,useEffect, useState } from "react";
import LecturaContext from "./context";


function LecturaProvider({ children }){
    const toast = useRef(null);
    const localKey = "lectura_db";
    const [mediciones, setMediciones] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem(localKey);
        if (data !== null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMediciones(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(localKey, JSON.stringify(mediciones));
    }, [mediciones]);

    const getMediciones = (medicion) => {
        setMediciones([...mediciones, medicion]);
    }

    const removeMedicion = (id) => {
        setMediciones(mediciones.filter(m => m.id !== id));
    }

    const globalState = {
        toast,
        mediciones,
        getMediciones,
        removeMedicion
    };

    return (
        <LecturaContext.Provider value={globalState}>
            {children}
        </LecturaContext.Provider>
    )
}

export default LecturaProvider