import React from 'react'
import { useNavigate } from 'react-router-dom';
import Timer from '../Timer';
import './style.css';

const MatchBox = ({ data }) => {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate(`/trading/cricket/${data.id}`)
    }
    return (
        <div className='match-block' onClick={handleClick}>
            <div className='match-block-header'>
                <div>
                    {data.series.name}
                </div>
                <div>
                    {data.is_lineups_out?(
                        <div className='success'>
                            LineUps Out
                        </div>
                    ):("")}
                </div>
            </div>
            <div className='match-block-body'>
                <div className='match-block-team1'>
                    <img 
                        src={`${process.env.REACT_APP_BACKEND_URL}${data.home_team.logo}`} 
                        alt={data.home_team.name} 
                        className="match-block-team-img" 
                    />
                    <h5>{data.home_team.short_name}</h5>
                </div>
                <div>
                    {data.match_status==='upcoming'?(
                        <Timer datetime={data.datetime} />
                    ):("")}
                    
                </div>
                <div className='match-block-team2'>
                    <h5>{data.away_team.short_name}</h5>
                    <img 
                        src={`${process.env.REACT_APP_BACKEND_URL}${data.away_team.logo}`} 
                        alt={data.away_team.name} 
                        className="match-block-team-img" 
                    />
                </div>
            </div>
        </div>
    )
}

export default MatchBox