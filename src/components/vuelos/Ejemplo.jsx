import { useMemo} from 'react';
import {List } from 'antd';
import { formatoVuelos } from './helpers/formatoVuelos';
import { BtnEnviarReserva } from '../reservas/BtnEnviarReserva';


export const Ejemplo = ({listado, reserva}) => {

  const vuelos = useMemo( () => formatoVuelos(listado, reserva), [listado]);  

  let reserva_final = localStorage.getItem('reserva_final');
  reserva_final = JSON.parse(reserva_final);
   
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

    {
      (!reserva_final == '') && <BtnEnviarReserva />
    }
      
    </>
  );
};
