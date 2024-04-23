import { useEffect } from 'react';

const useLockPage = () => {
  useEffect(() => {
    document.addEventListener('DOMContentLoaded', lockListener);
    document.addEventListener('contextmenu', contextMenuListener);
    document.addEventListener('keydown', keycutListeners, false);

    return () => {
      document.removeEventListener('DOMContentLoaded', lockListener);
      document.removeEventListener('contextmenu', contextMenuListener);
      document.removeEventListener('keydown', keycutListeners);
    };
  }, []);

  return null;
};

const lockListener = () => {
  const observer: any = new MutationObserver((records) => {
    records.forEach((record: any) => {
      const shouldReload = checkIfShouldReload(record);
      if (shouldReload) {
        window?.location?.reload();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterData: true,
  });
};

const checkIfShouldReload = (record) => {
  let shouldReload = false;

  const checkChangeStyles =
    record?.type === 'attributes' &&
    record.target?.matches &&
    record.target?.matches('body, div#lock, #overlay') &&
    record?.attributeName === 'style';
  const checkChangeCharacterData =
    record?.type === 'characterData' &&
    record?.target?.parentNode?.tagName?.toLowerCase() === 'style';
  if (checkChangeStyles || checkChangeCharacterData) {
    return true;
  }

  record.removedNodes.forEach((node: { id: any }) => {
    if (node?.id === 'overlay') {
      shouldReload = true;
    }
  });

  record.addedNodes.forEach((node) => {
    if (
      node?.matches &&
      node?.matches('style:not([data-href]), link[rel="stylesheet"]')
    ) {
      shouldReload = true;
    }
  });
  return shouldReload;
};

const contextMenuListener = (e: Event) => e.preventDefault();

const keycutListeners = (e) => {
  if (
    e.keyCode === 123 /* F12: Chrome, Edge dev tools */ ||
    (e.shiftKey &&
      e.ctrlKey &&
      (e.keyCode === 73 /* + I: Chrome, FF dev tools */ ||
        e.keyCode === 67 /* + C: Chrome, FF inspect el */ ||
        e.keyCode === 74 /* + J: Chrome, FF console */ ||
        e.keyCode === 75 /* + K: FF web console */ ||
        e.keyCode === 83 /* + S: FF debugger */ ||
        e.keyCode === 69 /* + E: FF network */ ||
        e.keyCode === 77)) /* + M: FF responsive design mode */ ||
    (e.shiftKey &&
      (e.keyCode === 118 /* + F5: Firefox style editor */ ||
        e.keyCode === 116)) /* + F5: Firefox performance */ ||
    (e.ctrlKey && e.keyCode === 85) /* + U: Chrome, FF view source */
  ) {
    e.preventDefault();
  }
};

export default useLockPage;
