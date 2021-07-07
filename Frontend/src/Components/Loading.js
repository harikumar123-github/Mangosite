import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading() {
    return (
        <div>
            <CircularProgress /> 
            <h2>Loading...</h2>
        </div>
    )
}
