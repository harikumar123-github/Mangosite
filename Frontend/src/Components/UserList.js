import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, listUsers } from '../actions/userActions'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import Loading from './Loading'
import Message from './Message'

export default function UserList(props) {

    const dispatch = useDispatch()

    const userList = useSelector( state => state.userList )
    const { loading, users ,error } = userList

    const userDelete = useSelector( state => state.userDelete )
    const { loading:loadingDelete, success:successDelete ,error:errorDelete } = userDelete

    useEffect( () => {
        dispatch(listUsers())
        dispatch( {
            type: USER_DETAILS_RESET
        } )
    }, [dispatch,successDelete] )

    const deleteHandler = user => {
        if(window.confirm('Confirm to delete?')){
            dispatch(deleteUser(user._id))
        }
    }

    return (
        <div>
            <h1>Users</h1>

            { loadingDelete && <Loading /> }
            { errorDelete && (<Message varient="danger" >{errorDelete}</Message>) }
            { successDelete && (<Message>User deleted successfully</Message>) }

            {
                loading? <Loading /> : error?( <Message varient="danger" >{error}</Message>) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Is seller</th>
                                <th>Is admin</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { users.map( user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isSeller?"Yes":"No"}</td>
                                    <td>{user.isAdmin?"Yes":"No"}</td>
                                    <td>
                                        <button type="button" onClick={ () => props.history.push(`/user/${user._id}/edit`) } >Edit</button>
                                        <button type="button" className="delete" onClick={() => deleteHandler(user)}>Delete</button>
                                    </td>
                                </tr>
                            ) ) }
                        </tbody>
                    </table>
                )
            }

        </div>
    )
}
