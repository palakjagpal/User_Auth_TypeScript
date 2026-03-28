import './App.css'
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Protected_Route from './Protected_Route';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Toaster position="top-center" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register />} />

          //This is the "Wrapper" pattern also known as a Higher-Order Component pattern
          //The Outer Layer Protected_Route: This runs first. As we saw in your previous code, it checks the Zustand store for a token.
          //The Inner Layer Home: This is the children prop. It only gets to "exist" on the screen if the outer layer allows it
          <Route path="/home" element={
            <Protected_Route > <Home/> </Protected_Route>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
