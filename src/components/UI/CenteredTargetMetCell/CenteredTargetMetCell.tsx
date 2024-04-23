import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/styles";
import { CSSProperties, ReactNode } from "react";

const Cell = styled(Box)({
  width: "100%",
});

type Props = {
  value: ReactNode;
  formattedValue?: ReactNode;
  targetMetByProject?: any;
};

const CenteredTargetMetCell = ({ value, formattedValue = value, targetMetByProject }: Props) => {
  let targetColour = '#ccc';

  if (!targetMetByProject) {
    const targetMet = value;

    if (typeof targetMet === 'number') {
      switch (true) {
        case targetMet < 70:
          targetColour = '#E1523E';
          break;
        case targetMet >= 70 && targetMet <= 84:
          targetColour = '#F5B24B';
          break;
        case targetMet >= 85:
          targetColour = '#2AD2C9';
          break;
        default:
          break;
      }
    }

    const containerStyles: CSSProperties = {
      textAlign: 'center',
      display: 'flex',
      color: targetColour,
      fontWeight: 'bolder',
      justifyContent: 'center',
    };

    return (
      <Cell style={containerStyles}>
        {formattedValue ? (typeof formattedValue === 'number' ? Math.round(formattedValue) : formattedValue) : 0}%
      </Cell>
    );
  }

  const divs = targetMetByProject.map((targetMet, index) => {
    let targetColour = '#ccc';
    switch (true) {
      case targetMet < 70:
        targetColour = '#E1523E';
        break;
      case targetMet >= 70 && targetMet <= 84:
        targetColour = '#F5B24B';
        break;
      case targetMet >= 85:
        targetColour = '#2AD2C9';
        break;
      default:
        break;
    }

    const containerStyles: CSSProperties = {
      display: 'flex',
      color: targetColour,
      fontWeight: 'bolder',
      justifyContent: 'center',
      marginBottom: 10,
    };

    return (
      <div key={index} style={containerStyles}>
        {`${targetMet}%`}
      </div>
    );
  });

  return <Cell style={{ textAlign: 'initial' }}>{divs}</Cell>;
};

export default CenteredTargetMetCell;
