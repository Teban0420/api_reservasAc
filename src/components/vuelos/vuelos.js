import React from 'react';
import { List } from 'antd';

export const Vuelos = ({disponible}) => {


    return(
     
        <List.Item key={disponible.id}>
            <List.Item.Meta
                title={<p>{disponible.origin}</p>}
                description={disponible.date}
            />
            <div>Content</div>
        </List.Item>

    )
}