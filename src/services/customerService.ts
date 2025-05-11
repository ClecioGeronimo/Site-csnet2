import db from '../lib/db';
import { Customer } from '../types/database';

export async function getCustomers(): Promise<Customer[]> {
  return db.query<Customer[]>('SELECT * FROM customers ORDER BY created_at DESC');
}

export async function getCustomerById(id: number): Promise<Customer | null> {
  const customers = await db.query<Customer[]>('SELECT * FROM customers WHERE id = ?', [id]);
  return customers[0] || null;
}

export async function createCustomer(customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  const result = await db.query<{ insertId: number }>(
    'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
    [customer.name, customer.email, customer.phone, customer.address]
  );
  return result.insertId;
}

export async function updateCustomer(id: number, customer: Partial<Customer>): Promise<boolean> {
  const fields = Object.keys(customer)
    .filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
    .map(key => `${key} = ?`);
  
  const values = Object.values(customer)
    .filter((_, index) => {
      const key = Object.keys(customer)[index];
      return key !== 'id' && key !== 'created_at' && key !== 'updated_at';
    });

  if (fields.length === 0) return false;

  const result = await db.query(
    `UPDATE customers SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [...values, id]
  );

  return true;
}

export async function deleteCustomer(id: number): Promise<boolean> {
  const result = await db.query('DELETE FROM customers WHERE id = ?', [id]);
  return true;
}