import React, { useState } from 'react';

const UraianInventarisForm = () => {
  const [form, setForm] = useState({
    logbook_harian_master_id: '',
    nama_inventaris: '',
    jumlah: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit ke backend
    alert('Data disubmit: ' + JSON.stringify(form));
  };

  return (
    <form className="p-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Tambah Uraian Inventaris</h2>
      <div className="mb-2">
        <label className="block">ID Logbook Harian Master</label>
        <input type="number" name="logbook_harian_master_id" value={form.logbook_harian_master_id} onChange={handleChange} className="border px-2 py-1 w-full" required />
      </div>
      <div className="mb-2">
        <label className="block">Nama Inventaris</label>
        <input type="text" name="nama_inventaris" value={form.nama_inventaris} onChange={handleChange} className="border px-2 py-1 w-full" required />
      </div>
      <div className="mb-2">
        <label className="block">Jumlah</label>
        <input type="number" name="jumlah" value={form.jumlah} onChange={handleChange} className="border px-2 py-1 w-full" required />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>
    </form>
  );
};

export default UraianInventarisForm; 