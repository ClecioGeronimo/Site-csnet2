import React from 'react';
import { X, Trash2, CreditCard, Barcode, QrCode } from 'lucide-react';
import { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartModal = React.memo(({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }: CartModalProps) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = (method: string) => {
    // In a real application, this would integrate with a payment gateway
    alert(`Processando pagamento via ${method}. Total: R$ ${total.toFixed(2)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-2xl font-bold text-gray-800">Carrinho</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="p-6 overflow-y-auto max-h-[40vh]">
            {items.length === 0 ? (
              <p className="text-center text-gray-600">Seu carrinho está vazio</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Options */}
          {items.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handlePayment('Cartão de Crédito')}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <CreditCard className="w-5 h-5" />
                  Pagar com Cartão de Crédito
                </button>
                <button
                  onClick={() => handlePayment('Boleto')}
                  className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Barcode className="w-5 h-5" />
                  Gerar Boleto
                </button>
                <button
                  onClick={() => handlePayment('PIX')}
                  className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <QrCode className="w-5 h-5" />
                  Pagar com PIX
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

CartModal.displayName = 'CartModal';

export default CartModal;