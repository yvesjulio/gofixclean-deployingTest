import React, { useState, useEffect } from 'react';
import { CiCalendar } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { FiX } from "react-icons/fi";

interface DayAvailability {
  day: string;
  enabled: boolean;
  timeRange: string;
  startTime?: string;
  endTime?: string;
}

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (startTime: string, endTime: string) => void;
  currentStartTime?: string;
  currentEndTime?: string;
  dayName: string;
}

const initialDays: DayAvailability[] = [
  { day: 'Monday', enabled: true, timeRange: '8:00 AM - 6:00 PM', startTime: '08:00', endTime: '18:00' },
  { day: 'Tuesday', enabled: true, timeRange: '8:00 AM - 6:00 PM', startTime: '08:00', endTime: '18:00' },
  { day: 'Wednesday', enabled: true, timeRange: '8:00 AM - 6:00 PM', startTime: '08:00', endTime: '18:00' },
  { day: 'Thursday', enabled: true, timeRange: '8:00 AM - 6:00 PM', startTime: '08:00', endTime: '18:00' },
  { day: 'Friday', enabled: true, timeRange: '8:00 AM - 6:00 PM', startTime: '08:00', endTime: '18:00' },
  { day: 'Saturday', enabled: true, timeRange: '9:00 AM - 2:00 PM', startTime: '09:00', endTime: '14:00' },
  { day: 'Sunday', enabled: false, timeRange: '9:00 AM - 2:00 PM', startTime: '09:00', endTime: '14:00' },
];

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentStartTime = '09:00',
  currentEndTime = '17:00',
  dayName
}) => {
  const [startTime, setStartTime] = useState(currentStartTime);
  const [endTime, setEndTime] = useState(currentEndTime);

  if (!isOpen) return null;

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = hour < 12 ? 'AM' : 'PM';
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayString = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
        times.push({ value: timeString, label: displayString });
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleSave = () => {
    const startTimeObj = timeOptions.find(t => t.value === startTime);
    const endTimeObj = timeOptions.find(t => t.value === endTime);
    
    const startLabel = startTimeObj?.label || startTime;
    const endLabel = endTimeObj?.label || endTime;
    
    onSave(startTime, endTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brandTealMedium">Set Time for {dayName}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brandTealMedium mb-2">
                Start Time
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText"
              >
                {timeOptions.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brandTealMedium mb-2">
                End Time
              </label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText"
              >
                {timeOptions.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-brandText text-white rounded-lg hover:bg-brandText/90 transition-colors"
            >
              Save Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AvailabilityDashboardProps {
  onSave?: (days: DayAvailability[], isOnline: boolean) => void;
}

const AvailabilityDashboard: React.FC<AvailabilityDashboardProps> = ({ onSave }) => {
  const [days, setDays] = useState<DayAvailability[]>(initialDays);
  const [isOnline, setIsOnline] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayAvailability | null>(null);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const handleToggleOnline = () => {
    setIsOnline(p => !p);
    setShowMessage(true);
  };

  const toggleDay = (dayName: string) => {
    setDays(prev =>
      prev.map(d =>
        d.day === dayName
          ? { ...d, enabled: !d.enabled }
          : d
      )
    );
  };

  const openTimePicker = (day: DayAvailability) => {
    setSelectedDay(day);
    setTimePickerOpen(true);
  };

  const handleSaveTime = (startTime: string, endTime: string) => {
    if (selectedDay) {
      const formatTimeRange = (start: string, end: string) => {
        const startTimeObj = new Date(`2000-01-01T${start}:00`);
        const endTimeObj = new Date(`2000-01-01T${end}:00`);
        
        const formatTime = (date: Date) => {
          let hours = date.getHours();
          const minutes = date.getMinutes();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12;
          const minutesStr = minutes.toString().padStart(2, '0');
          return `${hours}:${minutesStr} ${ampm}`;
        };
        
        return `${formatTime(startTimeObj)} - ${formatTime(endTimeObj)}`;
      };

      setDays(prev =>
        prev.map(d =>
          d.day === selectedDay.day
            ? { 
                ...d, 
                startTime, 
                endTime,
                timeRange: formatTimeRange(startTime, endTime)
              }
            : d
        )
      );
    }
  };

  const handleSave = () => {
    onSave?.(days, isOnline);
  };

  return (
    <>
      <div className="flex flex-col gap-4 relative">
        <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-300">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <CiCalendar className="text-2xl font-bold" />
              <h1 className="text-lg font-semibold text-gray-900">Availability</h1>
            </div>

            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-0.5 text-white rounded-full ${
                  isOnline ? 'bg-brandOrange' : 'bg-gray-500'
                }`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={isOnline}
                    onChange={handleToggleOnline}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-brandText after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:w-4 after:h-4 after:bg-gray-200 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-2">
            {days.map((item) => (
              <div
                key={item.day}
                className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl hover:shadow-sm transition"
              >
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => toggleDay(item.day)}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-10 h-5 rounded-full transition
                        ${item.enabled ? 'bg-brandText' : 'bg-gray-300'}
                        after:content-[''] after:absolute after:left-[2px] after:top-[2px]
                        after:w-4 after:h-4 after:bg-gray-200 after:rounded-full after:transition
                        ${item.enabled ? 'after:translate-x-5' : ''}
                      `}
                    ></div>
                  </label>
                  <span className="text-sm font-medium text-gray-900">{item.day}</span>
                </div>

                <button
                  onClick={() => item.enabled && openTimePicker(item)}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    item.enabled 
                      ? 'cursor-pointer hover:text-brandText' 
                      : 'cursor-not-allowed'
                  }`}
                  disabled={!item.enabled}
                >
                  {!item.enabled ? (
                    <span className="text-gray-500">Closed</span>
                  ) : (
                    <>
                      <CiClock2 className="text-gray-800" />
                      <span className="text-gray-500">{item.timeRange}</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {showMessage && (
          <div className={`absolute bottom-0 right-0 px-4 py-3 rounded-lg border transition-all duration-300 ${
            isOnline 
              ? 'bg-gray-100 border border-gray-200 text-brandText' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <p className="text-sm font-medium">
              {isOnline 
                ? '✓ You are now available for jobs' 
                : '✗ You are offline now'}
            </p>
          </div>
        )}
      </div>

      <TimePickerModal
        isOpen={timePickerOpen}
        onClose={() => setTimePickerOpen(false)}
        onSave={handleSaveTime}
        currentStartTime={selectedDay?.startTime}
        currentEndTime={selectedDay?.endTime}
        dayName={selectedDay?.day || ''}
      />
    </>
  );
};

export default AvailabilityDashboard;