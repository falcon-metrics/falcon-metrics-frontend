import fetch, { useCustomSWR } from "core/api/fetch";
import { Edge, Node } from "reactflow";
import { LinkType } from "../types/types";
import { v4 as uuid } from 'uuid';

const buildNode = (id: string, nodeTypeStr: string, name: string, contextId: string,
    onChangeFunc: (entityId: string, entityType: string, entityName: string) => void, edgeCount: number): Node => {
    return {
        id,
        position: { x: 0, y: 0 },
        data: {
            label: name,
            nodeType: nodeTypeStr,
            entityId: id,
            contextId: contextId,
            onChangeFunc: onChangeFunc,
            edgeCount: edgeCount
        },
        type: 'custom'
    };
};

const getLinkType = (linkTypeStr: string): { type: LinkType | undefined, label: string | undefined; } => {
    let type: LinkType | undefined, label = '';
    switch (linkTypeStr) {
        case 'dependentOn': {
            type = LinkType.DEPENDENT_ON;
            label = 'Depends On';
            break;
        }
    }
    return { type, label };
};

export const useLinkMapData = (onChangeFunc = (_entityId: string, _entityType: string, _entityName: string) => { console.log("here"); }) => {
    const { data: response, isValidating: swrIsValidating, error: swrError } = useCustomSWR('/link-map',
        (url) => fetch.get(url)
    );
    const error = swrError, isValidating = swrIsValidating, nodes: Node[] = [], edges: Edge[] = [];
    let data;
    let savedLayout;
    if (response) {
        const edgesInResponse = (response as any).data?.links ?? [];
        edgesInResponse.forEach(e => {
            const { label, type } = getLinkType(e.linkType);
            edges.push({
                id: e.id,
                source: e.fromId,
                target: e.toId,
                data: {
                    label,
                    type
                },
                label,
                labelStyle: {
                    fontSize: 10
                },
                labelShowBg: false,
            });
        });

        const nodesInResponse = (response as any).data?.nodes ?? [];
        nodesInResponse.forEach(n => {
            const edgeCount = edges.filter(edge => edge.source === n.id || edge.target === n.id).length;
            nodes.push(buildNode(n.id, n.type, n.name, n.contextId, onChangeFunc, edgeCount));
        });

        savedLayout = (response as any).data?.linkMapLayout ?? undefined;
    };
    if (savedLayout) {
        savedLayout = JSON.parse(savedLayout);
    }
    return {
        data, isValidating, error, nodes, edges, uuid: uuid(), savedLayout
    };
};

export const saveLinkMapData = async (flow: any) => {
    const result = await fetch.post('/link-map', flow);
    return result;
};