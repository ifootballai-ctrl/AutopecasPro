import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Package, FileText, Percent } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockMetrics, mockPriceVariation, mockTopSearchedParts } from '../data/mockData';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral do sistema</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total de Peças</CardTitle>
            <Package className="size-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockMetrics.totalParts.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-gray-500 mt-1">no catálogo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Preços Atualizados Hoje</CardTitle>
            <TrendingUp className="size-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockMetrics.pricesUpdatedToday.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <ArrowUpRight className="size-3" />
              +12% vs. ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Orçamentos Este Mês</CardTitle>
            <FileText className="size-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockMetrics.quotesThisMonth}</div>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <ArrowUpRight className="size-3" />
              +8% vs. mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Economia Média</CardTitle>
            <Percent className="size-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockMetrics.averageSavings}%</div>
            <p className="text-xs text-gray-500 mt-1">em relação à tabela</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Variation Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Variação de Preços - Últimos 30 Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockPriceVariation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--color-primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--color-primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Searched Parts */}
        <Card>
          <CardHeader>
            <CardTitle>Peças Mais Pesquisadas Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopSearchedParts.map((part, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm">{part.name}</div>
                      <div className="text-xs text-gray-500">{part.searches} buscas</div>
                    </div>
                  </div>
                  <div>
                    {part.trend === 'up' && (
                      <ArrowUpRight className="size-4 text-success" />
                    )}
                    {part.trend === 'down' && (
                      <ArrowDownRight className="size-4 text-accent" />
                    )}
                    {part.trend === 'stable' && (
                      <div className="size-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-smooth text-left">
              <Package className="size-6 text-primary mb-2" />
              <div className="text-sm">Buscar Peça</div>
              <div className="text-xs text-gray-500">Pesquisar no catálogo</div>
            </button>
            <button className="p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-smooth text-left">
              <FileText className="size-6 text-primary mb-2" />
              <div className="text-sm">Novo Orçamento</div>
              <div className="text-xs text-gray-500">Criar orçamento</div>
            </button>
            <button className="p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-smooth text-left">
              <Users className="size-6 text-primary mb-2" />
              <div className="text-sm">Cadastrar Cliente</div>
              <div className="text-xs text-gray-500">Adicionar novo cliente</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
