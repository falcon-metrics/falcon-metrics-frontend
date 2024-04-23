import Typography from '@material-ui/core/Typography';
import { Dependency } from './interfaces/Dependency';

type Props = {
  dependencies: Dependency[];
  entityDisplayName: string;
};

function CantDeleteWarning({ dependencies, entityDisplayName }: Props) {
  return (
    <>
      <Typography variant="subtitle1">
        Before you can delete these {entityDisplayName}, you need to first
        delete the following dependencies:
      </Typography>
      <table width="100%">
        <thead>
          <tr>
            <th>Work Item Type</th>
            <th>FQL Filters</th>
            <th>Obeya Rooms</th>
          </tr>
        </thead>
        <tbody>
          {dependencies.map((dependency, i) => (
            <tr key={i}>
              <td>{dependency?.workItemType}</td>
              <td>{dependency.fqlFilters.join(', ')}</td>
              <td>{dependency.obeyaRooms.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CantDeleteWarning;
