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

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const messages = await useMessages(); // ✅ ต้อง await แล้วใช้
  const locale = params.locale;         // ✅ เข้าถึง params หลัง await ได้ปกติ

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