import React, { useEffect } from 'react';
import './style.css';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSport, setSports } from '../../store/actions';

const SportsNavigation = () => {
    let dispatch = useDispatch();
    let sports = useSelector(state => state.sportsReducer);
    let currSport = useSelector(state => state.currentSportReducer);

    useEffect(() => {
        axios.get(`/api/sports`)
            .then(res => {
                dispatch(setSports(res.data.data));
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    

    return (
        <div className='sportsNavigation'>
            {sports.map(e => {
                return <div key={e.id} className={`sportsCategory ${currSport===e.name?'active':''}`} onClick={() => dispatch(setCurrentSport(e.name))}>
                            <span>{e.name}</span>
                        </div>
            })}
            
        </div>
    )
}

export default SportsNavigation;