import db from '../lib/db';
import { Order } from '../types/database';

export async function getOrders(): Promise<Order[]> {
  return db.query<Order[]>(`
    SELECT 
      orders.*,
      customers.name as customer_name,
      plans.name as plan_name,
      plans.speed as plan_speed,
      plans.price as plan_price
    FROM orders
    JOIN customers ON orders.customer_id = customers.id
    JOIN plans ON orders.plan_id = plans.id
    ORDER BY created_at DESC
  `);
}

export async function getOrderById(id: number): Promise<Order | null> {
  const orders = await db.query<Order[]>(`
    SELECT 
      orders.*,
      customers.name as customer_name,
      plans.name as plan_name,
      plans.speed as plan_speed,
      plans.price as plan_price
    FROM orders
    JOIN customers ON orders.customer_id = customers.id
    JOIN plans ON orders.plan_id = plans.id
    WHERE orders.id = ?
  `, [id]);
  return orders[0] || null;
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  const result = await db.query<{ insertId: number }>(
    'INSERT INTO orders (customer_id, plan_id, status, installation_date) VALUES (?, ?, ?, ?)',
    [order.customer_id, order.plan_id, order.status, order.installation_date]
  );
  return result.insertId;
}

export async function updateOrder(id: number, order: Partial<Order>): Promise<boolean> {
  const fields = Object.keys(order)
    .filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
    .map(key => `${key} = ?`);
  
  const values = Object.values(order)
    .filter((_, index) => {
      const key = Object.keys(order)[index];
      return key !== 'id' && key !== 'created_at' && key !== 'updated_at';
    });

  if (fields.length === 0) return false;

  const result = await db.query(
    `UPDATE orders SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [...values, id]
  );

  return true;
}

export async function deleteOrder(id: number): Promise<boolean> {
  const result = await db.query('DELETE FROM orders WHERE id = ?', [id]);
  return true;
}