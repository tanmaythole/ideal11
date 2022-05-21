import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPlayerData } from '../../../store/actions';
import Button from '../../Button';
import Modal from '../../Modal';
import style from './style.module.css';

const PlayerModal = () => {
    let dispatch = useDispatch();
    const { show, type, playerData } = useSelector(state => state.playerDataReducer);
    

    const [playerPricePerShare, setPlayerPricePerShare] = useState(0);
    const [noOfShares, setNoOfShares] = useState(1);
    const [platformFee, setPlatformFee] = useState();
    const [totalAmount, setTotalAmount] = useState();


    
    const changeData = async() => { 
        const playerPrice = await type==='sell'?playerData.sell_price:type==="buy"?playerData.buy_price:0;

        setPlayerPricePerShare(playerPrice);
        setPlatformFee(playerPrice * noOfShares * 0.06);
        setTotalAmount(playerPrice * noOfShares + playerPrice * noOfShares * 0.06);
    }

    useEffect(() => {
        changeData();
    }, [noOfShares, show])
    
    const onClose = () => {
        setNoOfShares(1);
        setPlayerPricePerShare(0);
        dispatch(resetPlayerData());
    }
    

    return (
        <Modal show={show}>
            <Modal.Header 
                bg={type==='sell'?"rgb(217 201 119 / 53%)":""} 
                color={type==='sell'?"#333":""} 
                onClose={onClose} 
            >
                {type.length?type:""} Player
            </Modal.Header>
            <Modal.Body padding='0'>
                {Object.keys(playerData).length?(
                    <>
                        <div className={style.playerDetails}>
                            <img 
                                src={`${process.env.REACT_APP_BACKEND_URL}${playerData.player.player.image}`} 
                                alt={playerData.player.player.name}
                                className={style.playerImage}
                            />
                            <div style={{padding: "0 10px"}}>
                                <h4>{playerData.player.player.name}</h4>
                                <p>{playerData.player.player.role}</p>
                                <div className={style.teamNameBlock}>
                                    {playerData.player.team.short_name}
                                </div>
                            </div>
                        </div>
                        
                        <div className={style.priceContainer}>
                            <div>
                                <span>Initial {type} Price</span>
                                <h4>&#8377; {playerPricePerShare}</h4>
                            </div>

                            <div>
                                <span>No. Of Shares</span>
                                <div className={style.noOfShareBtn}>
                                    <button onClick={() => setNoOfShares(noOfShares-1)}>
                                        -
                                    </button>
                                    <p>
                                        {noOfShares}
                                    </p>
                                    <button onClick={() => setNoOfShares(noOfShares+1)}>
                                        +
                                    </button>
                                </div>
                            </div>

                            <div>
                                <span>Platform Amount(6%)</span>
                                <h4>&#8377; {platformFee}</h4>
                            </div>

                            <div>
                                <span>Total Amount</span>
                                <h4>&#8377; {totalAmount}</h4>
                            </div>

                            <Button
                                bg={type==='sell'?"rgb(217 201 119 / 53%)":""} 
                                color={type==='sell'?"#333":""} 
                                border="1px solid #333"
                            >
                                {type} Now
                            </Button>
                        </div>
                    </>
                ):(
                   <></> 
                )}
            </Modal.Body>
        </Modal>
    )
}

export default PlayerModal;