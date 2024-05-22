
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login} from '../components';
import { ReservasRoutes } from '../components/reservas/routes/ReservasRoutes';


export const AppRouter = () => {
    return(
        <>      
            <Routes> 
                <Route  path='/' element={<Navigate to='/login' />} />                        
                <Route path='login' element={<Login />} />                             
                <Route path='/formulario/*' element={<ReservasRoutes />} /> 
                <Route path="*" element={<Navigate to="/login" replace />} />                
            </Routes>        
               
        </>
    )
}