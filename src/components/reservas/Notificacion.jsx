import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Notificacion = () => {

    const navigate = useNavigate();

    const click = () => {    
        navigate('/formulario');
    }

    return(        
      <Result
        status="error"
        title="No hay vuelo seleccionado!"
        subTitle="Para crear una reserva primero debes seleccionar un vuelo"
        extra={[
            <Button type="primary" key="console" onClick={click}>
                Go New Bookings
            </Button>,        
        ]}
     />
        
    ) 
};
