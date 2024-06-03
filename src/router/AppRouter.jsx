
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login} from '../components';
import { ReservasRoutes } from '../components/reservas/routes/ReservasRoutes';
import { TrackingHome } from '../components/Modal/TrackingHome';


export const AppRouter = () => {
    return(
        <>      
            <Routes> 
                <Route  path='/' element={<Navigate to='/login' />} />                        
                <Route path='login' element={<Login />} />                             
                <Route path='/formulario/*' element={<ReservasRoutes />} /> 
                <Route path='/tracking' element={<TrackingHome />} /> 
                <Route path="*" element={<Navigate to="/login" replace />} />                
            </Routes>        
               
        </>
    )
}