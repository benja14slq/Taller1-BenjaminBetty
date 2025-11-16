import React, { useContext } from 'react'
import MedicionesView from '../components/MedicionesView'
import { Toast } from 'primereact/toast'
import LecturaContext from "../providers/context";

function MedicionesViewContainer(){
    const { toast } = useContext(LecturaContext);

    return (
        <div className="row">
            <div className="col">
                <Toast ref={toast} position='top-right'/>
                <MedicionesView />
            </div>
        </div>
    )
}

export default MedicionesViewContainer