import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';

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
        backgroundColor: '#282c34',
        color: 'white',
        height: '100vh'
    },
    acDetails: {
        display: 'flex',
        flexDirection: 'column'
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
                    <AccordionDetails className={classes.acDetails}>
                        { node.children.map(t => TreeToAccordion(t)) }
                    </AccordionDetails>
                </Accordion>
            </Box>
        );
    } else if (node.kind === "leaf") {
        return (
            <Typography>{ node.label }</Typography>
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
