import React, { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar';
import Videos from '../../components/Videos/Videos';
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import './Feed.css';

function Feed({ sideBarOpen, setSideBarOpen }) {

    const [selectedCategory, setSelectedCategory] = useState('New');
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
            .then(data => {
                setVideos(data.items);
            })
    }, [selectedCategory]);

    return (
        <div className='feed page'>
            <SideBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sideBarOpen={sideBarOpen}
                setSideBarOpen={setSideBarOpen}
            />
            <div className='feed-content'>
                <h1>
                    {selectedCategory} <span className='red'>Videos</span>
                </h1>
                <Videos videos={videos} />
            </div>
        </div>
    )
}

export default Feed;
