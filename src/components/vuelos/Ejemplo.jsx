import { useMemo} from 'react';
import {List } from 'antd';
import { formatoVuelos } from './helpers/formatoVuelos';


export const Ejemplo = ({listado, reserva, btnEnviarReserva = false, setBtnEnviarReserva = null}) => {

  // const vuelos = useMemo( () => formatoVuelos(listado, reserva), [listado]);  
  const vuelos = useMemo( () => formatoVuelos(listado, reserva, btnEnviarReserva, setBtnEnviarReserva));  


  return (
    <>    
      <List
          className="demo-loadmore-list"     
          itemLayout="horizontal"      
          dataSource={vuelos}
          renderItem={(item) => (

            <List.Item >        
              <div>
                  {item.label} {item.children} 
              </div>       
            </List.Item>
          )}
      />   
    </>
  );
};
