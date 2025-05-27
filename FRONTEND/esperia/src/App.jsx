import {useState, useEffect} from 'react';
import NavbarWeb from './components/navbar/NavbarWeb';
import FooterWeb from './components/footer/FooterWeb';
import Homepage from './components/pages/Homepage';
import LoginPage from './components/pages/LoginPage';
import {BrowserRouter,  Route, Routes } from 'react-router-dom';


export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const fetchUsers = async () => {
     const token = localStorage.getItem("token")

     if(!token) {
      console.warn('Nessun token trovato')
     }

    const res = await fetch(process.env.REACT_APP_APIURL + "/users", {

    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    }
  });

  if (!res.ok) {
    console.error("Errore nella richiesta:", res.status)
    return;
  }

  const data = await res.json()
  console.log(data)
};

  useEffect(() => {
    if (isLoggedIn) {
    fetchUsers()}
  }, [isLoggedIn])

  return (
    <>
    <BrowserRouter>
      <NavbarWeb/>
      <Routes>
        <Route path="/home" exact element={<Homepage/>}></Route>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} fetchUsers={fetchUsers} />} />
      </Routes>
      <FooterWeb/>
    </BrowserRouter>

    </>
  )
}
