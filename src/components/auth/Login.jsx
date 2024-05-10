import { useContext } from 'react'
import { Button,  Form, Input, Typography } from 'antd';
import { ApiContext } from '../../context/ApiContext';
import { useNavigate, Link  } from 'react-router-dom';
const { Title} = Typography


export const Login = () => {

  const [ auth, guardarAuth ] = useContext(ApiContext)

  const navigate = useNavigate();  

  const onFinish = ({username, password}) => {

    // hacer peticion fecth para login

    // try {
      
    // } catch (error) {
      
    // }
    
    localStorage.setItem('token', 'ABUKSIU35698751236')
    guardarAuth({
        token: 'ABUKSIU35698751236',
        auth: true
    });

    navigate('/formulario')
    
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