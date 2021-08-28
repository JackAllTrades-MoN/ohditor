export const Bug = (msg: string) => {
    return Error(`Critical error: ${msg} (This may be a bug. Please, contact to the author if you see this message.)`)
}