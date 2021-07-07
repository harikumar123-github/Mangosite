import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions'
import '../App.css'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import Loading from './Loading'
import Message from './Message'

export default function Profile() {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const userSignin = useSelector( state => state.userSignin ) 
    const { userInfo } = userSignin

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success:successUpdate , error:errorUpdate , loading:loadingUpdate } = userUpdateProfile 

    useEffect( () => {
        if(!user){
            dispatch( {type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id))
        }
        else{
            setName(user.name)
            setEmail(user.email)
        }
    }, [dispatch,userInfo._id,user] )

    const submitHandler = e => {
        e.preventDefault()
        if(password !== confirmPassword){
            alert("Password doesn't match")
        }
        else{
            dispatch(updateUserProfile( {
                userId: user._id, name, email, password
            } ))
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User profile</h1>
                </div>
                { loading? <Loading />: error?( <Message varient="danger">{error}</Message> ) : (
                    <>
                    {loadingUpdate&&<Loading />}
                    {errorUpdate && ( <Message varient="danger">{errorUpdate}</Message>)}
                    {successUpdate && ( <Message>Profile updated</Message>) }

                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" placeholder="Name" onChange={ e => setName(e.target.value) } value={name} />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Email" onChange={ e => setEmail(e.target.value) } value={email} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" onChange={ e => setPassword(e.target.value) } placeholder="Password"/>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input id="confirmPassword" type="password" onChange={ e => setConfirmPassword(e.target.value) } placeholder="Confirm password"/>
                    </div>

                    <div>
                        <label/>
                        <button type="submit">Update Info</button>
                    </div>

                    </>
                ) }
            </form>
        </div>
    )
}
