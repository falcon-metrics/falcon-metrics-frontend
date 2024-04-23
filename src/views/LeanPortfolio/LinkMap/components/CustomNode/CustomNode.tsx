import { Box, Link, Typography } from '@material-ui/core';
import _ from 'lodash';
import { DragEvent, useState } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import styles from '../../styles.module.css';
import StrategicDriverIcon from '../../Icons/StrategicDriver';
import StrategyIcon from '../../Icons/Strategy';
import VisionIcon from '../../Icons/Vision';
import MissionIcon from '../../Icons/Mission';
import KeyResultIcon from '../../Icons/KeyResult';
import ObjectiveIcon from '../../Icons/Objective';
import MetricIcon from '../../Icons/Metric';
import InitiativeIcon from '../../Icons/Initiative';
import { NodeType } from '../../types/types';
import RelationshipsIcon from 'components/RelationshipForm/components/RelationshipsIcon/RelationshipsIcon';


const CustomNode = ({ data, sourcePosition, targetPosition, id }: NodeProps) => {
  // eslint-disable-next-line
  const [, setDropzoneActive] = useState<boolean>(false);

  const onDrop = () => {
    setDropzoneActive(false);
  };

  const onDragOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
  };

  const onDragEnter = () => {
    setDropzoneActive(true);
  };

  const onDragLeave = () => {
    setDropzoneActive(false);
  };

  const prettifyType = (s: string) => {
    try {
      const split = s.split('_');
      const capitalized = split.map(part => _.capitalize(part));
      return capitalized.join(' ');
    } catch (e) {
      return s;
    }
  };

  const { getEdges, setEdges } = useReactFlow();

  const onHover = (enter: boolean) => {
    const edges = getEdges();

    edges.forEach(e => {
      let strokeWidth = 1;
      if (enter && (e.source === id || e.target === id)) {
        strokeWidth = 3;
      }
      e.style = { ...e.style, strokeWidth };

    });

    setEdges([...edges]);
  };

  const getIconForNodeType = (nodeType: NodeType) => {
    let icon = <></>;
    switch (nodeType) {
      case NodeType.INITIATIVE: {
        icon = <InitiativeIcon fontSize={15} />;
        break;
      }
      case NodeType.KEY_RESULT: {
        icon = <KeyResultIcon fontSize={15} />;
        break;
      }
      case NodeType.VISION: {
        icon = <VisionIcon fontSize={15} />;
        break;
      }
      case NodeType.MISSION: {
        icon = <MissionIcon fontSize={15} />;
        break;
      }
      case NodeType.STRATEGY: {
        icon = <StrategyIcon fontSize={15} />;
        break;
      }
      case NodeType.STRATETIC_DRIVER: {
        icon = <StrategicDriverIcon fontSize={15} />;
        break;
      }
      case NodeType.OBEJECTIVE: {
        icon = <ObjectiveIcon fontSize={15} />;
        break;
      }
      case NodeType.METRIC: {
        icon = <MetricIcon fontSize={15} />;
        break;
      }
    }
    return icon;
  };

  const getColorForNodeType = (nodeType: NodeType) => {
    const vision = '#00b4ff';
    const mission = '#4cede4';
    const keyResult = '#ff58e4';
    const strategy = '#ff4713';
    const strategicDriver = '#004778';
    const objective = '#ff585d';
    const metric = '#69cecc';
    const initiative = '#ff9e1b';

    let color = 'white';
    switch (nodeType) {
      case NodeType.INITIATIVE: {
        color = initiative;
        break;
      }
      case NodeType.KEY_RESULT: {
        color = keyResult;
        break;
      }
      case NodeType.VISION: {
        color = vision;
        break;
      }
      case NodeType.MISSION: {
        color = mission;
        break;
      }
      case NodeType.STRATEGY: {
        color = strategy;
        break;
      }
      case NodeType.STRATETIC_DRIVER: {
        color = strategicDriver;
        break;
      }
      case NodeType.OBEJECTIVE: {
        color = objective;
        break;
      }
      case NodeType.METRIC: {
        color = metric;
        break;
      }
    }
    return color;
  };

  return (
    <Box
      // className={className}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        // borderRadius: '10px',
        minHeight: '50px',
        width: '250px',
        overflow: 'hidden',
        fontSize: '10px',
        borderWidth: '2px',
        borderColor: getColorForNodeType(data.nodeType) ?? 'black',
        borderStyle: 'solid',
        // border: `'3px solid ${data.color ?? 'black'}`,
        borderRadius: '15px',
        backgroundColor: 'white',
        textAlign: 'center',
        verticalAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        paddingLeft: '12px',
        paddingRight: '12px',
      }}
      title={prettifyType(data.nodeType)}
    >
      <Handle className={styles.handle} type="target" position={targetPosition || Position.Top} />
      <Handle className={styles.handle} type="source" position={sourcePosition || Position.Bottom} />
      <Box style={{ display: 'flex', flexDirection: 'row', marginTop: 10, marginBottom: 10, justifyContent: 'space-between' }}>
        <Box style={{ marginRight: 10 }}>
          {getIconForNodeType(data.nodeType)}
        </Box>
        <Box style={{ marginRight: 10, wordBreak: 'break-all' }}>
          <Link color={'textPrimary'} style={{ cursor: 'pointer' }}
            onClick={() => {
              data.onChangeFunc(data.entityId, data.nodeType, data.label);
            }}
          >
            {data.label}
          </Link>
        </Box>
        <Box style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', justifySelf: 'flex-end' }}>
          <RelationshipsIcon fontSize={10} />
          <Typography style={{ marginRight: 5, fontSize: 8 }}>
            {'(' + data.edgeCount + ')'}
          </Typography>
        </Box>
      </Box>
    </Box >
  );
};

export default CustomNode;
