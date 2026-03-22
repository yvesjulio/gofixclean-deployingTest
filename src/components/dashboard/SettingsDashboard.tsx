import React, { useState } from 'react';
import { FiUser, FiBell, FiShield, FiGlobe, FiCamera, FiSave } from 'react-icons/fi';

type TabType = 'personal' | 'notifications' | 'security' | 'language';

function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
            <p className="text-gray-600 mb-8">Update your personal details</p>

          
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <img
                  src={formData.profilePhoto}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
                <button
                  onClick={handlePhotoUpload}
                  className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <FiCamera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Profile Photo</p>
                <p className="text-sm text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>

             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>

          
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>

             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>
            </div>

           
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent resize-none"
              />
            </div>

          
            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-2 px-6 py-3 bg-brandText text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
            >
              <FiSave className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h2>
            <p className="text-gray-600 mb-8">Manage your notification preferences</p>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('emailNotifications')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.emailNotifications ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>


              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('pushNotifications')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.pushNotifications ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

            
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('smsNotifications')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.smsNotifications ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.smsNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

             
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">Job Alerts</p>
                  <p className="text-sm text-gray-500">Get notified about new job requests</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('jobAlerts')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.jobAlerts ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.jobAlerts ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

             
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">Review Alerts</p>
                  <p className="text-sm text-gray-500">Get notified about new reviews</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('reviewAlerts')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.reviewAlerts ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.reviewAlerts ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

          
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">Promotional Emails</p>
                  <p className="text-sm text-gray-500">Receive promotional offers and updates</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('promotionalEmails')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.promotionalEmails ? 'bg-brandText' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notificationSettings.promotionalEmails ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-2 px-6 py-3 bg-brandText text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium mt-8"
            >
              <FiSave className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        );

      case 'security':
        return (
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Security</h2>
            <p className="text-gray-600 mb-8">Manage your security settings</p>

            <div className="space-y-6">
             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent"
                />
              </div>

             
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 mt-8">
                <div>
                  <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                  Enable
                </button>
              </div>
            </div>

            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-2 px-6 py-3 bg-brandText text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium mt-8"
            >
              <FiSave className="w-5 h-5" />
              Update Password
            </button>
          </div>
        );

      case 'language':
        return (
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Language</h2>
            <p className="text-gray-600 mb-8">Choose your preferred language</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-brandText cursor-pointer">
                <input
                  type="radio"
                  name="language"
                  id="english"
                  defaultChecked
                  className="w-4 h-4 text-brandText focus:ring-brandText"
                />
                <label htmlFor="english" className="flex-1 cursor-pointer">
                  <p className="font-semibold text-gray-900">English</p>
                  <p className="text-sm text-gray-500">Default language</p>
                </label>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300">
                <input
                  type="radio"
                  name="language"
                  id="kinyarwanda"
                  className="w-4 h-4 text-brandText focus:ring-brandText"
                />
                <label htmlFor="kinyarwanda" className="flex-1 cursor-pointer">
                  <p className="font-semibold text-gray-900">Kinyarwanda</p>
                  <p className="text-sm text-gray-500">Kinyarwanda language</p>
                </label>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300">
                <input
                  type="radio"
                  name="language"
                  id="french"
                  className="w-4 h-4 text-brandText focus:ring-brandText"
                />
                <label htmlFor="french" className="flex-1 cursor-pointer">
                  <p className="font-semibold text-gray-900">French</p>
                  <p className="text-sm text-gray-500">Français</p>
                </label>
              </div>
            </div>

            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-2 px-6 py-3 bg-brandText text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium mt-8"
            >
              <FiSave className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
     
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'personal'
              ? 'bg-white text-brandText border-2 border-brandText'
              : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
          }`}
        >
          <FiUser className="w-4 h-4" />
          Personal Information
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'notifications'
              ? 'bg-white text-brandText border-2 border-brandText'
              : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
          }`}
        >
          <FiBell className="w-4 h-4" />
          Notifications
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'security'
              ? 'bg-white text-brandText border-2 border-brandText'
              : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
          }`}
        >
          <FiShield className="w-4 h-4" />
          Security
        </button>
        <button
          onClick={() => setActiveTab('language')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'language'
              ? 'bg-white text-brandText border-2 border-brandText'
              : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
          }`}
        >
          <FiGlobe className="w-4 h-4" />
          Language
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
}

export default SettingsDashboard;