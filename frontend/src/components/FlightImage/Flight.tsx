import React from "react";
import video from '../../assets/clouds.mp4'
import flight from '../../assets/26315-7-airplane-transparent.png';
import './Flight.css';
import { useTranslation } from 'react-i18next';

const Flight: React.FC = () => {
    const { t } = useTranslation('common');
    return (
        <div className='home flex flightcontainer'>
            <div className="mainText">
                <h1>{t('landingflights.heading.first')} <br/>{t('landingflights.heading.second')}</h1>
            </div>

            <div className="homeImages flex">
                <div className="videoDiv">
                    <video src={video} autoPlay muted loop className="video"></video>
                </div>
                <img src={flight} alt="Flight" className="plane" />
            </div>
        </div>
    )
}

export default Flight;
