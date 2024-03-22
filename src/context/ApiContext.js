
import React, {useState} from 'react'

export const ApiContext = React.createContext([{}, () => {}]);  

export const ApiProvider = props => {

    // estado inicial
    const [auth, guardarAuth ] = useState({
        token: '',
        auth: false
    })
     
    return (
        <ApiContext.Provider value={[auth, guardarAuth]} >
            {props.children}
        </ApiContext.Provider>
    )
}