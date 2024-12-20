import { isToday, formatDistanceToNow, isYesterday, format } from 'date-fns';
export default function formatDate (date: Date): string{
    if (isToday(date)) return `last seen ${formatDistanceToNow(date)} ago`;
    else if (isYesterday(date)) return `last seen yesterday at ${format(date, 'HH:mm')}`;
    else return `last seen ${format(date, 'M/d/yyyy')}`;
}