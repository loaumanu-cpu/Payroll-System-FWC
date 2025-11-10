import { Navigate, Outlet } from 'react-router-dom'
import Layout from './Layout'

export default function ProtectedLayout() {
  const auth = localStorage.getItem('authUser')
  if (!auth) {
    return <Navigate to="/login" replace />
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}


