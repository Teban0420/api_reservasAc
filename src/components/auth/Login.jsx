import { useContext } from 'react'
import { useNavigate, Link  } from 'react-router-dom';
import { Button,  Form, Input, Typography } from 'antd';
import { ApiContext } from '../../context/ApiContext';
import { ApiLogin } from '../../api/login';

const { Title} = Typography

export const Login = () => {

  const [ auth, guardarAuth ] = useContext(ApiContext)

  const navigate = useNavigate();  

  const onFinish = async ({username, password}) => {

    // hacer peticion fecth para login

    try {

      const respuesta = await ApiLogin.get(`Authenticate/login?username=${username}&password=${password}`);
      const { sessionId, agents, usr } = respuesta.data;

      localStorage.setItem('token', sessionId);

      guardarAuth({
          token: sessionId,
          auth: true,
          agents,
          usr,
      });
      

     navigate('/formulario');

      
    } catch (error) {
      
      
    }  
    
    
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const volver = () => {
      navigate('/');
  }

    return(
      <>
      <div className="container"> 
        <div className='formulario'>                

        <Title level={2} >Login</Title> 
          
          <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 8,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
          >
          <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
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
                message: 'Please input your password!',
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

      <Link 
         className='link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover p-3'
         to="/"
      >
         Home
      </Link>      

        <Button 
          type="primary" 
          htmlType="submit"
        >
          Submit
        </Button>


      </Form.Item>
    </Form> 

      </div>
    </div> 
      </>
    )
}