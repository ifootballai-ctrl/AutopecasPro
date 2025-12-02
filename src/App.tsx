import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CatalogPage } from './components/CatalogPage';
import { QuotesPage } from './components/QuotesPage';
import { ClientsPage } from './components/ClientsPage';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const user = {
    name: 'Admin Sistema',
    email: 'admin@autopecaspro.com.br'
  };

  const handleLogin = (email: string, password: string) => {
    // Simular autenticação
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'catalog':
        return <CatalogPage />;
      case 'quotes':
        return <QuotesPage />;
      case 'clients':
        return <ClientsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background-alt">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className={`transition-smooth ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Header user={user} onLogout={handleLogout} />
        <main className="p-6">{renderPage()}</main>
      </div>
    </div>
  );
}
