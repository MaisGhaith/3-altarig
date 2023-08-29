import React from 'react'
import Home from './Home'
import Services from './Services'
import Features from './Features'
import Stats from "./stats"
import FAQS from './FAQS'
const Landing = () => {
    return (
        <div>
            <Home />
            <div className=''>


                <Services />
                <div className='divider '></div>
                <FAQS />
                {/* <Features /> */}
            </div>
            {/* <Stats /> */}
        </div>
    )
}

export default Landing