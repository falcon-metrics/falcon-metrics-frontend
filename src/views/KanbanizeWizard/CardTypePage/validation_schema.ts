/* eslint-disable @typescript-eslint/no-unused-vars */
import * as yup from 'yup';

export enum Level {
    TEAM = 'Team',
    PORTFOLIO = 'Portfolio',
    INDIVIDUAL_CONTRIBUTOR = 'Individual Contributor'
}
export const validationSchema = yup.object().shape({
    boards: yup.lazy((value) =>
        yup
            .object()
            .shape(
                Object.keys(value).reduce((acc, boardId) => {
                    acc[boardId] = yup.object().shape({
                        boardId: yup.string().required(),
                        boardName: yup.string().required(),
                        cardTypes: yup.lazy((value) =>
                            yup
                                .object()
                                .shape(
                                    Object.keys(value).reduce((acc, cardTypeId) => {
                                        acc[cardTypeId] = yup.object().shape({
                                            cardTypeId: yup.string().required(),
                                            cardTypeName: yup.string().required(),
                                            checked: yup.boolean().required(),
                                            level: yup.string().when('checked', {
                                                'is': (val: any) => val === true,
                                                'then': (schema) => schema.oneOf([Level.INDIVIDUAL_CONTRIBUTOR, Level.TEAM, Level.PORTFOLIO]).required(),
                                                'otherwise': schema => yup.mixed().nullable()

                                            }),
                                            sle: yup.number().when('checked', {
                                                'is': (val: any) => val === true,
                                                'then': (schema) => schema
                                                    .positive()
                                                    .required(),
                                                'otherwise': schema => yup.mixed().nullable()
                                            }),
                                        });
                                        return acc;
                                    }, {} as Record<any, any>)
                                )
                                .required()
                        ),
                    });
                    return acc;
                }, {} as Record<any, any>)
            )
            .required()
    ),
});