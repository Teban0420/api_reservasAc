
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navegacion } from '../../ui/Navevacion';
import { About, Contact, Home } from '../index';

export const PagesRoutes = () => {

    return(
        <>
            <Navegacion />     

            <Routes>
                <Route path="/" Component={Home} />                    
                <Route path="/about" Component={About} />                    
                <Route path="/contact" Component={Contact} />                                                                                                                                                                                          
                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>      
        </>
    )
}