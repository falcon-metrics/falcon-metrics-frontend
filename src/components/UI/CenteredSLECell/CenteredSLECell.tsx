import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/styles";
import { ReactNode } from "react";

const Cell = styled(Box)({
  width: "100%",
});

type Props = {
  value: ReactNode;
  formattedValue?: ReactNode;
  type?: string;
  serviceLevelExpectationInDaysByProject?: any;
};

const CenteredSLECell = ({ value, formattedValue = value, serviceLevelExpectationInDaysByProject }: Props) => {
  if (!serviceLevelExpectationInDaysByProject) {
    if (!value) {
      return null;
    }

    const timeUnit = value === 1 ? 'day' : 'days';

    return (
      <Cell
        style={{
          textAlign: 'center',
          fontFamily: 'Open Sans',
          fontSize: 14,
          color: '#605E5C',
        }}
      >
        {formattedValue !== 'null' ? formattedValue : ''} {timeUnit} or less
      </Cell>
    );
  }

  const divs = serviceLevelExpectationInDaysByProject.map((sle, index) => {
    const timeUnit = sle === 1 ? 'day' : 'days';
    return (
      <div style={{ marginBottom: 10 }} key={index}>
        {sle} {timeUnit} or less
      </div>
    );
  });

  return (
    <Cell
      style={{
        textAlign: 'center',
        fontFamily: 'Open Sans',
        fontSize: 14,
        color: '#605E5C',
      }}
    >
      {divs}
    </Cell>
  );
};


export default CenteredSLECell;
