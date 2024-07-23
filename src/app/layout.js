import { Poppins } from "next/font/google";
import { Providers } from "./Providers";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata = {
  title: "Arq. Martin Bajda - Estudio de Arquitectura en San Carlos de Bariloche",
  description: "Desde 1998, en San Carlos de Bariloche, ofrecemos servicios de arquitectura sustentable y diseño innovador. Convierta sus sueños en realidad con Arq. Martin Bajda.",
  keywords: "arquitectura, diseño sustentable, San Carlos de Bariloche, estudio de arquitectura, Arq. Martin Bajda",
  openGraph: {
    type: 'website',
    url: 'https://bajdanext.vercel.app',
    title: 'Arq. Martin Bajda - Estudio de Arquitectura en San Carlos de Bariloche',
    description: 'Desde 1998, en San Carlos de Bariloche, ofrecemos servicios de arquitectura sustentable y diseño innovador. Convierta sus sueños en realidad con Arq. Martin Bajda.',
    images: [
      {
        url: 'https://bajdanext.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-x4.b170437a.png&w=640&q=75',
        width: 452,
        height: 452,
        alt: 'Estudio de Arquitectura Arq. Martin Bajda',
      },
    ],
  },
  facebook: {
    app_id: 'YOUR_FACEBOOK_APP_ID',  // Si tienes una aplicación de Facebook
  },
  instagram: {
    site: '@arq.martin_bajda',
    image: 'https://bajdanext.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-x4.b170437a.png&w=640&q=75',
  },
  canonical: 'https://bajdanext.vercel.app'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth bg-grey-body">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
