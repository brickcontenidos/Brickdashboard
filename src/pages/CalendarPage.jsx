import React, { useState, useEffect } from 'react';
// 1. Importamos las herramientas que creamos con Codex
import { generateWeekData, getStatusColor } from '../utils/calendarUtils.js';

const CalendarPage = ({ onNavigate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekData, setWeekData] = useState([]);
  const [editingDay, setEditingDay] = useState(null);
  const [editingSessionIndex, setEditingSessionIndex] = useState(null);
  const [editingTeams, setEditingTeams] = useState(false);

  // Usamos useEffect para generar los datos de la semana cuando el componente se carga o la fecha cambia.
  useEffect(() => {
    setWeekData(generateWeekData(new Date(currentDate)));
  }, [currentDate]);

  const navigate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getHeader = () => {
    const weekStart = new Date(currentDate);
    const day = weekStart.getDay();
    const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(weekStart.setDate(diff));

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startMonth = startOfWeek.toLocaleString('es-ES', { month: 'long' });
    const endMonth = endOfWeek.toLocaleString('es-ES', { month: 'long' });
    const year = startOfWeek.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} ${year}`;
    } else {
      return `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} / ${endMonth.charAt(0).toUpperCase() + endMonth.slice(1)} ${year}`;
    }
  };

  const handleDayClick = (dayId, sessionIndex) => {
    setEditingTeams(false);
    setEditingDay(dayId);
    setEditingSessionIndex(sessionIndex);
  };

  const handleTeamsClick = (dayId) => {
    setEditingTeams(true);
    setEditingDay(dayId);
    setEditingSessionIndex(null);
  };

  const handleCloseEdit = () => {
    setEditingDay(null);
    setEditingSessionIndex(null);
    setEditingTeams(false);
  };

  const handleEdit = (field, value) => {
    const newData = weekData.map(day => {
      if (day.id === editingDay) {
        if (editingTeams) {
          const newTeams = { ...day.teams, [field]: value };
          if (field === 'title' && value.trim() && newTeams.status === 'vacío') {
            newTeams.status = 'ocupado';
          }
          return { ...day, teams: newTeams };
        } else {
          const newSessions = [...day.sessions];
          const newSession = { ...newSessions[editingSessionIndex], [field]: value };
          if (field === 'title' && value.trim() && newSession.status === 'vacío') {
            newSession.status = 'ocupado';
          }
          newSessions[editingSessionIndex] = newSession;
          return { ...day, sessions: newSessions };
        }
      }
      return day;
    });
    setWeekData(newData);
  };
  
  const getEditableData = () => {
    const day = weekData.find(d => d.id === editingDay);
    if (!day) return null;
    return editingTeams ? day.teams : day.sessions[editingSessionIndex];
  };

  return (
    <div className="font-sans bg-gradient-to-br from-gray-900 via-[#0a0a0a] to-gray-800 text-white min-h-screen p-4 sm:p-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => onNavigate('home')}
          className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors shadow-lg"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Calendario de Rodaje</h1>
        <div className="w-12"></div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8 p-4 bg-gray-900 rounded-xl border border-gray-700">
        <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-green-400 mr-2"></span><span className="text-sm">Programado</span></div>
        <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></span><span className="text-sm">Oportunidad</span></div>
        <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-red-400 mr-2"></span><span className="text-sm">Alerta</span></div>
        <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-gray-200 mr-2"></span><span className="text-sm">Disponible</span></div>
      </div>

      <div className="flex justify-between items-center max-w-7xl mx-auto mb-6">
        <button onClick={() => navigate('prev')} className="p-3 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-bold text-white">{getHeader()}</h2>
        <button onClick={() => navigate('next')} className="p-3 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-8 gap-2 max-w-7xl mx-auto border border-gray-700 rounded-xl overflow-hidden shadow-xl">
        {/* Encabezados */}
        <div className="py-4 text-center font-semibold text-gray-300 bg-gray-800 border-b border-gray-700">Horarios</div>
        {weekData.map((dayData) => (
          <div key={`header-${dayData.id}`} className="py-4 text-center font-semibold text-gray-300 bg-gray-800 border-b border-gray-700">
            <p className="text-sm">{dayData.day}</p><p className="text-xs font-normal text-gray-400">{dayData.date}</p>
          </div>
        ))}

        {/* Sesión Mañana */}
        <div className="p-4 text-center bg-gray-800 text-white border-b border-gray-700 flex items-center justify-center"><span className="font-semibold text-sm">12:00-15:00</span></div>
        {weekData.map((dayData) => (
          <div key={`morning-${dayData.id}`} onClick={() => handleDayClick(dayData.id, 0)} className={`p-4 text-xs h-24 flex flex-col justify-center border-b border-gray-700 cursor-pointer transition-all duration-200 hover:scale-105 ${getStatusColor(dayData.sessions[0].status)}`}>
            {dayData.sessions[0].title.trim() !== '' ? (<><p className="font-bold text-gray-900 text-center">{dayData.sessions[0].title}</p><p className="text-gray-700 text-center mt-1">{dayData.sessions[0].description}</p></>) : (<p className="text-gray-500 text-center">Disponible</p>)}
          </div>
        ))}
        
        {/* Sesión Tarde */}
        <div className="p-4 text-center bg-gray-800 text-white border-b border-gray-700 flex items-center justify-center"><span className="font-semibold text-sm">16:00-19:00</span></div>
        {weekData.map((dayData) => (
          <div key={`afternoon-${dayData.id}`} onClick={() => handleDayClick(dayData.id, 1)} className={`p-4 text-xs h-24 flex flex-col justify-center border-b border-gray-700 cursor-pointer transition-all duration-200 hover:scale-105 ${getStatusColor(dayData.sessions[1].status)}`}>
            {dayData.sessions[1].title.trim() !== '' ? (<><p className="font-bold text-gray-900 text-center">{dayData.sessions[1].title}</p><p className="text-gray-700 text-center mt-1">{dayData.sessions[1].description}</p></>) : (<p className="text-gray-500 text-center">Disponible</p>)}
          </div>
        ))}

        {/* Equipos */}
        <div className="p-4 text-center bg-gray-800 text-white flex items-center justify-center"><span className="font-semibold text-sm">Equipos</span></div>
        {weekData.map((dayData) => (
          <div key={`teams-${dayData.id}`} onClick={() => handleTeamsClick(dayData.id)} className={`p-4 text-xs h-20 cursor-pointer transition-all duration-200 hover:scale-105 ${getStatusColor(dayData.teams.status)}`}>
            {dayData.teams.title.trim() !== '' ? (<p className="font-bold text-gray-900 text-center text-sm">{dayData.teams.title}</p>) : (<p className="text-gray-500 text-center">Sin equipos</p>)}
          </div>
        ))}
      </div>

      {/* Modal de Edición */}
      {editingDay !== null && getEditableData() && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-700 text-white">
            <h2 className="text-xl font-bold mb-6">{editingTeams ? 'Editar Equipos' : 'Editar Jornada'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Título</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] bg-gray-700 text-white" value={getEditableData().title || ''} onChange={(e) => handleEdit('title', e.target.value)} />
              </div>
              {!editingTeams && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
                  <textarea className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] bg-gray-700 text-white h-24 resize-none" value={getEditableData().description || ''} onChange={(e) => handleEdit('description', e.target.value)} />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Estado</label>
                <div className="flex gap-3">
                  {['ocupado', 'oportunidad', 'rojo', 'vacío'].map((status) => (
                    <button key={status} className={`p-2 rounded-lg border-2 transition-all ${getEditableData().status === status ? 'border-white' : 'border-gray-600 hover:border-gray-500'}`} onClick={() => handleEdit('status', status)}>
                      <div className={`w-6 h-6 rounded-full ${getStatusColor(status)} mb-1`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={handleCloseEdit} className="px-6 py-3 bg-[#E63946] text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
