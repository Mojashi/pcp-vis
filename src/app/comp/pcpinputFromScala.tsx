
import { useRef } from "react";
import { PCP } from "../model/pcp";
import { produce } from "immer"

interface Props {
    onDone: (pcp: PCP) => void
}

// PCP(Vector(Tile(1111,101), Tile(1101,1), Tile(1,1111))) format
export function PCPInputFromScala({onDone}: Props) {
    const ref = useRef<HTMLInputElement>(null)
    return <div style={{"display":"flex"}}>
        <input type="text" ref={ref} style={{width:"30em"}} defaultValue="PCP(Vector(Tile(1111,101), Tile(1101,1), Tile(1,1111)))" placeholder="PCP(Vector(Tile(1111,101), Tile(1101,1), Tile(1,1111)))"/>
        <button onClick={()=>{
            const s = ref.current!.value;
            const r = /Tile\((\d+),(\d+)\)/g
            const pcp = Array.from(s.matchAll(r)).map(m => {
                console.log(m)
                return {up: m[1], dn: m[2]}
            })
            onDone(pcp)
        }}>OK</button>
    </div>
}
