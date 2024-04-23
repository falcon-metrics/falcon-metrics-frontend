import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    Background,
    Controls,
    Edge,
    MiniMap,
    Node,
    NodeMouseHandler,
    NodeOrigin,
    NodeTypes,
    ProOptions,
    useEdgesState,
    useNodesState,
    useReactFlow,
    Panel,
    NodeProps
} from 'reactflow';
import {
    forceSimulation,
    forceLink,
    forceManyBody,
    forceX,
    forceY,
    SimulationNodeDatum,
    SimulationLinkDatum,
} from 'd3-force';
import 'reactflow/dist/style.css';
import { Box, Button, Divider, Grid, Typography } from '@material-ui/core';
import CustomNode from '../CustomNode';
import NodeTypeSelector from '../NodeTypeSelector';
import { Skeleton } from '@material-ui/lab';
import Footer from 'views/Dashboard/views/Platform/views/Footer';
import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import { findContextById, getAllContextIdsUnderContext } from 'views/BusinessScorecard/utils/utils';
import useDashboardContexts from 'views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts';
import _ from 'lodash';
import { saveLinkMapData, useLinkMapData } from '../../hooks/useLinkMapData';
import { ExampleProps } from '../../types/types';
const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };

type SimNodeType = SimulationNodeDatum & Node;

const nodeOrigin: NodeOrigin = [0.5, 0.5];

const defaultEdgeOptions = { style: { strokeWidth: 3 } };

const nodeTypes: NodeTypes = {
    custom: (props: NodeProps) => <CustomNode {...props} />
};

const LinkMap = ({ setEntityId, setEntityName, setEntityType, setShowPreviewModal, showChildren }: ExampleProps = {}) => {
    const { getEdges, getNodes } = useReactFlow();

    const {
        otherApiQueryParameters: { contextId },
    } = useFilterPanelContext();
    const { contexts } = useDashboardContexts();

    const onClickLinkName = (entityId: string, entityType: string, entityName: string) => {
        setEntityId(entityId);
        setEntityName(entityName);
        setEntityType(entityType);
        setShowPreviewModal(true);
    };

    const [selectedNodeTypes, setSelectedNodeTypes] = useState<string[] | undefined>(['metric',
        'strategyKeyResult', 'vision', 'mission', 'obeyaRoom', 'strategicObjective', 'strategicDriver', 'strategy']);
    const [rfInstance, setRfInstance] = useState<any>(null);
    const { nodes: nodes2, edges: edges2, isValidating, savedLayout } = useLinkMapData(onClickLinkName);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const arrangeNodes = (nodes: any = undefined, edges: any = undefined, onChangeFunc: any = undefined) => {

        const simulationNodes: SimNodeType[] = nodes.map((node) => ({
            ...node,
            x: node.position.x,
            y: node.position.y,
        }));

        const simulationLinks: SimulationLinkDatum<SimNodeType>[] = edges.map((edge) => edge);

        const simulation = forceSimulation()
            .nodes(simulationNodes)
            .force('charge', forceManyBody().strength(-5000))
            .force(
                'link',
                forceLink(simulationLinks)
                    .id((d: any) => d.id)
                    .strength(0.5)
                    .distance(4)
            )
            .force('x', forceX().x(0).strength(0.08))
            .force('y', forceY().y(0).strength(0.08))
            .tick(1000)
            .stop();

        let savedNodes: any = [], savedNodeIds: any = [];
        if (savedLayout) {
            console.log("Saved layout found");
            savedNodeIds = savedLayout.nodes.map(i => i.id);
            savedNodes = savedLayout.nodes;
        }

        setNodes(
            simulationNodes.map((node) => {
                if (savedNodeIds.includes(node.id)) {
                    const matchingNode = savedNodes.find(i => i.id === node.id);
                    return {
                        id: matchingNode.id,
                        data: { ...matchingNode.data, onChangeFunc: onChangeFunc },
                        position: { x: (matchingNode.position.x ?? 0), y: (matchingNode.position.y ?? 0) },
                        className: matchingNode.className,
                        type: 'custom',
                        hidden: node.hidden
                    };
                }
                return {
                    id: node.id,
                    data: { ...node.data, onChangeFunc: onChangeFunc },
                    position: { x: (node.x ?? 0), y: (node.y ?? 0) },
                    className: node.className,
                    type: 'custom',
                    hidden: node.hidden
                };
            })
        );
        return () => {
            simulation.stop();
        };
    };

    const filterByContext = (nodesParams: any, edgesParams: any) => {
        const contextEntity = findContextById(contextId || '', contexts || []);
        let eligibleContextIds: string[] = [];
        if (contextEntity) {
            //Handle top level all context
            if ((contextEntity.displayName === 'All' && (!contextEntity.children || (contextEntity.children && contextEntity.children.length === 0))) ||
                (contexts?.length === 1 && contextEntity.id === contexts[0].id && showChildren)) {
                eligibleContextIds = ['All'];
            } else {
                if (showChildren) {
                    eligibleContextIds = _.uniq(getAllContextIdsUnderContext(contextEntity, []));
                } else {
                    if (contextId) {
                        eligibleContextIds = [contextId];
                    }
                }
            }
            const nodes = nodesParams, edges = edgesParams;
            let filteredNodes = nodes;
            if (!(eligibleContextIds.length === 1 && eligibleContextIds[0] === 'All')) {
                filteredNodes = nodes
                    .filter(n => eligibleContextIds.includes(n.data.contextId));
            }
            const idSet = new Set(filteredNodes.map(n => n.id));
            nodes.forEach(n => {
                n.hidden = false;
                if (
                    eligibleContextIds.length > 0 && !idSet.has(n.id)) {
                    n.hidden = true;
                }
            });
            edges
                .forEach(e => {
                    e.hidden = false;
                    if (
                        eligibleContextIds.length > 0 && !(idSet.has(e.source) && idSet.has(e.target))) {
                        e.hidden = true;
                    }
                });
            setNodes([...nodes]);
            console.log(edges.map(e => e.hidden));
            setEdges([...edges]);
            setTimeout(() => {
                arrangeNodes(nodes, edges, onClickLinkName);
            }, 2000);
        }
    };

    useEffect(() => {
        console.log("Setting nodes");
        filterByContext(nodes2, edges2);
    }, [JSON.stringify(([nodes2, edges2]))]);

    useEffect(() => {
        if (selectedNodeTypes !== undefined) {
            const nodes = getNodes();
            const edges = getEdges();
            const filteredNodes = nodes
                .filter(n => selectedNodeTypes.includes(n.data.nodeType));
            const idSet = new Set(filteredNodes.map(n => n.id));
            nodes.forEach(n => {
                n.hidden = false;
                if (
                    selectedNodeTypes.length > 0 && !idSet.has(n.id)) {
                    n.hidden = true;
                }
            });
            edges
                .forEach(e => {
                    e.hidden = false;
                    if (
                        selectedNodeTypes.length > 0 && !(idSet.has(e.source) && idSet.has(e.target))) {
                        e.hidden = true;
                    }
                });
            setNodes([...nodes]);
            setEdges([...edges]);
        }
    }, [selectedNodeTypes, setNodes, setEdges, getNodes, getEdges]);


    useEffect(() => {
        console.log("In use effect");
        filterByContext(nodes2, edges2);
    }, [contextId, showChildren]);

    const getVisibleEdges = (nodes: Node[], edges: Edge[]) => {
        const visibleNodesIdSet = new Set(
            nodes
                .filter(n => n.hidden === false)
                .map(n => n.id)
        );
        const visibleEdgesSet = new Set(edges
            .filter(
                ({ source, target }) => visibleNodesIdSet.has(source) && visibleNodesIdSet.has(target)
            )
            .map(e => e.id));
        return visibleEdgesSet;
    };

    const onNodeClick: NodeMouseHandler = useCallback(
        (_evt, clickedNode) => {
            const collapsed = Boolean(clickedNode.data.collapsed);
            const edges = getEdges();
            const nodes = getNodes();
            const visible = nodes.filter(n => n.hidden === false);
            // Set current node as collapsed/expanded
            const thisNode = nodes.filter(n => n.id === clickedNode.id)[0] as Node;
            thisNode.hidden = false;
            const neighboursIdSet = edges
                .filter(e => e.source === clickedNode.id || e.target === clickedNode.id)
                .reduce((accum, current) => {
                    if (current.source !== thisNode.id) accum.add(current.source);
                    if (current.target !== thisNode.id) accum.add(current.target);
                    return accum;
                }, new Set<string>());
            const neighbours = nodes.filter(n => neighboursIdSet.has(n.id));
            // If this is node doesnt have any more edges than the ones already expanded, dont do anything
            // if (neighbours.filter(n => n.data.clicked !== true).length > 0) {
            // }
            if (nodes.filter(n => n.data.clicked).length === 0) {
                nodes
                    .filter(n => n.id !== thisNode.id)
                    .forEach(n => {
                        n.hidden = true;
                        n.data = { ...n.data, collapsed: true };
                    });
                thisNode.data = { ...thisNode.data, collapsed: true };
            } else if (neighbours.filter(n => n.data.collapsed === true).length === 0) return;

            else if (collapsed) {
                // Do expand
                thisNode.data = { ...thisNode.data, collapsed: false };
                neighbours
                    .forEach(n => n.hidden = false);
            } else if (!collapsed) {
                // Do collapse
                const nodesToHide = visible
                    .filter(n => neighboursIdSet.has(n.id))
                    .filter(n => n.data.collapsed === true);
                thisNode.data = { ...thisNode.data, collapsed: true };
                nodesToHide.forEach(n => n.hidden = true);
            }

            const visibleEdgeSet = getVisibleEdges(nodes, edges);
            edges.forEach(e => {
                e.hidden = true;
                if (visibleEdgeSet.has(e.id)) e.hidden = false;
            });

            thisNode.data = { ...thisNode.data, clicked: true };

            setNodes([...nodes]);
            setEdges([...edges]);
        },
        [nodes.length, setNodes, setEdges, getEdges, getNodes]
    );

    const expandButtonDisabled = nodes.filter(n => n.hidden).length === 0;
    const onExpandClick = () => {
        nodes.forEach(n => {
            n.hidden = false;
            n.data = { ...n.data, collapsed: false, clicked: undefined };
        });
        edges.forEach(e => { e.hidden = false; });
        setNodes([...nodes]);
        setEdges([...edges]);
    };



    const onSave = useCallback(async () => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            setIsSaving(true);
            await saveLinkMapData(flow);
            setIsSaving(false);
        }
    }, [rfInstance]);

    const noData = nodes2.length === 0;

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >

                <Box marginLeft={'20px'} marginTop={'20px'}>
                    <NodeTypeSelector onChange={(value) => setSelectedNodeTypes(value)} value={selectedNodeTypes} />
                </Box>
                <Button
                    variant="contained"
                    color='primary'
                    disabled={expandButtonDisabled}
                    style={{ marginLeft: '75px', marginTop: '65px' }}
                    size="small"
                    onClick={() => {
                        onExpandClick();
                        setSelectedNodeTypes(['metric',
                            'strategyKeyResult', 'vision', 'mission', 'obeyaRoom', 'strategicObjective', 'strategicDriver', 'strategy']);
                    }}
                >
                    Expand All
                </Button>
                <Box
                    style={{ marginLeft: '20px', marginTop: '65px', display: 'flex' }}
                >
                    <Box>
                        <Button size='small' color='primary' variant="contained" onClick={onSave}>save map</Button>
                        {isSaving && <Typography>Saving...</Typography>}
                    </Box>
                </Box>
            </Grid>
            <Divider style={{ marginTop: '20px' }}></Divider>
            {
                isValidating
                    ? (
                        <>
                            <Skeleton height={400} />
                        </>
                    )
                    : noData
                        ? (
                            <>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Typography variant="h5" gutterBottom style={{ paddingTop: '100px' }}>
                                        No Data
                                    </Typography>
                                    <Typography variant='body1'>
                                        Create links to see the links on a map here
                                    </Typography>

                                </Grid>
                            </>
                        )
                        : (
                            <>
                                <ReactFlow
                                    nodes={nodes}
                                    edges={edges}
                                    onNodesChange={onNodesChange}
                                    onEdgesChange={onEdgesChange}
                                    proOptions={proOptions}
                                    nodeOrigin={nodeOrigin}
                                    onNodeDoubleClick={onNodeClick}
                                    defaultEdgeOptions={defaultEdgeOptions}
                                    defaultViewport={{ x: window.innerWidth / 2, y: window.innerHeight / 2, zoom: 1 }}
                                    nodeTypes={nodeTypes}
                                    minZoom={0.1}
                                    maxZoom={5}
                                    onInit={setRfInstance}
                                >
                                    <Background />
                                    <MiniMap />
                                    <Controls />
                                    <Panel position="top-right">
                                    </Panel>
                                </ReactFlow>
                            </>
                        )
            }
            <Footer />
        </>
    );
};

export default LinkMap;
