import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axios';
import SecondaryHeader from '../../../Components/AppHeader/SecondaryHeader';
import Button from '../../../Components/Button';
import style from './style.module.css';
import { MdArrowRight } from 'react-icons/md'
import Modal from '../../../Components/Modal';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../store/actions';

const WalletContainer = () => {
    const [wallet, setWallet] = useState({});
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [amtToBeAdd, setAmtToBeAdd] = useState(0);

    let dispatch = useDispatch();

    const getData = () => {
        setLoading(true);
        axiosInstance
            .get('/auth/wallet/')
            .then(res => {
                setWallet(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
    }, [])
    
    const handleAddCash = () => {
        axiosInstance
            .patch('/auth/wallet/', {deposited:amtToBeAdd})
            .then(res => {
                setShow(false);
                dispatch(setAlert({'type':'success', 'message':res.data.message}));
                getData();
            })
            .catch(err => {
                setShow();
                dispatch(setAlert({'type':'danger', 'message':"Something Went Wrong!"}));
            })
        
    }

    return (
        <>
            <SecondaryHeader>Wallet</SecondaryHeader>
            <Modal show={show}>
                <Modal.Header onClose={() => setShow(false)}>Add Cash</Modal.Header>
                <Modal.Body>
                    <label>Amount to be Add</label>
                    <input 
                        className={style.input}
                        type="number"
                        value={amtToBeAdd}
                        name="amtToBeAdd"
                        onChange={(e) => setAmtToBeAdd(e.target.value)}
                    />
                    <Button
                        br="5px"
                        onclick={handleAddCash}
                    >
                        Add Money
                    </Button>
                </Modal.Body>
            </Modal>
            {loading?(
                <></>
            ):(
                <>
                    <div className={style.WalletContainer}>
                        <div className={style.WalletContainerHeader}>
                            <h3>Total Balance</h3>
                            <h2>&#8377; {wallet.total}</h2>
                            <Button bg="green" br="5px" pad="5px 15px" onclick={() => setShow(true)}>
                                Add Cash
                            </Button>
                        </div>
                        <div>
                            <div className={style.amtTypesection}>
                                <div>
                                    <p>Amount Deposited</p>
                                    <h3>&#8377; {wallet.deposited}</h3>
                                </div>
                            </div>
                            <div className={style.amtTypesection}>
                                <div>
                                    <p>Winnings</p>
                                    <h3>&#8377; {wallet.winnings}</h3>
                                </div>
                                <Button bg="transparent" border="1px solid #333" br="5px" color="#333" pad="5px 20px" margin="0">
                                    Withdraw
                                </Button>
                            </div>
                            <div className={style.amtTypesection}>
                                <div>
                                    <p>Cash Bonus</p>
                                    <h3>&#8377; {wallet.bonus}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.blocks} onClick={() => ""}>
                        <h3>My Transaction</h3>
                        <MdArrowRight 
                            size={30}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default WalletContainer;