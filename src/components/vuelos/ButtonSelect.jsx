
import { useNavigate } from 'react-router-dom';
import { Button, Popconfirm, Form, Input } from 'antd';
import {  useMemo, useState} from 'react';
import { infoReserva } from './helpers/infoReserva';
import { Bookings } from '../../api/Bookings';


export const BtnSelect = ({segment, reserva}) => {    

    const navigate = useNavigate();    
    const datos = useMemo( () => infoReserva(reserva, segment), [segment]);   
    
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [ mostrar, setMostrar ] = useState(false);
            
    const showPopconfirm = () => {
        // setOpen(true);
        setMostrar(!mostrar);
    };
    
    const handleOk = () => {
        setConfirmLoading(true);

        crearReserva(datos);        
    
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
    };
    
    const handleCancel = () => {        
        setOpen(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    const crearReserva = async (reserva) => {
        
        try {
            
            const respuesta = await Bookings.post('v2', reserva);

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
                    (mostrar) && <div 
                        style={{
                            display: 'flex', 
                            flexDirection: 'row',  
                            justifyContent: 'flex-start', 
                            
                        }}
                >
                        <Form
                            name="oneLineForm"
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
                            <Button style={{backgroundColor: '#5cb85c', color: 'white'}}   htmlType="submit">
                                Enviar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
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