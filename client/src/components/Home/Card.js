import React from 'react';

const Card = (props) => {
    const gotoEdit = () => {
        window.location.href = "/edit";
    }
    const gotoDelete = () => {
        window.location.href = "/delete";
    }
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:bg-gray-200 cursor-pointer">
            <img className="w-full h-64" src="/me.jpg" alt="Sunset in the mountains"/>
                <div className="px-6 py-4" style={{color: "#888A94"}} >
                    <p className="text-gray-700 text-base inline-block cursor-text" style={{color: "#888A94"}} >{"Lorem ipsum dolor".toUpperCase()}</p>
                    <span className="float-right text-lg font-bold cursor-text " >${5}</span>
                    <div className="font-bold text-xl mb-2 inline-block cursor-text" style={{color: '#43425D'}}>The Coldest Sunset</div>
                    <div className="grid grid-cols-2 place-items-stretch gap-6" >
                        <button className="bg-green-400 hover:bg-green-600 rounded-md text-white h-8" onClick={gotoEdit}>Edit</button>
                        <button className="bg-red-600 hover:bg-red-700 rounded-md text-white h-8" onClick={gotoDelete} >Delete</button>
                    </div>
                </div>
        </div>
    )
}

export default Card