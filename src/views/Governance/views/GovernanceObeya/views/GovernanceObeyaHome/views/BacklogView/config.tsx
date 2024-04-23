import { IColumn } from '@fluentui/react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BacklogCard from './BacklogCard';

const Divider = (
  <Box
    style={{
      position: 'absolute',
      width: 1,
      height: 134,
      top: -12,
      borderRight: '1px solid rgb(154 154 154)',
      right: 0,
    }}
  />
);

export const getColumns = (classes) => () => {
  const _columns: IColumn[] = [
    {
      headerClassName: classes.header,
      className: 'summary-table-text',
      key: 'column1',
      name: 'Teams',
      onRender: (item) => {
        return (
          <Box
            style={{ position: 'relative' }}
            justifyContent="center"
            alignItems="center"
            display="flex"
            height={80}
          >
            <Typography className={classes.team}>{item.column1}</Typography>
            {Divider}
          </Box>
        );
      },
      fieldName: 'column1',
      minWidth: 182,
      isSorted: true,
    },
    {
      headerClassName: classes.header,
      className: 'summary-table-text',
      key: 'column2',
      name: 'Sprint 21.1',
      fieldName: 'column2',
      onRender: () => {
        return (
          <Box display="flex" flexDirection="column">
            <Box display="inline-flex" mb={1} style={{ position: 'relative' }}>
              <BacklogCard
                type="feature"
                title="1301"
                description="Add button"
              />
              <Box display="inline-flex" mb={1} ml={1}>
                <BacklogCard type="bug" title="1304" description="Fix Layout" />
              </Box>
              {Divider}
            </Box>
          </Box>
        );
      },
      minWidth: 400,
    },
    {
      headerClassName: classes.header,
      className: 'summary-table-text',
      key: 'colum3',
      name: 'Sprint 21.2',
      fieldName: 'column3',
      onRender: () => {
        return (
          <Box display="flex" flexDirection="column">
            <Box display="inline-flex" style={{ position: 'relative' }}>
              <BacklogCard
                type="management"
                title="1422"
                description="Check release"
              />
              <Box display="inline-flex" mb={1} ml={1}>
                <BacklogCard
                  type="task"
                  title="1389"
                  description="Configure webpack"
                />
              </Box>
              {Divider}
            </Box>
          </Box>
        );
      },
      minWidth: 400,
    },
    {
      headerClassName: classes.header,
      className: 'summary-table-text',
      key: 'column4',
      name: 'Sprint 21.3',
      fieldName: 'column4',
      onRender: () => {
        return (
          <Box display="flex" flexDirection="column">
            <Box display="inline-flex" mb={1} style={{ position: 'relative' }}>
              <BacklogCard
                type="feature"
                title="1301"
                description="Add button"
              />
              <Box display="inline-flex" mb={1} ml={1}>
                <BacklogCard type="bug" title="1304" description="Fix Layout" />
              </Box>
              {Divider}
            </Box>
          </Box>
        );
      },
      minWidth: 400,
    },
    {
      headerClassName: classes.header,
      className: 'summary-table-text',
      key: 'column5',
      name: 'Sprint 21.4',
      fieldName: 'column5',
      onRender: () => {
        return (
          <Box display="flex" flexDirection="column">
            <Box display="inline-flex" mb={1}>
              <BacklogCard
                type="feature"
                title="1301"
                description="Add button"
              />
              <Box display="inline-flex" mb={1} ml={1}>
                <BacklogCard
                  type="feature"
                  title="1301"
                  description="Add button"
                />
              </Box>
            </Box>
          </Box>
        );
      },
      minWidth: 400,
    },
  ];
  return _columns;
};
