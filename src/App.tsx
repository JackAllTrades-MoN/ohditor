import React, { useReducer, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { OutlineView } from './components/OutlineView';
import { EditorMain } from './components/EditorMain';
//import { OhHeader } from './components/Header';
import { reducer, StoreContext } from './store/store';
import { initialModel, node, leaf } from './store/model';

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
        { /*  <OhHeader /> */ }
        <main>
          <div className="bx--grid bx--grid--full-width bx--grid--condensed">
            <div className="bx--row">
              <div className="bx--col-lg-1 bx--col-sm-1 bx--col-md-1">
                <OutlineView></OutlineView>
              </div>
              <div className="bx--col-lg-15 bx--col-sm-3 bx--col-md-7">
                <EditorMain></EditorMain>
              </div>
            </div>
          </div>
        </main>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
