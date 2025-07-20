// Server-side
export function getHostFromHeaders(headers: Headers) {
    const host = headers.get('host');
    return host?.toLowerCase().replace(/^www\./, '') ?? '';
}

// Client-side
export function getHostFromWindow() {
    if (typeof window !== 'undefined') {
        return window.location.host.toLowerCase().replace(/^www\./, '');
    }
    return '';
}
