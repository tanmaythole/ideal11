import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSports } from '../../store/actions';

const SportsNavigation = () => {
    const { scat } = useParams();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let sports = useSelector(state => state.sportsReducer);

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
                return <div key={e.id} className={`sportsCategory ${scat===e.name?'active':''}`} onClick={() => navigate(`/trading/${e.name}`)}>
                            <span>{e.name}</span>
                        </div>
            })}
            
        </div>
    )
}

export default SportsNavigation;