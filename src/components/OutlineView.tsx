import React from 'react';
import { useContext } from 'react';
import { Store, StoreContext } from '../store/store';
import { Tree } from '../store/model';
import { safeUnreachable } from '../error/developing';
import { FoldableList, FoldableListItem } from './FoldableList';
import './OutlineView.scss';
import { TextInput } from 'carbon-components-react';

const TreeToFoldableList = (store: Store) => (node: Tree) => {
    const openResource : React.MouseEventHandler<HTMLDivElement> = e => {
        store.dispatch({ type: "OPEN_RESOURCE", value: node.id });
    };
    if(node.kind === "node") {
        return (
            <FoldableList>
                <FoldableListItem header={ node.label }>
                    { node.children.map(t => TreeToFoldableList(store)(t)) }
                </FoldableListItem>
            </FoldableList>
        );
    } else if (node.kind === "leaf") {
        const className = (
            store.state.opened === undefined
            || store.state.buffer[store.state.opened].resourceId !== node.id)? "list-item" : "list-item list-item-selected";
        return (
            <div onClick={ openResource } className={ className }>
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
    const fileName = store.state.scenario.fileName ?? "<new scenario>";
    return (
        <div className='outline-view'>
            <TextInput
                id='scenario-input'
                labelText=''
                placeholder={ fileName }
            />
            { (tree !== undefined) ? TreeToFoldableList(store)(tree) : "" }
        </div>
    );
}
