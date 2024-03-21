import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Form, Input, InputNumber } from 'antd';
import { Bookings } from '../../api/Bookings';
import { MostrarBookings } from './MostrarBookings';


export const ListBookings = () => {

    const [bookings, setBookings ] = useState([]);    
    const [ mostrar, setMostrar] = useState(false);

    const onFinish = ({flightDate}) => {

        const url = `/v2/bookings?accountNumbers=00000001116&flightDate=${flightDate}`;
        consultar(url);
             
    };
    
    const consultar = async (url) => {
        
        const consulta = await Bookings.get(url);   
  
        if(consulta.status === 200){

            setBookings(consulta.data._embedded.bookings);                   
            setMostrar(true);            
        }             
    }

    useEffect( () => {}, [bookings]);

    return(
        <>
            <Form onFinish={onFinish}  layout="inline">

                <Form.Item
                     label="Flight Date "
                     name="flightDate"
                                                         
                >
                    
                    <input type="date"  />

                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                </Form.Item>

            </Form>

                {
                    (mostrar) && <MostrarBookings bookings={bookings}/>
                }
            
        </>
        
        )
        
    }
                
