import { makeStyles } from "@material-ui/core";

export const useAssumptionStyles = makeStyles(() => ({
    container:{
        display: 'flex',
        width: '70%',
        marginLeft: '1.5em',
        flexDirection: 'column'
    },
    assumptionContainer:{
        width: '100%',
        flexWrap: 'wrap',
        display:'flex',
        marginLeft: '1.2em',
        listStyleType: 'disc'
    },
    assumptionItem:{
        display: 'list-item',
        width: '45%',
        fontSize: '12px',
        marginBottom: '0.5em',
        marginRight: '5%',
    },
    heading: {
        width: '100%',
        fontSize: '14px',
        marginBottom: '0.75em',
        display:'flex',
        alignItems: 'center'
    }
    
}))