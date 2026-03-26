const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'always' });//if using auto, will put in yesterday, last week. always does 1 day ago, 2 days ago, etc. and handles formatting automatically.

export function formatDate(dateString) {
    if(!dateString) return 'Date unavailable';

    const postedDate = new Date(dateString);

    if (Number.isNaN(postedDate.getTime())) {
        return 'Date unavailable';
    }

    const now = new Date();
    const diffMs = postedDate.getTime() - now.getTime();

    const day = 1000 * 60 * 60 * 24;
    const week = day * 7;
    const month = day * 30;

    const absDiff = Math.abs(diffMs);

    if (absDiff < week) {
        return rtf.format(Math.round(diffMs / day), 'day')
    }

    if (absDiff < month) {
        return rtf.format(Math.round(diffMs / week), 'week')
    }

    return rtf.format(Math.round(diffMs / month), 'month');
}
