import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileText, Download, BarChart3, TrendingUp, Users, Package, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const vehicleTypeData = [
  { name: 'Veículos Leves', value: 45 },
  { name: 'Motocicletas', value: 25 },
  { name: 'Veículos Pesados', value: 20 },
  { name: 'Máquinas', value: 10 }
];

const topPartsData = [
  { name: 'Filtro de Óleo', sales: 245 },
  { name: 'Pastilha Freio', sales: 189 },
  { name: 'Vela Ignição', sales: 167 },
  { name: 'Bateria', sales: 145 },
  { name: 'Correia', sales: 123 }
];

const monthlyRevenue = [
  { month: 'Jul', revenue: 45000 },
  { month: 'Ago', revenue: 52000 },
  { month: 'Set', revenue: 49000 },
  { month: 'Out', revenue: 63000 },
  { month: 'Nov', revenue: 58000 },
  { month: 'Dez', revenue: 71000 }
];

const COLORS = ['#1e40af', '#059669', '#d97706', '#dc2626'];

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Relatórios</h1>
        <p className="text-gray-600 mt-1">Análises e estatísticas do sistema</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Faturamento Mês</div>
                <div className="text-2xl text-success">R$ 71.000</div>
                <div className="text-xs text-success mt-1">↑ 12% vs mês anterior</div>
              </div>
              <DollarSign className="size-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Peças Vendidas</div>
                <div className="text-2xl">1.245</div>
                <div className="text-xs text-success mt-1">↑ 8% vs mês anterior</div>
              </div>
              <Package className="size-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Novos Clientes</div>
                <div className="text-2xl">34</div>
                <div className="text-xs text-success mt-1">↑ 15% vs mês anterior</div>
              </div>
              <Users className="size-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Ticket Médio</div>
                <div className="text-2xl">R$ 487</div>
                <div className="text-xs text-success mt-1">↑ 5% vs mês anterior</div>
              </div>
              <TrendingUp className="size-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Gerador de Relatórios Customizados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select defaultValue="revenue">
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Faturamento</SelectItem>
                <SelectItem value="parts">Movimentação de Peças</SelectItem>
                <SelectItem value="clients">Clientes</SelectItem>
                <SelectItem value="margin">Margem de Lucro</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="month">
              <SelectTrigger>
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="year">Este Ano</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Categorias</SelectItem>
                <SelectItem value="mechanics">Mecânica</SelectItem>
                <SelectItem value="electric">Elétrica</SelectItem>
                <SelectItem value="brakes">Freios</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="pdf">
              <SelectTrigger>
                <SelectValue placeholder="Formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="powerbi">Power BI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-4 bg-primary hover:bg-primary-dark">
            <Download className="size-4 mr-2" />
            Gerar Relatório
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Faturamento Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                <Bar dataKey="revenue" fill="hsl(var(--color-primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo de Veículo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vehicleTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Selling Parts */}
        <Card>
          <CardHeader>
            <CardTitle>Peças Mais Vendidas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topPartsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="sales" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pre-formatted Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Relatórios Pré-formatados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="size-4 mr-2" />
                Movimentação de Peças - Dezembro 2025
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="size-4 mr-2" />
                Faturamento por Categoria - Trimestre
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="size-4 mr-2" />
                Clientes Mais Frequentes - Anual
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="size-4 mr-2" />
                Margem de Lucro por Fornecedor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="size-4 mr-2" />
                Análise de Estoque - Situação Atual
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Mecânica</span>
                  <span className="text-sm">R$ 28.500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Freios</span>
                  <span className="text-sm">R$ 18.200</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Elétrica</span>
                  <span className="text-sm">R$ 14.800</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '34%' }} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Pneus</span>
                  <span className="text-sm">R$ 9.500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '22%' }} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
