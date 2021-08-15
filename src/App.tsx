import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { OutlineView } from './components/OutlineView';
import { EditorMain } from './components/EditorMain';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

/*
    <AppBar position="static">
      <Toolbar>
          <IconButton >
              <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
              Ohditor
          </Typography>
          </Toolbar>
      </AppBar>
*/

export default App;
