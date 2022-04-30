import React, { useState } from 'react'
import axios from '../../../axios';
import AuthComponent from '../../../Components/AuthComponent';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import style from './style.module.css';

const SignupContainer = () => {
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
        axios.post('/api/signup/', formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
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
        <div className='container'>
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
        </div>
    )
}

export default SignupContainer;