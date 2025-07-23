import React from 'react';
import { useParams } from 'react-router-dom';

const DummyPage = () => {
  const params = useParams();
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Halaman Belum Tersedia</h2>
      <div className="text-gray-500">Halaman untuk <b>{JSON.stringify(params)}</b> belum diimplementasi.</div>
    </div>
  );
};

export default DummyPage; 