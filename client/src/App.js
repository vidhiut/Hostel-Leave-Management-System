import { useEffect } from 'react';
import './App.css';
import Aos from 'aos';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import Applications from './pages/dashboard/Applications';
import ProtectedRoute from './utils/protectedRoute';
import AllApplications from './pages/wardenDashboard/AllApplications';
import AdminProtectedRoute from './utils/adminProtectedRoute';
import { useSelector } from 'react-redux';
import ParentApproval from './pages/ParentApproval';
import AllStudents from './pages/wardenDashboard/AllStudents';
import StudentRegistration from './pages/wardenDashboard/StudentRegistration';

function App() {
  useEffect(() => {
    Aos.init();
  }, []);

 const {token} = useSelector((state)=>state.user);


  

  const protectedRoutes = [
    
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/dashboard/profile', element: <Profile /> },
    { path: '/dashboard/applications', element: <Applications /> },
    
  ];

  const wardenRoutes = [
    {path:'/warden/student-registration', element: <StudentRegistration/>},
    {path:'/warden/all-students', element: <AllStudents/>},
    {path:'/warden/all-applications', element: <AllApplications/>},
    {path:'/warden/profile', element: <Profile/>},
  ]
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 5000 }} />
      <Header />
      <Routes>
        
        {protectedRoutes.map((route, index) => (
        <Route path={route.path} key={index}  element={<ProtectedRoute>{route.element}</ProtectedRoute>} />
        ))}
        {wardenRoutes.map((route, index) => (
        <Route path={route.path} key={index}  element={<AdminProtectedRoute>{route.element}</AdminProtectedRoute>} />
        ))}
        
        <Route path='/' element={<HomePage />}/>
        <Route path='/auth/student-login' element={<AuthPage />}/>
        <Route path='/auth/warden-login' element={<AuthPage />}/>
        <Route path='/parent-approval/application/:applicationId' element={<ParentApproval />}/>
        <Route path='*' element={<NotFound />}/>
       
      </Routes>
    </>
  );
}

export default App;
