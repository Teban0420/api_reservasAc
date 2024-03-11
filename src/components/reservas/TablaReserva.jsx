import React from 'react';
import { Table } from 'antd';

 const columns = [
  {
    title: 'Flight',
    dataIndex: 'Flight',
  },
  {
    title: 'Date',
    dataIndex: 'Date',
  },
  {
    title: 'Segment',
    dataIndex: 'Segment',
  },
  { 
    title: 'Planned',
    dataIndex: 'Planned',      
  },
  {
    title: 'Pieces',
    dataIndex: 'Pieces',      
  },
  {
    title: 'Weight',
    dataIndex: 'Weight',      
  },
 
];

let filas = [];


export const TablaReserva = (datos = {}) => {

    const { data } = datos;   

    filas = [
        {
            key: '1',
            Flight: `${data.transportMeans.carrier.code} - ${data.transportMeans.transportNumber}`,
            Date: data.transportMeans.date,
            Segment: `${data.onload.code} - ${data.offload.code}`,
            Planned: data.pieces,
            Pieces: `${data.weight.amount}${data.weight.unit}`,
            Weight:`${data.volume.amount}${data.volume.unit}`
        }
    ]
    return(
        <Table
         size="middle"
         className='tabla'
         pagination={false}   
         columns={columns} dataSource={filas} 
        />          
    )
}
