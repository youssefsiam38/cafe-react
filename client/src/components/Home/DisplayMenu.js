import React from 'react'
import { graphql, compose } from "react-apollo";
import { getMenuItemsQuery } from '../../queries/queries.js'

const DisplayMenu = (props) => {
    if (props.data.loading) {
        return ( <div>loading..</div> )
    }
    return props.data.menuItems.map((menuItem) => {
        return ( <div key={menuItem.id} >{menuItem.name}</div> )
    })
};

export default graphql(getMenuItemsQuery)(DisplayMenu);