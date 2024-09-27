import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/privateRoute'

function App() {

  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
