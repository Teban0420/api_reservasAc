import React, { useContext, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, 
         RightSquareTwoTone, CalendarOutlined , HomeOutlined } from '@ant-design/icons';

import { Layout, Menu, Button, theme } from 'antd';

import { ApiContext } from '../../context/ApiContext';
import { Formulario, Reserva, Home, ListBookings, Booking } from './index';
import { ReservaProvider } from './context/reservaContext';


const { Header, Sider, Content } = Layout;

export const NavegacionReservas = () => {

  const [ auth, guardarAuth] = useContext(ApiContext);
    
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const salir = () => {  
    
    guardarAuth({
        token: '',
        auth: false
    })

    localStorage.clear()
    
    navigate('/');
  }

  return (
    <Layout>

      <Sider trigger={null} collapsible collapsed={collapsed}>

        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              label: <Link to="/formulario">Home</Link>,
              key: '1',
              icon: <HomeOutlined  />,
            },
            {
              label: <Link to="/formulario/new">New Booking</Link>,
              key: '2',
              icon: <RightSquareTwoTone />,
            },
            {              
              label: <Link to="/formulario/bookings">Bookings</Link>,
              key: '3',
              icon: <UploadOutlined />,
            },
            {
              label: <Link to="/formulario/tracking">Tracking</Link>,
              key: '4',
              icon: <CalendarOutlined />,
            },
          ]}
        />
      </Sider>

      <Layout>

        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          <Button 
              type='primary' 
              danger  
              onClick={salir}
              style={{
                marginLeft: '85%'
              }}
            >                      
              Log-out              
            </Button>

        </Header>

            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 490,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
  
              <ReservaProvider>
                <Routes>
                  <Route path='/' Component={Home}/>             
                  <Route path='/new' Component={Formulario}/>             
                  <Route path='/bookings' Component={ListBookings}/>             
                  <Route path='/booking' Component={Booking}/>             
                  <Route path='/tracking' Component={Reserva}/>             
                </Routes>              
              </ReservaProvider>
              
            </Content>
      </Layout>
    </Layout>
  );
};
