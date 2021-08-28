import React, { useReducer, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { OutlineView } from './components/OutlineView';
import { EditorMain } from './components/EditorMain';
//import { OhHeader } from './components/Header';
import { reducer, StoreContext } from './store/store';
import { initialModel, node, leaf } from './store/model';
import { Header, HeaderContainer, SideNav, SideNavItems, SkipToContent, HeaderMenuButton, HeaderName, HeaderNavigation, HeaderMenuItem } from 'carbon-components-react';

const dummyScenario = {
  fileName: 'Novel Title',
  tree: node('0', 'root', 'none', [
    leaf('1', 'meta-info', 'a'),
    node('2', 'prologue', 'none', [
      leaf('4', 'page1', 'b'),
      leaf('5', 'page2', 'c')
    ]),
    node('3', 'chapter 1', '', [
      leaf('6', 'page1', ''),
      leaf('7', 'page2', '')
    ])
  ])
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialModel);
  useEffect(() => { dispatch({ type: 'LOAD_SCENARIO', value: dummyScenario }); }, []);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand}) => (
            <Header aria-label="ohditor">
              <SkipToContent/>
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="#" prefix="ohditor">
                [filename]
              </HeaderName>
              <SideNav
                expanded={isSideNavExpanded}
                aria-label="Side navigation">
                  <OutlineView></OutlineView>
              </SideNav>
            </Header>
          )} />
        <main>
          <div>
            <div className="bx--grid">
              <div className="bx--row">
                <div className="bx--col bx--offset-lg-4">
                  <EditorMain></EditorMain>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
