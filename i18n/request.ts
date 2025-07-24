import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import Negotiator from 'negotiator';

const LOCALES: string[] = ['en', 'pt', 'es']; // seus idiomas suportados
const DEFAULT_LOCALE: string = 'en';

async function detectLocale(): Promise<string> {
    const cookieStore = cookies();
    const localeFromCookie = (await cookieStore).get('locale')?.value;

    if (localeFromCookie && LOCALES.includes(localeFromCookie)) {
        return localeFromCookie;
    }

    const acceptLanguage = (await headers()).get('accept-language');
    if (acceptLanguage) {
        const languages = new Negotiator({ headers: { 'accept-language': acceptLanguage } }).languages();
        const matched = languages.find((lang: string) => LOCALES.includes(lang.split('-')[0]));
        if (matched) {
            return matched.split('-')[0];
        }
    }

    return DEFAULT_LOCALE;
}

export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    const locale = await detectLocale();
    // const locale = 'pt-BR';

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});