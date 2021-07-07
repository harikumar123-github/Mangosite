import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import Loading from './Loading'
import Message from './Message'

export default function Register(props) {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setCofirmPassword] = useState('')

    const redirect = props.location.search?props.location.search.split('=')[1]:'/';

    const userRegister = useSelector( state => state.userRegister )
    const { userInfo,loading,error } = userRegister

    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault()
        if(password !== confirmpassword){
            alert("Password doesn't match")
        }
        else{
            dispatch(register(name, email, password) )
        }
    }

    useEffect( () => {
        if(userInfo){
            props.history.push(redirect)
        }
    },[userInfo,props.history,redirect])

    return (
        <div>
            <form action="" onSubmit={submitHandler} className="form">
                <div>
                    <h1>Create Account</h1>
                </div>

            {loading && <Loading />}
            {error && <Message varient="danger">{error.substring(0,6)==='E11000'?'Email already in use':error}</Message>}

                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Name" onChange={ e => setName(e.target.value) } id="name" required/>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="mail@example.com" onChange={ e => setEmail(e.target.value) } id="email" required/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={ e => setPassword(e.target.value) } id="password" required/>
                </div>

                <div>
                    <label htmlFor="cofirmPassword">Confirm Password</label>
                    <input type="password" onChange={ e => setCofirmPassword(e.target.value) } id="cofirmPassword" required/>
                </div>


                <div>
                    <label />
                    <button type="submit">Register</button>
                </div>

                <div>
                    <label />
                    <div>
                        Already have an account? { ' ' }
                        <Link to={`/signin?redirect=${redirect}`}>Login</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}
