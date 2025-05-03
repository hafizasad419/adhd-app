import Login from "@src/Pages/Login"
import Signup from "@src/Pages/Signup"
import { Navigate, Route, Routes } from "react-router-dom"

function AuthRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
    )
}

export default AuthRoutes
