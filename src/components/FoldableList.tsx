import React, { useState } from 'react';
import { UnorderedList, ListItem } from 'carbon-components-react';
import { ChevronRight16, ChevronDown16 } from '@carbon/icons-react';

import './FoldableList.scss';

export type FoldableListProps = { }

export const FoldableList: React.FC<FoldableListProps> = props => {
    return (
        <UnorderedList className='foldable-list-root'>
            { props.children }
        </UnorderedList>
    );
}

export type FoldableListItemProps = {
    header: string,
}

export const FoldableListItem: React.FC<FoldableListItemProps> = props => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const click = () => { setIsOpen(!isOpen) };
    const wrapper = (element: React.ReactNode) => {
        return (<div className='fl-text'>{ element }</div>);
    };
    const body = <div className='fl-body'>{ React.Children.map(props.children, wrapper) }</div>;
    const cursor = isOpen?<ChevronDown16 />:<ChevronRight16 />;
    return (
        <ListItem className='fl-item'>
            <div className='fl-header' onClick={ click }>
                { cursor }{ props.header }
            </div>
            { isOpen?body:<div></div> }
        </ListItem>
    );
}