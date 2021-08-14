import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { OutlineView } from './components/OutlineView';
import { EditorMain } from './components/EditorMain';

function App() {
  return (
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
  );
}

export default App;
