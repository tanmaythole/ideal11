import React from 'react';
import Timer from '../Timer';
import style from './style.module.css';

const MatchDetailHeader = ({data}) => {
    return (
        <div className={style.header}>
            <div className='match-block-body'>
                <div className='match-block-team1'>
                    <img 
                        src={`${process.env.REACT_APP_BACKEND_URL}${data.home_team.logo}`} 
                        alt={data.home_team.name}
                        className="match-block-team-img" 
                    />
                </div>
                <div style={{textAlign: "center"}}>
                    <h5>{data.home_team.short_name} vs {data.away_team.short_name}</h5>
                    {data.match_status==='upcoming'?(
                        <Timer datetime={data.datetime}  />
                    ):("")}
                </div>
                <div className='match-block-team1'>
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

export default MatchDetailHeader;