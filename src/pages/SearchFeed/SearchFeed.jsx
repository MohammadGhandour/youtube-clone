import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Videos from '../../components/Videos/Videos';
import { fetchFromAPI } from '../../utils/fetchFromAPI';
import './SearchFeed.css';

function SearchFeed() {

    const [videos, setVideos] = useState([]);

    const { searchTerm } = useParams();

    useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
            .then(data => {
                setVideos(data.items);
            })
    }, [searchTerm]);

    return (
        <div className='page search-feed-page'>
            <h1>
                Search Results for: <span style={{ color: '#FC1503' }}>{searchTerm}</span>
            </h1>
            {videos && <Videos videos={videos} />}
        </div>
    )
}

export default SearchFeed;
