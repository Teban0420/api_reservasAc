
import React, { useMemo, useState } from 'react';
import { Divider, List } from 'antd';
import { tracking } from './helpers/tracking';
import { TablaEvents } from './TablaEvents';


export const DetalleReserva = (booking) => { 

  const summary = useMemo( () => tracking(booking), [booking]);
  const events = Object.values(booking.booking.airwaybill.events);  

  const [ mostrar, setMostrar ] = useState(false);
 
  const mostrarTabla = () => {
      setMostrar(!mostrar); 
  }
 
    return(
        <>
            <Divider orientation="right">Details</Divider>
              <List
                  style={{
                    maxWidth: 1000,
                }}
                header={<div><strong style={{fontSize: 16}}>Summary</strong></div>}
                footer={ <button className='btn btn-success' onClick={mostrarTabla} style={{backgroundColor: '#1D2758', color: 'white'}}>
                            Show
                          </button>                        
                        }                        
                bordered
                dataSource={summary}
                renderItem={(item) => (
                    <List.Item>              
                    {item}
                    </List.Item>
                )}
              />
              {
                (mostrar) && <TablaEvents events={events} />     
              }  
      </>
    )
}
    
    
      
    
  

