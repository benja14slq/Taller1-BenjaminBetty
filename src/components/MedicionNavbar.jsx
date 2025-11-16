import React from 'react'
import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router";

function MedicionNavbar() {
    const navigate = useNavigate();

    const navbar = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => { navigate('/');}
        },
        {
            label: 'Registrar Lectura',
            icon: 'pi pi-plus',
            command: () => { navigate('/registrar');}
        },
        {
            label: 'Mediciones Existentes',
            icon: 'pi pi-list',
            command: () => { navigate('/mediciones');}
        }
    ];

    return (
        <div className="row">
            <Menubar model={navbar} />
        </div>
    )
}

export default MedicionNavbar