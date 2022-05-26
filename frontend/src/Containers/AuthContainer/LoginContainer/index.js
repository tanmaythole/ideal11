import React, { useState } from 'react';
import axiosInstance from '../../../axios';
import AuthComponent from '../../../Components/AuthComponent';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import style from './style.module.css';
import { useDispatch } from 'react-redux';
import { setAlert, setLogin } from '../../../store/actions';

const LoginContainer = () => {
    let dispatch = useDispatch();
    const [formData, setFormData] = useState(
        {
            "email": "",
            "password": ""
        }
    )

    const onchange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post('/auth/login/', formData)
            .then(res => {
                const data = res.data;
                if (data.access) {
                    localStorage.setItem('accessToken', data.access);
                    localStorage.setItem('refreshToken', data.refresh);
                    axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + data.access;
                    dispatch(setLogin());
                }
            })
            .catch(err => {
                let error = err.response.data;
                dispatch(setAlert({'type':'danger', 'message':error.message}));
            })
    }
    
    return (
        <>
            <AuthComponent>
                <h1>Login</h1>
                <form className={style.form} onSubmit={handleOnSubmit}>
                    <Input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        name="email"
                        onChange={onchange}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        name="password"
                        onChange={onchange}
                    />
                    <Button>
                        Login
                    </Button>
                </form>
            </AuthComponent>
        </>
    )
}

export default LoginContainer;