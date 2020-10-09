import React from 'react'
import { useHistory } from 'react-router-dom'

const Header = (props) => {
    const history = useHistory()

    let gotoHome = (e) => {
        history.push("/");
    }
    return (
        <header className=" w-full bg-white h-16 shadow-lg grid grid-cols-3 place-content-around place-items-stretch" >
            <p 
                className="font-bold grid grid-cols-1 place-content-center text-left  ml-4 font-sans text-center cursor-pointer"
                style={{color: '#43425D', letterSpacing: "6px"}}
                onClick={gotoHome}
            >
                CAFE REACT
            </p>
            { window.location.pathname === '/' ?
            (
                <button
                className="md:hidden float-right rounded-md h-12 my-4 col-start-3 text-white mr-4 bg-blue-500 hover:bg-blue-600"
                onClick={(e) => {
                    history.push("/add");
                }}
                >Add menu item</button>
            ) : ''
            }
        </header>
    )
}

export default Header