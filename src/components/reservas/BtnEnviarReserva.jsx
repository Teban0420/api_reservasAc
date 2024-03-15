import { Button, Modal, List } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookings } from '../../api/Bookings';


export const BtnEnviarReserva = () => { 
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()

    let reserva = localStorage.getItem('reserva_final');
    reserva = JSON.parse(reserva);

    const mostrar = reserva != null ? true : null;    
  
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
            
            const respuesta = await Bookings.post('v2', reserva);            

            if(respuesta.status == 200){
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
               
                <p> <strong>Origin-Dest:</strong> {reserva.originAirportCode} - {reserva.destinationAirportCode}</p>
                <p> <strong>Account number:</strong> {reserva.agentAccountNumber}</p>
                <p> <strong>natureOfGoods:</strong> {reserva.natureOfGoods}</p>
                <p> <strong>weight:</strong> {(reserva.weight.amount) ? reserva.weight.amount : ''} LB</p>
                <p> <strong>Pieces:</strong> {reserva.pieces} </p>               
                <p> <strong>Fligths:</strong></p> 

                <List  className="demo-loadmore-list" itemLayout="horizontal" dataSource={reserva.segments}
                    renderItem={(item) => (
                        <List.Item >        
                            <span>
                                    {item.onload.code} - {item.offload.code} &nbsp;
                                    {item.transportMeans.reference} {item.transportMeans.date} &nbsp;
                                    pieces: {item.pieces}  
                            </span>       
                        </List.Item>
                    )}
                />                                                    
               
            </Modal>
        </div>
    )
}