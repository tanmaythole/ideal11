import React, { useState } from 'react';
import axios from '../../../axios';
import AuthComponent from '../../../Components/AuthComponent';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import style from './style.module.css';

const LoginContainer = () => {
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
        axios.post('/auth/login/', formData)
            .then(res => {
                const data = res.data;
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }
    
    return (
        <div className='container'>
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
        </div>
    )
}

export default LoginContainer;