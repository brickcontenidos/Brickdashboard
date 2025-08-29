export const getFullDayName = (dayIndex) => {
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return dayNames[dayIndex];
};

export const generateWeekData = (startDate) => {
  const weekData = [];
  const startDay = startDate.getDay();
  const diff = startDate.getDate() - startDay + (startDay === 0 ? -6 : 1);
  const weekStart = new Date(startDate.setDate(diff));

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    const dayName = getFullDayName(date.getDay());
    const dayNumber = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    weekData.push({
      id: `day-${i}`,
      day: dayName,
      date: `${dayNumber}/${month}`,
      fullDate: `${year}-${month.toString().padStart(2, '0')}-${dayNumber.toString().padStart(2, '0')}`,
      sessions: [
        { title: '', type: '', status: 'vacío', description: '', projectId: null },
        { title: '', type: '', status: 'vacío', description: '', projectId: null }
      ],
      teams: { title: '', description: '', status: 'vacío', content: '' }
    });
  }
  return weekData;
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'ocupado':
      return 'bg-green-400';
    case 'oportunidad':
      return 'bg-yellow-400';
    case 'vacío':
      return 'bg-gray-200';
    case 'rojo':
      return 'bg-red-400';
    default:
      return 'bg-gray-200';
  }
};
