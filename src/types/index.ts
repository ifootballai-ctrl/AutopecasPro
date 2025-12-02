export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

export interface Part {
  id: string;
  code: string;
  oemCode: string;
  manufacturerCode: string;
  description: string;
  category: string;
  categoryCAT: string;
  supplierPrice: number;
  suggestedPrice: number;
  stock: number;
  image?: string;
  compatibility: string[];
  equivalents: string[];
  priceHistory: PriceHistory[];
  type: 'genuine' | 'original' | 'aftermarket';
}

export interface PriceHistory {
  date: string;
  price: number;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: 'motorcycle' | 'light' | 'medium' | 'heavy' | 'machinery';
  plate?: string;
}

export interface Client {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  vehicles: Vehicle[];
  totalSpent: number;
  lastQuote?: string;
}

export interface QuoteItem {
  part: Part;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ServiceItem {
  id: string;
  description: string;
  estimatedTime: number;
  hourlyRate: number;
  total: number;
}

export interface Quote {
  id: string;
  number: string;
  client: Client;
  vehicle: Vehicle;
  items: QuoteItem[];
  services: ServiceItem[];
  date: string;
  validUntil: string;
  status: 'approved' | 'pending' | 'rejected';
  subtotalParts: number;
  subtotalServices: number;
  discount: number;
  total: number;
}

export type VehicleType = 'motorcycle' | 'light' | 'medium' | 'heavy' | 'machinery';

export interface SearchFilters {
  vehicleType?: VehicleType;
  brand?: string;
  model?: string;
  year?: number;
  partNumber?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  supplier?: string;
  availability?: boolean;
  partType?: 'genuine' | 'original' | 'aftermarket';
}
