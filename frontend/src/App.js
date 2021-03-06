import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import AlertMessage from './Components/AlertMessage';
import AuthContainer from './Containers/AuthContainer';
import LoginContainer from './Containers/AuthContainer/LoginContainer';
import SignupContainer from './Containers/AuthContainer/SignupContainer';
import Trading from './Containers/trading';
import HomeContainer from './Containers/trading/HomeContainer';
import PlayersContainer from './Containers/trading/PlayersContainer';
import PortfolioContainer from './Containers/trading/PortfolioContainer';
import ProfileContainer from './Containers/trading/ProfileContainer';
import WalletContainer from './Containers/trading/WalletContainer';
import './App.css';
import PortfolioPlayers from './Containers/trading/PortfolioContainer/PortfolioPlayers';
import PredictionContainer from './Containers/trading/PredictionConatiner';
import VerifyEmail from './Containers/AuthContainer/VerifyEmail';

const App = () => {
  return (
    <>
      <div id='backgroundImg'>
      </div>
      <div className='App'>
        <AlertMessage />
        <Routes>
          <Route path='/' element={<Trading />}>
            <Route path='/trading' element={<HomeContainer />} />
            <Route path='/trading/:scat/:match' element={<PlayersContainer />} />
            <Route path='/trading/portfolio' element={<PortfolioContainer />} />
            <Route path='/trading/portfolio/:scat/:match' element={<PortfolioPlayers />} />
            <Route path='/profile' element={<ProfileContainer />} />
            <Route path='/wallet' element={<WalletContainer />} />
            <Route path='/prediction' element={<PredictionContainer />} />
            <Route path='/' element={<Navigate to='/trading' />} />
          </Route>

          <Route path='/' element={<AuthContainer />}>
            <Route path='/login' element={<LoginContainer />} />
            <Route path='/signup' element={<SignupContainer />} />
            <Route path='/verify/:token' element={<VerifyEmail />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App;
