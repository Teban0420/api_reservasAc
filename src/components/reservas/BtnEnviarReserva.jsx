import { Button, Modal, List } from 'antd';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookings } from '../../api/Bookings';
import { ReservaContext } from './context/reservaContext';


export const BtnEnviarReserva = () => { 
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); 

    const [reserva_init, setReserva_init] = useContext(ReservaContext);
  
    const showModal = () => {
      setIsModalOpen(true);     
    };
    
    const handleOk = () => {
        btn_crear_reserva();
        setIsModalOpen(false);       
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const btn_crear_reserva = async () => {

        try {            
            const respuesta = await Bookings.post('v2', reserva_init);   
            
            console.log(respuesta.data)
            return

            if(respuesta.status == 200){

                // TODO:  actualizar estado del context

                // mostrar datos de la reserva creada 
                navigate('/formulario');
            }

        } catch (error) {
            console.log(error);
        }
    }

    return(

        <div 
            style={{
                display: 'flex', 
                flexDirection: 'row',  
                justifyContent: 'flex-end',    
                paddingTop: '20px'                         
            }}
        > 
            <Button
                style={{backgroundColor: '#5cb85c', color: 'white'}} 
                htmlType="submit" 
                onClick={showModal}                                       
            >
                Enviar
            </Button>


            <Modal title="BOOKING" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <br />

                {
                    (reserva_init !== null) && <> 
                        <p> <strong>Origin-Dest:</strong> {reserva_init.originAirportCode} - {reserva_init.destinationAirportCode}</p>
                        <p> <strong>Account number:</strong> {reserva_init.agentAccountNumber}</p>
                        <p> <strong>natureOfGoods:</strong> {reserva_init.natureOfGoods}</p>
                        <p> <strong>weight:</strong> {reserva_init.weight?.amount} LB</p>
                        <p> <strong>Pieces:</strong> {reserva_init.pieces} </p>               
                        <p> <strong>Fligths:</strong></p> 
    
                        <List  className="demo-loadmore-list" itemLayout="horizontal" dataSource={reserva_init.segments}
                            renderItem={(item) => (
                                <List.Item >        
                                    <span>
                                            {item.onload.code} - {item.offload.code} &nbsp;
                                            {item.transportMeans.reference} {item.transportMeans.date} &nbsp;
                                            pieces: {item.pieces}  &nbsp;
                                            weight: {item.weight.amount}  &nbsp;
                                            volume: {item.volume.amount}  
                                    </span>       
                                </List.Item>
                            )}
                        />  
                    </>               
                    
                }
                                                
               
            </Modal>
        </div>
    )
}