import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

const DividerList = styled(Divider)({
  width: 310,
  marginLeft: 14,
  marginTop: 6,
  color: '#fff',
  backgroundColor: '#fff',
  height: 1,
});

const WrapperList = styled(List)({
  width: 306,
  marginTop: 12
});

const RelationCard = styled(Box)({
  width: 340,
  marginTop: 20,
  paddingTop: 20,
  color: '#f0f0f1',
  marginRight: 20,
  fontSize: 20,
  height: 300,
  boxShadow: '0px 2px 11px 0px #dcdcdc',
  backgroundColor: '#041c2c',
});

const RelationCardTitle = styled(Box)({
  fontSize: 18,
  paddingLeft: 12,
  paddingRigth: 12,
  fontWeight: 'bold',
  fontFamily: 'Open Sans',
  color: '#f0f0f1',
});

const RelationLink = styled(Link)({
  fontSize: 14,
  fontFamily: 'Open Sans',
  paddingLeft: 8,
});

const RelationCardListItem = styled(ListItem)({
  fontSize: 14,
  fontFamily: 'Open Sans',
  paddingTop: 10,
  paddingLeft: 10,
  marginLeft: 16,
  marginRight: 16,
  paddingBottom: 9,
  background: '#ffffff',
  borderBottom: '1px solid #eeeeee'
});

type RelationListProps = {
  cardTitle: string;
};

export const RelationshipList = ({
  cardTitle,
}: RelationListProps) => {
  return (
    <RelationCard>
      <RelationCardTitle>
        {cardTitle}
      </RelationCardTitle>
      <DividerList />
      {/* <DividerList /> */}
      <WrapperList>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <RelationCardListItem key={value} role={undefined} dense button>
              {/* <ListItemIcon>
                <AdjustIcon style={{ color: '#ccc' }} />
              </ListItemIcon> */}
              <RelationLink id={labelId}>{`Line item test ${value + 1}`}</RelationLink>
            </RelationCardListItem>
          );
        })}
      </WrapperList>
    </RelationCard>
  );
};
