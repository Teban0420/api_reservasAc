
import { BtnSelect } from "../ButtonSelect";


/*
    funcion para recorrer el objeto inicial y dar formato 
    a los datos que voy a retornar (para renderizar despues)
*/

export const formatoVuelos = ( listado = [], reserva = {}) => {

    // tomo los segments ahi se encuentra informacion de los vuelos
    let items = [];
    let segment = []; 
  
    listado.forEach( (vuelo, i) => {

        let objeto = {
            key:  '',
            label:  '',
            children:  '',
            vuelo_completo: {}
        }

        // segments contiene toda la info del vuelo que despues envio al crear la reserva
        segment = vuelo.segments
        
        segment.forEach( e => {  

            // objeto.key = e.transportMeans.id
            objeto.key = Math.floor(Math.random() * (100- 1 + 1) + 1) 
            objeto.vuelo_completo = e    

            objeto.label = <span> 
                                <strong style={{color: 'rgba(0,0,0,0.8)'}} onClick={onclick}> 
                                    {e.onload.code}-{e.offload.code}
                                </strong> 
                                &nbsp;
                                <span>
                                    {e.transportMeans.reference}
                                </span>
                            </span> 

                objeto.children =  <span>
                                    {e.transportMeans.scheduledDeparture}     
                                    <br />                                
                                    {e.transportMeans.scheduledArrival}                                                                  
                                    <br />                                
                                     <BtnSelect  
                                            key={e.transportMeans.id} 
                                            segment={ objeto.vuelo_completo } 
                                            reserva={reserva}
                                            
                                    />                            
                                 </span> 
                                                                     
        });
        
        items.push(objeto);       
        
    });

    return items;
   
}