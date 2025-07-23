import React, { useState } from 'react';

const UraianTugasForm = () => {
  const [form, setForm] = useState({
    logbook_harian_master_id: '',
    uraian_tugas: '',
    keterangan: '',
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
      <h2 className="text-xl font-bold mb-4">Tambah Uraian Tugas</h2>
      <div className="mb-2">
        <label className="block">ID Logbook Harian Master</label>
        <input type="number" name="logbook_harian_master_id" value={form.logbook_harian_master_id} onChange={handleChange} className="border px-2 py-1 w-full" required />
      </div>
      <div className="mb-2">
        <label className="block">Uraian Tugas</label>
        <input type="text" name="uraian_tugas" value={form.uraian_tugas} onChange={handleChange} className="border px-2 py-1 w-full" required />
      </div>
      <div className="mb-2">
        <label className="block">Keterangan</label>
        <input type="text" name="keterangan" value={form.keterangan} onChange={handleChange} className="border px-2 py-1 w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>
    </form>
  );
};

export default UraianTugasForm; 