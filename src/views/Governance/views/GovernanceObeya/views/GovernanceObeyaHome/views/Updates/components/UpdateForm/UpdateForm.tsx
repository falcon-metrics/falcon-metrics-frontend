import { Box } from "@material-ui/core";
import { CustomMenuItem, CustomMenuItemTitle, CustomSelect, TitleWrapperSelect, WrapperObjectives, WrapperObjectivesDropdwon, WrapperSelect, useStyles } from "./UpdateForm.styles";
import { useEffect, useMemo, useState } from "react";
import InitiativeForm from "./components/InitiativeForm/InitiativeForm";
import GeneralForm from "./components/GeneralForm/GeneralForm";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";
import { useObeyaGoals } from "views/Governance/views/GovernanceObeya/hooks/useObeyaGoals";
import ObjectiveForm from "./components/ObjectiveForm/ObjectiveForm";
import { OKRKeyResult, OKRObjective } from "views/Governance/views/GovernanceObeya/utils";
import { RiskItem } from "../../../Risk/types";
import { DependencyItem } from "views/Governance/views/GovernanceObeya/hooks/useObeya";
import KeyResultForm from "./components/KeyResultForm/KeyResultForm";
import RiskForm from "./components/RiskForm/RiskForm";
import DependencyForm from "./components/DependencyForm/DependencyForm";
import { Skeleton } from "@material-ui/lab";
import { DateTime } from "luxon";
import useAuthentication from "hooks/useAuthentication";

type UpdateCardProps = {
    placeholder?: string;
    activePlaceholder?: string;
    customStyle?: any;
    defaultUpdateType?: string;
};

const updateTypeList = [
    { label: 'General', value: 'general' },
    { label: 'Initiative', value: 'initiative' },
    { label: 'Objective', value: 'objective' },
    { label: 'Key Result', value: 'key result' },
    { label: 'Risk', value: 'risk' },
    { label: 'Dependency', value: 'dependency' },
];
const dummyRisk: RiskItem = {
    riskId: '',
    name: '',
    description: '',
    riskExposureAmount: 0,
    riskExposureDays: 0,
    status: ''
};
const dummyDependency: DependencyItem = {
    blockedName: '',
    blockerName: '',
    severity: '',
    name: "",
    summary: "",
    dateOfImpact: "",
    status: ""
};
const UpdateForm = (props: UpdateCardProps) => {
    const classes = useStyles();
    const { isAdminOrPowerUser } = useAuthentication();
    const [updateType, setUpdateType] = useState<string>(props.defaultUpdateType || 'general');
    const [elementId, setElementId] = useState<string>();
    const { activeObeyaRoomId, data: obeyaData } = useObeyaRoom();

    const {
        data: objectives,
    } = useObeyaGoals(activeObeyaRoomId);

    const { activeRoom, isLoadingObeyaData } = useObeyaRoom();

    type ElementType = {
        id: string;
        label: string;
        values: OKRObjective[] | OKRKeyResult[] | RiskItem[] | DependencyItem[];
    };

    const elements: Record<string, ElementType> = useMemo(() => {
        const keyResults = (objectives || []).reduce((acc: OKRKeyResult[], o) => {
            if (o.keyResults?.length) {
                o.keyResults.forEach(x => {
                    x.objectiveId = o.objectiveId;
                    acc.push(x);
                });
            }
            return acc;
        }, []);
        return {
            objective: {
                id: 'objectiveId',
                label: 'objectiveDescription',
                values: objectives
            },
            'key result': {
                id: 'keyResultId',
                label: 'keyResultDescription',
                values: keyResults
            },
            risk: {
                id: 'riskId',
                label: 'description',
                values: obeyaData.risks
            },
            dependency: {
                id: 'dependencyId',
                label: 'name',
                values: obeyaData.dependencies
            }
        };
    }, [obeyaData.risks, obeyaData.dependencies, objectives]);

    useEffect(() => {
        setElementId('');
    }, [updateType]);
    useEffect(() => {
        console.log("Mounted");
    }, []);
    return (
        <Box
            className={classes.wrapperCard}
            style={{
                ...props.customStyle,
            }}
        >
            <WrapperSelect>
                <TitleWrapperSelect>Update Type</TitleWrapperSelect>
                <CustomSelect
                    label="Update Type"
                    value={updateType}
                    onChange={(event) => setUpdateType(event.target.value as string)}
                    fullWidth
                    name="updateType"
                    placeholder="Select a Type"
                    inputProps={{ style: { fontFamily: 'Open Sans' } }}
                    defaultValue={props.defaultUpdateType || 'general'}
                    readOnly={props.defaultUpdateType !== undefined}
                    disabled={props.defaultUpdateType !== undefined || !isAdminOrPowerUser}
                >
                    {updateTypeList.map((elementOption) => {
                        return (
                            <CustomMenuItem dense key={elementOption.label} value={elementOption.value}>
                                <CustomMenuItemTitle>{elementOption.label}</CustomMenuItemTitle>
                            </CustomMenuItem>
                        );
                    })}
                </CustomSelect>
            </WrapperSelect>
            {
                ['objective', 'key result', 'risk', 'dependency'].includes(updateType) &&
                <WrapperObjectives>
                    <WrapperObjectivesDropdwon>
                        <TitleWrapperSelect>{updateTypeList.find(x => x.value === updateType)?.label}</TitleWrapperSelect>
                        <CustomSelect
                            label={updateTypeList.find(x => x.value === updateType)?.label}
                            value={elementId}
                            inputProps={{ style: { fontFamily: 'Open Sans' } }}
                            onChange={(event) => {
                                setElementId(event.target.value as string);
                            }}
                            disabled={elements[updateType].values && elements[updateType].values.length <= 0}
                        >
                            {elements[updateType].values.map((element) => {
                                return (
                                    <CustomMenuItem dense key={element[elements[updateType].id]} value={element[elements[updateType].id]}>
                                        <CustomMenuItemTitle>{element[elements[updateType].label]}</CustomMenuItemTitle>
                                    </CustomMenuItem>
                                );
                            })}
                        </CustomSelect>
                    </WrapperObjectivesDropdwon>
                </WrapperObjectives>
            }
            {
                updateType === 'initiative' && (
                    isLoadingObeyaData ?
                        <Skeleton variant="rect" height={300}></Skeleton>
                        :
                        <InitiativeForm
                            defaultDate={activeRoom.endDate ? DateTime.fromISO(activeRoom.endDate).toJSDate() : undefined}
                            defaultStatus={activeRoom.ratingId}
                            placeholder={props.placeholder || ''}
                            activePlaceholder={props.activePlaceholder || ''} />
                )
            }
            {
                updateType === 'general' &&
                <GeneralForm
                    placeholder={props.placeholder || ''}
                    activePlaceholder={props.activePlaceholder || ''}
                />
            }
            {
                updateType === 'objective' && elementId &&
                <ObjectiveForm
                    placeholder={props.placeholder || ''}
                    activePlaceholder={props.activePlaceholder || ''}
                    defaultRatingId={(elements[updateType].values as OKRObjective[]).find(x => x.objectiveId === elementId)?.ratingId || ''}
                    defaultAchieved={(elements[updateType].values as OKRObjective[]).find(x => x.objectiveId === elementId)?.achieved || false}
                    objective={(elements[updateType].values as OKRObjective[]).find(x => x.objectiveId === elementId)}
                />
            }
            {
                updateType === 'key result' && elementId &&
                <KeyResultForm
                    placeholder={props.placeholder || ''}
                    activePlaceholder={props.activePlaceholder || ''}
                    keyResult={(elements[updateType].values as OKRKeyResult[]).find(x => x.keyResultId === elementId) || {}}
                    defaultRatingId={(elements[updateType].values as OKRKeyResult[]).find(x => x.keyResultId === elementId)?.ratingId || ''}
                    defaultAchieved={(elements[updateType].values as OKRKeyResult[]).find(x => x.keyResultId === elementId)?.completed || false}
                    objective={(elements['objective'].values as OKRObjective[]).find(x =>
                        x.objectiveId === (elements[updateType].values as OKRKeyResult[]).find(x => x.keyResultId === elementId)?.objectiveId)}
                />
            }
            {
                updateType === 'risk' && elementId &&
                <RiskForm
                    placeholder={props.placeholder || ''}
                    activePlaceholder={props.activePlaceholder || ''}
                    risk={(elements[updateType].values as RiskItem[]).find(x => x.riskId === elementId) || dummyRisk}
                    defaultLikelihood={(elements[updateType].values as RiskItem[]).find(x => x.riskId === elementId)?.likelihood || 0}
                    defaultImpactOnCost={(elements[updateType].values as RiskItem[]).find(x => x.riskId === elementId)?.impactOnCost || 0}
                    defaultImpactOnSchedule={(elements[updateType].values as RiskItem[]).find(x => x.riskId === elementId)?.impactOnSchedule || 0}
                    defaultStatus={(elements[updateType].values as RiskItem[]).find(x => x.riskId === elementId)?.status || ''}
                />
            }
            {
                updateType === 'dependency' && elementId &&
                <DependencyForm
                    placeholder={props.placeholder || ''}
                    activePlaceholder={props.activePlaceholder || ''}
                    dependency={(elements[updateType].values as DependencyItem[]).find(x => x.dependencyId === elementId) || dummyDependency}
                    defaultDateOfImpact={DateTime.fromISO((elements[updateType].values as DependencyItem[]).find(x => x.dependencyId === elementId)?.dateOfImpact || DateTime.now().toISO()).toJSDate()}
                    defaultSeverity={(elements[updateType].values as DependencyItem[]).find(x => x.dependencyId === elementId)?.severity || ''}
                    defaultStatus={(elements[updateType].values as DependencyItem[]).find(x => x.dependencyId === elementId)?.status || ''}
                />
            }
        </Box>

    );
};

export default UpdateForm;