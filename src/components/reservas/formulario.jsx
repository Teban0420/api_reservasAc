import React, {useContext, useState, useEffect} from 'react';
import { Button, Divider, Form, Input } from 'antd'
import { Availability } from '../../api/Availability';
import { Ejemplo } from '../vuelos/Ejemplo';
import { BtnEnviarReserva } from './BtnEnviarReserva';
import { ReservaContext } from './context/reservaContext';
import { getCurrentDate } from './helpers/fechaActual';


let reserva = {};

export const Formulario = () => {     

    const [ listado, setlistado ] = useState([]); 
    const [ btnEnviarReserva, setBtnEnviarReserva ] = useState(false); 

    const [reserva_init, setReserva_init] = useContext(ReservaContext);  
    
       
    // funcion para activar el formulario
    const onFinish = ({ serial, originAirportCode, destinationAirportCode, weight, Date, arrivalOn, natureOfGoods, pieces }) => {     
       
        let availability = {
            accountNumber: '14000110001',
            carrierCodes: 'B6',           
            originAirportCode: originAirportCode,
            destinationAirportCode: destinationAirportCode,
            // departureOn: '2024-02-26T20:30:00',
            departureOn: Date,
            arrivalOn: arrivalOn,
            weight: weight
        }

        setReserva_init({
            agentAccountNumber: '00000001116',
            airWaybill: {
                prefix: '279',
                referenceType: 'AIR WAYBILL',
                serial: serial
            },
            destinationAirportCode: destinationAirportCode,
            natureOfGoods: natureOfGoods,
            originAirportCode: originAirportCode,
            pieces: pieces,
            segments: [],
            weight:{ amount:weight, unit: 'LB' }
        });
                        
        vuelos(availability); 

        availability = {};
    };

    const vuelos = async (availability) => {

        const {accountNumber, carrierCodes, departureOn, arrivalOn, destinationAirportCode, 
                originAirportCode, weight } = availability;
        const url = `availability?accountNumber=${accountNumber}&carrierCodes=${carrierCodes}&originAirportCode=${originAirportCode}&destinationAirportCode=${destinationAirportCode}&departureOn=${departureOn}&arrivalOn=${arrivalOn}&weight=${weight}`;

        try {          
            const respuesta = await Availability.get(url);  
            setlistado(respuesta.data.routes);                  

        } catch (error) {
            console.log(error)            
        }

    }

    return (
        <>
         <div >

          <Form                 
                className='formulario__reservas'
                name="horizontal_login" 
                layout="inline"                
                onFinish={onFinish}                
                wrapperCol={{ span: 15 }}
            >

                <Form.Item  
                    label="Prefix"                  
                    name="airlinePrefix"   
                    style={{width: '15%'}}
                    wrapperCol={{
                        span: 10,
                    }}            
                >
                    <Input 
                        type='text'
                        defaultValue='279'    
                        disabled                                 
                    />

                </Form.Item>
                    
                <Form.Item  
                    label="Number" 
                    name="serial" 
                    style={{ width: '20%' }}                    
                    wrapperCol={{
                        span: 12,
                    }} 
                    rules={[
                        {
                            required: true,
                            message: 'Please input an AWB Number',
                        },
                        {min: 8}
                    ]}
                    hasFeedback                 
                >
                    <Input 
                        type='text'  
                        placeholder='Awb Number'                                         
                    />

                </Form.Item>
                    
                <Form.Item 
                    label="Origin"
                    name="originAirportCode"
                    style={{ width: '15%' }}    
                    rules={[
                        {
                            required: true,
                            message: 'Please input origin',
                        },
                        {max: 3}
                    ]}  
                    hasFeedback              
                >

                <Input 
                    type='text'  
                    placeholder="Origin*"                     
                />

                </Form.Item>

                <Form.Item 
                    label="Dest"
                    name="destinationAirportCode"
                    style={{ width: '15%' }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input dest',
                        },
                        {max: 3}
                    ]}
                    hasFeedback
                >

                <Input
                    type="text"
                    placeholder="Destination*"                   
                />

                </Form.Item>

                <Form.Item
                    label='Weight (LB)'
                    name='weight' 
                    style={{ width: '22%' }}   
                    wrapperCol={{
                        span: 10,
                    }}                                 
                    rules={[
                        {
                            required: true,
                            message: 'Please input weight',                           
                        },
                        {
                            pattern: /^[0-9]+$/,
                            message: 'can only include numbers.',
                        },                   
                       
                    ]}
                    hasFeedback
                >

                <Input 
                    type='text'                     
                    placeholder='Weight (LB)*'                       
                />

                </Form.Item>

                <Form.Item
                    label="Dep"
                    name="Date"   
                    style={{ width: '22%' }}   
                    wrapperCol={{
                        span: 13,
                    }}               
                > 

                <Input 
                    type='date' 
                    min={getCurrentDate()}                       
                />

                </Form.Item>

                <Form.Item
                    label="Arr"
                    name="arrivalOn"   
                    style={{ width: '22%' }}   
                    wrapperCol={{
                        span: 13,
                    }}               
                > 

                <Input 
                    type='date' 
                    min={getCurrentDate()}                       
                />

                </Form.Item>

                <Form.Item
                    label="OfGoods"
                    name="natureOfGoods" 
                    style={{ width: '20%' }}
                    wrapperCol={{
                        span: 10,
                    }} 
                    rules={[
                        {
                            required: true,
                            message: 'Please input',
                        },
                        {max: 3}
                    ]}
                    hasFeedback              
                >

                <Input 
                    type='text'
                    placeholder='nature of goods'               
                />

                </Form.Item>

                <Form.Item
                    label="pieces"
                    name="pieces"  
                    style={{ width: '15%' }}                      
                    rules={[
                        {
                            required: true,
                            message: 'Please input',
                        },
                        {
                            pattern: /^[0-9]+$/,
                            message: 'can only include numbers.',
                        },
                        {max: 3}
                    ]}
                    hasFeedback              
                >

                <Input 
                    type='number'
                    placeholder='pieces'               
                />

                </Form.Item>

                <Form.Item >
                    
                    <Button
                        type="primary"
                        htmlType="submit"                                        
                    >
                        Search Flights
                    </Button>
                
                </Form.Item> 
               
            </Form>          
          
            <Divider />
           
                {
                    // (listado.length > 0) ? <Ejemplo listado={listado} />  : ''            
                    (listado.length > 0) ? 

                        <Ejemplo 
                            listado={listado} 
                            reserva={reserva_init}
                            btnEnviarReserva={btnEnviarReserva}
                            setBtnEnviarReserva={setBtnEnviarReserva}
                        />  
                        : ''            
                } 
                {
                    (btnEnviarReserva) && <BtnEnviarReserva />
                } 
                
        </div>
    </>
    )
}