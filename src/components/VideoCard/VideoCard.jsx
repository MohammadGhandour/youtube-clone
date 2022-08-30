import React from 'react';
import './VideoCard.css';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useNavigate } from 'react-router-dom';

function VideoCard({ video, classes }) {

    const navigate = useNavigate();

    function goTo(type, id) {
        navigate(`/${type}/${id}`)
    }

    if (video.id) {
        return (
            <div className={classes ? classes : 'video-card'}>
                <img
                    src={video?.snippet?.thumbnails?.medium?.url}
                    alt="video"
                    className='thumbnail'
                    onClick={() => goTo('video', video.id.videoId)}
                />
                <div className='card-body'>
                    <h4 className='video-title' onClick={() => goTo('video', video.id.videoId)}>
                        {video?.snippet?.title}
                    </h4>
                    <div>
                        <h5 className='video-channel-title' onClick={() => goTo('channel', video.snippet.channelId)}>
                            {video?.snippet?.channelTitle}
                        </h5>
                        {video?.snippet?.publishedAt &&
                            <p className='video-date'>
                                {formatDistanceToNow(new Date(video?.snippet?.publishedAt), { addSuffix: true })}
                            </p>
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="page">
                Loading ...
            </div>
        )
    }
}

export default VideoCard;
