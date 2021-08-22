import React, { useContext } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import { LineNumberedTextArea } from './LineNumberedTextArea';
import { Tree, StoreContext } from '../store/store';
import { safeUnreachable } from '../error/developing';
import './EditorMain.scss';

type Props = { }

export const EditorMain: React.FC<Props> = props => {
    const store = useContext(StoreContext);
    const updateTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        store.dispatch({ type: 'EDITOR_UPDATE', value: e.target.value });
    }
    return (
        <div className="bx--grid">
            <div className="bx--grid-row">
                <EditorHeader></EditorHeader>
            </div>
            <div className="bx--grid-row">
                <LineNumberedTextArea
                    onChange={ updateTextArea } >
                    { store.state.editorContent }
                </LineNumberedTextArea>
            </div>
        </div>
    );
}

type HeaderProps = { }

const EditorHeader: React.FC<HeaderProps> = props => {
    const store = useContext(StoreContext);
    const path = 
        pathTo(store.state.opened)(store.state.scenario?.tree) || [""];
    return (
        <Breadcrumb>
            { React.Children.map(path, name => <BreadcrumbItem>{name}</BreadcrumbItem>) }
        </Breadcrumb>
    );
}

const pathTo : (targetId?: string) => (node?: Tree) => string[] | undefined =
    targetId => node => {
        if (targetId === undefined || node === undefined) {
            return undefined;
        }
        if(node.kind === "node") {
            const followingPath =
                node.children
                    .map(pathTo(targetId))
                    .find(result => result !== undefined);
            return followingPath?.concat([node.label]);
        } else if (node.kind === "leaf") {
            if (node.id === targetId) {
                return [node.label]
            }
        } else {
            safeUnreachable(node);
        }
    }