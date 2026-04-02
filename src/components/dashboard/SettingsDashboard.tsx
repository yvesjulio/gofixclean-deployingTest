import React, { useState } from 'react';
import { FiUser, FiBell, FiShield, FiGlobe, FiCamera, FiSave } from 'react-icons/fi';

type TabType = 'personal' | 'notifications' | 'security' | 'language';

interface Language {
  code: string;
  name: string;
}

function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [languageOpen, setLanguageOpen] = useState(false); 
  const [formData, setFormData] = useState({
    fullName: 'Jean Baptiste',
    email: 'jean@example.com',
    phone: '+250 788 123 456',
    location: 'Kigali, Rwanda',
    bio: 'Professional plumber with 10+ years of experience.',
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    jobAlerts: true,
    reviewAlerts: true,
    promotionalEmails: false
  });

  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    code: 'English',
    name: 'English'
  });

  const languages: Language[] = [
    { code: 'English', name: 'English' },
    { code: 'Francais', name: 'Francais' },
    { code: 'Kinyarwanda', name: 'Kinyarwanda' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving changes...', formData);
  };

  const handlePhotoUpload = () => {
    console.log('Upload photo clicked');
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="bg-white rounded-xl p-4 sm:p-8 border border-gray-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
            <p className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8">Update your personal details</p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
              <div className="relative">
                <img
                  src={formData.profilePhoto}
                  alt="Profile"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200"
                />
                <button
                  onClick={handlePhotoUpload}
                  className="absolute bottom-0 right-0 p-1 sm:p-1.5 bg-gray-200 text-sm rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <FiCamera className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                </button>
              </div>
              <div>
                <p className="text-gray-800 text-xs sm:text-sm">Profile Photo</p>
                <p className="text-xs sm:text-sm text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-brandTealMedium mb-1 sm:mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4 text-brandTealMedium py-2 sm:py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-brandTealMedium mb-1 sm:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 h-9 sm:h-10 text-xs sm:text-sm text-brandTealMedium bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-brandTealMedium mb-1 sm:mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 h-9 sm:h-10 text-xs sm:text-sm text-brandTealMedium bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-brandTealMedium mb-1 sm:mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 h-9 sm:h-10 text-xs sm:text-sm text-brandTealMedium bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <label className="block text-xs sm:text-sm font-medium text-brandTealMedium mb-1 sm:mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 text-xs sm:text-sm text-brandTealMedium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-brandTealMedium text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
            >
              <FiSave className="w-4 h-4 sm:w-5 sm:h-5" />
              Save Changes
            </button>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white rounded-xl p-4 sm:p-8 border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-brandTealMedium mb-2">Notifications</h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8">Manage your notification preferences</p>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 gap-2 sm:gap-0">
                <div>
                  <p className="font-semibold text-xs sm:text-sm text-gray-900">Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications via email</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('emailNotifications')}
                  className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                    notificationSettings.emailNotifications ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.emailNotifications ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 gap-2 sm:gap-0">
                <div>
                  <p className="font-semibold text-xs sm:text-sm text-gray-900">Push Notifications</p>
                  <p className="text-xs text-gray-500">Receive push notifications on your device</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('pushNotifications')}
                  className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                    notificationSettings.pushNotifications ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.pushNotifications ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 gap-2 sm:gap-0">
                <div>
                  <p className="font-semibold text-xs sm:text-sm text-gray-900">SMS Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications via SMS</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('smsNotifications')}
                  className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                    notificationSettings.smsNotifications ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.smsNotifications ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 gap-2 sm:gap-0">
                <div>
                  <p className="font-semibold text-xs sm:text-sm text-gray-900">Job Alerts</p>
                  <p className="text-xs text-gray-500">Get notified about new job requests</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('jobAlerts')}
                  className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                    notificationSettings.jobAlerts ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.jobAlerts ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 gap-2 sm:gap-0">
                <div>
                  <p className="font-semibold text-xs sm:text-sm text-gray-900">Review Alerts</p>
                  <p className="text-xs text-gray-500">Get notified about new reviews</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('reviewAlerts')}
                  className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                    notificationSettings.reviewAlerts ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.reviewAlerts ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 gap-2 sm:gap-0">
                <div>
                  <p className="font-semibold text-xs sm:text-sm text-gray-900">Promotional Emails</p>
                  <p className="text-xs text-gray-500">Receive promotional offers and updates</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('promotionalEmails')}
                  className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                    notificationSettings.promotionalEmails ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.promotionalEmails ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-brandText text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium mt-6 sm:mt-8"
            >
              <FiSave className="w-4 h-4 sm:w-5 sm:h-5" />
              Save Changes
            </button>
          </div>
        );

      case 'security':
        return (
          <div className="bg-white rounded-xl p-4 sm:p-8 border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-brandTealMedium mb-2">Security</h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8">Manage your security settings</p>
            <p className="text-brandTealMedium mb-3 sm:mb-4 text-xs sm:text-sm font-semibold">Change Password</p>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-semibold text-brandTealMedium mb-2 sm:mb-3">Two-Factor Authentication</p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 gap-3 sm:gap-0">  
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-xs sm:text-sm whitespace-nowrap">
                  Enable
                </button>
              </div>
            </div>

            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-brandText text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium mt-6 sm:mt-8"
            >
              <FiSave className="w-4 h-4 sm:w-5 sm:h-5" />
              Save Changes
            </button>
          </div>
        );

      case 'language':
        return (
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-brandTealMedium mb-2">Language</h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8">Choose your preferred language</p>

            <div className="space-y-3 sm:space-y-4">
              <label className="text-xs sm:text-sm font-medium text-brandGreenLight block">Display Language</label>
              
              <div className="relative w-full max-w-xs">
                <div
                  className="flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-xl hover:bg-brandOrange hover:text-white cursor-pointer transition-colors border border-gray-300"
                  onClick={() => setLanguageOpen(!languageOpen)}
                >
                  <span>{currentLanguage.code}</span>
                </div>

                {languageOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLanguageOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className={`w-full flex items-center gap-3 px-3 py-1.5 transition-colors rounded-md ${
                            currentLanguage.code === lang.code
                              ? "text-brandOrange font-medium hover:bg-brandOrange hover:text-white"
                              : "text-gray-700 hover:bg-brandOrange hover:text-white"
                          }`}
                          onClick={() => {
                            handleLanguageChange(lang);
                            setLanguageOpen(false);
                          }}
                        >
                          <span className="text-xs sm:text-sm">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <p className="text-[10px] sm:text-xs text-gray-500 mt-2">This will change the language across the entire application.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-wrap gap-1 bg-gray-300 p-1 rounded-lg w-full sm:w-fit">
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-md font-medium text-xs sm:text-sm transition-colors ${
            activeTab === 'personal'
              ? 'bg-gray-200 text-brandText shadow-sm'
              : 'bg-transparent text-gray-600 hover:bg-white/50'
          }`}
        >
          <FiUser className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Personal Information</span>
          <span className="sm:hidden">Personal</span>
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-md font-medium text-xs sm:text-sm transition-colors ${
            activeTab === 'notifications'
              ? 'bg-gray-200 text-brandText shadow-sm'
              : 'bg-transparent text-gray-600 hover:bg-white/50'
          }`}
        >
          <FiBell className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Notifications</span>
          <span className="sm:hidden">Notif</span>
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-md font-medium text-xs sm:text-sm transition-colors ${
            activeTab === 'security'
              ? 'bg-gray-200 text-brandText shadow-sm'
              : 'bg-transparent text-gray-600 hover:bg-white/50'
          }`}
        >
          <FiShield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Security</span>
          <span className="sm:hidden">Secure</span>
        </button>
        <button
          onClick={() => setActiveTab('language')}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-md font-medium text-xs sm:text-sm transition-colors ${
            activeTab === 'language'
              ? 'bg-gray-200 text-brandText shadow-sm'
              : 'bg-transparent text-gray-600 hover:bg-white/50'
          }`}
        >
          <FiGlobe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Language</span>
          <span className="sm:hidden">Lang</span>
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
}

export default SettingsDashboard;