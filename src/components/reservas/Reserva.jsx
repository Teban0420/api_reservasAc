import { useContext, useState } from 'react';
import { useLocation} from 'react-router-dom';
import { Button, Form, Input, Row, Col } from 'antd';
import { TrackAndTrace } from '../../api/TrackAndTrace';
import { DetalleReserva } from './DetalleReserva';
import { ApiContext } from '../../context/ApiContext';
import { Spinner } from '../ui/Spinner';


export const Reserva = () => {

    const [ auth, guardarAuth] = useContext(ApiContext);
    const { token } = auth;
    
    const [ booking, setBooking] = useState({});
    const [ showSpinner, setShowSpinner] = useState(false);
    const {state} = useLocation(); 
    
    const onFinish = ({serialNumber}) => {
        consultar_reserva(serialNumber);    
    };

    const consultar_reserva = async (serialNumber) => {

        // const url = `airwaybill?airlinePrefix=950&serialNumber=${serialNumber}`;
        const url = `csp/track-and-trace/v1/airwaybill?airlinePrefix=279&serialNumber=${serialNumber}&carrierCode=B6`;

        try {

            setShowSpinner(true);

            const respuesta = await TrackAndTrace.get(url, {
                headers: {
                    apikey: token
                }
            }); 
            
            setBooking(respuesta.data);   
            setShowSpinner(false);         
            
        } catch (error) {
            console.log(error);
        }
    }

    if(showSpinner){
        return <Spinner />
    }
      
    return(
        <>       
            <Row gutter={[32, 16]}>
                <Form
                    name="horizontal"
                    layout="inline"
                    size='small'  
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}                
                    autoComplete="off"
                >

                 <Col xs={24} sm={16} md={8} lg={6} xl={6}>

                    <Form.Item  
                        label="Awb"                  
                        name="airlinePrefix"                       
                        wrapperCol={{
                            span: 16,
                        }}            
                    >
                        <Input 
                            type='text'
                            defaultValue='279'    
                            disabled                                 
                        />

                    </Form.Item>

                </Col>

                <Col xs={24} sm={12} md={8} lg={6} xl={10}>

                    <Form.Item  
                        label='Number'  
                        name="serialNumber" 
                        wrapperCol={{
                            span: 16,
                        }}  
                        rules={[
                            {
                                required: true,
                                message: 'Please input AWB Number',
                            },
                            {min: 8}
                        ]}
                        hasFeedback                 
                    >
                        <Input 
                            type='text'
                            placeholder='number'                                           
                        />

                     </Form.Item>

                </Col>                
           
                <Form.Item className='btn'>

                    <Button type="primary" htmlType="submit"  >
                        Submit
                    </Button>

                </Form.Item>
              
            </Form>        
        </Row>

            {
               (Object.entries(booking).length > 0) && <DetalleReserva booking={booking} />          
            } 
       </>
    )
}