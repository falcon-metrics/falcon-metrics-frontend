import { DateTime } from 'luxon';
import { isNumber, isString, isBoolean } from 'views/ValueStreamManagement/utils/validation';

export const parseString = (value: unknown): string => {
  if (!value || !isString(value)) {
    return '';
  }

  return value;
}

export const parseNumber = (value: unknown): number => {
  if (!value || !isNumber(value)) {
    return 0;
  }

  return value;
};

export const parseTextProperty = (
  entry: object,
  propertyName: string
): string => {
  const textProperty: unknown = entry[propertyName];

  if (!textProperty || !isString(textProperty)) {
    return '';
  }

  return textProperty;
};

export const parseTextOrUndefinedProperty = (
  entry: object,
  propertyName: string
): string | undefined => {
  const textProperty: unknown = entry[propertyName];

  if (!textProperty || !isString(textProperty)) {
    return undefined;
  }

  return textProperty;
};

export const parseNumberProperty = (
  entry: object,
  propertyName: string
): number => {
  const numberProperty: unknown = entry[propertyName];

  if (!numberProperty || !isNumber(numberProperty)) {
    return 0;
  }

  return numberProperty;
};

export const parseNumberOrUndefinedProperty = (
  entry: object,
  propertyName: string
): number | undefined => {
  const numberProperty: unknown = entry[propertyName];

  if (!numberProperty || !isNumber(numberProperty)) {
    return undefined;
  }

  return numberProperty;
};

export const parseNumberOrNullProperty = (
  entry: object,
  propertyName: string
): number | null => {
  const numberProperty: unknown = entry[propertyName];

  if (numberProperty === null || !isNumber(numberProperty)) {
    return null;
  }

  return numberProperty;
};

export const parseBooleanProperty = (entry: object, propertyName: string): boolean | undefined => {
  const booleanProperty: unknown = entry[propertyName];

  if (booleanProperty === null || !isBoolean(booleanProperty)) {
    return undefined;
  }

  return booleanProperty;
}

export const parsePropertyToDate = (entry: object, propertyName: string): Date | undefined => {
  const dateString: unknown = entry[propertyName];
  if (!entry || !isString(dateString)) {
    return undefined;
  }

  return new Date(dateString);
}

export const parsePropertyToDateTime = (entry: object, propertyName: string): DateTime | undefined => {
  const dateString: unknown = entry[propertyName];
  if (!entry || !isString(dateString)) {
    return undefined;
  }

  return DateTime.fromISO(dateString).toLocal();
}
