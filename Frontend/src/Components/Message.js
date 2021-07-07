import React from 'react'
import '../App.css'

export default function Message(props) {
    return (
        <div className={`alert alert-${props.varient || 'info'}`}>
            {props.children}
        </div>
    )
}
