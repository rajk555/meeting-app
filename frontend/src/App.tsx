import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MeetingsPage from './pages/MeetingsPage';
import MeetingCreatePage from './pages/MeetingCreatePage';
import MeetingDetailPage from './pages/MeetingDetailPage';

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/meetings"
            element={
              <RequireAuth>
                <MeetingsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/meetings/new"
            element={
              <RequireAuth>
                <MeetingCreatePage />
              </RequireAuth>
            }
          />
          <Route
            path="/meetings/:id"
            element={
              <RequireAuth>
                <MeetingDetailPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/meetings" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
