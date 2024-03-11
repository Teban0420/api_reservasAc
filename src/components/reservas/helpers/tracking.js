import { TablaReserva } from '../TablaReserva';

export const tracking = ( booking = {}) => {

    let sumary = [];    

    sumary = [
        `Air Waybill: ${booking.booking.airwaybill.airlinePrefix} - ${booking.booking.airwaybill.serialNumber}`,
        `Status: ${booking.booking.airwaybill.routingSegments[0].actionStatus.description}`,
        `Shipper: `,
        `Consignee: `,
        `Route: ${booking.booking.airwaybill.origin.code} - ${booking.booking.airwaybill.destination.code}`,
        `Pieces/Weight/Volume: ${booking.booking.airwaybill.pieces}/${booking.booking.airwaybill.weight.amount}/ 
                                ${booking.booking.airwaybill.volume.amount}`,
        `Service: `,
        `SCC: `, 
        `Goods: ${booking.booking.airwaybill.natureOfGoods}`,
        <TablaReserva key={1} data={booking.booking.airwaybill.events[0]}/>       
    ]

    return sumary;
}