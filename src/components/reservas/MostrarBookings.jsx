
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider, List, Typography } from 'antd';
import { RightSquareOutlined } from '@ant-design/icons';


export const MostrarBookings = ({bookings}) => {

    const [lista, setLista] = useState(bookings);

    return(
        <>
        <Divider orientation="left">Default Size</Divider>
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

                        <Link 
                            style={{paddingLeft: '50px'}}
                            to={{
                                pathname: '/formulario/booking',
                                state: {id: item.businessId}
                            }}                                
                        >
                            <RightSquareOutlined />
                        </Link>
                      
                        
                </List.Item>
            )}
        />
        
       
     </>
    )

    
}



