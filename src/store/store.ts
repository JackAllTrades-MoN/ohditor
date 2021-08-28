import React, { createContext } from 'react';
import { Bug } from '../error/commonError';
import { safeUnreachable } from '../error/developing';
import { Model, Scenario, createBuffer, stringOfModel } from './model';

export type State = Model

export type Action =
    | { type: 'LOAD_SCENARIO', value: Scenario }
    | { type: 'OPEN_RESOURCE', value: string }
    | { type: 'EDITOR_UPDATE', value: string }

export const reducer : (state: Model, action: Action) => State = (state, action) => {
    console.log(`state: ${stringOfModel(state)}`)
    switch(action.type) {
        case 'LOAD_SCENARIO':
            return { ...state, scenario: action.value };
        case 'OPEN_RESOURCE':
            console.log('OPEN_RESOURCE');
            const idx = state.buffer.findIndex(tab => tab.resourceId === action.value);
            if (idx !== -1) {
                console.log(`path ${state.buffer[idx].path}`);
                return { ...state, opened: idx };
            } else {
                const newBuffer = createBuffer(state, action.value);
                console.log(`new buffer path ${newBuffer.path}`);
                const updatedBuffer = state.buffer.concat(newBuffer);
                return { ...state, opened: updatedBuffer.length-1, buffer: updatedBuffer };
            }
        case 'EDITOR_UPDATE':
            console.log('EDITOR_UPDATE');
            if (state.opened === undefined) {
                throw Bug('editor is updated although no buffer is open.');
            } else {
                const buffer = state.buffer.slice();
                buffer[state.opened] = { ...buffer[state.opened], contents: action.value };
                return { ...state, buffer: buffer };
            }
        default:
            safeUnreachable(action);
            return state;
    }
}

export const StoreContext = createContext({} as {
    state: State,
    dispatch: React.Dispatch<Action>
  })

export type Store = {
    state: State,
    dispatch: React.Dispatch<Action>
}