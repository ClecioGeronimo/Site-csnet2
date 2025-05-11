import React from 'react';
import { MessageCircle } from 'lucide-react';

function WhatsAppButton() {
  const phoneNumber = '5583999142617';
  const message = 'Olá! Gostaria de saber mais sobre os serviços da CSNET PRO LINK.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center gap-2 group"
      aria-label="Atendimento via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out">
        Atendimento
      </span>
    </a>
  );
}

export default WhatsAppButton;