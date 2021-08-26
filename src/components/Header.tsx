import React from 'react';
import { Header, HeaderName, HeaderPanel, HeaderMenuButton, Switcher, SwitcherItem } from 'carbon-components-react';

type Props = { }

export const OhHeader : React.FC<Props> = props => {
    return (
        <Header>
            <HeaderMenuButton
                aria-label="Open menu"
            />
            <HeaderName href="#" prefix="ohditor">
                file name
            </HeaderName>
            <HeaderPanel>
                <Switcher>
                    <SwitcherItem href="#">
                        foo
                    </SwitcherItem>
                </Switcher>
            </HeaderPanel>
        </Header>
    );
}