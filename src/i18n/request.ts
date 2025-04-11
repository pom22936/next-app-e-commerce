import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
    const resolvedLocale = locale || 'th'; // Provide a default locale, e.g., 'en'
    return {
        locale: resolvedLocale,
        messages: (await import(`../messages/${resolvedLocale}.json`)).default
    };
});
