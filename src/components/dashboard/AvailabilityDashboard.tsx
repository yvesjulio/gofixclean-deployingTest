
import React, { useState } from 'react';
import { CiCalendar } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";

interface DayAvailability {
  day: string;
  enabled: boolean;
  timeRange: string;
}

const initialDays: DayAvailability[] = [
  { day: 'Monday', enabled: true, timeRange: '8:00 AM - 6:00 PM' },
  { day: 'Tuesday', enabled: true, timeRange: '8:00 AM - 6:00 PM' },
  { day: 'Wednesday', enabled: true, timeRange: '8:00 AM - 6:00 PM' },
  { day: 'Thursday', enabled: true, timeRange: '8:00 AM - 6:00 PM' },
  { day: 'Friday', enabled: true, timeRange: '8:00 AM - 6:00 PM' },
  { day: 'Saturday', enabled: true, timeRange: '9:00 AM - 2:00 PM' },
  { day: 'Sunday', enabled: false, timeRange: '9:00 AM - 2:00 PM' },
];

interface AvailabilityDashboardProps {
  onSave?: (days: DayAvailability[], isOnline: boolean) => void;
}

const AvailabilityDashboard: React.FC<AvailabilityDashboardProps> = ({ onSave }) => {
  const [days, setDays] = useState<DayAvailability[]>(initialDays);
  const [isOnline, setIsOnline] = useState(true);

  const toggleDay = (dayName: string) => {
    setDays(prev =>
      prev.map(d =>
        d.day === dayName
          ? { ...d, enabled: !d.enabled }
          : d
      )
    );
  };

  const handleSave = () => {
    onSave?.(days, isOnline);
  };

  return (
    <div className="flex">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-200">

       
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <CiCalendar className="text-2xl font-bold" />
            <h1 className="text-lg font-semibold text-gray-900">Availability</h1>
          </div>

        
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-brandOrange px-3 py-0.5 text-white rounded-full">
                Online
              </span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={isOnline}
                  onChange={() => setIsOnline(p => !p)}
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
              className="flex items-center justify-between px-5 py-4 border border-gray-200 rounded-xl hover:shadow-sm transition"
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

           
              <div className="flex items-center gap-1 text-sm">
                {!item.enabled ? (
                  <span className="text-gray-400">Closed</span>
                ) : (
                  <>
                    <CiClock2 className="text-gray-800" />
                    <span className="text-gray-500">{item.timeRange}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AvailabilityDashboard;