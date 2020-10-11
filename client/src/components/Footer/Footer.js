import React from 'react'
import { useHistory } from 'react-router-dom'

const Header = (props) => {
    const history = useHistory()

    let gotoHome = (e) => {
        history.push("/");
    }
    return (
        <footer className=" w-full mt-8 bg-white h-16 shadow-lg grid grid-cols-1 place-content-around place-items-stretch" >
            <p 
                className="font-bold text-center font-sans text-center"
                style={{color: '#43425D'}}
                onClick={gotoHome}
            >
                Copyright © <a href="https://github.com/youssefsiam38" style={{color: '#3182CE'}} >Youssef Siam</a>
            </p>
            <p 
                className="text-sm text-center text-center"
                style={{color: '#43425D'}}
            >
                This is a test project
            </p>
        </footer>
    )
}

export default Header