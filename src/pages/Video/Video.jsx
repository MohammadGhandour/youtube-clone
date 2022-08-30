import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Video.css';
import { fetchFromAPI } from '../../utils/fetchFromAPI';
import Loader from '../../components/Loader/Loader';
import ReactPlayer from 'react-player';
import Videos from '../../components/Videos/Videos';

function Video() {

    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState(null);
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);

    function copyLink() {
        navigator.clipboard.writeText(window.location.href);
    }

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
            .then(data => {
                setVideo(data.items[0]);
                fetchFromAPI(`channels?part=snippet&id=${data.items[0].snippet.channelId}`)
                    .then(data => {
                        setChannel(data.items[0]);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })

        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then(data => {
                setRelatedVideos(data.items);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

    if (loading) {
        return (
            <div className="page">
                <Loader />
            </div>
        )
    } else {

        const {
            snippet: { title },
            statistics: { viewCount, likeCount }
        } = video;

        return (
            <div className='video-page page'>
                <div className="video-container">
                    <div className='player-wrapper'>
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            className='react-player'
                            controls
                            width='100%'
                            height='100%'
                        />
                    </div>
                    {channel &&
                        <div className='video-infos'>
                            <div id='stats'>
                                <h3>{title}</h3>
                                <div className='stats'>
                                    <h4 className='views'>{parseInt(viewCount).toLocaleString()} Views</h4>
                                    <div className='flex-center g3'>
                                        <h4>
                                            <i className='fa-solid fa-thumbs-up'></i>
                                            {parseInt(likeCount).toLocaleString()}
                                        </h4>
                                        <h4 className='share-video' onClick={copyLink}>
                                            <i className="fa-solid fa-share"></i>
                                            Share
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div className="channel-info-description">
                                <Link to='/' className='flex g2'>
                                    <img src={channel.snippet.thumbnails.medium.url} alt="channel logo" className='channel-logo' />
                                    <h3>{channel.snippet.title}</h3>
                                </Link>
                                <p className='description'>{video.snippet.description}</p>
                            </div>
                        </div>
                    }
                </div>
                <div className="related-videos-wrapper">
                    <Videos videos={relatedVideos} classes='related-videos-grid' />
                </div>
            </div>
        )
    }
}

export default Video;
