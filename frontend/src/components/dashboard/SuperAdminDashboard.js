import React, { useState, useEffect } from 'react';
import LogBookList from '../logbook/LogBookList';
import axiosInstance from '../../api/axiosInstance';

const POS_OPTIONS = [
  { value: 'Terminal Protection', label: 'Terminal Protection' },
  { value: 'Non-Terminal Protection', label: 'Non-Terminal Protection' },
  { value: 'Screening', label: 'Screening' },
];

const PegawaiList = ({ onRegister, refresh }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [notif, setNotif] = useState(null);
  const [resetPasswords, setResetPasswords] = useState({});

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/api/users')
      .then(res => {
        setUsers(res.data.filter(u => u.role === 'officer' || u.role === 'supervisor'));
        setError(null);
      })
      .catch(err => setError('Gagal mengambil data user'))
      .finally(() => setLoading(false));
  }, [refresh, notif]);

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
    setEditUser(null);
    setNotif(null);
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
    setNotif(null);
  };

  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/api/users/${editUser.user_id}`, editUser);
      setNotif({ type: 'success', msg: 'Data user berhasil diupdate' });
      setEditUser(null);
    } catch (err) {
      setNotif({ type: 'error', msg: err.response?.data?.error || 'Gagal update user' });
    }
  };

  const handleDelete = async (user_id) => {
    if (!window.confirm('Yakin hapus user ini?')) return;
    try {
      await axiosInstance.delete(`/api/users/${user_id}`);
      setNotif({ type: 'success', msg: 'User dihapus' });
      setExpanded(null);
    } catch (err) {
      setNotif({ type: 'error', msg: err.response?.data?.error || 'Gagal hapus user' });
    }
  };

  const handleResetPassword = async (user_id) => {
    try {
      const res = await axiosInstance.put(`/api/users/${user_id}/reset-password`);
      setNotif({ type: 'success', msg: `Password baru: ${res.data.password}` });
      setResetPasswords(prev => ({ ...prev, [user_id]: res.data.password }));
    } catch (err) {
      setNotif({ type: 'error', msg: err.response?.data?.error || 'Gagal reset password' });
    }
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow p-6 fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Daftar Pegawai</h2>
        <button onClick={onRegister} className="button bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register User</button>
      </div>
      {notif && <div className={`mb-2 p-2 rounded text-sm ${notif.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{notif.msg}</div>}
      {loading && <div className="flex justify-center py-4"><div className="loader" /></div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul className="divide-y divide-gray-200">
        {users.map(user => (
          <li key={user.user_id} className="py-3">
            <button className="w-full text-left flex items-center justify-between px-2 py-2 rounded hover:bg-gray-50" onClick={() => handleExpand(user.user_id)}>
              <span className="font-medium">{user.nama_lengkap}</span>
              <span className="text-sm text-gray-500">{user.role}</span>
              <span className="text-xs text-gray-400">{user.pos}</span>
              <svg className={`w-4 h-4 ml-2 transition-transform ${expanded === user.user_id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {expanded === user.user_id && (
              <div className="bg-gray-50 rounded p-4 mt-2">
                <div className="space-y-2">
                  <input name="nama_lengkap" value={(editUser && editUser.user_id === user.user_id ? editUser.nama_lengkap : user.nama_lengkap)} onChange={e => setEditUser({ ...(editUser && editUser.user_id === user.user_id ? editUser : user), nama_lengkap: e.target.value, user_id: user.user_id })} className="input w-full border px-3 py-2 rounded" />
                  <input name="email" value={(editUser && editUser.user_id === user.user_id ? editUser.email : user.email)} onChange={e => setEditUser({ ...(editUser && editUser.user_id === user.user_id ? editUser : user), email: e.target.value, user_id: user.user_id })} className="input w-full border px-3 py-2 rounded" />
                  <select name="role" value={(editUser && editUser.user_id === user.user_id ? editUser.role : user.role)} onChange={e => setEditUser({ ...(editUser && editUser.user_id === user.user_id ? editUser : user), role: e.target.value, user_id: user.user_id })} className="input w-full border px-3 py-2 rounded">
                    <option value="officer">Officer</option>
                    <option value="supervisor">Supervisor</option>
                  </select>
                  <select name="pos" value={(editUser && editUser.user_id === user.user_id ? editUser.pos : user.pos)} onChange={e => setEditUser({ ...(editUser && editUser.user_id === user.user_id ? editUser : user), pos: e.target.value, user_id: user.user_id })} className="input w-full border px-3 py-2 rounded">
                    {POS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  <input name="lokasi" value={(editUser && editUser.user_id === user.user_id ? editUser.lokasi : user.lokasi) || ''} onChange={e => setEditUser({ ...(editUser && editUser.user_id === user.user_id ? editUser : user), lokasi: e.target.value, user_id: user.user_id })} className="input w-full border px-3 py-2 rounded" placeholder="Lokasi (opsional)" />
                  <input name="password" value={resetPasswords[user.user_id] ? resetPasswords[user.user_id] : '****'} readOnly className="input w-full border px-3 py-2 rounded bg-gray-100" />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleSave()} className="button bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan</button>
                    <button onClick={() => handleResetPassword(user.user_id)} className="button bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">Reset Password</button>
                    <button onClick={() => { if(window.confirm('Yakin hapus user ini?')) handleDelete(user.user_id); }} className="button bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Hapus</button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const RegisterUserForm = ({ onBack, onSuccess }) => {
  const [form, setForm] = useState({
    nama_lengkap: '',
    email: '',
    role: 'officer',
    pos: 'Terminal Protection',
    lokasi: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notif, setNotif] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotif(null);
    try {
      const res = await axiosInstance.post('/api/users/register', form);
      setNotif({ type: 'success', msg: `User berhasil dibuat. Password: ${res.data.password}` });
      setForm({ nama_lengkap: '', email: '', role: 'officer', pos: 'Terminal Protection', lokasi: '' });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal register user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 fade-in">
      <h2 className="text-xl font-semibold mb-4">Register User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nama_lengkap" placeholder="Nama Lengkap" value={form.nama_lengkap} onChange={handleChange} required className="input w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="input w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <select name="role" value={form.role} onChange={handleChange} required className="input w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="officer">Officer</option>
          <option value="supervisor">Supervisor</option>
        </select>
        <select name="pos" value={form.pos} onChange={handleChange} required className="input w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
          {POS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <input name="lokasi" placeholder="Lokasi (opsional)" value={form.lokasi} onChange={handleChange} className="input w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <div className="flex gap-2 mt-2">
          <button type="submit" disabled={loading} className="button bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">{loading ? 'Registering...' : 'Register'}</button>
          <button type="button" onClick={onBack} className="button bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 w-full">Kembali</button>
        </div>
      </form>
      {notif && <div className="text-green-600 mt-2">{notif.msg}</div>}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

const SuperAdminDashboard = () => {
  const [page, setPage] = useState('main');
  const [refreshPegawai, setRefreshPegawai] = useState(0);

  if (page === 'logbook') return <div className="p-4 fade-in"><button onClick={() => setPage('main')} className="mb-4 button bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Kembali</button><LogBookList /></div>;
  if (page === 'pegawai') return <div className="p-4 fade-in"><button onClick={() => setPage('main')} className="mb-4 button bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Kembali</button><PegawaiList onRegister={() => setPage('register')} refresh={refreshPegawai} /></div>;
  if (page === 'register') return <RegisterUserForm onBack={() => setPage('pegawai')} onSuccess={() => { setPage('pegawai'); setRefreshPegawai(r => r+1); }} />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-yellow-50 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <div className="card bg-white rounded-lg shadow p-8 flex flex-col items-center cursor-pointer hover:shadow-lg transition" onClick={() => setPage('logbook')}>
          <div className="w-12 h-12 mb-4 flex items-center justify-center bg-blue-100 rounded-full">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3m9 0a9 9 0 100-18 9 9 0 000 18z" /></svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Log Book</h2>
          <p className="text-gray-500 text-center">Lihat semua log book/laporan</p>
        </div>
        <div className="card bg-white rounded-lg shadow p-8 flex flex-col items-center cursor-pointer hover:shadow-lg transition" onClick={() => setPage('pegawai')}>
          <div className="w-12 h-12 mb-4 flex items-center justify-center bg-green-100 rounded-full">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Pegawai</h2>
          <p className="text-gray-500 text-center">Lihat dan kelola data pegawai</p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard; 