
import React, { useMemo, useState } from 'react';
import { Divider, List, Typography } from 'antd';
import { tracking } from './helpers/tracking';
import { TablaEvents } from './TablaEvents';


export const DetalleReserva = (booking) => { 

  const summary = useMemo( () => tracking(booking), [booking]);
  const events = Object.values(booking.booking.airwaybill.events);   
  const [ mostrar, setMostrar] = useState(false);
 
  const mostrarTabla = () => {
      setMostrar(!mostrar); 
  }
 
    return(
        <>
            <Divider orientation="right">Details</Divider>
              <List
                header={<div><strong>Summary</strong></div>}
                footer={ <button className='btn btn-success' onClick={mostrarTabla}>
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
    
    
      
    
  

