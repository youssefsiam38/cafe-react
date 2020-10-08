import React from 'react'

const Header = (props) => {
    return (
        <header className=" w-full .bg-white h-16 shadow-lg grid grid-cols-3 place-content-around place-items-stretch" >
            <p className="grid grid-cols-1 place-content-center text-left  ml-4 font-sans" style={{color: '#43425D'}} >
                <strong style={{letterSpacing: "6px"}} >CAFE REACT</strong>
            </p>
            { window.location.pathname == '/' ? 
            (
                <button className=" lg:hidden float-right rounded-md h-12 my-4 col-start-3" style={{backgroundColor: '#3B86FF'}}>Add menu item</button>
            ) : ''
            }
        </header>
    )
}

export default Header