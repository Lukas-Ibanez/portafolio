import { Metadata } from 'next';
import ContactoPageClient from './ContactoPageClient';

export const metadata: Metadata = {
  title: 'Contacto | Lukas Ibáñez',
  description: '¿Tienes un proyecto en mente? Contáctame para discutir oportunidades de colaboración, proyectos freelance o simplemente conversar sobre tecnología.',
  openGraph: {
    title: 'Contacto | Lukas Ibáñez',
    description: 'Contáctame para proyectos freelance y oportunidades de colaboración',
  },
};

export default function ContactoPage() {
  return <ContactoPageClient />;
}
