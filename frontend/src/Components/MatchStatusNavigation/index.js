import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import style from './style.module.css';

const MatchStatusNavigation = () => {
    let navigate = useNavigate();
    const [params] = useSearchParams();
    
    const statusCategories = ['upcoming', 'live', 'completed'];
    
    return (
        <div className={style.statusNavigation}>
            {statusCategories.map(e => {
                return <div 
                            key={e} 
                            className={`${style.statusCategory} ${params.get('match_status')===e?style.statusCategoryActive:""}`}
                            onClick={() => navigate(`?match_status=${e}`)}
                        >
                           {e} 
                        </div>
            })}
        </div>
    )
}

export default MatchStatusNavigation;