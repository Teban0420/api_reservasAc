
import { Button, Form, Input } from 'antd';
import { useState} from 'react';


let todos_vuelos = [];

export const BtnSelect = ({segment, reserva}) => {

      
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
        
        guardarReserva(reserva_recibida);          
    }

    const guardarReserva = (reserva_final) => {
        
        localStorage.setItem('reserva_final', JSON.stringify(reserva_final));
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


   
    
   


      

    
    
   
 
