
export async function exec(cmd: string[]) {
    const proc = await Deno.run({
        cmd,
        stdout: "piped",
        stdin: "null"
    })

    let str = ""
    const decoder = new TextDecoder
    const buf = new Uint8Array(1024);
    const n = await proc.stdout.read(buf) as number
    str += decoder.decode(buf.subarray(0, n))

    return str
}
