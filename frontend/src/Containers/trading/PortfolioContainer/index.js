import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import axios from '../../../axios';
import MatchBox from '../../../Components/MatchBox';
import MatchStatusNavigation from '../../../Components/MatchStatusNavigation';
import SportsNavigation from '../../../Components/SportsNavigation';
import { setMatches } from '../../../store/actions';

const PortfolioContainer = () => {
    const [params] = useSearchParams();
    let matchStatus = params.get('match_status') || 'upcoming';

    let dispatch = useDispatch();
    let currSport = useSelector(state => state.currentSportReducer);
    let matches = useSelector(state => state.matchesReducer)
    
    useEffect(() => {
        axios.get('/api/matches/', {
            params: {
                sport: currSport,
                type: matchStatus
            }
        })
        .then(res => {
            dispatch(setMatches(res.data.data));
        })
        .catch(err => {
            console.log(err);
        })
    }, [matchStatus])
    
    if(params.get('match_status')===null){
        return <Navigate to='?match_status=upcoming' replace />
    }

    return (
        <div>
            <SportsNavigation />
            <div className='container'>
                <MatchStatusNavigation />
                {matches.map(e => {
                    return <MatchBox data={e} key={e.id} from='portfolio' />
                })}
            </div>
        </div>
    )
}

export default PortfolioContainer;