import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { whatsappUrl } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{8,}$/, "Informe um telefone com DDD, ex.: (98) 98888-7777."),
  message: z.string().trim().min(5, "Descreva o serviço que você precisa."),
});

type ContactValues = z.infer<typeof schema>;

const fieldClass = "h-12 bg-card font-body text-base focus-visible:ring-primary";
const labelClass = "font-display text-sm uppercase tracking-wider text-muted-foreground";

const ContactSection = () => {
  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  const onSubmit = ({ name, phone, message }: ContactValues) => {
    window.open(whatsappUrl(`Olá! Meu nome é ${name}. Telefone: ${phone}. ${message}`), "_blank");
    toast.success("Mensagem pronta no WhatsApp", { description: "Confira o texto e toque em enviar." });
    form.reset();
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-dark-surface">
      <div className="container px-4">
        <SectionHeading eyebrow="Fale conosco" title="Entre em contato" />

        <Form {...form}>
          <Reveal className="max-w-xl mx-auto">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem data-reveal>
                    <FormLabel className={labelClass}>Seu nome</FormLabel>
                    <FormControl>
                      <Input className={fieldClass} placeholder="Digite seu nome" autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem data-reveal>
                    <FormLabel className={labelClass}>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        className={fieldClass}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="(98) 99999-9999"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem data-reveal>
                    <FormLabel className={labelClass}>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        className="bg-card font-body text-base resize-none focus-visible:ring-primary"
                        placeholder="Descreva o serviço que precisa..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                data-reveal
                className="press w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-display text-lg uppercase tracking-wider gradient-fire text-primary-foreground shadow-fire"
              >
                <Send className="w-5 h-5" />
                Enviar pelo WhatsApp
              </button>
            </form>
          </Reveal>
        </Form>
      </div>
    </section>
  );
};

export default ContactSection;
