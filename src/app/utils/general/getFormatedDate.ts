export const getFormattedDate = (date: Date): string => {
    const optionsThisYear: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const optionsOtherYear: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  
    return date.getFullYear() === new Date().getFullYear()
        ? date.toLocaleDateString(undefined, optionsThisYear)
        : date.toLocaleDateString(undefined, optionsOtherYear);
};
