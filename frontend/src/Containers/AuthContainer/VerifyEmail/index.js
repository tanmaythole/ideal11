import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../axios';
import { setAlert } from '../../../store/actions';

const VerifyEmail = () => {
    const { token } = useParams();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        axiosInstance
            .get(`/auth/verify-email/${token}/`)
            .then(res => {
                dispatch(setAlert({"type": "success", "message": "Email Verified Successfully!"}));
                // navigate('/login');
            })
            .catch(err => {
                console.log(err.response);
                dispatch(setAlert({"type": "danger", "message": "Something went wrong!"}))
                // navigate('/login');
            })
    }, [])
    

    return (
        <div>

        </div>
    )
}

export default VerifyEmail;