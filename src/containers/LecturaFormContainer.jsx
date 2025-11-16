import { useContext } from "react";
import { Toast } from 'primereact/toast'
import LecturaContext from "../providers/context";
import LecturaForm from "../components/LecturaForm";

function LecturaFormContainer() {
    const { toast } = useContext(LecturaContext);

    return (
        <>
        <Toast ref={toast} />
        <LecturaForm />
        </>
    )
}

export default LecturaFormContainer