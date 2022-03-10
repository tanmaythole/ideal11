import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';

const SportsNavigation = () => {
    const { scat } = useParams();
    let navigate = useNavigate();

    const [sportsCategories, setSportsCategories] = useState(
        [
            {
                "id":'sc1',
                "name":"cricket"
            },
            {
                "id":'sc2',
                "name":"football"
            }
        ]
    );

    return (
        <div className='sportsNavigation'>
            {sportsCategories.map(e => {
                return <div key={e.id} className={`sportsCategory ${scat===e.name?'active':''}`} onClick={() => navigate(`/trading/${e.name}`)}>
                            <span>{e.name}</span>
                        </div>
            })}
            
        </div>
    )
}

export default SportsNavigation;