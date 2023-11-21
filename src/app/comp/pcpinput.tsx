
import { PCP } from "../model/pcp";
import { produce } from "immer"

interface Props {
    onChange: (pcp: PCP) => void
    pcp: PCP
}

export function PCPInput({onChange, pcp}: Props) {
    return <div style={{"display":"flex"}}>
        {pcp.map((tile, idx) => <div key={idx}>
            <input style={{"display":"block"}} type="text" value={tile.up} onChange={(ev)=>{
                onChange(produce(pcp, draft => {
                    draft[idx].up = ev.target.value
                }))
            }}/>
            <input style={{"display":"block"}} type="text" value={tile.dn} onChange={(ev)=>{
                onChange(produce(pcp, draft => {
                    draft[idx].dn = ev.target.value
                }))
            }}/>
        </div>)}
        <button onClick={()=>onChange(pcp.slice(0, -1))}>-</button>
        <button onClick={()=>onChange(pcp.concat([{up:"", dn:""}]))}>+</button>
    </div>
}
