import React, { useState } from 'react';

export const ReservaContext = React.createContext([{}, () => {}]);

export const ReservaProvider = props => {

    const [reserva_init, setReserva_init] = useState({});

    return (
        < ReservaContext.Provider value={[reserva_init, setReserva_init]}> 
            {props.children}
        </ReservaContext.Provider>
    )
}