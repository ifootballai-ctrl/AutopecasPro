import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, Search, Phone, Mail, MapPin, Car, DollarSign, Calendar } from 'lucide-react';
import { mockClients } from '../data/mockData';
import { Client } from '../types';

export function ClientsPage() {
  const [clients] = useState(mockClients);
  const [showNewClient, setShowNewClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Clientes</h1>
          <p className="text-gray-600 mt-1">Gerencie seus clientes e histórico</p>
        </div>
        <Button onClick={() => setShowNewClient(true)} className="bg-primary hover:bg-primary-dark">
          <Plus className="size-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <Input
              placeholder="Buscar por nome, email ou documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-smooth cursor-pointer" onClick={() => setSelectedClient(client)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <div className="text-xs text-gray-500">{client.document}</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="size-4" />
                {client.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="size-4" />
                {client.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="size-4" />
                {client.address.city}, {client.address.state}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Car className="size-4" />
                {client.vehicles.length} veículo(s)
              </div>
              <div className="pt-3 border-t flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Total Gasto</div>
                  <div className="text-success">R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </div>
                {client.lastQuote && (
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Último Orçamento</div>
                    <div className="text-sm">{new Date(client.lastQuote).toLocaleDateString('pt-BR')}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Client Dialog */}
      <Dialog open={showNewClient} onOpenChange={setShowNewClient}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
          </DialogHeader>
          <NewClientForm onClose={() => setShowNewClient(false)} />
        </DialogContent>
      </Dialog>

      {/* Client Detail Dialog */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedClient?.name}</DialogTitle>
          </DialogHeader>
          {selectedClient && <ClientDetail client={selectedClient} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NewClientForm({ onClose }: { onClose: () => void }) {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
        <TabsTrigger value="vehicles">Veículos</TabsTrigger>
        <TabsTrigger value="address">Endereço</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <Label>Nome Completo *</Label>
            <Input placeholder="Nome completo do cliente" />
          </div>
          <div className="space-y-2">
            <Label>CPF/CNPJ *</Label>
            <Input placeholder="000.000.000-00" />
          </div>
          <div className="space-y-2">
            <Label>Telefone *</Label>
            <Input placeholder="(00) 00000-0000" />
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Email</Label>
            <Input type="email" placeholder="email@exemplo.com" />
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Observações</Label>
            <Input placeholder="Informações adicionais sobre o cliente" />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="vehicles" className="space-y-4 mt-4">
        <div className="text-center py-8 border border-dashed rounded-lg">
          <Car className="size-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500 mb-4">Nenhum veículo cadastrado</p>
          <Button variant="outline">
            <Plus className="size-4 mr-2" />
            Adicionar Veículo
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="address" className="space-y-4 mt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>CEP</Label>
            <Input placeholder="00000-000" />
          </div>
          <div className="space-y-2">
            <Label>Endereço</Label>
            <Input placeholder="Rua, número" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Cidade</Label>
              <Input placeholder="Cidade" />
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Input placeholder="UF" />
            </div>
          </div>
        </div>
      </TabsContent>

      <div className="flex gap-2 mt-6 pt-6 border-t">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Cancelar
        </Button>
        <Button className="flex-1 bg-primary hover:bg-primary-dark">
          Salvar Cliente
        </Button>
      </div>
    </Tabs>
  );
}

function ClientDetail({ client }: { client: Client }) {
  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="info">Informações</TabsTrigger>
        <TabsTrigger value="vehicles">Veículos</TabsTrigger>
        <TabsTrigger value="history">Histórico</TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-6 mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dados Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Nome</label>
                <div>{client.name}</div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Documento</label>
                <div>{client.document}</div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Email</label>
                <div>{client.email}</div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Telefone</label>
                <div>{client.phone}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Endereço</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div>{client.address.street}</div>
              <div>{client.address.city} - {client.address.state}</div>
              <div className="text-sm text-gray-500">CEP: {client.address.zip}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500">Total Gasto</div>
                <div className="text-2xl text-success">R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              </div>
              {client.lastQuote && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">Último Orçamento</div>
                  <div className="text-lg">{new Date(client.lastQuote).toLocaleDateString('pt-BR')}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="vehicles" className="space-y-4 mt-4">
        {client.vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Car className="size-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg">{vehicle.brand} {vehicle.model}</div>
                    <div className="text-sm text-gray-500">Ano: {vehicle.year}</div>
                    {vehicle.plate && (
                      <Badge variant="outline" className="mt-1">{vehicle.plate}</Badge>
                    )}
                  </div>
                </div>
                <Badge>
                  {vehicle.type === 'motorcycle' ? 'Moto' : 
                   vehicle.type === 'light' ? 'Leve' :
                   vehicle.type === 'medium' ? 'Médio' :
                   vehicle.type === 'heavy' ? 'Pesado' : 'Máquina'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="history" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Histórico de Orçamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="text-sm">Orçamento #2025-001245</div>
                  <div className="text-xs text-gray-500">02/12/2025</div>
                </div>
                <div className="text-right">
                  <div className="text-success">R$ 439,70</div>
                  <Badge className="bg-success text-white text-xs">Aprovado</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="text-sm">Orçamento #2025-001180</div>
                  <div className="text-xs text-gray-500">15/11/2025</div>
                </div>
                <div className="text-right">
                  <div className="text-success">R$ 1.245,80</div>
                  <Badge className="bg-success text-white text-xs">Aprovado</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
