import React, { useEffect, useState } from 'react';
import axios from '../../../axios';
import MatchDetailHeader from '../../../Components/MatchDetailHeader';

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
        </div>
    )
}

export default PlayersContainer;