// Export all utilities and services
export * from './api';
export * from './types';

export const formatCurrency = (value: number): string => {
  return value.toFixed(2).replace('.', ',');
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('pt-BR');
};