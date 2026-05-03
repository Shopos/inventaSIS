import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Public from './views/public'
import Admin from './views/admin'


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Public/>}></Route>
        <Route path='/admon' element={<Admin/>}></Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App