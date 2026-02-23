import { useState } from "react";
import { Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message
    const text = `Olá! Meu nome é ${formData.name}. Telefone: ${formData.phone}. ${formData.message}`;
    const url = `https://wa.me/5500000000000?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-dark-surface">
      <div className="container px-4">
        <div className="text-center mb-16">
          <p className="font-display text-sm tracking-[0.3em] uppercase text-fire-orange mb-3">
            Fale conosco
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
            Entre em <span className="gradient-fire-text">Contato</span>
          </h2>
        </div>

        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                Seu Nome
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground font-body focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Digite seu nome"
              />
            </div>

            <div>
              <label className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                Telefone
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground font-body focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                Mensagem
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground font-body focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                placeholder="Descreva o serviço que precisa..."
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-display text-lg uppercase tracking-wider gradient-fire text-primary-foreground shadow-fire hover:scale-[1.02] transition-transform duration-300"
            >
              <Send className="w-5 h-5" />
              {submitted ? "Mensagem Enviada!" : "Enviar via WhatsApp"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
