import React from 'react';
import style from './style.module.css';

const PlayerBox = ({ data }) => {
    return (
        <div className={style.playerBox}>
            <div className={style.playerDetails}>
                <img 
                    src={`${process.env.REACT_APP_BACKEND_URL}${data.player.player.image}`} 
                    alt={data.player.player.name}
                    className={style.playerImage}
                />
                <div style={{padding: "0 10px"}}>
                    <h4>{data.player.player.name}</h4>
                    <p>{data.player.player.role}</p>
                    <div className={style.teamNameBlock}>
                        {data.player.team.short_name}
                    </div>
                </div>
            </div>

            <div className={style.playerPrice}>
                <div className={style.playerBuy}>
                    <div>Bought : 0</div>
                    <button className={style.buybtn}>
                        Buy &#8377;{data.buy_price}
                    </button>
                </div>
                <div className={style.playerSell}>
                    <div>Sell : 0</div>
                    <button className={style.sellbtn}>
                        Sell &#8377; {data.sell_price}

                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlayerBox;