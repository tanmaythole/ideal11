import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axios';
import MatchDetailHeader from '../../../Components/MatchDetailHeader';
import PlayerBox from '../../../Components/Player/PlayerBox';
import PlayerModal from '../../../Components/Player/PlayerModal';
import style from './style.module.css';

const PlayersContainer = () => {
    const { match } = useParams();

    const [loader, setLoader] = useState(true);
    const [players, setPlayers] = useState([]);
    const [matchDetails, setMatchDetails] = useState({});



    useEffect(() => {
        axiosInstance.get('/api/players/', {
            params: {
                match: match
            }
        })
        .then(res => {
            setPlayers(res.data.data);
            setMatchDetails(res.data.match);
            setLoader(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    
    return loader?("Loading"):(
        <div>
            <MatchDetailHeader data={matchDetails} />
            <PlayerModal />
            <div className='container'>
                <div className={style.playerContainer}>
                    {players.map(e => {
                        return <PlayerBox data={e} key={e.id} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default PlayersContainer;