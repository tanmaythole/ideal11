import React, { useEffect } from 'react';
import './style.css';
import SportsNavigation from '../../../Components/SportsNavigation';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios';
import { setMatches } from '../../../store/actions';
import MatchBox from '../../../Components/MatchBox';

const HomeContainer = () => {
  let { scat } = useParams()
  let dispatch = useDispatch();
  let matches = useSelector(state => state.matchesReducer);

  useEffect(() => {
    axios.get('/api/matches/', {
      params: {
        sport: scat,
        type: 'upcoming'
      }
    })
    .then(res => {
      dispatch(setMatches(res.data.data));
    })
    .catch(err => {
      console.log(err);
    })
  }, [scat])
  
  
  return (
      <div>
          <SportsNavigation />
          <div className='container'>
            <h3>Upcoming Matches</h3>
            {matches.map(e => {
              return <MatchBox data={e} key={e.id} />
            })}
          </div>
      </div>
    )
}

export default HomeContainer