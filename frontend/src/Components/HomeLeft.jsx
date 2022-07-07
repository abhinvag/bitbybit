import React from 'react'
import QOD from './QOD'
import PostQuestion from './PostQuestion'
import "../styles/homeLeft.css"
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function HomeLeft() {

    const sheets = [
        {Name: 'Striver SDE', Link: '/sheets/striver'}, 
        {Name: 'Special Curated DP', Link: '/404'}, 
        {Name: 'Blind 75', Link: '/404'},
        {Name: 'More Coming Soon ..', Link: '/404'}, 
    ]

    return (
        <div className='home-left-container'>
            <div className='home-left-container-top'>
                <QOD />
            </div>
            <div className='home-left-container-bottom'>
                <div className='home-left-container-bottom-div'>
                    <h2 className='home-left-container-bottom-heading'>Want to Add Another Question ?</h2>
                    <PostQuestion />
                </div>
                <div className='home-left-container-bottom-div'>
                    <h2 className='home-left-container-bottom-heading'>Want to Solve DSA Sheets ?</h2>
                    <div className='home-left-container-bottom-sheetsList'>
                        {sheets.map((sheet) => (
                            <Link to={`${sheet.Link}`}> 
                                <Button
                                    key={sheet.Name}
                                    variant="light"
                                    className='customButton-white'
                                >
                                    {sheet.Name}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeLeft