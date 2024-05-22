import { Availability } from '../../../api/Availability';

export const AvailabilityObj = async ( destination, origin, totalWeight) => {
    
   const accountNumber = '14000110001';
   const carrierCodes = 'B6';

   const url = `availability?accountNumber=${accountNumber}&carrierCodes=${carrierCodes}&originAirportCode=${origin}&destinationAirportCode=${destination}&departureOn=2024-02-26&weight=${totalWeight}`;

    try {

        const respuesta = await Availability.get(url);  

        return respuesta.data.routes;   
        
    } catch (error) {
        console.log(error) 
        return [];          
        
    }    

}


