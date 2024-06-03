import React, { useState } from 'react';
import { Reserva } from '../reservas'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Select, Space } from 'antd';

const { Option } = Select;


export const TrackingHome = ({ open, setOpen }) => {

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>

      <Drawer
        title= {<p style={{fontSize: 22}}>Track My Shipment <i className="fa-solid fa-plane fa-xl" style={{color: '#1D2758', paddingLeft: 10}}></i></p>}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose} style={{backgroundColor: '#1D2758', color: 'white'}}>Cancel</Button>
          </Space>
        }
      >
        
       <Reserva />

      </Drawer>
    </>
  );
}

 
