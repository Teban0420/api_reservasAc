import React, {useEffect, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Row, Col, Tabs } from 'antd'
import { LogoutOutlined } from '@ant-design/icons' 
import { ApiContext } from '../../context/ApiContext'
import { Formulario } from './formulario'

const onChange = (key) => {
    console.log(key)
}
export const Reservas = () => {
    
    // uso el context
    const [ auth, guardarAuth ] = useContext(ApiContext)    
    const navigate = useNavigate()

  useEffect( () => {

    if(auth.token === ''){

        navigate('/')
    }
  })

  const salir = () => {  
    
    guardarAuth({
        token: '',
        auth: false
    })

    localStorage.clear()
    
    navigate('/')
  }

    return(
        <>
            <Row className='salir'>
                <Col span={23} align="right">
                    <Button type='primary' danger onClick={salir}>
                        <LogoutOutlined />
                        Salir               
                    </Button>
                </Col>
            </Row>

            <Tabs
                className='tab'
                onChange={onChange}
                type="card"
                items={new Array(1).fill(null).map((_, i) => {
                const id = String(i + 1);
                    return {
                        label: 'Shipment',
                        key: id,
                        children: <Formulario /> ,
                    };
                })}
                
             />      
        </>
    )
} 
  
        
    
