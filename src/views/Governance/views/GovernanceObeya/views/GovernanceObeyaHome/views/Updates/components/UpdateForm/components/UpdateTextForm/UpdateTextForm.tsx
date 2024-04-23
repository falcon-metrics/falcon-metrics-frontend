import { ContainerCard, CustomTextEditor, NotesWrapperEditor, StyledAccordion, WrapperEditor, activeTextField, notesTextEditor } from "../../UpdateForm.styles";
import { AccordionDetails, AccordionSummary, Box, FormHelperText, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotesIcon from '@material-ui/icons/Notes';
import { useFormContext } from "react-hook-form";
const UPDATE_MAX_LENGTH = 280;
const NOTES_MAX_LENGTH = 100000;
type UpdateFormProps = {
    placeholder: string;
    activePlaceholder: string;
    setTextEditorRef: any;
    setNotesTextEditorRef: any;
    notesAdded: boolean;
};
const UpdateTextForm = (props: UpdateFormProps) => {

    const { getValues, setError, clearErrors, formState, setValue } = useFormContext();
    const { errors } = formState;
    const defaultDescription = getValues()?.updateText || '';
    const defaultNotesDescription = getValues()?.updateNotes || '';


    const onAfterChange = (payload, textLength) => {
        const value = payload === '<p><br></p>' ? '' : payload;
        // set error when maxLength and validation is enabled
        if (textLength > UPDATE_MAX_LENGTH) {
            setError('updateText', {
                type: 'maxLength',
                message: `The maximum length is ${UPDATE_MAX_LENGTH} characters`,
            });
        }
        // whe there is dirty and not value this should show validation
        if (!textLength && formState.isDirty) {
            setError('updateText', {
                type: 'required',
                message: 'The field is required',
            });
        }

        if (textLength < UPDATE_MAX_LENGTH) {
            clearErrors('updateText');

        };
        setValue('updateText', value, { shouldDirty: true });
    };

    const onAfterNotesTextChange = (payload, textLength) => {
        if (textLength > NOTES_MAX_LENGTH) {
            setError('updateNotes', {
                type: 'maxLength',
                message: `The maximum length is ${NOTES_MAX_LENGTH} characters`,
            });
        } else {
            clearErrors('updateNotes');
        }

        setValue('updateNotes', payload, { shouldDirty: true });
    };

    return (
        <>
            <ContainerCard>
                <WrapperEditor>
                    <CustomTextEditor
                        maxLength={UPDATE_MAX_LENGTH}
                        // Post your update. You’ve got 280 characters, so keep it concise. You can include more details with a note.
                        // "Extra notes or details"
                        placeholder={props.placeholder}
                        customStyles={{
                            ...activeTextField,
                            width: 763
                        }}
                        activePlaceholder={props.activePlaceholder}
                        setRef={props.setTextEditorRef}
                        shouldReset={!defaultDescription}
                        onAfterChange={onAfterChange}
                        defaultContent={defaultDescription}
                    />
                </WrapperEditor>
                <br />
                <FormHelperText style={{ color: '#f44336', fontSize: 12 }}>
                    {errors?.updateText && errors?.updateText?.type === 'required' && 'This field is required'}
                    {errors?.updateText && errors?.updateText?.type === 'maxLength' && `The maximum length is ${UPDATE_MAX_LENGTH} characters`}
                </FormHelperText>
            </ContainerCard>

            {
                props.notesAdded &&
                <Box style={{ marginTop: 20 }}>
                    <StyledAccordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <NotesIcon fontSize='small' />
                            <Typography style={{ marginLeft: 10, fontFamily: 'Open Sans', fontSize: 14 }}>Notes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ContainerCard>
                                <NotesWrapperEditor>
                                    <CustomTextEditor
                                        // High enough to not throw an error
                                        maxLength={100000}
                                        placeholder="Extra notes or details"
                                        activePlaceholder="Extra notes or details"
                                        customStyles={{
                                            ...activeTextField,
                                            ...notesTextEditor,
                                        }}
                                        setRef={props.setNotesTextEditorRef}
                                        shouldReset={!defaultNotesDescription}
                                        onAfterChange={onAfterNotesTextChange}
                                        defaultContent={defaultNotesDescription}
                                    />
                                </NotesWrapperEditor>
                                <br />
                                <FormHelperText style={{ color: '#f44336', fontSize: 12 }}>
                                    {errors?.updateNotes && errors?.updateNotes?.type === 'maxLength' && `The maximum length is ${NOTES_MAX_LENGTH} characters`}
                                </FormHelperText>
                            </ContainerCard>
                        </AccordionDetails>
                    </StyledAccordion>
                </Box>
            }
        </>
    );
};

export default UpdateTextForm;