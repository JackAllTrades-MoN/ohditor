import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { LineNumberedTextArea } from './LineNumberedTextArea';
import { useContext } from 'react';
import { StoreContext } from '../store/store';

type Props = { }

export const EditorMain: React.FC<Props> = props => {
    const store = useContext(StoreContext);
    const updateTextArea = (e: React.ChangeEvent<HTMLInputElement>) => {
        store.dispatch({ type: 'EDITOR_UPDATE', value: e.target.value });
    }
    return (
        <Box>
            <EditorHeader></EditorHeader>
            <LineNumberedTextArea
                onChange={ updateTextArea } >
                { store.state.editorContent }
            </LineNumberedTextArea>
        </Box>
    );
}

type HeaderProps = { }

const EditorHeader: React.FC<HeaderProps> = props => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
                Hoge
            </Link>
            <Link>
                Fuga
            </Link>
        </Breadcrumbs>
    );
}