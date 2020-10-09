import React from 'react'
import { graphql } from "react-apollo";
import { getMenuItemsQuery } from '../../queries/queries.js'
import Card from './Card.js'
import Loading from '../Loading.js'

const DisplayMenu = (props) => {
    if (props.data.loading) {
        return (<Loading/>)
    }
    return (
        <div className=" place-items-center md:place-items-stretch grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {props.data.menuItems.map((menuItem) => {
                return (<Card key={menuItem.id} id={menuItem.id} name={menuItem.name} price={menuItem.price} type={menuItem.type} photoURL={menuItem.photoURL} />)
            })}
        </div>
    )
};

export default graphql(getMenuItemsQuery)(DisplayMenu);