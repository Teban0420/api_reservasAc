import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd'
import { ApiContext } from '../../context/ApiContext';
import { ApiLogin } from '../../api/login';

export const BtnSalir = () => {

    const [ auth, guardarAuth] = useContext(ApiContext);
    const { username, token } = auth;
    const navigate = useNavigate();

    const salir = async () => {  

        try {
    
          const respuesta = await ApiLogin.post('Authenticate/logout', {
            username,
            token
          });
    
          const { ok } = respuesta.data;
    
          if(ok){
    
            guardarAuth({
              token: '',
              auth: false,
              agents: null,
              username: '',
            });
    
            localStorage.clear()
            
            navigate('/');
          }      
          
        } catch (error) {
          console.log(error);      
        }
        
      }

  return (
    <Button 
        type='primary' 
        danger  
        style={{marginTop: 10, width: '100%'}}
        onClick={salir}                    
    >                      
    Log-out              
    </Button>
  )
}


