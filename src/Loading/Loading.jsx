import React from 'react'
import './Loading.scss'
import loading from '../Assets/Loading.png' 

const Loading = () => {
    return (
        <React.Fragment>
            <div>
                <img src={loading} height='100px' width='100px'alt='Loading...'/>
            </div>
        </React.Fragment>
    )
}

export default Loading
