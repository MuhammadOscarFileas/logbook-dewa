import React, { useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';

// Mapping lokasi ke jenis logbook sesuai instruksi user
const POS_LOGBOOK_MAP = {
  'Screening': {
    'PSCP': [
      'logbook harian',
      'logbook rotasi personel',
      'pemeriksaan manual',
      'penitipan senjata api selain penumpang',
      'logbook explosive detector',
    ],
    'Level 4': [
      'logbook harian',
      'logbook rotasi personel',
    ],
    'HBS': [
      'logbook harian',
    ],
    'SCP LAGs': [
      'logbook harian',
    ],
    'SCP Transit': [
      'logbook harian',
      'logbook rotasi personel',
    ],
    'SSCP': [
      'logbook harian',
      'logbook rotasi personel',
      'logbook explosive detector',
      'form pi',
      'penitipan senjata api selain penumpang',
    ],
    'OOG': [
      'logbook harian',
      'logbook rotasi personel',
      'form pi',
      'rekonsiliasi',
      'penitipan senjata api selain penumpang',
  ],
  },
  'Terminal Protection': {
    'Chief-Terminal Protection': [
      'logbook harian',
      'kemajuan personel',
    ],
    'Ruang Tunggu': [
      'logbook sterilisasi ruang tunggu',
      'logbook harian',
  ],
    'Walking Patrol': [
      'logbook harian',
      'walking patrol terminal',
    ],
    'Mezzanine Domestik': [
      'logbook harian',
    ],
    'Kedatangan Domestik': [
      'logbook harian',
  ],
    'Akses Karyawan': [
      'logbook harian',
    ],
    'Building Protection': [
      'logbook harian',
    ],
    'CCTV': [
      'logbook harian',
      'logbook penggunaan smart door gate',
      'daily check panic button',
      'unattended baggage',
      'behavior form',
      'suspicious form',
      'data tracking cctv',
      'buku pengunjung cctv',
    ],
  },
  'Non-Terminal Protection': {
    'Main Gate': [
      'logbook harian',
      'logbook rotasi personel',
      'check list pemeriksaan random & unpredictable',
    ],
    'Chief Non-Terminal': [
      'logbook harian',
      'kemajuan personel',
    ],
    'Patroli': [
      'logbook harian airside',
      'logbook harian landside',
      'check list patroli airside',
      'check list patroli landside',
      'logbook random',
    ],
    'Kargo': [
      'logbook harian kargo domestik',
      'logbook harian kargo international',
      'logbook ra',
    ],
    'Papa November': [
      'logbook harian',
      'walking patrol landside',
    ],
    'Pos Congot': [
      'logbook harian',
    ],
  },
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');
}

const OfficerDashboard = () => {
  const { auth } = useAuth();
  const userPos = auth?.user?.pos;
  const lokasiMap = POS_LOGBOOK_MAP[userPos] || {};
  const lokasiList = Object.keys(lokasiMap);
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const handleAccordion = idx => {
    setOpenIndex(idx === openIndex ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gray-50 fade-in px-2 sm:px-6 py-8">
      <div className="w-full max-w-4xl mx-auto mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-blue-900">Officer Dashboard</h2>
        <h3 className="text-base sm:text-lg font-medium mb-6 text-center text-gray-600">Pos: <span className="font-semibold text-blue-700">{userPos || '-'}</span></h3>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lokasiList.length === 0 && <div className="col-span-full text-gray-400 text-center">Tidak ada lokasi untuk pos ini.</div>}
          {lokasiList.map((lokasi, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={lokasi} className="col-span-1">
                <div
                  className={`bg-white shadow-lg border border-gray-200 transition-all duration-300 cursor-pointer ${isOpen ? 'ring-2 ring-blue-300 rounded-xl' : 'rounded-xl'}`}
                  onClick={() => handleAccordion(idx)}
                  style={{ minHeight: 80, borderRadius: '0.75rem' }}
                >
                  <div className="flex items-center justify-between px-6 py-5 rounded-t-xl">
                    <span className={`text-lg sm:text-xl font-semibold text-gray-800 ${isOpen ? 'text-blue-700' : ''}`}>{lokasi}</span>
                    <svg
                      className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 bg-gray-50 ${isOpen ? 'max-h-96 py-2 px-4 rounded-b-xl' : 'max-h-0 py-0 px-4 rounded-b-xl'}`}
                    style={{
                      borderTop: isOpen ? '1px solid #e5e7eb' : 'none',
                      borderBottomLeftRadius: isOpen ? '0.75rem' : '',
                      borderBottomRightRadius: isOpen ? '0.75rem' : '',
                    }}
                  >
                    {isOpen && (
                      <div className="flex flex-col gap-2 mt-2">
                        {lokasiMap[lokasi].map(jenis => (
                          <button
                            key={jenis}
                            onClick={e => { e.stopPropagation(); navigate(`/form/${slugify(jenis)}`); }}
                            className="w-full text-left bg-white border border-blue-200 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition"
                          >
                            {jenis}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard; 