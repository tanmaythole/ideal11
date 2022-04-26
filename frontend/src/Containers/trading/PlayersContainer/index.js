import React, { useEffect, useState } from 'react';
import axios from '../../../axios';
import MatchDetailHeader from '../../../Components/MatchDetailHeader';
import PlayerBox from '../../../Components/PlayerBox';
import style from './style.module.css';

const PlayersContainer = () => {
    const [loader, setLoader] = useState(true);
    const [players, setPlayers] = useState([]);
    const [matchDetails, setMatchDetails] = useState({});

    useEffect(() => {
        axios.get('/api/players/', {
            params: {
                match: 5
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