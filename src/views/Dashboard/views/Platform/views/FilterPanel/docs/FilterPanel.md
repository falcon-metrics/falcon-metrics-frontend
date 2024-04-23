# Filter Panel

This component is storing the default filters that are in the history (/core/history/),
when the application loads we gonna do these steps:

**1.** The filterPanel will try access the stored previous filters and after send the to global state

**2.** This will show the filters on the URL after search parameter (?)

**3.** Every request that we peform we can access these filters and combine to your API_URL/endpoint?filters

### Anatomy of Components:

* FilterPanel: Root Component

* Panel: Default Panel from FluentUI that receives also the footer actions (Apply, Clear)

* FilterPanelContent: Will generate all sections (accordions) of group filters (Work Items, Custom Filters, Normalisations)

```tsx
  <FilterPanel>
    <Panel>
      <FilterPanelContent /> 
    </Panel>
  </FilterPanel>
```

**4. Why shall we declare a FilterPanelProvider before to use this?**

Remember that this component uses context api to create a global state on client side and share
this accross pages. You should perform this component within a <FilterPanelProvider />

```tsx
// Root Component ValueStreamManagement.data.tsx
<FilterPanelProvider
  initialStateProp={{
    defaultRollingWindowDates: defaultInitialDates,
    selectedFilters: merge(defaultInitialDates, initialDatesFromUrl),
  }}
>
  <ValueStreamManagement />
</FilterPanelProvider>

// Child Component ValueStreamManagement.tsx with FilterPanel
function ValueStreamManagement() {
  return (
    <>
      <NavigationBar />
      <ContextNavigationWithData />
      <DateRange />
      <FilterPanel />
      <ValueStreamManagementRoute />
    </>
  );
}
```

**5. How to access the applied filters?**

    5.1 import this useFilterPanelContext custom hook.

    5.2 perform useFilterPanelContext hook

    5.3 extract and access `appliedFilters` or `apiQueryParameters`

```tsx
  import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
  function Component() {
    const {
      apiQueryParameters,
      appliedFilters,
    } = useFilterPanelContext();
    
    return (
      ...
    );
  }
```
-------
