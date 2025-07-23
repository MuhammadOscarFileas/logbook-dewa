import React from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, onClose, pushLayout, collapsed, onHamburgerClick, collapsedWidth = 64, fullWidth = 256 }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  if (!auth) return null;
  const { user } = auth;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Sidebar style
  const sidebarWidth = collapsed ? collapsedWidth : fullWidth;
  const sidebarClass = `
    h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 z-50
    fixed md:static top-0 left-0
    ${pushLayout ? '' : 'md:translate-x-0'}
    ${open ? 'translate-x-0' : '-translate-x-full'}
    md:block
  `;

  return (
    <>
      {/* Overlay for mobile */}
      {open && !pushLayout && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside
        className={sidebarClass}
        style={{ width: sidebarWidth, minWidth: sidebarWidth, transition: 'all 0.3s' }}
      >
        {/* HAPUS tombol hamburger dari sini */}
        {/* Only show profile and logout if not collapsed */}
        {!collapsed && (
          <>
            <div className="w-full flex flex-col items-center py-8 border-b border-gray-700">
              <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-4xl mb-2">
                <span role="img" aria-label="avatar">👤</span>
              </div>
              <div className="text-lg font-semibold text-white text-center">{user.nama_lengkap}</div>
              <div className="text-xs text-gray-300 mt-1">{user.role}</div>
              {user.pos && <div className="text-xs text-gray-400 mt-1">{user.pos}</div>}
            </div>
            <div className="flex-1" />
            <button
              onClick={handleLogout}
              className="w-2/3 mx-auto bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-base font-semibold shadow mb-8 transition-all duration-200"
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
            >
              Logout
            </button>
          </>
        )}
      </aside>
    </>
  );
};

export default Sidebar; 