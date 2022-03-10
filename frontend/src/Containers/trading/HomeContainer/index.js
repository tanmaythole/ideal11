import React from 'react';
import './style.css';
import SportsNavigation from '../../../Components/SportsNavigation';
import { useParams } from 'react-router-dom';

const HomeContainer = () => {
  // const { scat } = useParams();
  return (
      <div>
          <SportsNavigation />
      </div>
    )
}

export default HomeContainer