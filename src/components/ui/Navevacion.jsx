import { HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { Layout, Menu, theme} from 'antd';
import {Link } from 'react-router-dom';

const { Header } = Layout;

export const Navegacion = () => {

    const {
        token: { colorBgContainer },
      } = theme.useToken();

    const items = [
      {
        label: <Link to="/pages/">Home</Link>,
        key: 1,
        icon: <HomeOutlined />
      },
      {
        label: <Link to="/pages/about">About</Link>,
        key: 2
      },
      {
        label: <Link to="/pages/contact">Contact</Link>,
        key: 3
      },
      {
        label: <Link to="/login" >Login</Link>,
        key: 4,
        icon: <LoginOutlined />
      }      
    ];
    
    return(
        
      <Layout className="layout">
                
          <Header
              style={{
              display: 'flex',
              alignItems: 'center',
              }}
          >
              <div className="demo-logo" />                    
                
                  <Menu
                      theme="dark"
                      mode="horizontal"
                      defaultSelectedKeys={['1']}
                      items= {items}
                  />  

          
          </Header>  

      </Layout>
        
    )
}