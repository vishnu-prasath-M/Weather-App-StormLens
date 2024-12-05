import WeatherApp from "./Components/Weather"
import { BrowserRouter,Route,Routes } from "react-router-dom"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"

function App()


{
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherApp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>

      </BrowserRouter>
    </div>
  )
}
export default App