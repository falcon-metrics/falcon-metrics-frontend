enum NormalizationCategories {
  DEMAND = 'demand',
  QUALITY = 'quality',
  // CLASS_OF_SERVICE = 'class-of-service',
  // VALUE_AREA = 'value-area',
  // PLANNED_UNPLANNED = 'planned-unplanned',
  // REFUTABLE_IRREFUTABLE = 'refutable-irrefutable',
  // DELAYABLE_NONDELAYABLE = 'delayable-non-delayable',
}

export const fixedNormalizationCategoriesDisplayNameRecord = {
  [NormalizationCategories.DEMAND]: 'Demand',
  [NormalizationCategories.QUALITY]: 'Class of Value',
  // [NormalizationCategories.CLASS_OF_SERVICE]: 'Class of Service',
  // [NormalizationCategories.VALUE_AREA]: 'Value Area',
  // [NormalizationCategories.PLANNED_UNPLANNED]: 'Planned/Unplanned',
  // [NormalizationCategories.REFUTABLE_IRREFUTABLE]: 'Refutable/Irrefutable',
  // [NormalizationCategories.DELAYABLE_NONDELAYABLE]: 'Delayable/Non-Delayable',
};

export default NormalizationCategories;
