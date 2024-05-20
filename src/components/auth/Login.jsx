import { useContext, useState } from 'react'
import { useNavigate, Link  } from 'react-router-dom';
import { Button,  Form, Input, Typography, message} from 'antd';
import { ApiContext } from '../../context/ApiContext';
import { ApiLogin } from '../../api/login';
import { MsgError } from '../ui/MsgError';
import { Spinner } from '../ui/Spinner';


const { Title} = Typography

export const Login = () => {

  const [ auth, guardarAuth ] = useContext(ApiContext);
  const [showError, setShowError] = useState(false);

  const [btnEnviar, setBtnEnviar] = useState(false);
  const navigate = useNavigate();  
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async ({user, password}) => {
    
    try {
      
      setBtnEnviar(true);
      
      const respuesta = await ApiLogin.post('Authenticate/login', {
        username: user,
        password
      });

      const { sessionid, agents, username } = respuesta.data;

      localStorage.setItem('token', sessionid);
      
      guardarAuth({
            token: sessionid,
            auth: true,
            agents,
            username,
      });      
        
      navigate('/formulario');
      
    } catch (error) {     

      setShowError(true); 
      msgError();    
      
    }     
    
  };
  
  const msgError = () => {
      messageApi.open({
        type: 'error',
        content: 'Something Wrong'
    });
  }

    return(
      <>
    
      <div className="container-sm text-center "> 

        <div className='login'>  
                   
        <div className='logo'>
          <img  width='250' height='70' src={require('../ui/img/logo.png')} alt="Logo" />
        </div>

        {
          (showError) && <MsgError msg={contextHolder}  />                     
        }

        {/* <Title level={2} style={{color: 'white'}}>Login</Title>  */}
          
         <br />
         <br />
          <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 8,
              }}
              onFinish={onFinish}
              autoComplete="off"
          >
          <Form.Item          
              label="Username"
              name="user"               
              rules={[
                {
                  required: true,
                  message: 'Input username',
                },
              ]}
          >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Input password',
              },
            ]}
        >
      <Input.Password />
      </Form.Item>

      <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
      >

        <Button 
          type="primary" 
          htmlType="submit"
          style={{backgroundColor: 'white', marginTop: '1rem', color: '#2843A0'}}
          disabled={btnEnviar}
        >
          Send
        </Button>


      </Form.Item>
    </Form> 

      </div>
    </div> 
      </>
    )
}