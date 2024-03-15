import { Button, Modal } from 'antd';
import { useContext, useState } from 'react';
import { ReservaContext } from './ReservaContext/ReservaContext';


export const BtnEnviarReserva = () => {

    const [ reservaInicial, setReservaInicial ] = useContext(ReservaContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
      console.log(reservaInicial.segments)
    };
    
    const handleOk = () => {
        setIsModalOpen(false);        
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

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
                <p> <strong>Origin-Dest:</strong> {reservaInicial.originAirportCode} - {reservaInicial.destinationAirportCode}</p>
                <p> <strong>Account number:</strong> {reservaInicial.agentAccountNumber}</p>
                <p> <strong>natureOfGoods:</strong> {reservaInicial.natureOfGoods}</p>
                <p> <strong>weight:</strong> {reservaInicial.weight.amount} LB</p>
                <p> <strong>Pieces:</strong> {reservaInicial.pieces} </p>
                <span> 
                    <strong>Fligths:</strong> 
                        {
                            reservaInicial.segments.map( vuelo => (
                                <p> {vuelo.onload.code} - {vuelo.offload.code} 
                                    {vuelo.transportMeans.reference} {vuelo.transportMeans.date} 
                                    pieces: {vuelo.pieces}
                                    weight: {vuelo.weight.amount}
                                    volume: {vuelo.volume.amount}
                                </p>
                                                              
                            ))
                        }                                  
                </span>
               
                {/* <span>
                </span> */}
            </Modal>
        </div>
    )
}