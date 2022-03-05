import React from 'react'
import AppHeader from '../../Components/AppHeader'
import SportsNavigation from '../../Components/SportsNavigation'
import TabFooter from '../../Components/TabFooter'
import HomeContainer from './HomeContainer'
import './style.css'

const Trading = () => {
    return (
        <div className='App'>
            <AppHeader />
            <SportsNavigation />
            <HomeContainer />
            <TabFooter />
        </div>
    )
}

export default Trading