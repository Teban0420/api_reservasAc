
export const infoReserva = (datos, segment)  => {

    const newData = {
        ...datos,
        'segments': [segment]
    }

    return newData;

}