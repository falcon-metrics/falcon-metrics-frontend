export function setActiveStyleSheet(title: string | null): void {
  let styleSheet;
  for (
    let index = 0;
    (styleSheet = document.getElementsByTagName('link')[index]);
    index++
  ) {
    if (
      styleSheet.getAttribute('rel')?.indexOf('style') !== -1 &&
      styleSheet.getAttribute('title')
    ) {
      styleSheet.disabled = true;
      if (styleSheet.getAttribute('title') === title)
        styleSheet.disabled = false;
    }
  }
}

export function getActiveStyleSheet(): string | null {
  let styleSheetElement;
  for (
    let index = 0;
    (styleSheetElement = document.getElementsByTagName('link')[index]);
    index++
  ) {
    if (
      styleSheetElement.getAttribute('rel')?.indexOf('style') !== -1 &&
      styleSheetElement.getAttribute('title') &&
      !styleSheetElement.disabled
    )
      return styleSheetElement.getAttribute('title');
  }
  return null;
}

export function getPreferredStyleSheet(): string | null {
  let styleSheetElement;

  for (
    let index = 0;
    (styleSheetElement = document.getElementsByTagName('link')[index]);
    index++
  ) {
    if (
      styleSheetElement.getAttribute('rel')?.indexOf('style') !== -1 &&
      styleSheetElement.getAttribute('rel')?.indexOf('alt') === -1 &&
      styleSheetElement.getAttribute('title')
    )
      return styleSheetElement.getAttribute('title');
  }
  return null;
}

export function createCookie(
  name: string,
  value: string | null,
  days: number,
): void {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }

  document.cookie = name + '=' + value + expires + '; path=/';
}

export function readCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
