import "./globals.css";
import Cursor from "@/utils/Cursor";
import Script from "next/script";

export const metadata = {
  title: "Paxerr",
  description:
    "Trespass into the domain of your million-dollar vision where your competition burns to ashes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P7JW7VGG');
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6NT68RRTBQ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6NT68RRTBQ');
          `}
        </Script>
      </head>
      <body className="overflow-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P7JW7VGG"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
