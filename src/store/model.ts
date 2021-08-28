import { Bug } from "../error/commonError"

export type Model = {
    scenario: Scenario,
    buffer: Buffer[],
    opened?: number,
}
  
export type Scenario = {
    fileName?: string,
    tree?: Tree
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

export type Buffer = {
    label: string,
    resourceId: string,
    contents: string,
    path: string[],
}

const emptyScenario : Scenario = {}

export const initialModel : Model = {
    buffer: [],
    scenario: emptyScenario,
}

// Utils

export const leaf: (id:string, label: string, contents: string) => Leaf
    = (id, label, contents) => ({
        kind: 'leaf', id, label, contents
    })

export const node: (id: string, label: string, contents: string, children: Tree[]) => Node
    = (id, label, contents, children) => ({
        kind:'node', id, label, contents, children
    })

export const flatten : (tree: Tree) => Tree[] = tree => {
    if (tree.kind === 'leaf') {
        return [tree]
    } else {
        const tail = tree.children.map(flatten).flat();
        const hd : Tree[] = [tree];
        return hd.concat(tail);
    }
}

export type TreePredicate = (t: Tree) => Boolean
export const treeFind : (pred: TreePredicate) => (tree: Tree) => [string[], Tree] | undefined = pred => tree => {
    const aux : (path:string[]) => (tree: Tree) => [string[], Tree] | undefined = path => tree => {
        if (pred(tree)) {
            return [path, tree]
        } else if (tree.kind === 'node') {
            const newPath = path.concat(tree.label);
            return tree.children.map(aux(newPath)).find(tree => tree !== undefined)
        }
    };
    return aux([])(tree);
}

export const createBuffer : (model: Model, resourceId: string) => Buffer = (model, resourceId) => {
    if (model.scenario.tree === undefined) {
        throw Bug('scenario is empty.');
    } else {
        const target = treeFind(item => item.id === resourceId)(model.scenario.tree);
        if (target === undefined) {
            throw Bug('resourceId does not exist.');
        } else {
            const [path, tree] = target;
            return {
                label: tree.label,
                resourceId: tree.id,
                contents: tree.contents,
                path: path
            };
        }
    }
}

export const stringOfModel = (model: Model) => {
    return `{buffer: [\n\t${model.buffer.map(stringOfBuffer).join(';\n\t')}],\nopened: ${model.opened}\nscenario: ${model.scenario}}`
}

export const stringOfBuffer = (buffer: Buffer) => {
    return `{label: ${buffer.label}, resourceId: ${buffer.resourceId}, contents: ${buffer.contents}, path: ${buffer.path}}`
}