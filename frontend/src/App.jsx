import {Outlet} from 'react-router-dom'
import Navigation from './pages/Auth/Navigation.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="min-h-screen w-full bg-[#101011] py-3">
        <Outlet />
      </main>
    </>
  )
}

export default App
