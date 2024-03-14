
import { useNavigate } from 'react-router-dom';
import { Button, Popconfirm, Form, Input } from 'antd';
import {  useMemo, useState} from 'react';
import { infoReserva } from './helpers/infoReserva';
import { Bookings } from '../../api/Bookings';

let todos_vuelos = [];

export const BtnSelect = ({segment, reserva}) => {

    const navigate = useNavigate();    
    const [vuelo_recibido, setvuelo_recibido] = useState(segment);
    const [reserva_recibida, setreserva_recibida] = useState(reserva);   

    const [ mostrar, setMostrar ] = useState(false);
            
    const showPopconfirm = () => {       
        setMostrar(!mostrar);
    };

    const onFinish = (values) => {        
        
        setvuelo_recibido({
            ...vuelo_recibido,
            pieces: values.Pieces,
            weight: {amount: values.Weight, unit: 'LB'},
            volume: {amount: values.Volume, unit: 'MC'}            
        }); 
    
        todos_vuelos.push(vuelo_recibido);
    
        setreserva_recibida({
            ...reserva_recibida,
            'segments': todos_vuelos
        });
    }

    const btn_crear_reserva = async () => {
        
        try {
            
            const respuesta = await Bookings.post('v2', reserva_recibida);            

            if(respuesta.status == 200){
                navigate('/formulario');
            }

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>      
           <br />
                {
                    (mostrar) && <><div 
                        style={{
                            display: 'flex', 
                            flexDirection: 'row',  
                            justifyContent: 'flex-start',                             
                        }}
                >
                        <Form                            
                            name={segment.transportMeans.id}
                            layout="inline"
                            onFinish={onFinish}
                            style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}
                            >
    
                        <Form.Item
                            name="Pieces"
                            rules={[{ required: true, message: 'Please input pieces' }]}
                            style={{ width: '10%' }} 
                        >
                            <Input placeholder="Pieces" />
                        </Form.Item>
    
                        <Form.Item
                            name="Weight"
                            rules={[{ required: true, message: 'Please input weight' }]}
                            style={{ width: '10%' }} 
                        >
                            <Input placeholder="Weight" />
                        </Form.Item>
    
                        <Form.Item
                            name="Volume"
                            rules={[{ required: true, message: 'Please input volume' }]}
                            style={{ width: '10%' }} 
                        >
                            <Input placeholder="Volume" />
                        </Form.Item>

                        <Form.Item name="id">
                            <Input  type='hidden' value={segment.transportMeans.id} />
                        </Form.Item>
    
                        <Form.Item>
                            <Button style={{backgroundColor: '#5cb85c', color: 'white'}}   
                                    htmlType="submit">
                                Confirm
                            </Button>
                            <Button style={{backgroundColor: '#5cb85c', color: 'white'}}   
                                    htmlType="submit"
                                    onClick={btn_crear_reserva}
                            >
                                Enviar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                </>
                }

                <Button 
                    type="primary"
                    size='small'
                    onClick={showPopconfirm} 
                    style={{
                        marginLeft: 900
                    }} 
                >
                 SELECT
                 </Button>
           
        </>
    )
}


    // const datos = useMemo( () => infoReserva(reserva, segment), [segment]);  
    
   


      

    
    
   
 
