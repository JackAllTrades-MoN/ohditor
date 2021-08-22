export const safeUnreachable = (_x: never) => {
    throw new Error("unreachable");
};