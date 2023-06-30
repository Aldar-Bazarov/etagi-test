import React from 'react'
import {Link} from 'react-router-dom' 
import './Plan.css'

export const Plan = () => {
    return (
        <div>
            <div className='planImage'>
                <Link to='/apartment/1'>
                    <div className='appartmentPlan' id='apartment-1'>1</div>
                </Link>
                <Link to='/apartment/2'>
                    <div className='appartmentPlan' id='apartment-2'>2</div>
                </Link>
                <Link to='/apartment/3'>
                    <div className='appartmentPlan' id='apartment-3'>3</div>
                </Link>
                <Link to='/apartment/4'>
                    <div className='appartmentPlan' id='apartment-4'>4</div>
                </Link>
                <Link to='/apartment/5'>
                    <div className='appartmentPlan' id='apartment-5'>5</div>
                </Link>
                <Link to='/apartment/6'>
                    <div className='appartmentPlan' id='apartment-6'>6</div>
                </Link>
            </div>
        </div>
    )
}
