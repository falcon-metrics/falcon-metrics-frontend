import styled from 'styled-components';
import { List, ListItem, Box, Typography } from '@material-ui/core';

const StyledLegendsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 16,
  marginRight: 16
});

const StyledList = styled(List)({
  display: 'flex',
  justifyContent: 'flex-start'
});


const StyledColumnList = styled(StyledList)({
  flexDirection: 'column'
});

const StyledListItem = styled(ListItem)({
  display: 'flex',
  alignItems: 'center',
  marginRight: 6,
});

const StyledBullet = styled.div(props => ({
  flexShrink: 0,
  width: 12,
  height: 12,
  marginRight: 6,
  backgroundColor: props.color
}));

const StyledText = styled(Typography)({
  fontFamily: 'Open Sans',
  fontSize: 12,
  color: '#707070',
  whiteSpace: 'nowrap'
});

const StyledLinkTypeBullet = styled.div(props => ({
  flexShrink: 0,
  width: 18,
  height: 4,
  marginRight: 6,
  backgroundColor: props.color
}));

const StyledFormHelperText = styled(Typography)({
  fontWeight: 600,
  fontFamily: 'Open Sans',
  fontSize: 12,
  marginLeft: 15,
  marginTop: 12
});

const legendData = {
  'is blocked by': '#50c0ef',
  'blocks': '#9e4fe3',
  'is dependent on': '#eeae7a',
  'is a dependency for': '#85e18a',
};

const Legends = () => {
  return (
    <StyledLegendsContainer>
      <StyledColumnList>
        {[
          // Follows gantt-chart defined palette for 'green', 'teal', 'cyan' respectively
          { color: "#85c988", text: "Actual commitment date (start) and departure date (end) of the work item" },
          { color: "#26a69a", text: "Calculated departure date by adding the 85th %ile lead time distribution or SLE to the commitment date" },
          { color: "#26c6da", text: "User-defined start and end date" }
        ].map((item, index) => (
          <StyledListItem key={index}>
            <StyledBullet color={item.color} />
            <StyledText>{item.text}</StyledText>
          </StyledListItem>
        ))}
      </StyledColumnList>

      <Box>
        <StyledFormHelperText>Dependencies:</StyledFormHelperText>
        <StyledList>
          {Object.entries(legendData).map(([linkType, color]) => (
            <StyledListItem key={linkType}>
              <StyledLinkTypeBullet color={color} />
              <StyledText>{linkType}</StyledText>
            </StyledListItem>
          ))}
        </StyledList>
      </Box>
    </StyledLegendsContainer>
  );
};

export default Legends;
