import React from 'react';
import { useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import AlignHorizontalLeftIcon from '@material-ui/icons/AlignHorizontalLeft';
import { State, Tree, Leaf, Node, StoreContext } from '../store/store';

type Props = { }

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
        color: 'white',
        '& .MuiAccordion-root': {
            backgroundColor: 'transparent',
            color: 'white',
            boxShadow: 'none',
        }
    },
    leaf: {
        display: 'flex',
        flexDirection: 'row',
        '& svg': {
            width: '20px',
            paddingRight: '2px',
            paddingLeft: '0.4em',
        }
    }
}));

const AccordionSummary = withStyles({
    root: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingLeft: 0,
        paddingRight: 0,
        minHeight: '1em',
        '& .MuiIconButton-root': {
            color: 'white',
            paddingTop: '0',
            paddingBottom: '0',
            paddingLeft: '2px',
            paddingRight: '2px',
            width: '35px',
        },
        '& .MuiAccordionSummary-content' :{
            marginTop: '0',
            marginBottom: '0',
            '& .MuiTypography-root': {
                textAlign: 'center',
            }
        },
    }
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '1.0em',
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderLeft: 'thin solid white',
        '& .MuiTypography-root': {
            textAlign: 'left',
        }
    }
})(MuiAccordionDetails);

const TreeToAccordion = (node: Tree) => {
    const classes = useStyles();
    if(node.kind === "node") {
        return (
            <Box className={ classes.root }>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>{ node.label }</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        { node.children.map(t => TreeToAccordion(t)) }
                    </AccordionDetails>
                </Accordion>
            </Box>
        );
    } else if (node.kind === "leaf") {
        return (
            <Box className={ classes.leaf }>
                <AlignHorizontalLeftIcon/>
                <Typography>{ node.label }</Typography>
            </Box>
        )
    } else {
        const _exhaustiveCheck: never = node;
    }
}

export const OutlineView: React.FC<Props> = props => {
    const store = useContext(StoreContext);
    const tree = store.state.scenario?.tree;
    if (tree === undefined) {
        return (<div>no data</div>);
    } else {
        return (<div>{ TreeToAccordion(tree) }</div>);
    }
}
