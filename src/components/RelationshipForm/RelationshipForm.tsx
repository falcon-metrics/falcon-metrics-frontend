import { Box, Button, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import SkeletonRelationships from "./components/SkeletonRelationships";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import _, { noop } from "lodash";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from 'uuid';
import { ElementSelector } from "./components/ElementSelector/ElementSelector";
import { DataGridPro, GridColumns } from "@mui/x-data-grid-pro";
import { eligibleEntityTypes, entityTypes, linkTypes, widgetOptions } from "./utils/constants";
import DeleteIcon from '@material-ui/icons/Delete';
import { RelationshipEntity } from "./interfaces/interfaces";
import fetch from 'core/api/fetch';
import { useConfirm } from "material-ui-confirm";
import CustomGridPanel from "components/UI/CustomGridPanel";

type RelationshipFormProps = {
    isLoading: boolean;
    elementType: string;
    elementName: string;
    elementId: string;
    currentRelationshipsData: RelationshipEntity[];
    setCurrentRelationshipsData: any;
    afterAddHook?: any;
};
type RelationshipFormFields = {
    elementType: string;
    element: string[];
    linkType: string;
};
const validatorSchema = yup.object().shape({
    elementType: yup.string().required('Entity type is required'),
    element: yup.array().min(1, "At least 1").required("Entity is required"),
    linkType: yup.string().required('Link type is required')
});
const getRelationshipTableColumns = (onRemoveRelationship): GridColumns => {
    return [
        {
            field: 'toType',
            headerName: 'Entity type',
            renderHeader: () => {
                return (
                    <strong>
                        Entity type
                    </strong>
                );
            },
            renderCell: (props: any) => {
                return (
                    <>
                        <span>{entityTypes.find(i => i.value === props.row.toType)?.label}</span>
                    </>
                );
            },
            flex: 1
        },
        {
            field: 'toId',
            headerName: 'Entity',
            renderHeader: () => {
                return (
                    <strong>
                        Entity
                    </strong>
                );
            },
            renderCell: (props: any) => {
                return (
                    <>
                        <span>{props.row.toName}</span>
                    </>
                );
            },
            flex: 1
        },
        {
            field: 'linkType',
            headerName: 'Link type',
            renderHeader: () => {
                return (
                    <strong>
                        Link type
                    </strong>
                );
            },
            renderCell: (props: any) => {
                return (
                    <>
                        <span>{linkTypes.find(i => i.value === props.row.linkType)?.label}</span>
                    </>
                );
            },
            flex: 1
        },
        {
            field: 'actions',
            headerName: 'Actions',
            renderHeader: () => (
                <b>
                    Actions
                </b>
            ),
            renderCell: (props: any) => {
                if (!props.row.isIndirect) {
                    return (
                        <Box display="flex">
                            <Box style={{ width: 30 }}>
                                <IconButton
                                    color="inherit"
                                    size="small"
                                    aria-label="Delete"
                                    onClick={() => {
                                        onRemoveRelationship(props?.row);
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    );
                } else {
                    return <></>;
                }
            },
            sortable: false,
            width: 90,
            headerAlign: 'center',
            filterable: false,
            align: 'center',
            disableColumnMenu: true,
            disableReorder: true,
        }
    ];
};
const defaultLinkType = linkTypes.find(x => x.value === 'linkedWith')?.value;

const RelationshipForm = (props: RelationshipFormProps) => {
    const resolver = yupResolver(validatorSchema);
    const [elementType, setElementType] = useState('');



    const formMethods = useForm<RelationshipFormFields>({
        resolver,
        defaultValues: {
            elementType: '',
            element: [],
            linkType: defaultLinkType
        },
    });
    const {
        handleSubmit, control, getValues, reset, setValue, clearErrors,
        formState: {
            errors
        },
    } = formMethods;

    const [, setSelectedElements] = useState([]);
    const [elementsData, setElementsData] = useState<any>([]);
    const [isLoadingElements, setIsLoadingElements] = useState<boolean>(false);

    useEffect(() => {
        if (elementType && elementType !== '' && !elementsData.map(i => i.elementType).includes(elementType) && elementType !== 'widget') {
            (async () => {
                setIsLoadingElements(true);
                const elements = await fetch('/relationships/elements', {
                    params: {
                        elementType
                    }
                });
                setIsLoadingElements(false);
                const newData = [{
                    elementType,
                    elements: elements.data
                }];
                setElementsData(elementsData.concat(newData));
            })();
        }
    }, [elementType]);
    const onSubmitForm = () => {
        const newRelationships = _.cloneDeep(props.currentRelationshipsData);
        getValues().element.forEach(i => {
            const newRelationship: RelationshipEntity = {
                id: uuidV4(),
                orgId: '',
                fromId: props.elementId.toString(),
                fromType: props.elementType,
                toId: i.toString(),
                toType: getValues().elementType,
                fromName: props.elementName || '',
                toName: elementType === 'widget' ? _.flattenDeep(widgetOptions).find(x => x.value === i)?.label : elementsData.find(x => x.elementType === getValues().elementType).elements.find(x => x.value === i).label,
                linkType: getValues().linkType
            };
            newRelationships.push(newRelationship);
        });
        props.setCurrentRelationshipsData(newRelationships);
        reset({
            element: [],
            elementType: '',
            linkType: defaultLinkType
        });
        clearErrors();
        if (props.afterAddHook) {
            props.afterAddHook(newRelationships);
        }
    };

    const confirm = useConfirm();
    const onRemoveRelationship = (row) => {
        confirm({
            title: "Are you sure you want to delete this relationship?",
            description: (
                <Typography>This relationship and all its data will be deleted</Typography>
            ),
            cancellationText: "Cancel",
            confirmationText: "Delete"
        }).then(() => {
            const relationshipCopy = _.cloneDeep(props.currentRelationshipsData);
            props.setCurrentRelationshipsData(relationshipCopy.filter(i => i.id !== row.id));
        }).catch(noop);
    };

    // IDs already in the table
    const entityIdsInTheTable = _
        .chain(props.currentRelationshipsData)
        .map(r => [r.toId, r.fromId])
        .flatten()
        .value();
    const elements = (elementsData.find(i => i.elementType === elementType)?.elements || []);
    // If the element is already in the table, dont show in the dropdown
    const elementOptions = elements
        .filter(e => !(entityIdsInTheTable.includes(e.value?.toString())));
    return (
        <>
            {props.isLoading ? <SkeletonRelationships /> :
                <Box>
                    <Box>
                        <Typography style={{ fontSize: 24, marginTop: 25 }}>{props.elementName}</Typography>
                    </Box>
                    <br />
                    <Box>
                        <form
                            onSubmit={handleSubmit(onSubmitForm, (errors) => console.log('Relationship form errors: ', errors))}
                        >
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id={"element-type-label"}>Entity type</InputLabel>
                                <Controller
                                    render={({ field }) => {
                                        return (<Select
                                            labelId={"element-type-label"}
                                            id={"element-type-label"}
                                            value={field.value}
                                            style={{ width: '50%' }}
                                            onChange={(event) => {
                                                setElementType(event.target.value as string || '');
                                                setSelectedElements([]);
                                                setValue("element", []);
                                                field.onChange(event);
                                            }}
                                        >
                                            {
                                                (eligibleEntityTypes.find(i => i.sourceEntityType === props.elementType)?.entityTypes || []).map(i => {
                                                    return <MenuItem value={i.value} key={i.value}>{i.label}</MenuItem>;
                                                })
                                            }
                                        </Select>);
                                    }}
                                    name="elementType"
                                    control={control}
                                />
                                <FormHelperText style={{ color: 'red' }}>
                                    {errors && errors?.elementType?.message}
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl variant="standard" fullWidth>
                                {
                                    (!isLoadingElements && elementOptions.length === 0)
                                        ? <InputLabel id={"selected-element-label"}>No Entities</InputLabel>
                                        : <InputLabel id={"selected-element-label"}>Entity</InputLabel>
                                }

                                <ElementSelector
                                    selectedElementType={
                                        (elementOptions.length === 0)
                                            // This disables the selector
                                            ? ''
                                            : getValues().elementType}
                                    elementOptions={elementOptions}
                                    selectedElement={getValues().element}
                                    handleSelectedElementChange={(event) => {
                                        setSelectedElements(event.target.value);
                                        setValue("element", event.target.value);
                                    }}
                                    isLoadingElements={isLoadingElements}
                                />
                                {isLoadingElements && <div>Loading....</div>}
                                <FormHelperText style={{ color: 'red' }}>
                                    {errors && (errors?.element as any)?.message}
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Box style={{ width: '50%', display: 'flex', justifyContent: 'end', marginTop: 15 }}>
                                <Button
                                    size="large"
                                    variant={props.afterAddHook ? "contained" : "outlined"}
                                    color="primary"
                                    type='submit'
                                >
                                    {props.afterAddHook ? 'Save' : 'Add to table'}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                    {!props.afterAddHook &&
                        <Box style={{ marginTop: 25, marginBottom: 35, height: 300 }}>
                            <DataGridPro
                                columns={getRelationshipTableColumns(onRemoveRelationship)}
                                rows={props.currentRelationshipsData}
                                components={{ Panel: CustomGridPanel }}
                                hideFooter
                            />
                        </Box>
                    }
                    <br />
                </Box>
            }
        </>
    );
};
export default RelationshipForm;