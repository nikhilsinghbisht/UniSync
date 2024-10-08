import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from './component/LandingPage/LandingPage';
import Login from './component/LoginPage/LoginPage';
import Forget from './component/LoginPage/ForgetPassword';
import ResetPassword from "./component/LoginPage/ResetPassword";
import AboutUs from "./component/Aboutus/AboutUs";
import ConnectionRequests from './component/ConnectionReq/ConnectionReq';
import ContactUs from './component/ContactUS/Contactus';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './component/Protected/ProtectedRoute';
import CreateNewPost from './component/CreatePost/CreateNewPost.jsx';
import ErrorBoundary from './component/ErrorBoundary.jsx';
import { useContext } from 'react';

function App() {
  const { token } = useContext(AuthContext); // Access token from AuthContext

  const closePost = () => {
    // Define your closePost function here
    console.log("Post closed"); // Example implementation
  };
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <ErrorBoundary> {/* Optional: Wrap with ErrorBoundary */}
            <div className="Pages">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget" element={<Forget />} />
                <Route path="/forget/:token" element={<ResetPassword />} />
                <Route path="/Aboutus" element={<AboutUs />} />
                <Route path="/ConnectionReq" element={<ConnectionRequests />} />
                <Route path="/ContactUs" element={<ContactUs />} />


                {/* Protected Route for CreatePostPage */}
                <Route
                  path="/create-post"
                  element={
                    <ProtectedRoute>
                      <CreateNewPost closePost={closePost} token={token} />
                    </ProtectedRoute>
                  }
                />
                {/* Add other protected routes similarly */}
              </Routes>
            </div>
          </ErrorBoundary>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
