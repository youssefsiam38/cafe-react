import React, {useState, useEffect} from 'react';
import {getMenuItemQuery} from '../../queries/queries.js'
import { graphql } from "react-apollo";
import Loading from '../Loading.js';



const Add = (props) => {

    const [state, setState] = useState({
        name: '',
        type: '',
        price: '',
        description: '',
        photoURL: ''
    })


    const borderRed = () => {
        return " border border-red-500 "
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-center text-3xl py-12" style={{color: '#43425D', letterSpacing: "2px"}}>Add Menu Item</h2>
            <form className="container grid rows-5 gap-5 w-full max-w-lg mx-auto pb-12">
                <div>
                    <label className="inline-block w-1/3 mt-3" htmlFor="form-type" style={{color: '#43425D'}}>Type: </label>
                    <select 
                    id="form-type"
                    className="inline-block border-2 rounded p-2 w-4/6 h-12 float-right"
                    style={{borderColor: '#AFB1BC'}}
                    value={state.type}
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
                    onChange={(e) => {
                        setState({...state, name: e.target.value})
                    }} />
                </div>
                <div>
                    <label className="inline-block w-1/3 mt-3" htmlFor="form-price" style={{color: '#43425D'}}>Price: </label>
                    <input id="form-price"
                    className="inline-block border-2 rounded p-2 w-4/6 h-12 float-right"
                    style={{borderColor: '#AFB1BC'}}
                    value={state.price}
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
                    onChange={(e) => {
                        setState({...state, description: e.target.value})
                    }} />
                </div>
                <div>
                    <label className="inline-block w-1/3 mt-3" htmlFor="form-photo" style={{color: '#43425D'}}>Photo: </label>
                    <input id="form-photo"
                    type="file"
                    className="inline-block p-2 w-4/6 h-12 float-right"
                    />
                </div>
                <input 
                className="w-full bg-blue-500 hover:bg-blue-600 h-12 rounded-md text-white"
                type="submit"
                value="Save Item"
                onClick={(e) => {
                    e.preventDefault()
                }}
                />
            </form>
        </div>
    )
}

export default Add;