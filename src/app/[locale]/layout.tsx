import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// export function generateStaticParams() {
//     return ['th', 'en'].map((locale) => ({ locale }));
// }

export const metadata = {
  title: 'My App',
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}