import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Popconfirm, Form, Input } from 'antd';
import { Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import { Update_Cancel_Booking } from '../../api/Bookings';
import { ReservaContext } from './context/reservaContext';
import { TablaVuelosReserva } from './TablaVuelosReserva';
import { AvailabilityObj } from './helpers/VuelosDisponibles';
import { Ejemplo } from '../vuelos/Ejemplo';


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

    const [ reserva_init, setReserva_init ] = useContext(ReservaContext);
    const [ deshabilitado, setDeshabilitado] = useState(true);

    const [ listado, setListado] = useState([]);
    const [ btnEnviarReserva, setBtnEnviarReserva] = useState(false);  

    const { businessId, agent, destination, airWaybillIdentifier, origin, product, shipper, 
        totalPieces, totalVolume, totalWeight, route } = bookingObj;     
    

    const onFinish = async (values) => { 

        const { destination, origin, totalWeight } = values;
        
        const consultarDisponibilidad = await AvailabilityObj(destination, origin, totalWeight);
        setListado(consultarDisponibilidad);    
        
        setReserva_init({
            agentAccountNumber: '00000001116',
            airWaybill: {
                prefix: '279',
                referenceType: 'AIR WAYBILL',
                serial: values.serial
            },
            destinationAirportCode: values.destination,
            natureOfGoods: values.code,
            originAirportCode: values.origin,
            pieces: values.totalPieces,
            segments: [],
            weight:{ amount: values.totalWeight, unit: 'LB' }
        });

        
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const actualizarBooking = async () => {       

        try {

            const actualizar = await Update_Cancel_Booking.put(`v2/bookings/${businessId}`, reserva_init);

            if(actualizar.status === 204) {
                
                setReserva_init({ 
                    agentAccountNumber: '',
                    airWaybill: {
                        prefix: "279",
                        referenceType: 'AIR WAYBILL'
                    },
                    destinationAirportCode: '',
                    natureOfGoods: '',
                    originAirportCode: '',
                    pieces: '',
                    segments: [],
                    weight:{ amount: '', unit: 'LB' }
                }); 

                localStorage.setItem('send', 'ok');                    
    
                navigate('/formulario');      

            }
            
        } catch (error) {
            console.log(error)
        }
    }
      
    const CancelarBooking = async (id) => {

        try {
            
            const peticion = await Update_Cancel_Booking.post(`v2/bookings/${id}/cancellation-requests`);           
    
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
                disabled={deshabilitado}
                fields={[
                    {
                      name: ["airlinePrefix"],
                      value: airWaybillIdentifier?.airlinePrefix,
                    },
                    {
                      name: ["serial"],
                      value: airWaybillIdentifier?.serial,
                    },
                    {
                      name: ["agent"],
                      value: agent?.name,
                    },
                    {
                      name: ["contact"],
                      value: agent.contact?.phone,
                    },
                    {
                      name: ["shipper"], 
                      value: shipper?.name,
                    },
                    {
                      name: ["origin"],  
                      value: origin?.code,
                    },
                    {
                      name: ["destination"],    
                      value: destination?.code
                    },
                    {
                      name: ["code"],    
                      value: product?.code 
                    },
                    {
                      name: ["totalPieces"],   
                      value: totalPieces 
                    },
                    {
                      name: ["totalVolume"],  
                      value: totalVolume?.amount   
                    },
                    {
                      name: ["totalWeight"],   
                      value: totalWeight?.amount
                    },
                  ]}
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
                <Input disabled />

            </Form.Item>

            <Form.Item
                label="Number"
                name="serial"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 9,
                }}
                
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
            >
                <Input type='text' />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="contact"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 11,
                }}               
            >
                <Input type='text' />
            </Form.Item>

            <Form.Item
                label="Shipper"
                name="shipper"
                wrapperCol={{
                    span: 10,
                }} 
                style={{ marginBottom: '1rem'}}
                
                >
                <Input type='text' />
            </Form.Item>

            <Form.Item
                label="Origin"
                name="origin"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 6,
                }}               
            >
                <Input type='text' />
            </Form.Item>

            <Form.Item
                label="Dest"
                name="destination"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 6,
                }}               
            >
                <Input type='text' />
            </Form.Item>

            <Form.Item
                label="OfGoods"
                name="code"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 10,
                }}               
            >
                <Input type='text' />
            </Form.Item>

            <Form.Item
                label="Pieces"
                name="totalPieces"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 6,
                }}               
            >
                <Input type='number' />
            </Form.Item>

            <Form.Item
                label="Vol"
                name="totalVolume"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 8,
                }}               
            >
                <Input type='number' />
            </Form.Item>

            <Form.Item
                label="Weight"
                name="totalWeight"
                style={{ marginBottom: '1rem'}}
                wrapperCol={{
                    span: 6,
                }}               
            >
                <Input type='number' />
            </Form.Item>

            {
                (!deshabilitado) &&                   
                
                   <Button type="primary" size="middle" htmlType="submit">  
                        Search Fligths
                  </Button>
            }

           
            
        </Form>        

           {/*  Mostrar los vuelos de la reserva */}
        <br />

        <div >
            {
                    
                (listado.length > 0) 
                
                    ? 
                    <>
                        <Ejemplo 
                            listado={listado} 
                            reserva={reserva_init}                                              
                        />  

                        
                        <Button
                            style={{backgroundColor: '#5cb85c', color: 'white'}}                            
                            onClick={actualizarBooking}                                      
                        >
                            Send
                        </Button>

                    </>
                        
                    : 

                    <>
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
    
                        <Button 
                            type="primary"  
                            size="middle" 
                            style={{marginLeft: 5}}
                            onClick={ () => setDeshabilitado(!deshabilitado)}
                        >
                        {
                            (deshabilitado) ? 'Edit' : 'Cancel'
                        }
                        </Button>   
                    </>        
            } 
                     
            </div>          
            
        </>
    )
}
