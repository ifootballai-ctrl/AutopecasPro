import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Building, Users, Truck, DollarSign, Plug, Save } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Configurações</h1>
        <p className="text-gray-600 mt-1">Gerencie as configurações do sistema</p>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">
            <Building className="size-4 mr-2" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="size-4 mr-2" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="suppliers">
            <Truck className="size-4 mr-2" />
            Fornecedores
          </TabsTrigger>
          <TabsTrigger value="pricing">
            <DollarSign className="size-4 mr-2" />
            Preços
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Plug className="size-4 mr-2" />
            Integrações
          </TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Razão Social</Label>
                  <Input defaultValue="AutoPeças Pro LTDA" />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input defaultValue="12.345.678/0001-90" />
                </div>
                <div className="space-y-2">
                  <Label>Inscrição Estadual</Label>
                  <Input defaultValue="123.456.789.012" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue="(11) 3456-7890" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="contato@autopecaspro.com.br" />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary-dark">
                <Save className="size-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>CEP</Label>
                  <Input defaultValue="01234-567" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Rua</Label>
                  <Input defaultValue="Av. Principal" />
                </div>
                <div className="space-y-2">
                  <Label>Número</Label>
                  <Input defaultValue="1000" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Cidade</Label>
                  <Input defaultValue="São Paulo" />
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Input defaultValue="SP" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Settings */}
        <TabsContent value="users" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Usuários do Sistema</CardTitle>
              <Button size="sm" className="bg-primary hover:bg-primary-dark">
                <Users className="size-4 mr-2" />
                Adicionar Usuário
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      AS
                    </div>
                    <div>
                      <div>Admin Sistema</div>
                      <div className="text-sm text-gray-500">admin@autopecaspro.com.br</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge>Administrador</Badge>
                    <Badge variant="outline" className="bg-success text-white">Ativo</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      JM
                    </div>
                    <div>
                      <div>João Martins</div>
                      <div className="text-sm text-gray-500">joao.martins@autopecaspro.com.br</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">Vendedor</Badge>
                    <Badge variant="outline" className="bg-success text-white">Ativo</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      MS
                    </div>
                    <div>
                      <div>Maria Silva</div>
                      <div className="text-sm text-gray-500">maria.silva@autopecaspro.com.br</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">Vendedor</Badge>
                    <Badge variant="outline" className="bg-success text-white">Ativo</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissões por Módulo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-b">
                  <span>Dashboard</span>
                  <div className="flex gap-6">
                    <Label className="flex items-center gap-2">
                      <Switch defaultChecked />
                      Administrador
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Switch defaultChecked />
                      Vendedor
                    </Label>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border-b">
                  <span>Catálogo de Peças</span>
                  <div className="flex gap-6">
                    <Label className="flex items-center gap-2">
                      <Switch defaultChecked />
                      Administrador
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Switch defaultChecked />
                      Vendedor
                    </Label>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border-b">
                  <span>Orçamentos</span>
                  <div className="flex gap-6">
                    <Label className="flex items-center gap-2">
                      <Switch defaultChecked />
                      Administrador
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Switch defaultChecked />
                      Vendedor
                    </Label>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border-b">
                  <span>Relatórios Financeiros</span>
                  <div className="flex gap-6">
                    <Label className="flex items-center gap-2">
                      <Switch defaultChecked />
                      Administrador
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Switch />
                      Vendedor
                    </Label>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span>Configurações</span>
                  <div className="flex gap-6">
                    <Label className="flex items-center gap-2">
                      <Switch defaultChecked />
                      Administrador
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Switch />
                      Vendedor
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suppliers Settings */}
        <TabsContent value="suppliers" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Fornecedores Cadastrados</CardTitle>
              <Button size="sm" className="bg-primary hover:bg-primary-dark">
                <Truck className="size-4 mr-2" />
                Adicionar Fornecedor
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div>Distribuidora Nacional</div>
                      <div className="text-sm text-gray-500">CNPJ: 11.222.333/0001-44</div>
                      <div className="text-sm text-gray-500">contato@distrnacional.com.br</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-success text-white">API Ativa</Badge>
                      <div className="text-xs text-gray-500 mt-1">Última atualização: Hoje 08:30</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div>AutoPeças Premium</div>
                      <div className="text-sm text-gray-500">CNPJ: 22.333.444/0001-55</div>
                      <div className="text-sm text-gray-500">vendas@autopecaspremium.com.br</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-success text-white">API Ativa</Badge>
                      <div className="text-xs text-gray-500 mt-1">Última atualização: Hoje 07:15</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div>Peças Master</div>
                      <div className="text-sm text-gray-500">CNPJ: 33.444.555/0001-66</div>
                      <div className="text-sm text-gray-500">contato@pecasmaster.com.br</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Manual</Badge>
                      <div className="text-xs text-gray-500 mt-1">Última importação: 01/12/2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Importações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="text-sm">Distribuidora Nacional</div>
                    <div className="text-xs text-gray-500">02/12/2025 08:30</div>
                  </div>
                  <Badge className="bg-success text-white">12.456 preços atualizados</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="text-sm">AutoPeças Premium</div>
                    <div className="text-xs text-gray-500">02/12/2025 07:15</div>
                  </div>
                  <Badge className="bg-success text-white">8.234 preços atualizados</Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-sm">Peças Master</div>
                    <div className="text-xs text-gray-500">01/12/2025 14:20</div>
                  </div>
                  <Badge className="bg-success text-white">5.678 preços atualizados</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Settings */}
        <TabsContent value="pricing" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tabelas de Preços</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Margem Padrão (%)</Label>
                  <Input type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label>Margem Mínima (%)</Label>
                  <Input type="number" defaultValue="15" />
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <h4>Margens por Categoria</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Label className="w-40">Mecânica:</Label>
                    <Input type="number" defaultValue="28" className="w-24" />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-40">Elétrica:</Label>
                    <Input type="number" defaultValue="32" className="w-24" />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-40">Freios:</Label>
                    <Input type="number" defaultValue="30" className="w-24" />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-40">Suspensão:</Label>
                    <Input type="number" defaultValue="35" className="w-24" />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-40">Pneus:</Label>
                    <Input type="number" defaultValue="25" className="w-24" />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary-dark">
                <Save className="size-4 mr-2" />
                Salvar Margens
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrações Disponíveis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Plug className="size-6 text-primary" />
                  </div>
                  <div>
                    <div>API CATMAT</div>
                    <div className="text-sm text-gray-500">Validação e compatibilidade de peças</div>
                  </div>
                </div>
                <Badge className="bg-success text-white">Conectado</Badge>
              </div>

              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Plug className="size-6 text-primary" />
                  </div>
                  <div>
                    <div>Email Marketing</div>
                    <div className="text-sm text-gray-500">Envio automático de orçamentos</div>
                  </div>
                </div>
                <Badge className="bg-success text-white">Conectado</Badge>
              </div>

              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Plug className="size-6 text-gray-400" />
                  </div>
                  <div>
                    <div>WhatsApp Business</div>
                    <div className="text-sm text-gray-500">Envio de orçamentos via WhatsApp</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">Conectar</Button>
              </div>

              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Plug className="size-6 text-gray-400" />
                  </div>
                  <div>
                    <div>Sistema ERP</div>
                    <div className="text-sm text-gray-500">Integração com sistema de gestão</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">Conectar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
