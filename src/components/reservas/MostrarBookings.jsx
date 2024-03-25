
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, List, Typography } from 'antd';
import { RightSquareOutlined } from '@ant-design/icons';
import { Booking } from './Booking';


export const MostrarBookings = ({bookings}) => {

    const [lista, setLista] = useState(bookings);
    const navigate = useNavigate();
    
    const verBooking = (reserva) => {        
        navigate(`/formulario/booking?r=${JSON.stringify(reserva)}`);
    }
   
    return(
        <>
        <Divider orientation="left"></Divider>
        <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={lista}
            renderItem={(item) => (

                <List.Item>

                    <Typography.Text mark></Typography.Text> 
                        {item.carrier.code}
                            &nbsp;
                        {item.airWaybillIdentifier.airlinePrefix}-{item.airWaybillIdentifier.serial}
                            &nbsp;
                        {item.origin.code} - {item.destination.code}
                            &nbsp;
                        <strong>
                            {item.bookingStatus}
                        </strong>
 
                        <RightSquareOutlined  onClick={ () => verBooking(item)}/>
                                
                </List.Item>
            )}
        />
        
       
     </>
    )

    
}



