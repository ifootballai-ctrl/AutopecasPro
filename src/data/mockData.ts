import { Part, Client, Quote, Vehicle } from '../types';

export const mockParts: Part[] = [
  {
    id: '1',
    code: 'FL-2019',
    oemCode: '123456789',
    manufacturerCode: 'XYZ-789',
    description: 'Filtro de Óleo - Motor 1.0/1.6',
    category: 'Mecânica',
    categoryCAT: 'CATMAT-2456-01',
    supplierPrice: 24.90,
    suggestedPrice: 34.90,
    stock: 156,
    compatibility: ['Gol G5/G6/G7', 'Palio 1.0', 'Uno Fire'],
    equivalents: ['FL-2020', 'FL-2018'],
    type: 'original',
    priceHistory: [
      { date: '2025-11-02', price: 23.50 },
      { date: '2025-11-09', price: 24.20 },
      { date: '2025-11-16', price: 24.50 },
      { date: '2025-11-23', price: 24.90 },
      { date: '2025-12-02', price: 24.90 }
    ]
  },
  {
    id: '2',
    code: 'PB-4567',
    oemCode: '987654321',
    manufacturerCode: 'ABC-456',
    description: 'Pastilha de Freio Dianteira - Cerâmica',
    category: 'Freios',
    categoryCAT: 'CATMAT-3789-05',
    supplierPrice: 189.90,
    suggestedPrice: 249.90,
    stock: 78,
    compatibility: ['Hilux 2016+', 'Ranger 2013+', 'S10 2012+'],
    equivalents: ['PB-4568', 'PB-4569'],
    type: 'genuine',
    priceHistory: [
      { date: '2025-11-02', price: 185.00 },
      { date: '2025-11-09', price: 187.50 },
      { date: '2025-11-16', price: 189.00 },
      { date: '2025-11-23', price: 189.90 },
      { date: '2025-12-02', price: 189.90 }
    ]
  },
  {
    id: '3',
    code: 'BT-6012',
    oemCode: '456789123',
    manufacturerCode: 'DEF-123',
    description: 'Bateria Automotiva 60Ah - 12V',
    category: 'Elétrica',
    categoryCAT: 'CATMAT-1234-12',
    supplierPrice: 349.90,
    suggestedPrice: 449.90,
    stock: 34,
    compatibility: ['Todos veículos leves 1.0 a 2.0'],
    equivalents: ['BT-6013', 'BT-6011'],
    type: 'original',
    priceHistory: [
      { date: '2025-11-02', price: 339.90 },
      { date: '2025-11-09', price: 344.90 },
      { date: '2025-11-16', price: 349.90 },
      { date: '2025-11-23', price: 349.90 },
      { date: '2025-12-02', price: 349.90 }
    ]
  },
  {
    id: '4',
    code: 'PN-19565',
    oemCode: '789123456',
    manufacturerCode: 'GHI-789',
    description: 'Pneu 195/65R15 - 91V',
    category: 'Pneus',
    categoryCAT: 'CATMAT-5678-20',
    supplierPrice: 289.90,
    suggestedPrice: 389.90,
    stock: 120,
    compatibility: ['Sedan médios', 'Corolla', 'Civic', 'Cruze'],
    equivalents: ['PN-19566', 'PN-19564'],
    type: 'original',
    priceHistory: [
      { date: '2025-11-02', price: 285.00 },
      { date: '2025-11-09', price: 287.50 },
      { date: '2025-11-16', price: 289.90 },
      { date: '2025-11-23', price: 289.90 },
      { date: '2025-12-02', price: 289.90 }
    ]
  },
  {
    id: '5',
    code: 'VL-3344',
    oemCode: '321654987',
    manufacturerCode: 'JKL-321',
    description: 'Vela de Ignição - Iridium',
    category: 'Mecânica',
    categoryCAT: 'CATMAT-2456-08',
    supplierPrice: 34.90,
    suggestedPrice: 49.90,
    stock: 245,
    compatibility: ['Golf TSI', 'Jetta TSI', 'Virtus TSI'],
    equivalents: ['VL-3345', 'VL-3343'],
    type: 'genuine',
    priceHistory: [
      { date: '2025-11-02', price: 33.50 },
      { date: '2025-11-09', price: 34.20 },
      { date: '2025-11-16', price: 34.90 },
      { date: '2025-11-23', price: 34.90 },
      { date: '2025-12-02', price: 34.90 }
    ]
  },
  {
    id: '6',
    code: 'AM-7788',
    oemCode: '159357486',
    manufacturerCode: 'MNO-159',
    description: 'Amortecedor Dianteiro - Pressurizado',
    category: 'Suspensão',
    categoryCAT: 'CATMAT-4567-15',
    supplierPrice: 189.90,
    suggestedPrice: 259.90,
    stock: 42,
    compatibility: ['Onix', 'Prisma', 'Cobalt'],
    equivalents: ['AM-7789', 'AM-7787'],
    type: 'original',
    priceHistory: [
      { date: '2025-11-02', price: 185.00 },
      { date: '2025-11-09', price: 187.50 },
      { date: '2025-11-16', price: 189.90 },
      { date: '2025-11-23', price: 189.90 },
      { date: '2025-12-02', price: 189.90 }
    ]
  }
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    document: '123.456.789-00',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    address: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zip: '01234-567'
    },
    vehicles: [
      {
        id: 'v1',
        brand: 'Ford',
        model: 'Ranger',
        year: 2022,
        type: 'light',
        plate: 'ABC-1234'
      }
    ],
    totalSpent: 12450.80,
    lastQuote: '2025-11-28'
  },
  {
    id: '2',
    name: 'Maria Santos Oficina',
    document: '12.345.678/0001-90',
    email: 'contato@mariasantos.com.br',
    phone: '(11) 3456-7890',
    address: {
      street: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zip: '01310-100'
    },
    vehicles: [
      {
        id: 'v2',
        brand: 'Volkswagen',
        model: 'Gol',
        year: 2020,
        type: 'light',
        plate: 'DEF-5678'
      },
      {
        id: 'v3',
        brand: 'Chevrolet',
        model: 'Onix',
        year: 2021,
        type: 'light',
        plate: 'GHI-9012'
      }
    ],
    totalSpent: 23890.50,
    lastQuote: '2025-12-01'
  },
  {
    id: '3',
    name: 'Carlos Pereira',
    document: '987.654.321-00',
    email: 'carlos.pereira@email.com',
    phone: '(21) 99876-5432',
    address: {
      street: 'Rua do Comércio, 456',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zip: '20000-000'
    },
    vehicles: [
      {
        id: 'v4',
        brand: 'Toyota',
        model: 'Hilux',
        year: 2021,
        type: 'light',
        plate: 'JKL-3456'
      }
    ],
    totalSpent: 8920.30,
    lastQuote: '2025-11-15'
  }
];

export const mockQuotes: Quote[] = [
  {
    id: '1',
    number: '#2025-001245',
    client: mockClients[0],
    vehicle: mockClients[0].vehicles[0],
    items: [
      {
        part: mockParts[1],
        quantity: 1,
        unitPrice: 249.90,
        total: 249.90
      },
      {
        part: mockParts[0],
        quantity: 2,
        unitPrice: 34.90,
        total: 69.80
      }
    ],
    services: [
      {
        id: 's1',
        description: 'Troca de pastilha de freio',
        estimatedTime: 1.5,
        hourlyRate: 80.00,
        total: 120.00
      }
    ],
    date: '2025-12-01',
    validUntil: '2025-12-15',
    status: 'approved',
    subtotalParts: 319.70,
    subtotalServices: 120.00,
    discount: 0,
    total: 439.70
  },
  {
    id: '2',
    number: '#2025-001246',
    client: mockClients[1],
    vehicle: mockClients[1].vehicles[0],
    items: [
      {
        part: mockParts[2],
        quantity: 1,
        unitPrice: 449.90,
        total: 449.90
      },
      {
        part: mockParts[4],
        quantity: 4,
        unitPrice: 49.90,
        total: 199.60
      }
    ],
    services: [
      {
        id: 's2',
        description: 'Instalação de bateria',
        estimatedTime: 0.5,
        hourlyRate: 80.00,
        total: 40.00
      },
      {
        id: 's3',
        description: 'Troca de velas de ignição',
        estimatedTime: 1.0,
        hourlyRate: 80.00,
        total: 80.00
      }
    ],
    date: '2025-12-02',
    validUntil: '2025-12-16',
    status: 'pending',
    subtotalParts: 649.50,
    subtotalServices: 120.00,
    discount: 50.00,
    total: 719.50
  },
  {
    id: '3',
    number: '#2025-001247',
    client: mockClients[2],
    vehicle: mockClients[2].vehicles[0],
    items: [
      {
        part: mockParts[3],
        quantity: 4,
        unitPrice: 389.90,
        total: 1559.60
      }
    ],
    services: [
      {
        id: 's4',
        description: 'Montagem e balanceamento (4 pneus)',
        estimatedTime: 2.0,
        hourlyRate: 80.00,
        total: 160.00
      }
    ],
    date: '2025-11-28',
    validUntil: '2025-12-12',
    status: 'approved',
    subtotalParts: 1559.60,
    subtotalServices: 160.00,
    discount: 100.00,
    total: 1619.60
  }
];

export const mockMetrics = {
  totalParts: 1245789,
  pricesUpdatedToday: 12456,
  quotesThisMonth: 245,
  averageSavings: 7.8
};

export const mockPriceVariation = [
  { date: '03/11', value: 5.2 },
  { date: '06/11', value: 4.8 },
  { date: '09/11', value: 6.1 },
  { date: '12/11', value: 5.5 },
  { date: '15/11', value: 7.2 },
  { date: '18/11', value: 6.8 },
  { date: '21/11', value: 8.1 },
  { date: '24/11', value: 7.5 },
  { date: '27/11', value: 6.9 },
  { date: '30/11', value: 7.8 },
  { date: '02/12', value: 8.3 }
];

export const mockTopSearchedParts = [
  { name: 'Filtro de Óleo', searches: 1245, trend: 'up' },
  { name: 'Pastilha de Freio', searches: 987, trend: 'up' },
  { name: 'Vela de Ignição', searches: 856, trend: 'down' },
  { name: 'Bateria 60Ah', searches: 734, trend: 'up' },
  { name: 'Correia Dentada', searches: 623, trend: 'stable' }
];
