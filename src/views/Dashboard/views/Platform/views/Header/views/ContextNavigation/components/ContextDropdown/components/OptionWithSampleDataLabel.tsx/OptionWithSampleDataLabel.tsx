const OptionWithSampleDataLabel = (
  props: { text: string; data?: { isDemoData: boolean } } | undefined,
) => {
  if (!props) {
    return null;
  }
  const { text, data: { isDemoData } = {} } = props;
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <span>{text}</span>
      {isDemoData && (
        <span
          style={{
            position: 'absolute',
            right: -3,
            top: 0,
            color: 'red',
            border: '1px solid red',
            fontSize: 11,
            borderRadius: 4,
            padding: '0px 4px',
          }}
        >
          Sample
        </span>
      )}
    </div>
  );
};

export default OptionWithSampleDataLabel;
