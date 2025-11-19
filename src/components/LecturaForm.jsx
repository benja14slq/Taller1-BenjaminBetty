import React, { useContext, useState } from 'react'
import { Fieldset } from 'primereact/fieldset';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from 'primereact/editor';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from "primereact/radiobutton";
import { Button } from 'primereact/button';
import LecturaContext from '../providers/context';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';

function LecturaForm() {
    const navigate = useNavigate();
    const { getMedicion, toast } = useContext(LecturaContext);

    const [fecha, setFecha] = useState(null);
    const valorMedidor = [
        {name: '01', text: '01'},
        {name: '02', text: '02'},
        {name: '03', text: '03'},
        {name: '04', text: '04'},
        {name: '05', text: '05'},
        {name: '06', text: '06'},
        {name: '07', text: '07'},
        {name: '08', text: '08'},
        {name: '09', text: '09'},
        {name: '10', text: '10'},
    ];
    const [medidor, setMedidor] = useState(valorMedidor[0]);
    const [direccion, setDireccion] = useState('');
    const [valor, setValor] = useState(1);
    const [tipo, setTipo] = useState('');

    const tiposMedida = [
        { key: 'KW', name: 'Kilowatts' },
        { key: 'W', name: 'Watts' },
        { key: 'C', name: 'Temperatura' },
    ];

    const handleRegistrar = () => {
        if (!fecha || !medidor || !direccion || !valor || !tipo){
            toast.current.show({
                severity: "warn", 
                summary: "Datos incompletos",
                detail: "Por favor, complete todos los campos del formulario.",
                life: 4000
            });
            return;
        }

        const nuevaMedicion = {
            id: uuidv4(),
            fechaISO: fecha.toISOString(),
            medidor: medidor.text,
            direccion: direccion,
            valor: valor,
            tipo: tipo
        };

        getMedicion(nuevaMedicion);

        navigate("/mediciones");
    }

    return (
        <Fieldset legend="Registrar Lectura">
            <div className="p-fluid d-flex flex-column gap-4">
                <div className='p-field'>
                    <label htmlFor="fecha">Fecha y Hora</label>
                    <Calendar id='fecha' value={fecha} onChange={(e) => setFecha(e.value)}
                            showTime hourFormat='24' format="dd-MM-yyyy HH:mm"/>
                </div>
                <div className='p-field'>
                    <label htmlFor="medidor">Medidor</label>
                    <Dropdown options={valorMedidor} value={medidor} optionLabel='text'
                            onChange={(e) => setMedidor(e.value)} placeholder='Seleccione un medidor'/>
                </div>
                <div className='p-field'>
                    <label htmlFor="direccion">Dirección</label>
                    <Editor id='direccion' value={direccion}
                            onTextChange={(e) => setDireccion(e.htmlValue)} style={{height: '150px' }}/>
                </div>
                <div className='p-field'>
                    <label htmlFor="valor">Valor</label>
                    <InputNumber id='valor' value={valor} onValueChange={(e) => setValor(e.value)}
                            showButtons min={1} max={500}/>
                </div>
                <div className='p-field'>
                    <div className="d-flex flex-row gap-3 mt-2">
                        <label htmlFor="">Tipo de Medida</label>
                        {tiposMedida.map((t)=> (
                            <div key={t.key} className='d-flex align-items-center'>
                                <RadioButton inputId={t.key} name='tipo' value={t.name}
                                        onChange={(e) => setTipo(e.value)} checked={tipo === t.name}/>
                                <label htmlFor={t.key} className='ms-2'>{t.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <Button label='Registrar Medición' icon='pi pi-check' onClick={handleRegistrar}/>
            </div>
        </Fieldset>
    )

}

export default LecturaForm