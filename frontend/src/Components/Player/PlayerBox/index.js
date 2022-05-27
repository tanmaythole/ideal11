import React from 'react';
import style from './style.module.css';
import Button from '../../Button';
import { useDispatch } from 'react-redux';
import { setPlayerData } from '../../../store/actions';

const PlayerBox = ({ data, from, trade_details }) => {
    let dispatch = useDispatch();

    const onBuySellBtnClick = (type) => {
        dispatch(setPlayerData(
            { 
                "type": type, 
                "playerData": data,
                "show": true
            }
        ));
    }

    return (
        <div className={style.playerBox}>
            <div className={style.playerDetails}>
                <img 
                    src={`${process.env.REACT_APP_BACKEND_URL}${data.player.player.image}`} 
                    alt={data.player.player.name}
                    className={style.playerImage}
                />
                <div style={{padding: "0 10px"}}>
                    <h4>{data.player.player.short_name}</h4>
                    <p>{data.player.player.role}</p>
                    <div className={style.teamNameBlock}>
                        {data.player.team.short_name}
                    </div>
                </div>
            </div>

            {from==='portfolio'?(
                <>
                    <div className={`${style.bottomBlock} ${trade_details.trade_type==='buy'?style.bottomBlockBuy:style.bottomBlockSell}`}>
                        <p>{trade_details.trade_type==='buy'?"Bought":"Sold"}: {trade_details.no_of_shares} @ {trade_details.trade_type==='buy'?trade_details.player.buy_price:trade_details.player.sell_price}</p>
                        <p>Total Points: {trade_details.player.total_points}</p>
                        <p>Winnings: {trade_details.winning}</p>
                    </div>
                </>
            ):(
                <>
                    <div className={style.playerPrice}>
                        <div className={style.playerBuy}>
                            <div>Bought : 0</div>
                            <Button 
                                margin='5px 0'
                                onclick={() => onBuySellBtnClick('buy')}
                            >
                                Buy &#8377;{data.buy_price}
                            </Button>
                        </div>
                        <div className={style.playerSell}>
                            <div>Sell : 0</div>
                            <Button 
                                bg="#D9C97787" 
                                color="#333" 
                                margin='5px 0'
                                onclick={() => onBuySellBtnClick('sell')}
                            >
                                Sell &#8377; {data.sell_price}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default PlayerBox;