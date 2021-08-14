import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { LineNumberedTextArea } from './LineNumberedTextArea';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '95vh',
            width: '100%',
            overflow: 'scroll',
            background: '#282c34',
        },
        textField: {
            width: '100%',
        },
        line: {
            color: 'white'
        },
    }));

type Props = { }

export const EditorMain: React.FC<Props> = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState<string>("default");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    return (
        <Box>
            <EditorHeader></EditorHeader>
            <LineNumberedTextArea />
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