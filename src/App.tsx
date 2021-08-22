import React from 'react';
import { useReducer, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import { OutlineView } from './components/OutlineView';
import { EditorMain } from './components/EditorMain';
import { reducer, initialState, StoreContext, leaf, node } from './store/store';

const dummyScenario = {
  fileName: 'Novel Title',
  tree: node('0', 'root', 'none', [
    leaf('1', 'meta-info', ''),
    node('2', 'prologue', 'none', [
      leaf('4', 'page1', ''),
      leaf('5', 'page2', '')
    ]),
    node('3', 'chapter 1', '', [
//      leaf('6', 'page1', ''),
//      leaf('7', 'page2', '')
    ])
  ])
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => { dispatch({ type: 'LOAD_SCENARIO', value: dummyScenario }); }, []);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <OutlineView></OutlineView>
          </Grid>
          <Grid item xs={9}>
            <EditorMain></EditorMain>
          </Grid>
        </Grid>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
