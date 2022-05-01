import React, { useEffect } from 'react';
import './style.css';
import SportsNavigation from '../../../Components/SportsNavigation';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../../axios';
import { setMatches } from '../../../store/actions';
import MatchBox from '../../../Components/MatchBox';
import NoDataComponent from '../../../Components/NoDataComponent';

const HomeContainer = () => {
  let dispatch = useDispatch();
  let matches = useSelector(state => state.matchesReducer);
  let currSport = useSelector(state => state.currentSportReducer);

  useEffect(() => {
    axiosInstance.get('/api/matches/', {
      params: {
        sport: currSport,
        type: 'upcoming'
      }
    })
    .then(res => {
      dispatch(setMatches(res.data.data));
    })
    .catch(err => {
      console.log(err);
    })
  }, [currSport])
  
  
  return (
      <div>
          <SportsNavigation />
          <div className='container'>
            {matches.length?(
              <div>
                <h3>Upcoming Matches</h3>
                {matches.map(e => {
                  return <MatchBox data={e} key={e.id} from='home' />
                })}
              </div>
            ):(
              <NoDataComponent>
                <h3>Stay Tuned!!</h3>
                Matches will Open Shortly
              </NoDataComponent>
            )}
          </div>
      </div>
    )
}

export default HomeContainer