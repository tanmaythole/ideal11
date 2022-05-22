import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../../axios';
import PrimaryHeader from '../../../Components/AppHeader/PrimaryHeader';
import Button from '../../../Components/Button';
import MatchBox from '../../../Components/MatchBox';
import MatchStatusNavigation from '../../../Components/MatchStatusNavigation';
import NoDataComponent from '../../../Components/NoDataComponent';
import SportsNavigation from '../../../Components/SportsNavigation';
import TabFooter from '../../../Components/TabFooter';
import { setMatches } from '../../../store/actions';

const PortfolioContainer = () => {
    const [params] = useSearchParams();
    let matchStatus = params.get('match_status') || 'upcoming';

    let navigate = useNavigate();

    let dispatch = useDispatch();
    let currSport = useSelector(state => state.currentSportReducer);
    let matches = useSelector(state => state.matchesReducer)
    
    useEffect(() => {
        axiosInstance.get('/api/matches/', {
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
        <>
            <PrimaryHeader />
            <SportsNavigation />
            <div className='container'>
                <MatchStatusNavigation />
                {matches.length?(
                    matches.map(e => {
                        return <MatchBox data={e} key={e.id} from='portfolio' />
                    })
                ):(
                    <NoDataComponent>
                        <h3>You haven't joined any contest</h3>
                        <Button onclick={() => navigate('/trading')}>
                            View Upcoming Matches
                        </Button>
                    </NoDataComponent>
                )}
            </div>
            <TabFooter />
        </>
    )
}

export default PortfolioContainer;