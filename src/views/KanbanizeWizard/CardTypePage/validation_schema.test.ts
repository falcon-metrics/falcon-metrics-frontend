import * as yup from 'yup';

// Import the validation schema
import { validationSchema } from './validation_schema';

// Helper function to validate data using the validation schema
const validateData = async (data: any) => {
    try {
        await validationSchema.validate(data, { abortEarly: false, });
        return { isValid: true };
    } catch (error: any) {
        return { isValid: false, errors: error.errors };
    }
};

describe('Validation Schema Tests', () => {
    it('should validate a valid data structure', async () => {
        const validData = {
            boards: {
                boardId1: {
                    boardId: 'boardId1',
                    boardName: 'Board 1',
                    cardTypes: {
                        cardTypeId1: {
                            cardTypeId: 'cardTypeId1',
                            cardTypeName: 'Card Type 1',
                            checked: true,
                            level: 'Team',
                            sle: 10,
                        },
                    },
                },
            },
        };
        const result = await validateData(validData);
        expect(result.isValid).toBe(true);
    });

    it('should fail validation with missing required fields', async () => {
        const invalidData = {
            boards: {
                boardId1: {
                    // Missing boardId
                    boardName: 'Board 1',
                    cardTypes: {
                        cardTypeId1: {
                            cardTypeId: 'cardTypeId1',
                            cardTypeName: 'Card Type 1',
                            checked: true,
                            level: 'a',
                            sle: 10,
                        },
                    },
                },
            },
        };
        const result = await validateData(invalidData);
        expect(result.isValid).toBe(false);
    });

    it('should fail validation when "checked" is true but "level" is missing', async () => {
        const invalidData = {
            boards: {
                boardId1: {
                    boardId: 'boardId1',
                    boardName: 'Board 1',
                    cardTypes: {
                        cardTypeId1: {
                            cardTypeId: 'cardTypeId1',
                            cardTypeName: 'Card Type 1',
                            checked: true,
                            // Missing "level"
                            sle: 10,
                        },
                    },
                },
            },
        };
        const result = await validateData(invalidData);
        expect(result.isValid).toBe(false);
    });

    it('should fail validation when "checked" is true but "level" is invalid', async () => {
        const invalidData = {
            boards: {
                boardId1: {
                    boardId: 'boardId1',
                    boardName: 'Board 1',
                    cardTypes: {
                        cardTypeId1: {
                            cardTypeId: 'cardTypeId1',
                            cardTypeName: 'Card Type 1',
                            checked: true,
                            sle: 10,
                            level: 'test-a  '
                        },
                    },
                },
            },
        };
        const result = await validateData(invalidData);
        expect(result.isValid).toBe(false);
    });

    it('should fail validation when "checked" is true but "sle" is not a number', async () => {
        const invalidData = {
            boards: {
                boardId1: {
                    boardId: 'boardId1',
                    boardName: 'Board 1',
                    cardTypes: {
                        cardTypeId1: {
                            cardTypeId: 'cardTypeId1',
                            cardTypeName: 'Card Type 1',
                            checked: true,
                            level: 'a',
                            sle: 'not-a-number', // Invalid "sle" value
                        },
                    },
                },
            },
        };
        const result = await validateData(invalidData);
        expect(result.isValid).toBe(false);
    });

    it('should fail validation when "checked" is true but "sle" is not greater than 0', async () => {
        const invalidData = {
            boards: {
                boardId1: {
                    boardId: 'boardId1',
                    boardName: 'Board 1',
                    cardTypes: {
                        cardTypeId1: {
                            cardTypeId: 'cardTypeId1',
                            cardTypeName: 'Card Type 1',
                            checked: true,
                            level: 'a',
                            sle: -10, // Invalid "sle" value (not greater than 0)
                        },
                    },
                },
            },
        };
        const result = await validateData(invalidData);
        expect(result.isValid).toBe(false);
    });


    it('should validate when "checked" is false and "level" and "sle" are not required', async () => {
        const validData = {
            boards: {
                boardId1: {
                    boardId: 'boardId1',
                    boardName: 'Board 1',
                    cardTypes: {
                        cardTypeId1: {
                            cardTypeId: 'cardTypeId1',
                            cardTypeName: 'Card Type 1',
                            checked: false, // Checked is false, level and sle are not required
                            sle: '1342',
                            level: 'asdfas'
                        },
                    },
                },
            },
        };
        const result = await validateData(validData);
        expect(result.isValid).toBe(true);
    });

    // Add more test cases as needed to cover other validation scenarios
});
