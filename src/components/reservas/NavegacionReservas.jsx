import React, { useContext, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { UploadOutlined, RightSquareTwoTone, CalendarOutlined , HomeOutlined, MenuOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { ApiContext } from '../../context/ApiContext';
import { Formulario, Reserva, Home, ListBookings, Booking } from './index';
import { ReservaProvider } from './context/reservaContext';
import { BtnSalir } from '../ui/BtnSalir';
import { Spinner } from '../ui/Spinner';


const { Header, Sider, Content } = Layout;

export const NavegacionReservas = () => {

  const [ auth, guardarAuth] = useContext(ApiContext);
  const { username } = auth

  const [collapsed, setCollapsed] = useState(false); 
  const [showSpineer, setShowSpinner] = useState(false); 
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleCollapsed = () => {

    if(window.innerWidth > 768 && !collapsed)  return;
    setCollapsed(!collapsed);

  };

  return (
    <Layout style={{ minHeight: '100vh' }}>

      <Sider 
         collapsible
         collapsed={collapsed}
         onCollapse={toggleCollapsed}
         breakpoint="lg"
         collapsedWidth="0"
         trigger={null}         
         style={{backgroundColor: '#2843A0'}}
      >

        <div className="demo-logo-vertical" />

          <img 
            height='50rem' 
            width='100%' 
            style={{marginTop: '1rem', marginBottom: '1rem'}} 
            src={require('../ui/img/logo.png')} 
            alt="Logo" 
          />
      
          <Menu
            theme="dark"
            style={{backgroundColor: '#2843A0', fontSize: '17px', fontWeight: 'bold'}}
            mode="vertical"
            defaultSelectedKeys={['1']}
            items={[
              {
                label: <Link to="/formulario" onClick={toggleCollapsed}>Home</Link>,
                key: '1',
                icon: <HomeOutlined  />,
              },
              {
                label: <Link to="/formulario/new" onClick={toggleCollapsed}>New Booking</Link>,
                key: '2',
                icon: <RightSquareTwoTone />,
              },
              {              
                label: <Link to="/formulario/bookings" onClick={toggleCollapsed}>Bookings</Link>,
                key: '3',
                icon: <UploadOutlined />,
              },
              {
                label: <Link to="/formulario/tracking" onClick={toggleCollapsed}>Tracking</Link>,
                key: '4',
                icon: <CalendarOutlined />,
              },
              {
                label: <BtnSalir  showSpineer={showSpineer} setShowSpinner={setShowSpinner} />,
                key: '5',                
              },
            ]}
          />
 
       
      </Sider>

      <Layout>

        <Header
          style={{
            padding: 0,
            height: '10%',
            background: colorBgContainer,
          }}
        >

      {
          (collapsed) && (

              <Button type="text" onClick={toggleCollapsed} style={{ marginTop: 10 }}>
                <MenuOutlined />
              </Button>            
          ) 
          
      }
          <p className='header'>  
            {( username ? username : '')}
          </p>

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

              { 
                (showSpineer) && <Spinner />
              }
  
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
