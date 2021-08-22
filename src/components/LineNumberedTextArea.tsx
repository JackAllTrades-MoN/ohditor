import React from 'react';
import TextField from '@material-ui/core/TextField';
import { TextArea } from 'carbon-components-react';

import './LineNumberedTextArea.scss';

/*
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
);*/

type Props = { 
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export const LineNumberedTextArea: React.FC<Props> = props => {
    const [valueLineNumber, setValueLineNumber] = React.useState<string>("0");
    const [textAreaHeight, setTextAreaHeight] = React.useState<number>(3);
    const [textAreaWidth, setTextAreaWidth] = React.useState<number>(0);
    const onChange : React.ChangeEventHandler<HTMLTextAreaElement> = e => {
        const ln = countLineNumber(e.target.value) + 3;
        const lns = Array.from(Array(ln).keys()).map(n => n.toString());
        setValueLineNumber(lns.join('\n'));
        setTextAreaHeight(ln+3);
        props.onChange?.(e);
    }
    const countLineNumber = (text: string) => {
        return text.match(/(\r|\n)/g)?.length || 1;
    }
    return (
        <div className='bx--grid line-numbered-text-area-root'>
            <div className='bx--row line-numbered-text-area-row'>
                <div className='bx--col-sm-1 bx--col-md-1'>
                    <TextArea
                        labelText=""
                        value={ valueLineNumber }
                        style={{ height: textAreaHeight.toString() + "em", pointerEvents: "none" }}
                        className='line-number'>
                    </TextArea>
                </div>
                <div className='bx--col-sm-3 bx--col-md-7'>
                    <TextArea 
                        labelText=""
                        wrap="off"
                        value={ props.children?.toString() }
                        style={{height: textAreaHeight.toString() + "em"}}
                        onChange={ onChange }>
                    </TextArea>
                </div>
            </div>
        </div>
    );

}