import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Trading from './Containers/trading';
import HomeContainer from './Containers/trading/HomeContainer';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/trading' element={<Trading />}>
          <Route path='/trading' element={<HomeContainer />} />
          <Route path='/trading/:scat' element={<HomeContainer />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
