import { Home, Package, FileText, Users, BarChart3, Settings, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'catalog', label: 'Catálogo de Peças', icon: Package },
  { id: 'quotes', label: 'Orçamentos', icon: FileText },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  { id: 'settings', label: 'Configurações', icon: Settings }
];

export function Sidebar({ currentPage, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside 
      className={`bg-secondary text-white transition-smooth ${
        collapsed ? 'w-20' : 'w-64'
      } h-screen fixed left-0 top-0 flex flex-col`}
    >
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        {!collapsed && (
          <div>
            <h2 className="text-white">AutoPeças</h2>
            <p className="text-xs text-white/60 mt-1">Sistema CATMAT</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="text-white hover:bg-white/10"
        >
          <ChevronLeft className={`size-5 transition-smooth ${collapsed ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full px-6 py-3 flex items-center gap-3 transition-smooth hover:bg-white/10 ${
                isActive ? 'bg-primary text-white border-r-4 border-white' : 'text-white/80'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className="size-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="size-2 rounded-full bg-success animate-pulse" />
          {!collapsed && <span className="text-sm text-white/60">Sistema Online</span>}
        </div>
      </div>
    </aside>
  );
}
