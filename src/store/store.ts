import React, { createContext } from 'react';

export type State = {
    scenario?: Scenario,
    listed: string[],
    opened?: string,
    editorContent: string,
}
  
export type Scenario = {
    fileName: string,
    tree: Tree
}
  
export type Tree = Node | Leaf
  
export type Leaf = {
    kind: 'leaf'
    id: string,
    label: string,
    contents: string,
}

export type Node = {
    kind: 'node',
    id: string,
    label: string,
    contents: string,
    children: Tree[]
}

export const initialState : State = {
    listed: [], 
    editorContent: "",
}

export type Action =
    | { type: 'EDITOR_UPDATE', value: string }
    | { type: 'LOAD_SCENARIO', value: Scenario }

export const reducer : (state: State, action: Action) => State = (state, action) => {
    switch(action.type) {
        case 'EDITOR_UPDATE':
            return { ...state, editorContent: action.value };
        case 'LOAD_SCENARIO':
            return { ...state, scenario: action.value };
        default:
            return state;
    }
}

export const StoreContext = createContext({} as {
    state: State,
    dispatch: React.Dispatch<Action>
  })

export const leaf: (id:string, label: string, contents: string) => Leaf
    = (id, label, contents) => ({
        kind: 'leaf', id, label, contents
    })

export const node: (id: string, label: string, contents: string, children: Tree[]) => Node
    = (id, label, contents, children) => ({
        kind:'node', id, label, contents, children
    })