export const getWidgetsOptions = (widgets) => {
  return widgets.map(widget => ({ value: widget.id, label: widget.name, info: widget }));
};

export const getFormattedOptions = (
  setOptionSelected,
  selectedElement,
  // widgetOptions,
) => {
  switch(String(selectedElement)) {
    case '0': {
      const widgetsOptions = getWidgetsOptions([]);
      setOptionSelected(widgetsOptions);
      break;
    }
    case '1': {
      const customViewsOptions = getWidgetsOptions([]);
      setOptionSelected(customViewsOptions);
      break;
    }
  }
};
