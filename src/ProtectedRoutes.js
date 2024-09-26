import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoutes = () => {

const loggedInUser = sessionStorage.getItem("username");

return (
        loggedInUser !== "" ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoutes;
