import React, { useContext } from 'react';
import { Breadcrumb, BreadcrumbItem, Tabs, Tab } from 'carbon-components-react';
import { LineNumberedTextArea } from './LineNumberedTextArea';
import { StoreContext } from '../store/store';
import { Buffer, stringOfModel, Tree } from '../store/model';
import { safeUnreachable } from '../error/developing';
import './EditorMain.scss';

type Props = { }

export const EditorMain: React.FC<Props> = props => {
    const store = useContext(StoreContext);
    const updateTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        store.dispatch({ type: 'EDITOR_UPDATE', value: e.target.value });
    };
    const openResource : (buffer: Buffer) => React.MouseEventHandler<HTMLLIElement> = buffer => e => {
        store.dispatch({ type: 'OPEN_RESOURCE', value: buffer.resourceId });
    };
    const tabOfBuffer = (buffer: Buffer) => {
        console.log("rendered buffer");
        return (
            <Tab
                id={`tab-${ buffer.resourceId }`}
                label={buffer.label}
                onClick={ openResource(buffer) } >
                <div className={`bx--grid editor-main-root tab-content-${buffer.label}`}>
                    <div className="bx--grid-row">
                        <EditorHeader buffer={ buffer }></EditorHeader>
                    </div>
                    <div className="bx--grid-row">
                        <LineNumberedTextArea
                            className="editor-main-line-numbered-textarea"
                            onChange={ updateTextArea } >
                            { buffer.contents }
                        </LineNumberedTextArea>
                    </div>
                </div>
            </Tab>);
    }
    console.log(`render editor main, state: ${stringOfModel(store.state)}`);
    return (
        <div>
        <Tabs>
            { store.state.buffer.map(tabOfBuffer) }
        </Tabs>
        </div>
    );
}

type HeaderProps = { buffer: Buffer }

const EditorHeader: React.FC<HeaderProps> = props => {
    const path = props.buffer.path;
    return (
        <Breadcrumb className="editor-header">
            { React.Children.map(path.reverse(), name => <BreadcrumbItem>{name}</BreadcrumbItem>) }
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