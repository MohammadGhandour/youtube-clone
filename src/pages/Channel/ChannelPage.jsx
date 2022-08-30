import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChannelCard from '../../components/ChannelCard/ChannelCard';
import Videos from '../../components/Videos/Videos';
import { fetchFromAPI } from '../../utils/fetchFromAPI';
import './ChannelPage.css';

function ChannelPage() {

    const [channelDetails, setChannelDetails] = useState(null);
    const [videos, setVideos] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        fetchFromAPI(`channels?part=snippet&id=${id}`)
            .then(data => {
                setChannelDetails(data?.items[0]);
            })
            .catch(err => {
                console.log(err);
            });

        fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
            .then(data => {
                setVideos(data?.items);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

    return (
        <div className='page channel-page'>
            <div className='gradient'>
                <div className='channel-details-profile-wrapper'>
                    {channelDetails && <ChannelCard channelDetails={channelDetails} />}
                </div>
            </div>
            <div className='channel-page-videos'>
                <Videos videos={videos} classes='channel-page-videos-grid' />
            </div>
        </div>
    )
}

export default ChannelPage;
