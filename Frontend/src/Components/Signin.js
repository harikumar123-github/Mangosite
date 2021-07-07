import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../actions/userActions'
import Loading from './Loading'
import Message from './Message'

export default function Signin(props) {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const redirect = props.location.search?props.location.search.split('=')[1]:'/';

    const userSignin = useSelector( state => state.userSignin )
    const { userInfo, loading, error } = userSignin

    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault()
        dispatch( signin(email,password) )
    }

    useEffect( () => {
        if(userInfo){
            props.history.push(redirect)
        }
    },[userInfo,props.history,redirect])

    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1>LogIn</h1>
                </div>

            { loading && <Loading /> }
            {error && <Message varient="danger">{error}</Message>}

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="mail@example.com" onChange={ e => setEmail(e.target.value) } id="email" required/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={ e => setPassword(e.target.value) } id="password" required/>
                </div>


                <div>
                    <label />
                    <button type="submit">LogIn</button>
                </div>

                <div>
                    <label />
                    <div>
                        New User? {' '}<Link to={`/register?redirect=${redirect}`}>Create account</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}
