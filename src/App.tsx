import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing'

// Layouts
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword'
import VerifyCode from './pages/Auth/VerifyCode/VerifyCode'
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword'

// Lazy load all pages
// const Landing = lazy(() => import('./pages/Landing/Landing'))
const Login = lazy(() => import('./pages/Auth/Login/Login'))
const Register = lazy(() => import('./pages/Auth/Register/Register'))

// Employee pages
const EmployeeDashboard = lazy(() => import('./pages/Employee/Dashboard/Dashboard'))
const TimeTracking = lazy(() => import('./pages/Employee/TimeTracking/TimeTracking'))
const LeaveRequest = lazy(() => import('./pages/Employee/LeaveRequest/LeaveRequest'))
const EmployeeReports = lazy(() => import('./pages/Employee/Reports/Reports'))
const EmployeeAnalytics = lazy(() => import('./pages/Employee/Analytics/Analytics'))
const EmployeeAuditTrail = lazy(() => import('./pages/Employee/AuditTrail/AuditTrail'))
const Profile = lazy(() => import('./pages/Employee/Profile/Profile'))

// Admin pages
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard/Dashboard'))
const Employees = lazy(() => import('./pages/Admin/Employees/Employees'))
const LeaveApprovals = lazy(() => import('./pages/Admin/LeaveApprovals/LeaveApprovals'))
const AdminReports = lazy(() => import('./pages/Admin/Reports/Reports'))
const AdminAnalytics = lazy(() => import('./pages/Admin/Analytics/Analytics'))
const AdminAuditTrail = lazy(() => import('./pages/Admin/AuditTrail/AuditTrail'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {/* Public routes - no layout */}
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Landing />} />

          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
             <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Employee routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/timetracking" element={<TimeTracking />} />
            <Route path="/employee/leave" element={<LeaveRequest />} />
            <Route path="/employee/reports" element={<EmployeeReports />} />
            <Route path="/employee/analytics" element={<EmployeeAnalytics />} />
            <Route path="/employee/audit" element={<EmployeeAuditTrail />} />
            <Route path="/employee/profile" element={<Profile />} />
          </Route>

          {/* Admin routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<Employees />} />
            <Route path="/admin/leave" element={<LeaveApprovals />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/audit" element={<AdminAuditTrail />} />
          </Route>
    <Route path="*" element={<div><h1>404 - Path: {window.location.pathname}</h1></div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App