
export interface Client {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const mockClients: Client[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: '3', name: 'Mike Johnson', email: 'mike.johnson@example.com' },
  { id: '4', name: 'Sarah Williams', email: 'sarah.williams@example.com' },
  { id: '5', name: 'David Brown', email: 'david.brown@example.com' },
];
