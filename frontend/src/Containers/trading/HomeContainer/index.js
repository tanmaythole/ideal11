import React, { useEffect } from 'react';
import './style.css';
import SportsNavigation from '../../../Components/SportsNavigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios';
import { setMatches } from '../../../store/actions';
import MatchBox from '../../../Components/MatchBox';
import logo from '../../../assets/images/logo.png';

const HomeContainer = () => {
  let dispatch = useDispatch();
  let matches = useSelector(state => state.matchesReducer);
  let currSport = useSelector(state => state.currentSportReducer);

  useEffect(() => {
    axios.get('/api/matches/', {
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
              <div className='stayTunedMsgBlock'>
                <img src={logo} />
                <h3>Stay Tuned!!</h3>
                Matches will open shortly
              </div>
            )}
          </div>
      </div>
    )
}

export default HomeContainer