
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, PagesRoutes} from '../components';
import { ReservasRoutes } from '../components/reservas/routes/ReservasRoutes';

export const AppRouter = () => {
    return(
        <>             
            <Routes>
                <Route  path='/' element={<Navigate to='/pages' />} />                        
                <Route path='login' element={<Login />} />                 
                <Route path='/pages/*' element={<PagesRoutes />} />                 
                <Route path='/formulario/*' element={<ReservasRoutes />} /> 
                <Route path="*" element={<Navigate to="/pages" replace />} />                
            </Routes>        
        </>
    )
}