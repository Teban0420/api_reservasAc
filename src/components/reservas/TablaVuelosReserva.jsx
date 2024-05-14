// componente para mostrar los vuelos en una reserva que se quiere editar

import { Table } from 'antd';

const columns = [
  {
    title: 'Origin',
    dataIndex: 'Origin',     
  },
  {
    title: 'Destination',
    dataIndex: 'Destination',
  },
  {
    title: 'Flight_No',
    dataIndex: 'Flight_No',
  },
  {
    title: 'Flight_Date',
    dataIndex: 'Flight_Date',
  },
  {
    title: 'Pieces',
    dataIndex: 'Pieces',
  },
  {
    title: 'Weight',
    dataIndex: 'Weight',
  },
  {
    title: 'Volume',
    dataIndex: 'Volume',
  },
];

const data = [];

export const TablaVuelosReserva = (route = []) => {

    const rutas = route.route;     

    rutas.forEach((event, i) => {

        data.push({
            key: i,
            Origin: event.onload.code,
            Destination: event.offload.code,
            Flight_No: event.transportMeans.reference,
            Flight_Date: event.transportMeans.date,
            Pieces: event.pieces,
            Weight: `${event.weight.amount}${event.weight.unit}`,
            Volume: `${event.volume.amount}${event.volume.unit}`
        });
    });

    return(
        <Table            
            columns={columns}
            dataSource={data}  
            pagination={false}   
            scroll={{
                y: 240,
            }}
        />
    )

};
