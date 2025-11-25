import {Routes,Route} from "react-router"
import { HomePage } from './components/HomePage'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/checkout" element={<div>Checkout page</div>}></Route>
      </Routes>
        
    </>
  )
}

export default App
