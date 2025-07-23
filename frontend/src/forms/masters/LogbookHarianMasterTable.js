import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogbookHarianMasterTable = () => {
  const navigate = useNavigate();
  // Dummy data, ganti dengan fetch API nanti
  const data = [
    {
      id: 1,
      tanggal: '2024-06-01',
      shift: 'Pagi',
      lokasi_pos: 'Pos A',
      ttd_yg_menyerahkan: 'Petugas A',
      ttd_yg_menerima: 'Petugas B',
      ttd_supervisor: 'Supervisor X',
      status: 'Selesai',
    },
  ];

  const handleDetail = (id) => {
    navigate(`/forms/masters/logbook-harian/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Logbook Harian Master</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Tanggal</th>
            <th className="border px-2 py-1">Shift</th>
            <th className="border px-2 py-1">Lokasi Pos</th>
            <th className="border px-2 py-1">TTD Menyerahkan</th>
            <th className="border px-2 py-1">TTD Menerima</th>
            <th className="border px-2 py-1">TTD Supervisor</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="border px-2 py-1">{row.tanggal}</td>
              <td className="border px-2 py-1">{row.shift}</td>
              <td className="border px-2 py-1">{row.lokasi_pos}</td>
              <td className="border px-2 py-1">{row.ttd_yg_menyerahkan}</td>
              <td className="border px-2 py-1">{row.ttd_yg_menerima}</td>
              <td className="border px-2 py-1">{row.ttd_supervisor}</td>
              <td className="border px-2 py-1">{row.status}</td>
              <td className="border px-2 py-1">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded mr-2">Hapus</button>
                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleDetail(row.id)}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogbookHarianMasterTable; 