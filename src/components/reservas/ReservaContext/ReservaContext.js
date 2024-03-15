import React, { useState } from 'react';


export const ReservaContext = React.createContext([{}, () => {}]);

export const ReservaProvider = props => { 

    // estado inicial de la reserva
    const [reservaInicial, setReservaInicial] = useState({});

    return(
        <ReservaContext.Provider value={[reservaInicial, setReservaInicial]}>
            {props.children}
        </ReservaContext.Provider>
    )
}