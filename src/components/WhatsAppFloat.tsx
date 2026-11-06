import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

const WhatsAppFloat = () => {
  return (
    <a
      href={whatsappUrl("Olá! Preciso de um serviço.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-fire flex items-center justify-center shadow-fire-lg animate-pulse-glow press"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-primary-foreground" />
    </a>
  );
};

export default WhatsAppFloat;
