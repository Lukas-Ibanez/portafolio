'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRef, useState } from 'react';
import { gsap } from '@/lib/gsap-config';

const contactSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  asunto: z.string().min(3, 'El asunto debe tener al menos 3 caracteres'),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulación de envío (aquí iría la integración con EmailJS o similar)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Formulario enviado:', data);

    // Animación de éxito
    setSubmitStatus('success');
    setIsSubmitting(false);

    // Reset después de 3 segundos
    setTimeout(() => {
      reset();
      setSubmitStatus('idle');
    }, 3000);
  };

  // Animación de shake en errores
  const shakeField = (fieldName: string) => {
    const field = formRef.current?.querySelector(`[name="${fieldName}"]`);
    if (field) {
      gsap.to(field, {
        keyframes: [
          { x: -10 },
          { x: 10 },
          { x: -10 },
          { x: 10 },
          { x: 0 }
        ],
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
          Nombre *
        </label>
        <input
          {...register('nombre')}
          type="text"
          id="nombre"
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
            errors.nombre
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder="Tu nombre"
          onBlur={() => errors.nombre && shakeField('nombre')}
        />
        {errors.nombre && (
          <p className="mt-2 text-sm text-red-400 animate-fadeInUp">{errors.nombre.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email *
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
            errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder="tu@email.com"
          onBlur={() => errors.email && shakeField('email')}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-400 animate-fadeInUp">{errors.email.message}</p>
        )}
      </div>

      {/* Asunto */}
      <div>
        <label htmlFor="asunto" className="block text-sm font-medium text-gray-300 mb-2">
          Asunto *
        </label>
        <input
          {...register('asunto')}
          type="text"
          id="asunto"
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
            errors.asunto
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder="¿Sobre qué quieres hablar?"
          onBlur={() => errors.asunto && shakeField('asunto')}
        />
        {errors.asunto && (
          <p className="mt-2 text-sm text-red-400 animate-fadeInUp">{errors.asunto.message}</p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-300 mb-2">
          Mensaje *
        </label>
        <textarea
          {...register('mensaje')}
          id="mensaje"
          rows={6}
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
            errors.mensaje
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder="Cuéntame sobre tu proyecto o pregunta..."
          onBlur={() => errors.mensaje && shakeField('mensaje')}
        />
        {errors.mensaje && (
          <p className="mt-2 text-sm text-red-400 animate-fadeInUp">{errors.mensaje.message}</p>
        )}
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </span>
          ) : (
            'Enviar mensaje'
          )}
        </button>
      </div>

      {/* Success message */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg animate-fadeInUp">
          <div className="flex items-center gap-2 text-green-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">¡Mensaje enviado con éxito!</span>
          </div>
          <p className="text-green-400/80 text-sm mt-2">
            Te responderé lo antes posible.
          </p>
        </div>
      )}
    </form>
  );
}
