import React, { useContext, useState, useMemo } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import LecturaContext from "../providers/context"

function MedicionesView(){
    const { mediciones, eliminarMedicion, toast } = useContext(LecturaContext);

    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);
    const [filtroAplicado, setFiltroAplicado] = useState(null);

    const tiposMedida = [
        { label: 'Mostrar Todos', value: null },
        { label: 'Kilowatts', value: 'Kilowatts' },
        { label: 'Watts', value: 'Watts' },
        { label: 'Temperatura', value: 'Temperatura' }
    ];

    const handleRemove = (id) => {
        eliminarMedicion(id);
        toast.current.show({
            severity: "info", 
            summary: "Acción Exitosa",
            detail: "Lectura descartada correctamente."
        });
    }

    const handleFilter = () => {
        setFiltroAplicado(filtroSeleccionado)
    }

    const medicionesMostradas = useMemo(() => {
        if (filtroAplicado === null){
            return mediciones;
        }
        return mediciones.filter(m => m.tipo === filtroAplicado);
    }, [mediciones, filtroAplicado]);

    const fechaBodyTemplate = (rowData) => {
        return new Date(rowData.fechaISO).toLocaleDateString();
    }

    const horaBodyTemplate = (rowData) => {
        return new Date(rowData.fechaISO).toLocaleTimeString();
    }

    const valorBodyTemplate = (rowData) => {
        switch (rowData.tipo) {
            case 'Kilowatts': return `${rowData.valor} kW`;
            case 'Watts': return `${rowData.valor} W`;
            case 'Temperatura': return `${rowData.valor} C`;
            default: return rowData.valor;
        }
    }

    const accionesBodyTemplate = (rowData) => {
        return (
            <Button
                label="Descartar Lectura"
                icon="pi pi-trash" 
                severity="danger" 
                onClick={() => handleRemove(rowData.id)}
            />
        );
    }

    const header = (
        <div className="d-flex flex-row gap-2 align-items-center">
            <span className="p-input-icon-left">
                <Dropdown
                    options={tiposMedida} 
                    value={filtroSeleccionado} 
                    onChange={(e) => setFiltroSeleccionado(e.value)} 
                    placeholder="Filtrar por tipo"
                />
            </span>
            <Button label="Filtrar" icon="pi pi-filter" onClick={handleFilter}/>
        </div>
    );

    return (
        <DataTable value={medicionesMostradas} header={header} tableStyle={{ minWidth: '50rem' }}
                   paginator rows={10}>
            <Column field="fechaISO" header="Fecha" body={fechaBodyTemplate} sortable />
            <Column field="fechaISO" header="Hora" body={horaBodyTemplate} />
            <Column field="medidor" header="Medidor" />
            <Column header="Valor" body={valorBodyTemplate} />
            <Column header="Acciones" body={accionesBodyTemplate} />
        </DataTable>
    )
}

export default MedicionesView