import React, {useState} from 'react';
import { Button, Form, Input } from 'antd'
import { Availability } from '../../api/Availability';
import { ListadoVuelos } from '../vuelos/listadoVuelos';

let reserva = {};

export const Formulario = () => { 

    const [ listado, setlistado ] = useState([]);

    // funcion para activar el formulario
    const onFinish = ({originAirportCode, destinationAirportCode, weight, Date, natureOfGoods, pieces }) => {     
       
        let availability = {
            accountNumber: '14000110001',
            carrierCodes: 'B6',           
            originAirportCode: originAirportCode,
            destinationAirportCode: destinationAirportCode,
            departureOn: '2024-02-26T20:30:00',
            weight: weight
        }

         reserva = {
            'agentAccountNumber': '00000001116',
            'airWaybill': {
                'prefix': "279",
                'referenceType': 'AIR WAYBILL'
            },
            'destinationAirportCode': destinationAirportCode,
            'natureOfGoods': natureOfGoods,
            'originAirportCode': originAirportCode,
            'pieces': pieces,
            'segments': [],
            'weight':{'amount':weight, 'unit': 'LB' }
        }
                        
        vuelos(availability); 

        availability = {};
    };

    const vuelos = async (availability) => {

        const {accountNumber, carrierCodes, departureOn, destinationAirportCode, 
                originAirportCode, weight } = availability;
        const url = `availability?accountNumber=${accountNumber}&carrierCodes=${carrierCodes}&originAirportCode=${originAirportCode}&destinationAirportCode=${destinationAirportCode}&departureOn=${departureOn}&weight=${weight}`;

        try {          
            const respuesta = await Availability.get(url);  
            setlistado(respuesta.data.routes)         

        } catch (error) {
            console.log(error)            
        }

    }

    return (
        <>
         <div className='formulario_div'>

          <Form                 
                className='formulario__reservas'
                name="horizontal_login" 
                layout="inline"                
                onFinish={onFinish} >
                    
                <Form.Item label="Origin"
                    name="originAirportCode"
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

                <Form.Item label="Destination"
                    name="destinationAirportCode"
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
                    rules={[
                        {
                            required: true,
                            message: 'Please input weight',
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
                        label="Date"
                        name="Date"                
                    >

                    <Input 
                        type='date'                        
                    />

                </Form.Item>

                <Form.Item
                    label="OfGoods"
                    name="natureOfGoods"   
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
                {
                    (listado.length > 0) ? <ListadoVuelos listado={listado} reserva={reserva}/> : ''            
                }            
        </div>
    </>
    )
}