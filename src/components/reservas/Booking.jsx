import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import { CancelBooking } from '../../api/Bookings';


export const Booking = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { r = ''} = queryString.parse( location.search);

    useEffect( () => {

        if(!r){
            navigate('/formulario');
            return
        }
    }, []);
    
    const bookingObj = JSON.parse(r); 
    const { businessId } = bookingObj;

      
    const CancelarBooking = async (id) => {
        
        const peticion = await CancelBooking.post(`v2/bookings/${id}/cancellation-requests`);

        if(peticion.status === 204){
            navigate('/formulario');
        }
    }

    return(
        <>
            <h1>Booking </h1>
            <Popconfirm
                title="Delete the booking"
                description="Are you sure to delete this booking?"
                onConfirm={() => CancelarBooking(businessId)}
                icon={
                <QuestionCircleOutlined
                    style={{
                    color: 'red',
                    }}
                />
                }
            >
             <Button 
                danger
                style={{marginLeft: '40px'}}
            >
                Delete
            </Button>

            </Popconfirm>
        </>

    )
}
