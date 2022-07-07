import React from 'react';
import SearchBar from '../Components/SearchBar';
import "../styles/home.css"
import HomeLeft from '../Components/HomeLeft';

const Home = () => {

    return (
        <div className="partition-container">
            <div className="home-left-div partition-container-left">
                <HomeLeft />
            </div>
            <div className="search-bar-div partition-container-right">
                <SearchBar />
            </div>
        </div>
    );
}

export default Home;