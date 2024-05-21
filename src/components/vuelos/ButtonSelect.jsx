
import { useContext, useEffect, useState} from 'react';
import { Button, Form, Input } from 'antd';
import { RightSquareTwoTone } from '@ant-design/icons'
import { ReservaContext } from '../reservas/context/reservaContext';


let newListadoVuelos = [];

export const BtnSelect = ({segment, reserva, btnEnviarReserva, setBtnEnviarReserva}) => {    
    
    const [vuelo_recibido, setvuelo_recibido] = useState(segment);
    const [reserva_init, setReserva_init] = useContext(ReservaContext);   
    const [ mostrar, setMostrar ] = useState(false);
    const [ todos_vuelos, Settodos_vuelos ] = useState([]);   

    const valor_localStorage = localStorage.getItem('send');
             
    const showPopconfirm = () => {       
        setMostrar(!mostrar);
    };

    const onFinish = (values) => {        

        if(valor_localStorage === 'ok'){

            localStorage.removeItem('send');
            newListadoVuelos = [];
        }

        let nuevo_vuelo_recibido = {
            ...vuelo_recibido,
            pieces: values.Pieces,
            weight: {amount: values.Weight, unit: 'LB'},
            volume: {amount: values.Volume, unit: 'MC'} 
        }
                    
        newListadoVuelos.push(nuevo_vuelo_recibido);       
      
        let newReserva = {
            ...reserva,
            segments: newListadoVuelos
        }
            
        setReserva_init(newReserva);       
        setBtnEnviarReserva(true);       
 
    }

    
    useEffect( () => {     
                 
    }, [vuelo_recibido])

    useEffect( () => {

    }, [todos_vuelos])

    useEffect( () => {  

    }, [reserva_init]);

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
    
                        <Form.Item>
                            <Button style={{backgroundColor: '#5cb85c', color: 'white'}}   
                                    htmlType="submit">
                                Confirm
                            </Button>                           
                        </Form.Item>
                    </Form>
                </div>
                </>
                }
                
                 <RightSquareTwoTone 
                    className='icono'                      
                    onClick={showPopconfirm} 
                />
           
        </>
    )
}


   
    
   


      

    
    
   
 
