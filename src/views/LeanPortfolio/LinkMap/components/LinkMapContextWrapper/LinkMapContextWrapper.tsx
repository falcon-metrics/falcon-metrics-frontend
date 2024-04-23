import { ReactFlowProvider } from 'reactflow';
import { ExampleProps } from '../../types/types';
import LinkMap from '../LinkMap';

const LinkMapContextWrapper = (props: ExampleProps) => {
    return (
        <ReactFlowProvider>
            <LinkMap {...props} />
        </ReactFlowProvider>
    );
};

export default LinkMapContextWrapper;