import React, {useState, useEffect} from 'react'
import { graphql } from "react-apollo";
import { useHistory } from 'react-router-dom'
import { getMenuItemsQuery } from '../../queries/queries.js'
import Card from './Card.js'
import Loading from '../Loading.js'

const DisplayMenu = (props) => {
    const history = useHistory();
    const [menuItemsState, setMenuItemsState] = useState([])


    useEffect(() => {

        if (!props.data.loading) {
            // if (history.location.search.includes('deleted=')) {
                props.data.refetch()
            // }
            setMenuItemsState(props.data.menuItems)
        }
    }, [props])


    if (props.data.loading) {
        return (<Loading/>)
    }

    const reRender = (id) => {

        let reRenderedItems = menuItemsState.filter((mi) => mi.id != id)
        
        setMenuItemsState(reRenderedItems)
    }

    return (
        <div className=" place-items-center md:place-items-stretch grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {menuItemsState.map((menuItem) => {
                return (<Card key={menuItem.id} id={menuItem.id} name={menuItem.name} price={menuItem.price} type={menuItem.type} photoURL={menuItem.photoURL} reRender={reRender} />)
            })}
        </div>
    )
};

export default graphql(getMenuItemsQuery)(DisplayMenu);