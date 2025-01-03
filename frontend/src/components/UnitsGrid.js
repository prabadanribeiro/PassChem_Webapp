import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../services/ApiService'
import URLService from '../services/URLService'
import '../styles/Units.css'
import '../styles/Spinning.css'

export default function UnitsGrid() {

    const [units, setUnits] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ApiService.GetUnits()
            .then(fetchedUnits => {
                setUnits(fetchedUnits)
            })
            .catch(error => {
                console.error('Error in component fetching topics:', error)
            })
        setLoading(false)
    }, [])

    return (
        <div className='topics-body'>
            <h3>General Chemistry</h3>
            <hr />
            {loading ? (
                <div className="spinner-container" style={{height: '350px'}}>
                    <div className="spinner" style={{height: '100px', width: '100px', border: '10px solid rgba(0, 0, 0, 0.1)'}}></div>
                </div>
            ) : (
                <div className='topics-container'>
                    {
                        units.map(unit =>
                            <Link to={`/curriculum/${URLService.slugify(unit.title)}`} className='link' key={unit.unit_number}>
                                <div className='topics-cards'>
                                    <img className="topics-images" src={`http://127.0.0.1:8000/${unit.img}`} alt='Unit Images'/>
                                    <div className='topics-description'>
                                        <p>{/* needs unit.description */}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. A great leader leads not by what he says, but by what he does day to day to lead himself.</p>
                                    </div>
                                </div>
                                <li className="card-content">
                                    <h4>
                                        Unit {unit.unit_number}:&nbsp;{unit.title}
                                    </h4>
                                    {/* <h4>
                                        &nbsp;{unit.title} 
                                    </h4> */}
                                </li>
                            </Link>
                        )
                    }
                </div>
            )}
        </div>
    )
}
