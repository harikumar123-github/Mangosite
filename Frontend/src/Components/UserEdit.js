import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import Loading from './Loading'
import Message from './Message'

export default function UserEdit(props) {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isSeller, setIsSeller] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const userId = props.match.params.id 

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate

    useEffect( () => {

        if(successUpdate){
            dispatch( {
                type: USER_UPDATE_RESET
            } )
            props.history.push('/userlist')
        }

        if(!user){
            dispatch(detailsUser(userId))
        }
        else {
            setName(user.name)
            setEmail(user.email)
            setIsSeller(user.isSeller)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, user, userId,successUpdate, props.history] )

    const submitHandler = e => {
        e.preventDefault()
        dispatch(updateUser( {_id:userId, name, email, isSeller: isSeller, isAdmin: isAdmin} ))
    }

    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <h1>Edit user {name}</h1>

                { loadingUpdate && <Loading /> }
                { errorUpdate && (<Message varient='danger'>{errorUpdate}</Message> ) }

                { loading? <Loading />: error?(<Message varient='danger'>{error}</Message>): (
                    <>
                    
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Name" value={name} onChange={ e => setName(e.target.value)} />
                    </div>
                    
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="isSeller">Is seller?</label> 
                        <input type="checkbox" id="isSeller" checked={isSeller} onChange={ e => { setIsSeller(e.target.checked) }} />
                    </div>

                    <div>
                        <label htmlFor="isAdmin">Is admin?</label>
                        <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={ e => { setIsAdmin(e.target.checked) }} />
                    </div>

                    <div>
                        <button type="submit">Update</button>
                    </div>

                    </>
                ) }

            </form>
        </div>
    )
}
