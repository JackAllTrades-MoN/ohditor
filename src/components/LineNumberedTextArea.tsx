import React from 'react';
import { TextArea } from 'carbon-components-react';

import './LineNumberedTextArea.scss';

type Props = { 
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export const LineNumberedTextArea: React.FC<Props> = props => {
    const [valueLineNumber, setValueLineNumber] = React.useState<string>("0");
    const [textAreaHeight, setTextAreaHeight] = React.useState<number>(50);
    const onChange : React.ChangeEventHandler<HTMLTextAreaElement> = e => {
        const ln = countLineNumber(e.target.value) + 1;
        const lns = Array.from(Array(ln).keys()).map(n => n.toString());
        setValueLineNumber(lns.join('\n'));
        setTextAreaHeight(e.target.scrollHeight);
        props.onChange?.(e);
    }
    const countLineNumber = (text: string) => {
        return text.match(/(\r|\n)/g)?.length || 1;
    }
    return (
        <div className='bx--grid line-numbered-text-area-root'>
            <div className='bx--row line-numbered-text-area-row'>
                <div className='bx--col bx--col-sm-1 bx--col-md-1'>
                    <TextArea
                        labelText=""
                        value={ valueLineNumber }
                        style={{ height: textAreaHeight.toString() + "px", pointerEvents: "none" }}
                        className='line-number'>
                    </TextArea>
                </div>
                <div className='bx--col bx--col-sm-3 bx--col-md-7'>
                    <TextArea 
                        labelText=""
                        wrap="off"
                        value={ props.children?.toString() }
                        style={{ height: textAreaHeight.toString() + "px" }}
                        onChange={ onChange }>
                    </TextArea>
                </div>
            </div>
        </div>
    );

}