import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/useAuth';
import OfficerDashboard from './components/dashboard/OfficerDashboard';
import SupervisorDashboard from './components/dashboard/SupervisorDashboard';
import SuperAdminDashboard from './components/dashboard/SuperAdminDashboard';
import Login from './components/Login';
import LogbookHarianMasterTable from './forms/masters/LogbookHarianMasterTable';
import LogbookHarianMasterDetail from './forms/masters/LogbookHarianMasterDetail';
import UraianInventarisForm from './forms/nonmasters/UraianInventarisForm';
import UraianTugasForm from './forms/nonmasters/UraianTugasForm';
import MastersIndex from './forms/masters/index';
import NonMastersIndex from './forms/nonmasters/index';
import DummyPage from './DummyPage';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!auth) return <Navigate to="/login" />;
  return children;
};

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();
  if (!auth) return <Navigate to="/login" />;
  if (!allowedRoles.includes(auth.user.role)) return <Navigate to="/dashboard" />;
  return children;
};

const Router = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard/officer" />} />
        <Route
          path="/dashboard/officer"
          element={
            <RoleBasedRoute allowedRoles={['officer', 'supervisor', 'superadmin']}>
              <OfficerDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/supervisor"
          element={
            <RoleBasedRoute allowedRoles={['supervisor', 'superadmin']}>
              <SupervisorDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/superadmin"
          element={
            <RoleBasedRoute allowedRoles={['superadmin']}>
              <SuperAdminDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/forms/masters"
          element={
            <ProtectedRoute>
              <MastersIndex />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/masters/logbook-harian"
          element={
            <ProtectedRoute>
              <LogbookHarianMasterTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/masters/logbook-harian/:id"
          element={
            <ProtectedRoute>
              <LogbookHarianMasterDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/nonmasters"
          element={
            <ProtectedRoute>
              <NonMastersIndex />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/nonmasters/uraian-inventaris"
          element={
            <ProtectedRoute>
              <UraianInventarisForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/nonmasters/uraian-tugas"
          element={
            <ProtectedRoute>
              <UraianTugasForm />
            </ProtectedRoute>
          }
        />
        {/* Dummy fallback untuk route lain */}
        <Route path="/forms/masters/:other" element={<DummyPage />} />
        <Route path="/forms/nonmasters/:other" element={<DummyPage />} />
        <Route path="*" element={<Navigate to="/dashboard/officer" />} />
      </Routes>
    </div>
  );
};

export default Router; 