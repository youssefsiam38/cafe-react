import React, {useEffect} from 'react';
import { graphql, compose } from "react-apollo";
import {getMenuItemQuery, deleteMenuItemMutation} from '../../queries/queries.js'
import Loading from '../Loading.js';
import { useHistory } from 'react-router-dom'

const MenuItem = (props) => {
    const history = useHistory()
    const MI_ID = props.match.params.id
    const menuItem = props.data.menuItem

    useEffect(() => {
        props.data.refetch()
    }, [])

    if(props.data.loading) {
        return (
            <Loading/>
        )
    }


    
    const gotoEdit = (e) => {
        if (!e) e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        history.push(`/edit/${menuItem.id}`);
    }
    const deleteHandler = (e) => {
        if (!e) e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        props.deleteMenuItemMutation({
            variables: {
              id: menuItem.id
        } }).then((res) => {
            // redirect to the main menu
            // window.location.href = `/`;
            history.push('/?deleted=true');
        }).catch((e) => {
            alert('somthing went wrong with deletion')
        })
    }
    return (
        <div className="py-24 px-4 md:px-24 grid grid-cols-1 md:grid-cols-2">
            <img className="border-4 mx-auto" style={{borderColor: "#43425D", height: 440}} src={menuItem.photoURL}/>
            <div>
            <div className="px-6 py-4" style={{color: "#888A94"}} >
                <p className="text-gray-700 text-base inline-block cursor-text mb-8" style={{color: "#888A94"}} >{menuItem.type.toUpperCase()}</p>
                <br/>
                <span className="float-right text-lg font-bold cursor-text " >${menuItem.price}</span>
                <div className="font-bold text-xl mb-8 inline-block cursor-text" style={{color: '#43425D'}}>{menuItem.name}</div>
                <br/>
                <label>Description: </label>
                <div id="desc" className="my-auto mb-24">
                    <p className="mt-4" style={{color: '#43425D'}} >{menuItem.description}</p>
                </div>
                <div className="grid grid-cols-2 place-items-stretch gap-6" >
                    <button className="bg-green-400 hover:bg-green-600 rounded-md text-white h-8" onClick={gotoEdit}>Edit</button>
                    <button className="bg-red-600 hover:bg-red-700 rounded-md text-white h-8" onClick={deleteHandler} >Delete</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default compose(
    graphql(getMenuItemQuery,  {
        options: (props) => {
        const MI_ID = props.match.params.id
        return {
            variables: {
                id: MI_ID
            }
        }
    }}),
    graphql(deleteMenuItemMutation,  {
        name: 'deleteMenuItemMutation'
    })
)(MenuItem)