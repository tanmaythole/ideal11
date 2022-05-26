import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axiosInstance from '../../../axios';
import AuthComponent from '../../../Components/AuthComponent';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import { setAlert } from '../../../store/actions';
import style from './style.module.css';

const SignupContainer = () => {
    let dispatch = useDispatch();

    const [formData, setFormData] = useState(
        {
            "first_name": "",
            "last_name": "",
            "email": "",
            "username": "",
            "mobile": "",
            "password": ""
        }   
    )


    const handleOnSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post('/auth/register/', formData)
            .then(res => {
                let data = res.data;
                dispatch(setAlert({'type':'success', 'message':data.message}));
            })
            .catch(err => {
                let error = err.response.data;
                dispatch(setAlert({'type':'danger', 'message':error.message}));
            })
    }

    const onchange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )
    }
    return (
        <>
            <AuthComponent>
                <h1 style={{textAlign: "center"}}><span style={{color: "#6c6c6c"}}>Join</span><br /> MyIdeal-11</h1>
                <form className={style.form} onSubmit={handleOnSubmit}>
                    <Input 
                        type='text'
                        placeholder="First Name *"
                        name="first_name"
                        value={formData.first_name}
                        onChange={onchange}
                    />
                    <Input 
                        type='text'
                        placeholder="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={onchange}
                    />
                    <Input 
                        type='email'
                        placeholder="Email *"
                        name="email"
                        value={formData.email}
                        onChange={onchange}
                    />
                    <Input 
                        type='text'
                        placeholder="Username *"
                        name="username"
                        value={formData.username}
                        onChange={onchange}
                    />
                    <Input 
                        type='tel'
                        placeholder="Mobile *"
                        name="mobile"
                        value={formData.mobile}
                        onChange={onchange}
                    />
                    <Input 
                        type='password'
                        placeholder="Password *"
                        name="password"
                        value={formData.password}
                        onChange={onchange}
                    />
                    <Button>
                        Sign Up
                    </Button>
                </form>
            </AuthComponent>
        </>
    )
}

export default SignupContainer;