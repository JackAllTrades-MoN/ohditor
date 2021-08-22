import React from 'react';
import { useContext } from 'react';
import { State, Tree, Leaf, Node, StoreContext } from '../store/store';
import { safeUnreachable } from '../error/developing';
import { FoldableList, FoldableListItem } from './FoldableList';

const TreeToFoldableList = (node: Tree) => {
    if(node.kind === "node") {
        return (
            <FoldableList>
                <FoldableListItem header={ node.label }>
                    { node.children.map(t => TreeToFoldableList(t)) }
                </FoldableListItem>
            </FoldableList>
        );
    } else if (node.kind === "leaf") {
        return (
            <div>
                { node.label }
            </div>
        )
    } else {
        safeUnreachable(node);
    }
}

type Props = { }

export const OutlineView: React.FC<Props> = props => {
    const store = useContext(StoreContext);
    const tree = store.state.scenario?.tree;
    if (tree === undefined) {
        return (<div>no data</div>);
    } else {
        return (<div>{ TreeToFoldableList(tree) }</div>);
    }
}
