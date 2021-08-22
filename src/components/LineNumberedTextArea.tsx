import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '95vh',
            width: '100%',
            overflow: 'scroll',
            background: '#282c34',
        },
        lineNumber: {
            width: '30px',
            userSelect: 'none',
        },
        textArea: {
            width: '100%',
        },
        line: {
            color: 'white',
        },
        lineNumberLine: {
            color: 'white',
            textAlign: 'right',
        }
    })
);

type Props = { 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const LineNumberedTextArea: React.FC<Props> = props => {
    const classes = useStyles();
    const [valueLineNumber, setValueLineNumber] = React.useState<string>("0");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeDefault(e);
        props.onChange?.(e);
    }
    const onChangeDefault = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ln = countLineNumber(e.target.value) + 3;
        const lns = Array.from(Array(ln).keys()).map(n => n.toString());
        setValueLineNumber(lns.join('\n'));
    };
    const countLineNumber = (text: string) => {
        return text.match(/(\r|\n)/g)?.length || 1;
    }

    return (
        <Box className={ classes.root }>
            <Grid container spacing={3}>
                <Grid item xs={1}>
                    <TextField
                        multiline
                        aria-readonly
                        className={ classes.lineNumber }
                        value={ valueLineNumber }
                        inputProps={{ className: classes.lineNumberLine }}
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        multiline
                        className={ classes.textArea }
                        value={ props.children }
                        onChange={ onChange }
                        inputProps={{ className: classes.line }}
                    />
                </Grid>
            </Grid>
        </Box>
    );

}