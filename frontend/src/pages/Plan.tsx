import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Empty } from 'antd'
import { ApartmentType } from '../types/types'
import { getApartmentOnTheFloor } from '../api/apartment.api'
import './Plan.css'

export const Plan = () => {
    const { id } = useParams()
    const [flats, setFlats] = React.useState<ApartmentType[]>();

    const fetchData = async () => {
        if (id) {
            const limit = 6;
            const { data } = await getApartmentOnTheFloor(+id, limit)
            const sortedData = data.rows.sort((a: ApartmentType, b: ApartmentType) => a.id > b.id ? 1 : -1)
            setFlats(sortedData)
        }
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <div className='planImage'>
                {
                    flats
                        ?
                        <>
                            <Link to={`/apartment/${flats[0].id}`}>
                                <div className='appartmentPlan' id='apartment-1'>1</div>
                            </Link>
                            <Link to={`/apartment/${flats[1].id}`}>
                                <div className='appartmentPlan' id='apartment-2'>2</div>
                            </Link>
                            <Link to={`/apartment/${flats[2].id}`}>
                                <div className='appartmentPlan' id='apartment-3'>3</div>
                            </Link>
                            <Link to={`/apartment/${flats[3].id}`}>
                                <div className='appartmentPlan' id='apartment-4'>4</div>
                            </Link>
                            <Link to={`/apartment/${flats[4].id}`}>
                                <div className='appartmentPlan' id='apartment-5'>5</div>
                            </Link>
                            <Link to={`/apartment/${flats[5].id}`}>
                                <div className='appartmentPlan' id='apartment-6'>6</div>
                            </Link>
                        </>
                        : <Empty />
                }
            </div>
        </div>
    )
}
