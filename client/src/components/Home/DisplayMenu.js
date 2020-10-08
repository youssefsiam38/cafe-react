import React from 'react'
import { graphql, compose } from "react-apollo";
import { getMenuItemsQuery } from '../../queries/queries.js'
import Card from './Card.js'

const DisplayMenu = (props) => {
    if (props.data.loading) {
        return (<div>loading..</div>)
    }
    return (
        <div className=" place-items-center md:place-items-center grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {props.data.menuItems.map((menuItem) => {
                return (<Card key={menuItem.id} />)
            })}
        </div>
    )
};

export default graphql(getMenuItemsQuery)(DisplayMenu);