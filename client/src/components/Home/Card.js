import React from 'react';
import { useHistory } from 'react-router-dom'
import { graphql, compose } from "react-apollo";
import {deleteMenuItemMutation} from '../../queries/queries.js'

const Card = (props) => {
    const history = useHistory()

    const gotoEdit = (e) => {
        if (!e) e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        history.push(`/edit/${props.id}`);
    }
    const deleteHandler = (e) => {
        if (!e) e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        props.deleteMenuItemMutation({
            variables: {
              id: props.id
        } }).then((res) => {
            // renrender the DisplayMenu component after deletion
            props.reRender(res.data.deleteMenuItem.id);
        }).catch((e) => {
            alert('somthing went wrong with deletion')
        })

        // props.reRender();

    }
    const gotoMenuItem = () => {
        history.push(`/${props.id}`);
    }
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:bg-gray-200 cursor-pointer" onClick={gotoMenuItem}>
            <img className="w-full h-64" src={props.photoURL} alt="Sunset in the mountains"/>
            <div className="px-6 py-4" style={{color: "#888A94"}} >
                <p className="text-gray-700 text-base inline-block cursor-text" style={{color: "#888A94"}} >{props.type.toUpperCase()}</p>
                <br/>
                <span className="float-right text-lg font-bold cursor-text " >${props.price}</span>
                <div className="font-bold text-2xl mb-2 inline-block cursor-text" style={{color: '#43425D'}}>{props.name}</div>
                <div className="grid grid-cols-2 place-items-stretch gap-6" >
                    <button className="bg-green-400 hover:bg-green-600 rounded-md text-white h-8" onClick={gotoEdit}>Edit</button>
                    <button className="bg-red-600 hover:bg-red-700 rounded-md text-white h-8" onClick={deleteHandler} >Delete</button>
                </div>
            </div>
        </div>
    )
}

export default compose(
    graphql(deleteMenuItemMutation, {name: "deleteMenuItemMutation"})
  )(Card);