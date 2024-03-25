import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export const Booking = () => {

    const location = useLocation();
    const { r = ''} = queryString.parse( location.search);

    const bookingObj = JSON.parse(r);   

    return(
        <h1>Booking </h1>
    )
}