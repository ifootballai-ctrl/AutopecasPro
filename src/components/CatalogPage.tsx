import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Download, Eye, Plus, TrendingUp, TrendingDown, ShieldCheck } from 'lucide-react';
import { mockParts } from '../data/mockData';
import { Part } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface CatalogPageProps {
  onAddToQuote?: (part: Part) => void;
}

export function CatalogPage({ onAddToQuote }: CatalogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleType, setVehicleType] = useState('all');
  const [category, setCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  const filteredParts = mockParts.filter(part => {
    const matchesSearch = part.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.oemCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || part.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1>Catálogo de Peças</h1>
        <p className="text-gray-600 mt-1">Pesquise e encontre peças automotivas</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                placeholder="Buscar por código, descrição ou número OEM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="Tipo de Veículo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Veículos</SelectItem>
                <SelectItem value="motorcycle">Moto</SelectItem>
                <SelectItem value="light">Leve</SelectItem>
                <SelectItem value="medium">Médio</SelectItem>
                <SelectItem value="heavy">Pesado</SelectItem>
                <SelectItem value="machinery">Máquinas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Categorias</SelectItem>
                <SelectItem value="Mecânica">Mecânica</SelectItem>
                <SelectItem value="Elétrica">Elétrica</SelectItem>
                <SelectItem value="Freios">Freios</SelectItem>
                <SelectItem value="Suspensão">Suspensão</SelectItem>
                <SelectItem value="Pneus">Pneus</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              className="h-12"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="size-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Resultados da Busca ({filteredParts.length})</CardTitle>
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Exportar Excel
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Código</th>
                  <th className="text-left py-3 px-4">Descrição</th>
                  <th className="text-left py-3 px-4">Categoria</th>
                  <th className="text-right py-3 px-4">Preço Fornecedor</th>
                  <th className="text-right py-3 px-4">Preço Sugerido</th>
                  <th className="text-center py-3 px-4">Estoque</th>
                  <th className="text-center py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredParts.map((part) => {
                  const priceChange = part.priceHistory.length > 1 
                    ? part.priceHistory[part.priceHistory.length - 1].price - part.priceHistory[part.priceHistory.length - 2].price
                    : 0;

                  return (
                    <tr key={part.id} className="border-b hover:bg-gray-50 transition-smooth">
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-sm">{part.code}</div>
                          <div className="text-xs text-gray-500">{part.oemCode}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-2">
                          <div>
                            <div className="text-sm">{part.description}</div>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {part.type === 'genuine' ? 'Genuína' : part.type === 'original' ? 'Original' : 'Paralela'}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <ShieldCheck className="size-3 mr-1" />
                                CATMAT
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{part.category}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div>
                          <div className="text-sm">R$ {part.supplierPrice.toFixed(2)}</div>
                          {priceChange !== 0 && (
                            <div className={`text-xs flex items-center justify-end gap-1 ${priceChange > 0 ? 'text-accent' : 'text-success'}`}>
                              {priceChange > 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                              {Math.abs(priceChange).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="text-sm">R$ {part.suggestedPrice.toFixed(2)}</div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant={part.stock > 50 ? 'default' : part.stock > 0 ? 'secondary' : 'destructive'}>
                          {part.stock}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => setSelectedPart(part)}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => onAddToQuote?.(part)}
                          >
                            <Plus className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Part Detail Dialog */}
      <Dialog open={!!selectedPart} onOpenChange={() => setSelectedPart(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Peça</DialogTitle>
          </DialogHeader>
          {selectedPart && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500">Código OEM</label>
                  <div className="text-lg">{selectedPart.oemCode}</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Código Fabricante</label>
                  <div>{selectedPart.manufacturerCode}</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Descrição Completa</label>
                  <div>{selectedPart.description}</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Categoria CATMAT</label>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-success" />
                    {selectedPart.categoryCAT}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Compatibilidade</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedPart.compatibility.map((vehicle, idx) => (
                      <Badge key={idx} variant="outline">{vehicle}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Peças Equivalentes</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedPart.equivalents.map((code, idx) => (
                      <Badge key={idx} variant="secondary">{code}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500">Histórico de Preços (30 dias)</label>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={selectedPart.priceHistory}>
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="hsl(var(--color-primary))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-xs text-gray-500">Preço Fornecedor</div>
                      <div className="text-xl">R$ {selectedPart.supplierPrice.toFixed(2)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-xs text-gray-500">Preço Sugerido</div>
                      <div className="text-xl text-success">R$ {selectedPart.suggestedPrice.toFixed(2)}</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => {
                    onAddToQuote?.(selectedPart);
                    setSelectedPart(null);
                  }}>
                    <Plus className="size-4 mr-2" />
                    Adicionar ao Orçamento
                  </Button>
                  <Button variant="outline">
                    Imprimir Ficha
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
