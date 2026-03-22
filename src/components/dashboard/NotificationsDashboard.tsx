import React, { useState } from 'react';
import { FiBell, FiBriefcase, FiMessageSquare, FiDollarSign, FiStar, FiCheckCircle } from 'react-icons/fi';

type NotificationType = 'all' | 'unread' | 'jobs' | 'messages' | 'payments' | 'marked';

interface Notification {
  id: number;
  type: 'job' | 'message' | 'payment' | 'review';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  isMarkedAsRead: boolean;
  icon: React.ReactNode;
  iconBg: string;
}

function NotificationsDashboard() {
  const [activeFilter, setActiveFilter] = useState<NotificationType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'job',
      title: 'New Job Request',
      description: 'Alice M. requested a Pipe Repair service in Kigali',
      time: '5 minutes ago',
      isRead: false,
      isMarkedAsRead: false,
      icon: <FiBriefcase className="w-5 h-5" />,
      iconBg: ' text-teal-700'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      description: 'Bob K. sent you a message about the bathroom installation',
      time: '1 hour ago',
      isRead: false,
      isMarkedAsRead: false,
      icon: <FiMessageSquare className="w-5 h-5" />,
      iconBg: 'text-blue-700'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      description: 'You received 25,000 RWF for completed job #1234',
      time: '3 hours ago',
      isRead: false,
      isMarkedAsRead: false,
      icon: <FiDollarSign className="w-5 h-5" />,
      iconBg: ' text-orange-700'
    },
    {
      id: 4,
      type: 'review',
      title: 'New Review',
      description: 'Carol N. left you a 5-star review!',
      time: 'Yesterday',
      isRead: true,
      isMarkedAsRead: false,
      icon: <FiStar className="w-5 h-5" />,
      iconBg: ' text-yellow-700'
    },
    {
      id: 5,
      type: 'job',
      title: 'Job Completed',
      description: 'You successfully completed the drain cleaning job',
      time: '2 days ago',
      isRead: true,
      isMarkedAsRead: false,
      icon: <FiBriefcase className="w-5 h-5" />,
      iconBg: ' text-teal-700'
    }
  ]);

  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const markedCount = notifications.filter(n => n.isMarkedAsRead).length;

  const getTitle = () => {
    switch (activeFilter) {
      case 'all':
        return 'All Notifications';
      case 'unread':
        return 'Unread';
      case 'jobs':
        return 'Jobs';
      case 'messages':
        return 'Messages';
      case 'payments':
        return 'Payments';
      case 'marked':
        return 'Marked as Read';
      default:
        return 'All Notifications';
    }
  };

  const getFilteredNotifications = () => {
    if (activeFilter === 'all') {
      return notifications;
    } else if (activeFilter === 'unread') {
      return notifications.filter(n => !n.isRead);
    } else if (activeFilter === 'jobs') {
      return notifications.filter(n => n.type === 'job');
    } else if (activeFilter === 'messages') {
      return notifications.filter(n => n.type === 'message');
    } else if (activeFilter === 'payments') {
      return notifications.filter(n => n.type === 'payment');
    } else if (activeFilter === 'marked') {
      return notifications.filter(n => n.isMarkedAsRead);
    }
    return notifications;
  };

  const filteredNotifications = getFilteredNotifications();

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ 
        ...notification, 
        isRead: true,
        isMarkedAsRead: true 
      }))
    );
   
    setActiveFilter('marked');
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id 
          ? { ...notification, isRead: true, isMarkedAsRead: true } 
          : notification
      )
    );
    setShowDropdown(null);
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    setShowDropdown(null);
  };

  return (
    <div className="space-y-6">
    
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiBell className="w-5 h-5 text-brandText" />
          <h2 className="text-sm text-brandText">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </h2>
        </div>
        <button
          onClick={handleMarkAllAsRead}
          className="flex items-center gap-2 px-4 py-2 text-sm text-brandText  border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          <FiCheckCircle className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

    
      <div className="flex gap-2 bg-gray-300 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'all'
              ? 'bg-gray-200 text-gray-900 shadow-sm'
              : 'text-brandText hover:text-gray-900'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter('unread')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
            activeFilter === 'unread'
              ? 'bg-gray-200 text-gray-900 shadow-sm'
              : 'text-brandText hover:text-gray-900'
          }`}
        >
          <span className="flex items-center gap-2">
            Unread
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 bg-red-500 text-white text-xs rounded-full font-semibold">
                {unreadCount}
              </span>
            )}
          </span>
        </button>
        <button
          onClick={() => setActiveFilter('jobs')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'jobs'
              ? 'bg-gray-200 text-gray-900 shadow-sm'
              : 'text-brandText hover:text-gray-900'
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveFilter('messages')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'messages'
              ? 'bg-gray-200 text-gray-900 shadow-sm'
              : 'text-brandText hover:text-gray-900'
          }`}
        >
          Messages
        </button>
        <button
          onClick={() => setActiveFilter('payments')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'payments'
              ? 'bg-gray-200 text-gray-900 shadow-sm'
              : 'text-brandText hover:text-gray-900'
          }`}
        >
          Payments
        </button>
      </div>

     
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6  border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">{getTitle()}</h3>
        </div>

        <div className="p-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">No notifications to display</p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors rounded-xl border border-gray-300 ${
                  !notification.isRead ? 'bg-blue-50' : 'bg-gray-100'
                }`}
              >
           
                <div className={`p-3 rounded-lg ${notification.iconBg} shrink-0`}>
                  {notification.icon}
                </div>

              
                <div className="flex-1 min-w-0">
                  <h4 className=" text-gray-900 mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>

                
                <div className="flex items-start gap-3 shrink-0">
                  
                 
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowDropdown(showDropdown === notification.id ? null : notification.id)
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    </button>

                   
                    {showDropdown === notification.id && (
                      <>
                       
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowDropdown(null)}
                        />
                        
                        
                        <div 
                          className={`absolute right-0 ${
                            index >= filteredNotifications.length - 2 ? 'bottom-full mb-1' : 'top-full mt-1'
                          } min-w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 overflow-hidden`}
                        >
                         
                          {activeFilter === 'marked' ? (
                           
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap"
                            >
                              Delete
                            </button>
                          ) : (
                           
                            <>
                              {!notification.isMarkedAsRead && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-brandText rounded-full mt-2"></div>
                  )}
                </div>
                
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsDashboard;