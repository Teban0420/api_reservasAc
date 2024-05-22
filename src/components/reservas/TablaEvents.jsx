import { Table } from 'antd';

const columns = [
  {
    title: 'UTC Time',
    dataIndex: 'UTC_Time',     
  },
  {
    title: 'Event',
    dataIndex: 'Event',
  },
  {
    title: 'Pcs/Wt',
    dataIndex: 'Weight',
  },
  {
    title: 'Details',
    dataIndex: 'Details',
  },
];

const data = [];

export const TablaEvents = (eventos = []) => {

    const { events } = eventos;

    events.forEach((event, i) => {

        data.push({
            key: i,
            UTC_Time: event.time,
            Event: `${event.onload.code}-${event.offload.code} ${event.actionStatus.description}`,
            Weight: `${event.pieces}/${event.weight.amount}${event.weight.unit}`,
            Details: event.transportMeans.reference
        });
    });

    return(
        <Table                   
            columns={columns}
            dataSource={data}  
            pagination={false}  
            style={{
              borderSpacing: 0,
              maxWidth: 1000
            }} 
            scroll={{
                y: 240,
                x: true
            }}
  
        />
    )

};
