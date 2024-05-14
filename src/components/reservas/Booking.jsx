import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Popconfirm, Form, Input } from 'antd';
import { Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import { CancelBooking } from '../../api/Bookings';
import { ReservaContext } from './context/reservaContext';
import { TablaVuelosReserva } from './TablaVuelosReserva';

const { Title } = Typography;

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
    const { businessId, agent, destination, airWaybillIdentifier, origin, product, shipper, 
        totalPieces, totalVolume, totalWeight, route } = bookingObj;
        
    const [ reserva_init, setReserva_init ] = useContext(ReservaContext);
    

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
      
    const CancelarBooking = async (id) => {

        try {
            
            const peticion = await CancelBooking.post(`v2/bookings/${id}/cancellation-requests`);           
    
            if(peticion.status === 204){
                navigate('/formulario');
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }

    return(
        <>
            <Title>Booking</Title>

            <br />

            <Form
                name="basic"               
                layout='inline'
                size='small'
                labelCol={{
                span: 7,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                    maxWidth: 1000,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

            <Form.Item
                label="Awb"
                name="airlinePrefix"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 6,
                }}
            >
                <Input 
                    defaultValue={airWaybillIdentifier?.airlinePrefix}
                    disabled
                />

            </Form.Item>

            <Form.Item
                label="Number"
                name="serial"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 9,
                }}
                rules={[
                    {
                    required: true,
                    message: 'Please input serial',
                    },
                ]}
                >
                <Input
                    type='text'
                    defaultValue={airWaybillIdentifier?.serial}
                />
            </Form.Item>

            <Form.Item
                label="Agent"
                name="agent"
                style={{ marginBottom: '1rem'}}
                rules={[
                    {
                    required: true,
                    message: 'Please input agent',
                    },
                ]}
                >
                <Input type='text' defaultValue={agent?.name} />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="contact"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 11,
                }}               
            >
                <Input type='text' defaultValue={agent?.contact.phone} />
            </Form.Item>

            <Form.Item
                label="Shipper"
                name="shipper"
                wrapperCol={{
                    span: 10,
                }} 
                style={{ marginBottom: '1rem'}}
                
                >
                <Input type='text' defaultValue={shipper?.name} />
            </Form.Item>

            <Form.Item
                label="Origin"
                name="origin"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 6,
                }}               
            >
                <Input type='text' defaultValue={origin?.code} />
            </Form.Item>

            <Form.Item
                label="Dest"
                name="destination"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 6,
                }}               
            >
                <Input type='text' defaultValue={destination?.code} />
            </Form.Item>

            <Form.Item
                label="OfGoods"
                name="code"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 10,
                }}               
            >
                <Input type='text' defaultValue={product?.code} />
            </Form.Item>

            <Form.Item
                label="Pieces"
                name="totalPieces"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 6,
                }}               
            >
                <Input type='number' defaultValue={totalPieces} />
            </Form.Item>

            <Form.Item
                label="Vol"
                name="totalVolume"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 8,
                }}               
            >
                <Input type='number' defaultValue={totalVolume?.amount} />
            </Form.Item>

            <Form.Item
                label="Weight"
                name="totalWeight"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 6,
                }}               
            >
                <Input type='number' defaultValue={totalWeight?.amount} />
            </Form.Item>


           <Button type="primary" htmlType="submit" size="middle">
             Save
          </Button>
            
        </Form>

           {/*  Mostrar los vuelos de la reserva */}
        <br />

           <TablaVuelosReserva route={route} />

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
                style={{marginLeft: '80%'}}
            >
                Cancel Booking
            </Button>

            </Popconfirm>
        </>

    )
}
