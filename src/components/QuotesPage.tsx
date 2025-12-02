import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Plus, Eye, Edit, Copy, FileText, Download, Mail, Trash2 } from 'lucide-react';
import { mockQuotes, mockClients, mockParts } from '../data/mockData';
import { Quote, Part, QuoteItem, ServiceItem } from '../types';
import { Textarea } from './ui/textarea';

export function QuotesPage() {
  const [quotes] = useState(mockQuotes);
  const [showNewQuote, setShowNewQuote] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredQuotes = quotes.filter(quote => 
    statusFilter === 'all' || quote.status === statusFilter
  );

  const getStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'approved': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-white';
      case 'rejected': return 'bg-accent text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusLabel = (status: Quote['status']) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Recusado';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Orçamentos</h1>
          <p className="text-gray-600 mt-1">Gerencie os orçamentos de peças e serviços</p>
        </div>
        <Button onClick={() => setShowNewQuote(true)} className="bg-primary hover:bg-primary-dark">
          <Plus className="size-4 mr-2" />
          Novo Orçamento
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="approved">Aprovados</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="rejected">Recusados</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Buscar por cliente ou número..." className="flex-1" />
          </div>
        </CardContent>
      </Card>

      {/* Quotes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuotes.map((quote) => (
          <Card key={quote.id} className="hover:shadow-lg transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-500">OS {quote.number}</div>
                  <CardTitle className="mt-1">{quote.client.name}</CardTitle>
                </div>
                <Badge className={getStatusColor(quote.status)}>
                  {getStatusLabel(quote.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs text-gray-500">Veículo</div>
                <div className="text-sm">{quote.vehicle.brand} {quote.vehicle.model} {quote.vehicle.year}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Valor Total</div>
                <div className="text-2xl text-success">R$ {quote.total.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Data / Validade</div>
                <div className="text-sm">
                  {new Date(quote.date).toLocaleDateString('pt-BR')} - {new Date(quote.validUntil).toLocaleDateString('pt-BR')}
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => setSelectedQuote(quote)}>
                  <Eye className="size-4 mr-1" />
                  Ver
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="size-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Quote Dialog */}
      <Dialog open={showNewQuote} onOpenChange={setShowNewQuote}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Orçamento</DialogTitle>
          </DialogHeader>
          <NewQuoteForm onClose={() => setShowNewQuote(false)} />
        </DialogContent>
      </Dialog>

      {/* View Quote Dialog */}
      <Dialog open={!!selectedQuote} onOpenChange={() => setSelectedQuote(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Orçamento {selectedQuote?.number}</DialogTitle>
          </DialogHeader>
          {selectedQuote && <QuoteDetail quote={selectedQuote} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NewQuoteForm({ onClose }: { onClose: () => void }) {
  const [selectedClient, setSelectedClient] = useState('');
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);

  const addItem = () => {
    const part = mockParts[0];
    setItems([...items, {
      part,
      quantity: 1,
      unitPrice: part.suggestedPrice,
      total: part.suggestedPrice
    }]);
  };

  const subtotalParts = items.reduce((sum, item) => sum + item.total, 0);
  const subtotalServices = services.reduce((sum, service) => sum + service.total, 0);
  const total = subtotalParts + subtotalServices;

  return (
    <div className="space-y-6">
      {/* Client Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Cliente</Label>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o cliente" />
            </SelectTrigger>
            <SelectContent>
              {mockClients.map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Veículo</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o veículo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">Ford Ranger 2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Data de Validade</Label>
          <Input type="date" />
        </div>
        <div className="space-y-2">
          <Label>Condições de Pagamento</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">À vista</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="60">60 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Parts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4>Peças</h4>
          <Button size="sm" onClick={addItem}>
            <Plus className="size-4 mr-2" />
            Adicionar Peça
          </Button>
        </div>
        {items.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-2 px-4">Código</th>
                  <th className="text-left py-2 px-4">Descrição</th>
                  <th className="text-center py-2 px-4">Qtde</th>
                  <th className="text-right py-2 px-4">Preço Unit.</th>
                  <th className="text-right py-2 px-4">Total</th>
                  <th className="text-center py-2 px-4">Ação</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 px-4">{item.part.code}</td>
                    <td className="py-2 px-4">{item.part.description}</td>
                    <td className="py-2 px-4 text-center">{item.quantity}</td>
                    <td className="py-2 px-4 text-right">R$ {item.unitPrice.toFixed(2)}</td>
                    <td className="py-2 px-4 text-right">R$ {item.total.toFixed(2)}</td>
                    <td className="py-2 px-4 text-center">
                      <Button size="sm" variant="ghost" onClick={() => setItems(items.filter((_, i) => i !== idx))}>
                        <Trash2 className="size-4 text-accent" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 border rounded-lg border-dashed">
            Nenhuma peça adicionada
          </div>
        )}
      </div>

      {/* Summary */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal Peças:</span>
              <span>R$ {subtotalParts.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal Mão de Obra:</span>
              <span>R$ {subtotalServices.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg pt-2 border-t">
              <span>Total:</span>
              <span className="text-success">R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Cancelar
        </Button>
        <Button className="flex-1">Salvar Rascunho</Button>
        <Button className="flex-1 bg-primary hover:bg-primary-dark">
          <FileText className="size-4 mr-2" />
          Gerar PDF
        </Button>
      </div>
    </div>
  );
}

function QuoteDetail({ quote }: { quote: Quote }) {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500">Cliente</label>
          <div>{quote.client.name}</div>
          <div className="text-sm text-gray-500">{quote.client.email}</div>
        </div>
        <div>
          <label className="text-xs text-gray-500">Veículo</label>
          <div>{quote.vehicle.brand} {quote.vehicle.model} {quote.vehicle.year}</div>
          <div className="text-sm text-gray-500">{quote.vehicle.plate}</div>
        </div>
      </div>

      {/* Parts */}
      <div>
        <h4 className="mb-3">Peças</h4>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-2 px-4">Código</th>
                <th className="text-left py-2 px-4">Descrição</th>
                <th className="text-center py-2 px-4">Qtde</th>
                <th className="text-right py-2 px-4">Preço Unit.</th>
                <th className="text-right py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 px-4">{item.part.code}</td>
                  <td className="py-2 px-4">{item.part.description}</td>
                  <td className="py-2 px-4 text-center">{item.quantity}</td>
                  <td className="py-2 px-4 text-right">R$ {item.unitPrice.toFixed(2)}</td>
                  <td className="py-2 px-4 text-right">R$ {item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Services */}
      {quote.services.length > 0 && (
        <div>
          <h4 className="mb-3">Serviços / Mão de Obra</h4>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-2 px-4">Descrição</th>
                  <th className="text-center py-2 px-4">Tempo (h)</th>
                  <th className="text-right py-2 px-4">Valor/Hora</th>
                  <th className="text-right py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {quote.services.map((service, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 px-4">{service.description}</td>
                    <td className="py-2 px-4 text-center">{service.estimatedTime}h</td>
                    <td className="py-2 px-4 text-right">R$ {service.hourlyRate.toFixed(2)}</td>
                    <td className="py-2 px-4 text-right">R$ {service.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal Peças:</span>
              <span>R$ {quote.subtotalParts.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal Mão de Obra:</span>
              <span>R$ {quote.subtotalServices.toFixed(2)}</span>
            </div>
            {quote.discount > 0 && (
              <div className="flex justify-between text-accent">
                <span>Desconto:</span>
                <span>- R$ {quote.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl pt-2 border-t">
              <span>Total:</span>
              <span className="text-success">R$ {quote.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <Download className="size-4 mr-2" />
          Baixar PDF
        </Button>
        <Button variant="outline" className="flex-1">
          <Mail className="size-4 mr-2" />
          Enviar por Email
        </Button>
        <Button className="flex-1 bg-primary hover:bg-primary-dark">
          <Edit className="size-4 mr-2" />
          Editar
        </Button>
      </div>
    </div>
  );
}
