import db from '../lib/db';
import { Plan } from '../types/database';

export async function getPlans(): Promise<Plan[]> {
  return db.query<Plan[]>('SELECT * FROM plans ORDER BY price ASC');
}

export async function getPlanById(id: number): Promise<Plan | null> {
  const plans = await db.query<Plan[]>('SELECT * FROM plans WHERE id = ?', [id]);
  return plans[0] || null;
}

export async function createPlan(plan: Omit<Plan, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  const result = await db.query<{ insertId: number }>(
    'INSERT INTO plans (name, speed, price, features, is_popular) VALUES (?, ?, ?, ?, ?)',
    [plan.name, plan.speed, plan.price, plan.features, plan.is_popular]
  );
  return result.insertId;
}

export async function updatePlan(id: number, plan: Partial<Plan>): Promise<boolean> {
  const fields = Object.keys(plan)
    .filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
    .map(key => `${key} = ?`);
  
  const values = Object.values(plan)
    .filter((_, index) => {
      const key = Object.keys(plan)[index];
      return key !== 'id' && key !== 'created_at' && key !== 'updated_at';
    });

  if (fields.length === 0) return false;

  const result = await db.query(
    `UPDATE plans SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [...values, id]
  );

  return true;
}

export async function deletePlan(id: number): Promise<boolean> {
  const result = await db.query('DELETE FROM plans WHERE id = ?', [id]);
  return true;
}