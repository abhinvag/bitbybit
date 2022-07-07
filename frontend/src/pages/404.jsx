import React from 'react'
import "../styles/404.css"
import img from "../images/404.svg"
import {Image} from "react-bootstrap"


function page404() {
    return (
        <div className="div404">
            <Image src={img} className="div404-img" />
            <h1 className="div404-heading1">This Page Has Been Abducted</h1>
            <h1 className="div404-heading2">
                phew, our   
                <a 
                    href="/"
                    className="div404-anchor"
                >
                    homepage 
                </a> 
                can still be found on earth !
            </h1>
        </div>
    )
}

export default page404;
