import React, {useState, useEffect} from 'react';
import {getMenuItemQuery, editMenuItemMutation} from '../../queries/queries.js'
import { useHistory } from 'react-router-dom'
import { compose, graphql } from "react-apollo";
import {IMAGE_UPLOAD_ROUTE} from '../../keys.js'
import Loading from '../Loading.js';



const Edit = (props) => {
    const history = useHistory()

    const [state, setState] = useState({
        name: '',
        type: '',
        price: '',
        description: '',
        photoURL: ''
        })
        
    useEffect(() => {
        if (!props.getMenuItemQuery.loading) {
            setState({
                name: props.getMenuItemQuery.menuItem.name,
                type: props.getMenuItemQuery.menuItem.type,
                price: props.getMenuItemQuery.menuItem.price,
                description: props.getMenuItemQuery.menuItem.description,
                photoURL: props.getMenuItemQuery.menuItem.photoURL
            })
        }
    }, [props])

    if (props.getMenuItemQuery.loading) {
        return (
            <Loading/>
        )
    }

    const uploadPhoto = (itemID) => {
        const inputFile = document.getElementById('form-photo');
        
        const fd = new FormData();
        fd.append('image', inputFile.files[0]);

        return fetch(IMAGE_UPLOAD_ROUTE + `?id=${itemID}`, {
            body: fd,
            method: "POST"
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.editMenuItemMutation({
            variables: {
                id: props.getMenuItemQuery.menuItem.id,
                name: state.name,
                type: state.type,
                price: state.price,
                description: state.description,
                photoURL: state.photoURL
            }
        }).then((res) => {
            uploadPhoto(props.getMenuItemQuery.menuItem.id).then((imgRes) => {
                if (imgRes.status == 200) {
                    history.push(`/${res.data.editMenuItem.id}`)
                }
            })
        }).catch((e) => {
            console.log(e)
        })
        
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-center text-3xl py-12" style={{color: '#43425D', letterSpacing: "2px"}}>Edit Menu Item</h2>
            <div className="px-2">
                <form className="container grid rows-5 gap-5 w-full max-w-lg mx-auto pb-12" id="form" onSubmit={submitHandler} method="GET">

                    <div>
                        <label className="inline-block w-1/3 mt-3" htmlFor="form-type" style={{color: '#43425D'}}>Type: </label>
                        <select 
                        id="form-type"
                        className="inline-block border-2 rounded p-2 w-4/6 h-12 float-right"
                        style={{borderColor: '#AFB1BC'}}
                        value={state.type}
                        required
                        onChange={(e) => {
                            setState({...state, type: e.target.value})
                        }}>
                            <option value="Main Course">Main Course</option>
                            <option value="Hot Drink" > Hot Drink</option>
                            <option value="Cold Drink">Cold Drink</option>
                            <option value="appetizers" >appetizers</option>
                        </select>
                    </div>
                    <div>
                        <label className="inline-block w-1/3 mt-3" htmlFor="form-name" style={{color: '#43425D'}}>Name: </label>
                        <input id="form-name"
                        className="inline-block border-2 rounded p-2 w-4/6 h-12 float-right"
                        style={{borderColor: '#AFB1BC'}}
                        value={state.name}
                        required
                        onChange={(e) => {
                            setState({...state, name: e.target.value})
                        }} />
                    </div>
                    <div>
                        <label className="inline-block w-1/3 mt-3" htmlFor="form-price" style={{color: '#43425D'}}>Price: </label>
                        <input id="form-price"
                        className="inline-block border-2 rounded p-2 w-4/6 h-12 float-right"
                        style={{borderColor: '#AFB1BC'}}
                        type="number"
                        value={state.price}
                        required
                        onChange={(e) => {
                            setState({...state, price: e.target.value})
                        }} />
                    </div>
                    <div>
                        <label className="inline-block w-1/3 mt-3" htmlFor="form-desc" style={{color: '#43425D'}}>Description: </label>
                        <textarea id="form-desc"
                        className="h-40 inline-block border-2 rounded p-2 w-4/6 h-12 float-right"
                        style={{borderColor: '#AFB1BC'}}
                        value={state.description}
                        required
                        onChange={(e) => {
                            setState({...state, description: e.target.value})
                        }} />
                    </div>
                    <div>
                        <label className="inline-block w-1/3 mt-3" htmlFor="form-photo" style={{color: '#43425D'}}>Photo: </label>
                        <input id="form-photo"
                        type="file"
                        className="inline-block p-2 w-4/6 h-12 float-right"
                        required
                        />
                    </div>
                    <input 
                    className="w-full bg-blue-500 hover:bg-blue-600 h-12 rounded-md text-white"
                    type="submit"
                    value="Save Item"
                    />
                </form>
            </div>
        </div>
    )
}

export default compose(
    graphql(getMenuItemQuery, {
        options: () => {
        const MI_ID = window.location.pathname.split('/')[2]
        console.log(MI_ID)
            return {
                variables: {
                    id: MI_ID
                }
            }
        },
        name: 'getMenuItemQuery'
    }),
    graphql(editMenuItemMutation, {
        name: 'editMenuItemMutation'
    })
)(Edit);