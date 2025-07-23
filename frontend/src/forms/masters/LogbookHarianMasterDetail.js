import React from 'react';
import { useParams, Link } from 'react-router-dom';

const LogbookHarianMasterDetail = () => {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Detail Logbook Harian Master (ID: {id})</h2>
      <div className="mb-4">Halaman detail dummy. Data detail logbook harian master akan ditampilkan di sini.</div>
      <div className="flex gap-4">
        <Link to={`/forms/nonmasters/uraian-inventaris?logbook_harian_master_id=${id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Tambah Uraian Inventaris</Link>
        <Link to={`/forms/nonmasters/uraian-tugas?logbook_harian_master_id=${id}`} className="bg-green-500 text-white px-4 py-2 rounded">Tambah Uraian Tugas</Link>
      </div>
    </div>
  );
};

export default LogbookHarianMasterDetail; 