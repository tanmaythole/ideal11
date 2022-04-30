import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AlertMessage from './Components/AlertMessage';
import LoginContainer from './Containers/AuthContainer/LoginContainer';
import SignupContainer from './Containers/AuthContainer/SignupContainer';
import Trading from './Containers/trading';
import HomeContainer from './Containers/trading/HomeContainer';
import PlayersContainer from './Containers/trading/PlayersContainer';
import PortfolioContainer from './Containers/trading/PortfolioContainer';
import ProfileContainer from './Containers/trading/ProfileContainer';
import WalletContainer from './Containers/trading/WalletContainer';

const App = () => {
  return (
    <div className='App'>
      <AlertMessage />
      <Routes>
        <Route path='/' element={<Trading />}>
          <Route path='/trading' element={<HomeContainer />} />
          <Route path='/trading/:scat/:match' element={<PlayersContainer />} />
          <Route path='/trading/portfolio' element={<PortfolioContainer />} />
          <Route path='/profile' element={<ProfileContainer />} />
          <Route path='/wallet' element={<WalletContainer />} />
        </Route>
        <Route path='/login' element={<LoginContainer />} />
        <Route path='/signup' element={<SignupContainer />} />
      </Routes>
    </div>
  )
}

export default App;
