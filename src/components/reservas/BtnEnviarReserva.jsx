import { Button, Modal, List } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookings } from '../../api/Bookings';
import { ReservaContext } from './context/reservaContext';

let reserva_a_mostrar = {};

export const BtnEnviarReserva = () => { 
    
    const [reserva_init, setReserva_init] = useContext(ReservaContext); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [enviar, setEnviar] = useState(false);

    const navigate = useNavigate(); 

    reserva_a_mostrar = reserva_init;

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

    const actualizarState = () => {

        setReserva_init({ 
            agentAccountNumber: '',
            airWaybill: {
                prefix: "279",
                referenceType: 'AIR WAYBILL'
            },
            destinationAirportCode: '',
            natureOfGoods: '',
            originAirportCode: '',
            pieces: '',
            segments: [],
            weight:{ amount: '', unit: 'LB' }
        }); 

        reserva_a_mostrar = {};        
    }
    
    const btn_crear_reserva = async () => {
        
        try {  
            
            const respuesta = await Bookings.post('v2', reserva_a_mostrar);            
            actualizarState();   
            // aun no limpia todos los vuelos
            // sigue mostrando los vuelos anteriores
            navigate('/formulario');    
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {}, [reserva_init]);

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
                    
                    (reserva_a_mostrar !== null) && <> 
                        <p> <strong>Origin-Dest:</strong> {reserva_a_mostrar.originAirportCode} - {reserva_a_mostrar.destinationAirportCode}</p>
                        <p> <strong>Account number:</strong> {reserva_a_mostrar.agentAccountNumber}</p>
                        <p> <strong>natureOfGoods:</strong> {reserva_a_mostrar.natureOfGoods}</p>
                        <p> <strong>weight:</strong> {reserva_a_mostrar.weight?.amount} LB</p>
                        <p> <strong>Pieces:</strong> {reserva_a_mostrar.pieces} </p>               
                        <p> <strong>Fligths:</strong></p> 
    
                        <List  className="demo-loadmore-list" itemLayout="horizontal" dataSource={reserva_a_mostrar.segments}
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