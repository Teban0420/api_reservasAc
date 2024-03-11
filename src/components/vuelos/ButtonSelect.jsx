
import { useNavigate } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import {  useMemo, useState} from 'react';
import { infoReserva } from './helpers/infoReserva';
import { Bookings } from '../../api/Bookings';


export const BtnSelect = ({segment, reserva}) => {    

    const navigate = useNavigate();    
    const datos = useMemo( () => infoReserva(reserva, segment), [segment]);   
    
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
        
     // navigate('/formulario/booking', {
     //     state: { bookingData: datos}
    // });
    
    const showPopconfirm = () => {
        setOpen(true);
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
            <Popconfirm
                title="Flight"
                description="Seleccionar este vuelo?"
                open={open}
                onConfirm={handleOk}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={handleCancel}
            >

                <Button 
                    type="primary"
                    size='small'
                    onClick={showPopconfirm} 
                    style={{
                        marginLeft: 630
                    }} 
                >
                 SELECT
                 </Button>
            </Popconfirm>

        </>
    )
}