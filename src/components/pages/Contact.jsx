import React, {  useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../context/ApiContext'
import { useNavigate } from 'react-router-dom'

export const Contact = () => {

    // const navigate = useNavigate()

    const [ info, guardarInfo ] = useState({})

    // uso el context
    // const [ auth, guardarAuth ] = useContext(ApiContext)

    return(
        
        <h1>
            Contact
        </h1>
        
    )
}