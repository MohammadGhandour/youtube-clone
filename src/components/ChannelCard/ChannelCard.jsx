import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChannelCard.css';

function ChannelCard({ channelDetails }) {

    const navigate = useNavigate();
    const channelPage = window.location.href.includes('/channel');

    function goToChannel() {
        if (channelPage) {
            return
        } else {

            navigate(`/channel/${channelDetails?.id?.channelId}`);
        }
    }

    if (channelDetails.id) {
        return (
            <div className={channelPage ? 'channel-card cursor-normal' : 'channel-card'} onClick={goToChannel}>
                <div className='column-center channel-infos-wrapper'>
                    <img
                        src={channelDetails?.snippet?.thumbnails?.medium?.url}
                        alt={channelDetails?.snippet?.channelTitle + "'s img"}
                        className='channel-card-img'
                    />
                    <h4>
                        {!channelPage && channelDetails?.snippet?.channelTitle}
                        {channelPage && channelDetails?.snippet?.title}
                    </h4>
                    {channelPage &&
                        <div className='subscribers-count'>
                            {parseInt(channelDetails?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
                        </div>
                    }
                </div>
            </div>
        )
    } else {
        return 'Loading ...'
    }
}

export default ChannelCard;
