# How to create a new Module on Frontend

### 1. How to create a new module using Filter Panel with module Routes Structure?

You should create a Folder and Files following this pattern to create a new module

```
ModuleName/
  /ValueStreamManagement.data.tsx   --ROOT TOP LEVEL COMPONENT that calls <FilterPanelProvider /> also within the child component
                                      <ValueStreamManagement /> is where we call FilterPanel        

  /ValueStreamManagement.tsx         --will call <ValueStreamManagementRoute /> and mount the base skeleton of the page
  /ValueStreamManagementRoute.tsx    --should have the routes with Switch route component to navigation between internal      
                                       perspectives (Delivery Management, Delivery Governance, Continuous Improvements)
  /ValueStreamManagement.styles.ts   --base global styles used on the module created with MaterialUI
  /index.ts                          --WARNING: you should export as default the ROOT Level Component ValueStreamManagement.data.tsx 
  /components/                       --specific components shared between internal views
  /views/                            --internal perspectives
  /hooks
  /utils
  /interfaces
```

**1.1 Declare Root-level component calling FilterPanelProvider** on `ValueStreamManagement.data.tsx`
and within call the `<ValueStreamManagement />`.

* As convention, this component should have the logic of the more generic global components
like we check the user is trial, access the rolling window initial values, control flags for the entire module.

* Declare Providers for some State created with ContextAPI used  on this module

```tsx
<FilterPanelProvider
  initialStateProp={{
    defaultRollingWindowDates: defaultInitialDates,
    selectedFilters: merge(defaultInitialDates, initialDatesFromUrl),
  }}
>
  <ValueStreamManagement />
</FilterPanelProvider>
```

**1.2 Base Component** `ValueStreamManagement.tsx`

You should create a base structure including the base components like the example below:

```tsx
<ValueStreamManagement>
  <NavigationBar />
  <ContextNavigationWithData />
  <DateRange />
  <FilterPanel />
  <ValueStreamManagementRoute /> // only this will change on the page between each route
</ValueStreamManagement>
```

Note: these components will be static to all perspectives
(Delivery Management, Delivery Governance, Continuous Improvements

wich means that only `<ValueStreamManagementRoute />` will be the dynamic content.

**1.3 The routes related to the internal perspectives (Delivery Management, Delivery Governance, Continuous Improvements)** `ValueStreamManagementRoute.tsx`

```tsx
  export const ValueStreamManagementPages: Array<
  [string, ValueStreamManagementIndexes, ComponentType<any>]
> = [
  [
    'Delivery Governance',
    ValueStreamManagementIndexes.ValueStreamManagementDeliveryGovernance,
    ValueStreamManagementDeliveryGovernance,
  ],
  [
    'Delivery Management',
    ValueStreamManagementIndexes.ValueStreamManagementDeliveryManagement,
    ValueStreamManagementDeliveryManagement,
  ],
  [
    'Continuous Improvements',
    ValueStreamManagementIndexes.ValueStreamManagementContinuousImprovements,
    ValueStreamManagementContinuousImprovements,
  ],
];

const ValueStreamManagementRoute = () => (
  <Switch>
    {ValueStreamManagementPages.map(([, pageIndex, Component]) => (
      <Route
        exact
        key={pageIndex}
        path={getValueStreamManagementRoute(pageIndex)}
        component={Component}
      />
    ))}
  </Switch>
);
```

## IMPORTANT
*1.4* Exporting as default module the Root-Level Component `index.tsx`

```tsx
import ValueStreamManagement from './ValueStreamManagement.data';

export default ValueStreamManagement;
```

*1.5* Styles: ValueStreamManagement.styles.ts

styles used on the module created through Material UI

```tsx
import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

export const useGlobalStyles = makeStyles(() =>
  createStyles({
    dateRange: {
      top: '4px !important',
      left: 14,
    },
    wrapperFilter: {
      alignItems: 'flex-end',
    }
  })
);
```

### Caveats

*1:*  When starting a new module on the frontend you should reuse

between the internal perspectives. (Delivery Management, Delivery Governance, Continuous Improvements)

on the Root Level (ValueStreamManagement) component should have shared components such as:

(Navigationbar, ContextMenu, Filter Panel, InternalRouterModuleComponent).

*2:* Disabling the Loader on ContextMenu

If you wanna prevent your page to be affected by showing the LOADER indicator aside from the CONTEXT_MENU
you need on your `ModuleComponent.tsx` add this code on a hook `useEffect`.

```tsx
// Disable loading indicator on header by setting shared state to false
const [sharedState, setSharedState] = useSharedState('ANALYTICS_DASHBOARD_IS_LOADING');
useEffect(() => {
  if (sharedState) {
    setSharedState(false);
  }
}, [sharedState]);
```




