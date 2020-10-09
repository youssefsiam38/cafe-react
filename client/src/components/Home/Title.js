import React from 'react';
import { useHistory } from 'react-router-dom'

const Title = () => {
    const history = useHistory()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-stretch place-content-center my-8" >
            <h2 className="text-3xl place-self-center md:place-self-start my-auto" style={{color: '#43425D'}} >Menu</h2>
            <button 
            className=" place-self-end hidden md:block rounded-md h-12 my-4 w-1/2 text-white bg-blue-500 hover:bg-blue-600"
            onClick={() => {
                history.push('/add')
            }}
            >Add menu item</button>
        </div>
    )
}

export default Title;