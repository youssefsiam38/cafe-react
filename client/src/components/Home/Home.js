import React from 'react';
import Title from './Title.js';
import DisplayMenu from './DisplayMenu.js'


const Home = (props) => {
    return (
        <div className=" container mx-auto" >
            <Title/>
            <DisplayMenu />
        </div>
    )
};

export default Home