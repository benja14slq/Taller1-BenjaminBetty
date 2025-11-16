import { BrowserRouter, Routes, Route } from "react-router";
import MedicionNavbar from "./components/MedicionNavbar"
import HomeContainer from "./containers/HomeContainer"
import LecturaFormContainer from './containers/LecturaFormContainer.jsx';
import MedicionesViewContainer from "./containers/MedicionesViewContainer.jsx";

function App() {
    return (
      <>
      <BrowserRouter>
        <MedicionNavbar />
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/registrar" element={<LecturaFormContainer />} />
            <Route path="/mediciones" element={<MedicionesViewContainer />} />
          </Routes>
      </BrowserRouter>
      </>
    )
}

export default App