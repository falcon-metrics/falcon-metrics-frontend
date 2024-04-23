import { getTimezone } from "./utils";

export const getDefaultURLParams = (): string => {
  const options = {
    tz: getTimezone(),
    lang: navigator.language,
  };
  return new URLSearchParams(options).toString();
};

export function sortByString<T>(list: T[], key: string) {
  return list.sort((a, b) => {
    const aValue = a?.[key]?.toLocaleLowerCase() || '';
    const bValue = b?.[key]?.toLocaleLowerCase() || '';
    return aValue.localeCompare(bValue);
  });
}

export const copyToClipboard = (text: string) => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const copyToClipboardObeya = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard:', text);
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
  }
};
