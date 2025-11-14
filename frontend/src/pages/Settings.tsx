import { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage, Language } from '../context/LanguageContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { language, setLanguage, t } = useLanguage();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  const handleSaveSettings = () => {
    toast.success(t('settings.saved'));
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    toast.success(`🌍 ${newLang === 'English' ? 'Language changed to English' : 'Język zmieniono na Polski'}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('settings.title')}</h1>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('settings.appearance')}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t('settings.darkMode')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.darkModeDesc')}</p>
              </div>
              <button
                onClick={() => {
                  toggleDarkMode();
                  toast.success(darkMode ? t('settings.lightEnabled') : t('settings.darkEnabled'));
                }}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('settings.language')}</h3>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as 'English' | 'Polish')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="English">English</option>
                <option value="Polish">Polski (Polish)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('settings.notifications')}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t('settings.emailNotif')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.emailNotifDesc')}</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t('settings.pushNotif')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.pushNotifDesc')}</p>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    pushNotifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t('settings.weeklyReports')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.weeklyReportsDesc')}</p>
              </div>
              <button
                onClick={() => setWeeklyReports(!weeklyReports)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  weeklyReports ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    weeklyReports ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('settings.account')}</h2>
          
          <div className="space-y-4">
            <button className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white">{t('settings.changePassword')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.changePasswordDesc')}</p>
            </button>

            <button className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white">{t('settings.privacy')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.privacyDesc')}</p>
            </button>

            <button className="w-full text-left p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
              <h3 className="font-semibold text-red-600 dark:text-red-400">{t('settings.deleteAccount')}</h3>
              <p className="text-sm text-red-500 dark:text-red-400">{t('settings.deleteAccountDesc')}</p>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition-colors"
          >
            {t('settings.saveSettings')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
