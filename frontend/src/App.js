import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Trading from './Containers/trading';
import HomeContainer from './Containers/trading/HomeContainer';
import PlayersContainer from './Containers/trading/PlayersContainer';
import PortfolioContainer from './Containers/trading/PortfolioContainer';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/trading' element={<Trading />}>
          <Route path='/trading' element={<HomeContainer />} />
          <Route path='/trading/:scat/:match' element={<PlayersContainer />} />
          <Route path='/trading/portfolio' element={<PortfolioContainer />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
