import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Trading from './Containers/trading';
import HomeContainer from './Containers/trading/HomeContainer';
import PlayersContainer from './Containers/trading/PlayersContainer';
import PortfolioContainer from './Containers/trading/PortfolioContainer';
import ProfileContainer from './Containers/trading/ProfileContainer';
import WalletContainer from './Containers/trading/WalletContainer';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Trading />}>
          <Route path='/trading' element={<HomeContainer />} />
          <Route path='/trading/:scat/:match' element={<PlayersContainer />} />
          <Route path='/trading/portfolio' element={<PortfolioContainer />} />
          <Route path='/profile' element={<ProfileContainer />} />
          <Route path='/wallet' element={<WalletContainer />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
