import React, { useState } from 'react';

export const ReservaContext = React.createContext([{}, () => {}]);

export const ReservaProvider = props => {

    const [reserva_init, setReserva_init] = useState({
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

    return (
        < ReservaContext.Provider value={[reserva_init, setReserva_init]}> 
            {props.children}
        </ReservaContext.Provider>
    )
}