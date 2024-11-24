import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Notifications from "./pages/notifications/Notifications";
import Profile from "./pages/profile/Profile";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Navbar from './components/navbar/Navbar';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from './components/loading/Loading';
import { Helmet } from 'react-helmet';


function App() {
  const queryClient = useQueryClient();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error("Logout failed");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
      // Optionally redirect to login page
      window.location.href = "/login";
    },
  });

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loading />
      </div>
    );
  }

  return (
    <>
      {authUser && <Navbar authUser={authUser} onLogout={() => logoutMutation.mutate()} />}
      <div>
        {/* <Helmet>
          <title>NebulaNet - media</title>
          <meta name="description" content="This is the home page of MyWebsite" />
        </Helmet> */}
        <Routes>
          <Route path='/' element={authUser ? <Home authUser={authUser}/> : <Navigate to='/login' />} />
          <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to='/' />} />
          <Route path='/notifications' element={authUser ? <Notifications /> : <Navigate to='/login' />} />
          <Route path='/profile/:username' element={authUser ? <Profile/> : <Navigate to='/login' />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
