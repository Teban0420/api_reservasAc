import { useLocation} from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { TrackAndTrace } from '../../api/TrackAndTrace';
import { useState } from 'react';
import { DetalleReserva } from './DetalleReserva';


export const Reserva = () => {
    
    const {state} = useLocation(); 
    const [ booking, setBooking] = useState({});
    
    const onFinish = ({serialNumber}) => {
        consultar_reserva(serialNumber);    
    };

    const consultar_reserva = async (serialNumber) => {

        const url = `airwaybill?airlinePrefix=950&serialNumber=${serialNumber}`;

        try {

            const respuesta = await TrackAndTrace.get(url);
            setBooking(respuesta.data);            
            
        } catch (error) {
            console.log(error);
        }
    }
      
    return(
        <>            
            <Form
                name="horizontal"
                layout="inline"  
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 12,
                }}
                style={{
                maxWidth: 800,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}                
                autoComplete="off"
            >

                <Form.Item  
                    label="Awb"                  
                    name="airlinePrefix"   
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
                    name="serialNumber" 
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
                    />

                </Form.Item>
           
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >

                <Button type="primary" htmlType="submit">
                    Submit
                </Button>

                </Form.Item>
        </Form>        

            {
               (Object.entries(booking).length > 0) && <DetalleReserva booking={booking} />          
            } 
       </>
    )
}