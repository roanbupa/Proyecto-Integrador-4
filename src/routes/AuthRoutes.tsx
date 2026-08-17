import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function AuthRoutes() {
    return (
        <Routes>
            {/* /login */}
            <Route index element={<Login />} />

            {/* /login/register */}
            <Route path="register" element={<Register />} />
        </Routes>
    )
}