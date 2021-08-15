import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import AlignHorizontalLeftIcon from '@material-ui/icons/AlignHorizontalLeft';

type Props = { }

type Tree = Leaf | Node

type Leaf = {
    kind: "leaf",
    label: string
}

type Node = {
    kind: "node",
    label: string,
    children: Tree[]
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
        color: 'white',
//        height: '100vh',
        '& .MuiAccordion-root': {
            backgroundColor: 'transparent',
            color: 'white',
            boxShadow: 'none',
            '& .MuiAccordionSummary-root': {
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
            },
            '& .MuiAccordionDetails-root': {
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
            },
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

const leaf: (label: string) => Leaf = label => ({
    kind: "leaf",
    label: label
});

const node: (label: string, children: Tree[]) => Node = (label, children) => ({
    kind: "node",
    label: label,
    children: children
});

const dummyData: Tree =
    node("title",
    [
        leaf("summary"),
        node("chapter1", [
            leaf("page1"),
            leaf("page2")
        ]),
        node("chapter2", [
            leaf("page1"),
            leaf("page2")
        ])
    ]);

export const OutlineView: React.FC<Props> = props => {
    return (
        <div>
            { TreeToAccordion(dummyData) }
        </div>
    );
}
