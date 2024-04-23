import FQLInput from 'components/FQLInput';
import { Submit } from 'core/api/withData';
import { formatISO } from 'date-fns';
import {
  Controller,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import WizardFormProvider
  from 'views/SetupWizard/components/WizardFormProvider';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';

import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import {
  FetchedData,
  TransformedData,
} from './interfaces/BaseData';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Checkbox, ListItemText } from '@material-ui/core';
import { useSeedData } from 'views/SetupWizard/utils/utils';
import { DEFAULT_DATE_FORMAT } from 'utils/dateTime';

export type Props = TransformedData & Submit<FetchedData>;

function SettingsForm({
  initialDate,
  excludeExpression,
  blockersExpression,
  discardedExpression,
  alsoIncludeChildrenExclude,
  onlyIncludeChildrenExclude,
  alsoIncludeChildrenBlockers,
  onlyIncludeChildrenBlockers,
  alsoIncludeChildrenDiscarded,
  onlyIncludeChildrenDiscarded,
  submit,
  blockedReasonFieldId,
  discardedReasonFieldId,
  desiredDeliveryDateFieldId,
  customFieldsDb,
  classOfServiceFieldId
}: Props) {
  const methods = useForm({
    defaultValues: {
      initialDate,
      excludeExpression,
      blockersExpression,
      discardedExpression,
      alsoIncludeChildrenExclude,
      onlyIncludeChildrenExclude,
      alsoIncludeChildrenBlockers,
      onlyIncludeChildrenBlockers,
      alsoIncludeChildrenDiscarded,
      onlyIncludeChildrenDiscarded,
      blockedReasonFieldId,
      discardedReasonFieldId,
      desiredDeliveryDateFieldId,
      classOfServiceFieldId
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;
  const { namespace, provider } = useWizardContext();
  const onValid: SubmitHandler<TransformedData> = (data) => {
    const initialDateISO = formatISO(data.initialDate);
    const payload = { ...data, initialDate: initialDateISO };
    if (typeof payload.desiredDeliveryDateFieldId !== 'string') {
      payload.desiredDeliveryDateFieldId = (payload.desiredDeliveryDateFieldId as string[]).join(',');
    }
    return submit(payload);
  };

  useSeedData();

  return (
    <Grid item xs={12}>
      <WizardFormProvider
        hookFormMethods={methods}
        autoComplete="off"
        onSubmit={handleSubmit(onValid, () => Promise.reject())}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <InputLabel>Exclude items completed before: *</InputLabel>
            <Controller
              name="initialDate"
              rules={{
                required: 'Date for exclusion is required',
              }}
              render={({ field: { onChange, value } }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    value={value}
                    onChange={onChange}
                    fullWidth
                    disableFuture
                    required
                    format={DEFAULT_DATE_FORMAT}
                    variant="inline"
                    views={['year', 'month', 'date']}
                    defaultValue={value}
                    name="excludeDate"
                  />
                </MuiPickersUtilsProvider>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>
              Exclude items that meet the following filter expression:
            </InputLabel>
            <FQLInput
              fieldNameInForm="excludeExpression"
              namespace={namespace}
              provider={provider}
              defaultValue={excludeExpression}
              defaultValueForAlsoIncludeChildren={alsoIncludeChildrenExclude}
              defaultValueForOnlyIncludeChildren={onlyIncludeChildrenExclude}
              fieldNameForAlsoIncludeChildren="alsoIncludeChildrenExclude"
              fieldNameForOnlyIncludeChildren="onlyIncludeChildrenExclude"
              checkboxVerb="exclude"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>
              Blocked items that meet the following filter expression:
            </InputLabel>
            <FQLInput
              fieldNameInForm="blockersExpression"
              namespace={namespace}
              provider={provider}
              defaultValue={blockersExpression}
              defaultValueForAlsoIncludeChildren={alsoIncludeChildrenBlockers}
              defaultValueForOnlyIncludeChildren={onlyIncludeChildrenBlockers}
              fieldNameForAlsoIncludeChildren="alsoIncludeChildrenBlockers"
              fieldNameForOnlyIncludeChildren="onlyIncludeChildrenBlockers"
              checkboxVerb="block"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Select field to use for blocked reason</InputLabel>
            <br />
            <Grid item xs={6}>
              <Controller
                name="blockedReasonFieldId"
                render={({ field: { onChange, value } }) => (
                  <Select
                    fullWidth
                    name="display"
                    margin="dense"
                    value={value}
                    onChange={onChange}
                  >
                    {customFieldsDb.map(field => <MenuItem dense key={field.datasourceFieldName} value={field.datasourceFieldName}>
                      {field.displayName}
                    </MenuItem>)}
                  </Select>
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>
              Discarded items that meet the following filter expression:
            </InputLabel>
            <FQLInput
              fieldNameInForm="discardedExpression"
              namespace={namespace}
              provider={provider}
              defaultValue={discardedExpression}
              defaultValueForAlsoIncludeChildren={alsoIncludeChildrenDiscarded}
              defaultValueForOnlyIncludeChildren={onlyIncludeChildrenDiscarded}
              fieldNameForAlsoIncludeChildren="alsoIncludeChildrenDiscarded"
              fieldNameForOnlyIncludeChildren="onlyIncludeChildrenDiscarded"
              checkboxVerb="discard"
            />
            <br />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Select field to use for discarded reason</InputLabel>
            <br />
            <Grid item xs={6}>
              <Controller
                name="discardedReasonFieldId"
                render={({ field: { onChange, value } }) => (
                  <Select
                    fullWidth
                    name="display"
                    margin="dense"
                    value={value}
                    onChange={onChange}
                  >
                    {customFieldsDb.map(field => <MenuItem dense key={field.datasourceFieldName} value={field.datasourceFieldName}>
                      {field.displayName}
                    </MenuItem>)}
                  </Select>
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Select field to use for desired delivery date</InputLabel>
            <br />
            <Grid item xs={6}>
              <Controller
                name="desiredDeliveryDateFieldId"
                render={({ field: { onChange, value } }) => (
                  <Select
                    fullWidth
                    name="display"
                    margin="dense"
                    value={typeof value === 'string' ? value.split(',') : value}
                    onChange={(e) => {
                      console.log(e.target.value);
                      onChange(e.target.value);
                    }}
                    multiple
                    renderValue={(selected: any) => {
                      return customFieldsDb.filter(i => selected.includes(i.datasourceFieldName)).map(i => i.displayName).join(', ');
                    }
                    }
                  >
                    {customFieldsDb.map(field => <MenuItem dense key={field.datasourceFieldName} value={field.datasourceFieldName}>
                      <Checkbox checked={value.includes(field.datasourceFieldName)} />
                      <ListItemText primary={field.displayName} />
                    </MenuItem>)}
                  </Select>
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Select field to use for class of service classification</InputLabel>
            <br />
            <Grid item xs={6}>
              <Controller
                name="classOfServiceFieldId"
                render={({ field: { onChange, value } }) => (
                  <Select
                    fullWidth
                    name="display"
                    margin="dense"
                    value={value}
                    onChange={onChange}
                  >
                    {customFieldsDb.map(field => <MenuItem dense key={field.datasourceFieldName} value={field.datasourceFieldName}>
                      {field.displayName}
                    </MenuItem>)}
                  </Select>
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </WizardFormProvider>
    </Grid>
  );
}

export default SettingsForm;
