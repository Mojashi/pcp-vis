import { useState, useMemo } from "react";
import { PCPInput } from "../app/comp/pcpinput";
import { PCP } from "../app/model/pcp";
import { useRouter } from "next/router";
import Head from "next/head";
import { PCPInputFromScala } from "@/app/comp/pcpinputFromScala";

export default function InitialPage() {
    const router = useRouter();
    const [pcp, setPCP] = useState<PCP>([{up:"1111", dn:"110"}, {up:"1110", dn:"1"}, {up:"1", dn:"1111"}])
    const alphabets: Set<string> = useMemo(() => new Set(pcp.flatMap(tile => tile.up + tile.dn).join("")), [pcp])
  
    function done(pcp: PCP) {
      router.push("/explore" + "?" + new URLSearchParams(
        pcp.map(tile => ["up", tile.up]).concat(pcp.map(tile => ["dn", tile.dn]))
        )
      )
    }
  
    return<div>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
      </Head>

      <h1>PCP Explorer</h1> 
      <p>入力形式1</p>
      <PCPInput onChange={setPCP} pcp={pcp}></PCPInput>
      <button onClick={()=>done(pcp)}>OK</button>
      <div style={{margin:"1em"}}></div>

      <p>入力形式2 (scalaの出力からコピペするならこっち)</p>
      <PCPInputFromScala onDone={(pcp) => {
        done(pcp)
      }}></PCPInputFromScala>
      alphabets: {alphabets}
    </div>
}
