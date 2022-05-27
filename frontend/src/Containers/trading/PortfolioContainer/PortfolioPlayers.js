import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axios';
import SecondaryHeader from '../../../Components/AppHeader/SecondaryHeader';
import MatchDetailHeader from '../../../Components/MatchDetailHeader';
import PlayerBox from '../../../Components/Player/PlayerBox';

const PortfolioPlayers = () => {
    const { match } = useParams();

    const [loader, setLoader] = useState(true);
    const [players, setPlayers] = useState([]);
    const [matchDetails, setMatchDetails] = useState({});

    useEffect(() => {
        axiosInstance.get('/api/transactions/', {
            params: {
                match: match
            }
        })
        .then(res => {
            setPlayers(res.data.data);
            setMatchDetails(res.data.match);
            setLoader(false);
            console.log(res.data.data)
        })
        .catch(err => {
            console.log(err.response);
        })
    }, [])
    

    return loader?<></>:(
        <div>
            <SecondaryHeader />
            <MatchDetailHeader data={matchDetails} />
            <div className='container'>
                <div>
                    {players.map(e => {
                        return <PlayerBox data={e.player} trade_details={e} key={e.id} from="portfolio" trade_type={e.trade_type} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default PortfolioPlayers;