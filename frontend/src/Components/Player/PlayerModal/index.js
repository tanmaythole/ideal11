import React, { useEffect, useState } from 'react';
import Button from '../../Button';
import Modal from '../../Modal';
import style from './style.module.css';

const PlayerModal = ({ show, handleClose, data }) => {
    const { type, playerData } = data;
    const bg = type==='Sell'?"rgb(217 201 119 / 53%)":"";
    const color = type==="Sell"?"#333":"";

    const [playerPricePerShare, setPlayerPricePerShare] = useState(0);
    const [noOfShares, setNoOfShares] = useState(0);
    const [platformFee, setPlatformFee] = useState();
    const [totalAmount, setTotalAmount] = useState();


    
    const changeData = async() => {
        const playerPrice = await type==='Sell'?playerData.sell_price:type==="Buy"?playerData.buy_price:0;

        await setPlayerPricePerShare(playerPrice);
        await setPlatformFee(playerPrice * noOfShares * 0.06);
        await setTotalAmount(playerPrice * noOfShares + playerPrice * noOfShares * 0.06);
    }

    useEffect(() => {
        changeData();
    }, [noOfShares])    
    

    return (
        <Modal show={show}>
            <Modal.Header bg={bg} color={color} onClose={handleClose} >
                {type} Player
            </Modal.Header>
            <Modal.Body padding='0'>
                {playerData?(
                    <>
                        {console.log(playerData)}
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
                                <span>Initial {data.type} Price</span>
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

                            <Button>
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