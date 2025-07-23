import React from 'react';
import { Link } from 'react-router-dom';

const MastersIndex = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Halaman Master</h2>
    <ul className="list-disc pl-6">
      <li>
        <Link to="/forms/masters/logbook-harian">Logbook Harian Master</Link>
      </li>
      {/* Tambahkan link master lain di sini */}
    </ul>
  </div>
);

export default MastersIndex; 