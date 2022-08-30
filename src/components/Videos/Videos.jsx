import React, { useEffect, useState } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import Loader from '../Loader/Loader';
import './Videos.css';
import ChannelCard from '../ChannelCard/ChannelCard';

function Videos({ videos, classes }) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (videos && videos.length > 0) {
            setLoading(false);
        }
    }, [videos, setLoading])

    if (loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <div className={classes ? classes : 'videos-grid'}>
                {videos.map((item, i) => (
                    <div key={i}>
                        {
                            item.id.videoId &&
                            <VideoCard
                                video={item}
                                classes={classes === 'related-videos-grid' ? 'related-videos-video-card' : ''}
                            />
                        }
                        {item.id.channelId && <ChannelCard channelDetails={item} />}
                    </div>
                ))}
            </div>
        )
    }
}

export default Videos;
