import React, {useContext, useState, useEffect} from 'react';
import { Button, Divider, Form, Input } from 'antd'
import { Availability } from '../../api/Availability';
import { Ejemplo } from '../vuelos/Ejemplo';
import { BtnEnviarReserva } from './BtnEnviarReserva';
import { ReservaContext } from './context/reservaContext';
import { getCurrentDate } from './helpers/fechaActual';
import { AvailabilityObj } from './helpers/VuelosDisponibles';
import { Spinner } from '../ui/Spinner';


let reserva = {};

export const Formulario = () => {     

    const [ listado, setlistado ] = useState([]); 
    const [ btnEnviarReserva, setBtnEnviarReserva ] = useState(false); 
    const [ showSpinner, setShowSpinner ] = useState(false); 

    const [reserva_init, setReserva_init] = useContext(ReservaContext);      
       
    // funcion para activar el formulario
    const onFinish = async ({ serial, originAirportCode, destinationAirportCode, weight, Date, arrivalOn, natureOfGoods, pieces }) => {     
            
        setShowSpinner(true);
        const consultarDisp = await AvailabilityObj(destinationAirportCode, originAirportCode, weight);
        
        setlistado(consultarDisp); 
        setShowSpinner(false);
       
        setReserva_init({
            // agentAccountNumber: '00000001116',
            agentAccountNumber: 'UTST001',
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
    };   

    return (
        <>
         <div >
          <Form                   
                name="horizontal_login" 
                layout="inline"  
                size='small'              
                onFinish={onFinish}                
                labelCol={{
                    span: 8,
                    }}                    
                    style={{
                        maxWidth: 1100,
                    }}
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
                        type='text'
                        defaultValue='279'    
                        disabled                                 
                    />

                </Form.Item>
                    
                <Form.Item  
                    label="Number" 
                    name="serial" 
                    style={{ marginBottom: '1rem' }}                    
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
                        placeholder='Number'                                         
                    />

                </Form.Item>
                    
                <Form.Item 
                    label="Origin"
                    name="originAirportCode"
                    wrapperCol={{
                        span: 8,
                    }}  
                    style={{ marginBottom: '1rem' }}    
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
                    wrapperCol={{
                        span: 8,
                    }}  
                    style={{ marginBottom: '1rem' }}
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
                    label='Weight'
                    name='weight' 
                    style={{ marginBottom: '1rem' }}   
                    wrapperCol={{
                        span: 8,
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
                    placeholder='LB*'                       
                />

                </Form.Item>

                <Form.Item
                    label="Dep"
                    name="Date"   
                    style={{ marginBottom: '1rem' }}   
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
                    style={{marginBottom: '1rem' }}   
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
                    style={{ marginBottom: '1rem' }}
                    wrapperCol={{
                        span: 8,
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
                    wrapperCol={{
                        span: 8,
                    }}  
                    style={{ marginBottom: '1rem' }}                      
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
                        style={{backgroundColor: '#2981C4', color: 'white'}}                                   
                    >
                        Search Flights
                    </Button>
                
                </Form.Item> 
               
            </Form>          
          
            <Divider />

            {
                (showSpinner) &&  <div> <Spinner /> </div>
                                 
            }
           
                {
                         
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