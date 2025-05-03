import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Dashboard = lazy(() => import('@src/Pages/Dashboard'))

function ProtectedRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to={"/"} />} />

        </Routes>
    )
}

export default ProtectedRoutes