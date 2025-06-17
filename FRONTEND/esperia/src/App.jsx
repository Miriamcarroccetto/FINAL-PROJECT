import {useState, useEffect} from 'react';
import NavbarWeb from './components/navbar/NavbarWeb';
import FooterWeb from './components/footer/FooterWeb';
import Homepage from './components/pages/Homepage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import {BrowserRouter,  Route, Routes } from 'react-router-dom';
import AddExperience from './components/admin/AddExperience';
import Experience from './components/blog/Experience';
import CategoryExperienceList from './components/blog/experience-list/CategoryExperienceList';
import BookingPage from './components/pages/BookingPage';
import MyBookingsPage from './components/pages/MyBookingsPage';
import AdminExperiences from './components/admin/MyExperiences';
import EditExperience from './components/admin/EditExperience';


export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const fetchUsers = async () => {
     const token = localStorage.getItem("token")

     if(!token) {
      console.warn('Nessun token trovato')
     }

    const res = await fetch(import.meta.env.VITE_APIURL + "/users", {

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
         <Route path="/home" element={<Homepage />} />
         <Route path="/experience/:id" element={<Experience />} />
        <Route path="/new" element={<AddExperience />} />
        <Route path="/" exact element={<Homepage/>}></Route>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} fetchUsers={fetchUsers} />} />
         <Route path="/register" element={<RegisterPage setIsLoggedIn={setIsLoggedIn} fetchUsers={fetchUsers} />} />
         <Route path='/experiences/category/:categoryName' element={<CategoryExperienceList/>}/>
         <Route path='/bookings/:id' element={<BookingPage/>}/>
         <Route path='/my-bookings' element={<MyBookingsPage/>}/>
         <Route path='/admin/experiences/my-experiences' element={<AdminExperiences/>}/>
         <Route path='/admin/experience/edit/:id' element={<EditExperience/>}/>
      </Routes>
      <FooterWeb/>
    </BrowserRouter>

    </>
  )
}
