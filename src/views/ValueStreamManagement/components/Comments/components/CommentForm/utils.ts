
export const getWidgetsOptions = (widgets) => {
  return widgets.map(widget => ({ value: widget.id, label: widget.name, info: widget }));
};

export const getCustomViewsOptions = (customViews) => {
  return customViews.map(customView => ({ value: customView.id, label: customView.displayName, info: customView }));
};

export const getCheckpointsOptions = (checkpoints) => {
  return checkpoints.map(checkpoint => ({ value: checkpoint.id, label: checkpoint.name, info: checkpoint }));
};

export const getEventsOptions = (events) => {
  return events.map(event => ({ value: event.id, label: event.description, info: event }));
};

export const getInsightsOptions = (actionableInsightsData) => {
  return actionableInsightsData.map(insight => ({ 
    value: insight.id, label: insight.title, info: insight
  }));
};

export const getFormattedOptions = (
  setOptionSelected,
  selectedElement,
  widgetOptions,
  normalisationChartsOptions,
  checkpoints,
  events,
  insights,
) => {
  switch(String(selectedElement)) {
    case '0': {
      const widgetsOptions = getCustomViewsOptions(widgetOptions);
      setOptionSelected(widgetsOptions);
      break;
    }
    case '1': {
      const customViewsOptions = getCustomViewsOptions(normalisationChartsOptions);
      setOptionSelected(customViewsOptions);
      break;
    }
    case '2': {
      const checkpointsOptions = getCheckpointsOptions(checkpoints);
      setOptionSelected(checkpointsOptions);
      break;
    }
    case '3': {
      const eventsOptions = getEventsOptions(events);
      setOptionSelected(eventsOptions);
      break;
    }
    case '4': {
      const insightsOptions = getInsightsOptions(insights);
      setOptionSelected(insightsOptions);
      break;
    }
  }
};
