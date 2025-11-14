import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'English' | 'Polish';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  English: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.jobs': 'Jobs',
    'nav.candidates': 'Candidates',
    'nav.aiTools': 'AI Tools',
    'nav.profile': 'My Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.totalJobs': 'Total Jobs',
    'dashboard.totalCandidates': 'Total Candidates',
    'dashboard.activeApplications': 'Active Applications',
    'dashboard.hiringPipeline': 'Hiring Pipeline',
    'dashboard.applicationTrends': 'Application Trends',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.applied': 'Applied',
    'dashboard.screening': 'Screening',
    'dashboard.interviewing': 'Interviewing',
    'dashboard.offered': 'Offered',
    'dashboard.hired': 'Hired',
    
    // Jobs
    'jobs.title': 'Jobs',
    'jobs.search': 'Search jobs...',
    'jobs.filter': 'Filter',
    'jobs.allDepartments': 'All Departments',
    'jobs.allStatus': 'All Status',
    'jobs.createJob': 'Create Job',
    'jobs.active': 'Active',
    'jobs.closed': 'Closed',
    'jobs.draft': 'Draft',
    'jobs.applicants': 'applicants',
    'jobs.viewDetails': 'View Details',
    'jobs.manage': 'Manage',
    'jobs.createNew': '+ Create New Job',
    'jobs.resetDefaults': 'Reset to Defaults',
    'jobs.jobTitle': 'Job Title',
    'jobs.department': 'Department',
    'jobs.location': 'Location',
    'jobs.jobType': 'Job Type',
    'jobs.description': 'Description',
    'jobs.save': 'Create Job',
    'jobs.cancel': 'Cancel',
    'jobs.manageJob': 'Manage Job',
    'jobs.deactivate': 'Deactivate Job',
    'jobs.activate': 'Activate Job',
    'jobs.viewFull': 'View Full Details',
    'jobs.delete': 'Delete Job',
    'jobs.confirmDelete': 'Are you sure you want to delete',
    'jobs.close': 'Close',
    
    // Candidates
    'candidates.title': 'Candidates',
    'candidates.search': 'Search candidates...',
    'candidates.addCandidate': 'Add Candidate',
    'candidates.name': 'Name',
    'candidates.email': 'Email',
    'candidates.position': 'Position',
    'candidates.skills': 'Skills',
    'candidates.aiScore': 'AI Score',
    'candidates.status': 'Status',
    'candidates.actions': 'Actions',
    'candidates.view': 'View',
    'candidates.edit': 'Edit',
    
    // AI Tools
    'ai.title': 'AI Tools',
    'ai.resumeParser': 'Resume Parser',
    'ai.resumeDesc': 'Upload a resume and extract structured information using AI',
    'ai.selectFile': 'Select Resume File',
    'ai.parseResume': 'Parse Resume',
    'ai.processing': 'Processing...',
    'ai.candidateMatching': 'Candidate Matching',
    'ai.matchingDesc': 'Match candidates to job positions using AI algorithms',
    'ai.algorithm': 'Algorithm',
    'ai.dataSource': 'Data Source',
    'ai.startMatching': 'Start Matching',
    'ai.analyzing': 'Analyzing...',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.profileInfo': 'Profile Information',
    'profile.editProfile': 'Edit Profile',
    'profile.save': 'Save',
    'profile.cancel': 'Cancel',
    'profile.fullName': 'Full Name',
    'profile.role': 'Role',
    'profile.phone': 'Phone',
    'profile.department': 'Department',
    'profile.activityStats': 'Activity Statistics',
    'profile.jobsPosted': 'Jobs Posted',
    'profile.candidatesReviewed': 'Candidates Reviewed',
    'profile.hiresMade': 'Hires Made',
    
    // Settings
    'settings.title': 'Settings',
    'settings.appearance': 'Appearance',
    'settings.darkMode': 'Dark Mode',
    'settings.darkModeDesc': 'Toggle between light and dark theme',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.emailNotif': 'Email Notifications',
    'settings.emailNotifDesc': 'Receive email updates about new candidates',
    'settings.pushNotif': 'Push Notifications',
    'settings.pushNotifDesc': 'Get real-time updates in the app',
    'settings.weeklyReports': 'Weekly Reports',
    'settings.weeklyReportsDesc': 'Receive weekly activity summaries',
    'settings.account': 'Account',
    'settings.changePassword': 'Change Password',
    'settings.changePasswordDesc': 'Update your account password',
    'settings.privacy': 'Privacy Settings',
    'settings.privacyDesc': 'Manage your privacy preferences',
    'settings.deleteAccount': 'Delete Account',
    'settings.deleteAccountDesc': 'Permanently delete your account and data',
    'settings.saveSettings': 'Save All Settings',
    
    // Login
    'login.welcome': 'Welcome Back',
    'login.signIn': 'Sign in to your account',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.signInButton': 'Sign In',
    'login.demo': 'Demo Credentials:',
    
    // HomePage
    'home.title': 'AI-Powered',
    'home.recruitment': 'Recruitment',
    'home.subtitle': 'Transform your hiring process with artificial intelligence. Parse resumes instantly, match candidates intelligently, and make data-driven hiring decisions.',
    'home.getStarted': 'Get Started',
    'home.explore': 'Explore AI Tools',
  },
  Polish: {
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.jobs': 'Oferty Pracy',
    'nav.candidates': 'Kandydaci',
    'nav.aiTools': 'Narzędzia AI',
    'nav.profile': 'Mój Profil',
    'nav.settings': 'Ustawienia',
    'nav.logout': 'Wyloguj',
    'nav.login': 'Zaloguj',
    
    // Dashboard
    'dashboard.title': 'Panel',
    'dashboard.totalJobs': 'Wszystkie Oferty',
    'dashboard.totalCandidates': 'Wszyscy Kandydaci',
    'dashboard.activeApplications': 'Aktywne Aplikacje',
    'dashboard.hiringPipeline': 'Pipeline Rekrutacji',
    'dashboard.applicationTrends': 'Trendy Aplikacji',
    'dashboard.recentActivity': 'Ostatnia Aktywność',
    'dashboard.applied': 'Aplikowano',
    'dashboard.screening': 'Selekcja',
    'dashboard.interviewing': 'Rozmowy',
    'dashboard.offered': 'Oferta',
    'dashboard.hired': 'Zatrudniony',
    
    // Jobs
    'jobs.title': 'Oferty Pracy',
    'jobs.search': 'Szukaj ofert...',
    'jobs.filter': 'Filtruj',
    'jobs.allDepartments': 'Wszystkie Działy',
    'jobs.allStatus': 'Wszystkie Statusy',
    'jobs.createJob': 'Utwórz Ofertę',
    'jobs.active': 'Aktywna',
    'jobs.closed': 'Zamknięta',
    'jobs.draft': 'Szkic',
    'jobs.applicants': 'kandydatów',
    'jobs.viewDetails': 'Zobacz Szczegóły',
    'jobs.manage': 'Zarządzaj',
    'jobs.createNew': '+ Utwórz Nową Ofertę',
    'jobs.resetDefaults': 'Przywróć Domyślne',
    'jobs.jobTitle': 'Tytuł Stanowiska',
    'jobs.department': 'Dział',
    'jobs.location': 'Lokalizacja',
    'jobs.jobType': 'Typ Zatrudnienia',
    'jobs.description': 'Opis',
    'jobs.save': 'Utwórz Ofertę',
    'jobs.cancel': 'Anuluj',
    'jobs.manageJob': 'Zarządzaj Ofertą',
    'jobs.deactivate': 'Dezaktywuj Ofertę',
    'jobs.activate': 'Aktywuj Ofertę',
    'jobs.viewFull': 'Zobacz Pełne Szczegóły',
    'jobs.delete': 'Usuń Ofertę',
    'jobs.confirmDelete': 'Czy na pewno chcesz usunąć',
    'jobs.close': 'Zamknij',
    
    // Candidates
    'candidates.title': 'Kandydaci',
    'candidates.search': 'Szukaj kandydatów...',
    'candidates.addCandidate': 'Dodaj Kandydata',
    'candidates.name': 'Imię i Nazwisko',
    'candidates.email': 'Email',
    'candidates.position': 'Stanowisko',
    'candidates.skills': 'Umiejętności',
    'candidates.aiScore': 'Wynik AI',
    'candidates.status': 'Status',
    'candidates.actions': 'Akcje',
    'candidates.view': 'Zobacz',
    'candidates.edit': 'Edytuj',
    
    // AI Tools
    'ai.title': 'Narzędzia AI',
    'ai.resumeParser': 'Parser CV',
    'ai.resumeDesc': 'Prześlij CV i wyodrębnij ustrukturyzowane informacje za pomocą AI',
    'ai.selectFile': 'Wybierz Plik CV',
    'ai.parseResume': 'Parsuj CV',
    'ai.processing': 'Przetwarzanie...',
    'ai.candidateMatching': 'Dopasowanie Kandydatów',
    'ai.matchingDesc': 'Dopasuj kandydatów do stanowisk za pomocą algorytmów AI',
    'ai.algorithm': 'Algorytm',
    'ai.dataSource': 'Źródło Danych',
    'ai.startMatching': 'Rozpocznij Dopasowanie',
    'ai.analyzing': 'Analizowanie...',
    
    // Profile
    'profile.title': 'Mój Profil',
    'profile.profileInfo': 'Informacje Profilowe',
    'profile.editProfile': 'Edytuj Profil',
    'profile.save': 'Zapisz',
    'profile.cancel': 'Anuluj',
    'profile.fullName': 'Imię i Nazwisko',
    'profile.role': 'Rola',
    'profile.phone': 'Telefon',
    'profile.department': 'Dział',
    'profile.activityStats': 'Statystyki Aktywności',
    'profile.jobsPosted': 'Opublikowane Oferty',
    'profile.candidatesReviewed': 'Przejrzani Kandydaci',
    'profile.hiresMade': 'Zatrudnienia',
    
    // Settings
    'settings.title': 'Ustawienia',
    'settings.appearance': 'Wygląd',
    'settings.darkMode': 'Tryb Ciemny',
    'settings.darkModeDesc': 'Przełącz między jasnym a ciemnym motywem',
    'settings.language': 'Język',
    'settings.notifications': 'Powiadomienia',
    'settings.emailNotif': 'Powiadomienia E-mail',
    'settings.emailNotifDesc': 'Otrzymuj aktualizacje e-mail o nowych kandydatach',
    'settings.pushNotif': 'Powiadomienia Push',
    'settings.pushNotifDesc': 'Otrzymuj aktualizacje w czasie rzeczywistym w aplikacji',
    'settings.weeklyReports': 'Raporty Tygodniowe',
    'settings.weeklyReportsDesc': 'Otrzymuj cotygodniowe podsumowania aktywności',
    'settings.account': 'Konto',
    'settings.changePassword': 'Zmień Hasło',
    'settings.changePasswordDesc': 'Zaktualizuj hasło do konta',
    'settings.privacy': 'Ustawienia Prywatności',
    'settings.privacyDesc': 'Zarządzaj swoimi preferencjami prywatności',
    'settings.deleteAccount': 'Usuń Konto',
    'settings.deleteAccountDesc': 'Trwale usuń swoje konto i dane',
    'settings.saveSettings': 'Zapisz Wszystkie Ustawienia',
    
    // Login
    'login.welcome': 'Witaj Ponownie',
    'login.signIn': 'Zaloguj się na swoje konto',
    'login.email': 'Adres Email',
    'login.password': 'Hasło',
    'login.signInButton': 'Zaloguj Się',
    'login.demo': 'Dane Demo:',
    
    // HomePage
    'home.title': 'Zasilane AI',
    'home.recruitment': 'Rekrutacja',
    'home.subtitle': 'Przekształć swój proces rekrutacji dzięki sztucznej inteligencji. Parsuj CV natychmiast, inteligentnie dopasowuj kandydatów i podejmuj decyzje oparte na danych.',
    'home.getStarted': 'Rozpocznij',
    'home.explore': 'Poznaj Narzędzia AI',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'Polish' ? 'Polish' : 'English') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const dict = translations[language] as Record<string, string>;
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
