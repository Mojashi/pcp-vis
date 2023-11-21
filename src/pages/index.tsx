import { useState, useMemo } from "react";
import { PCPInput } from "../app/comp/pcpinput";
import { PCP } from "../app/model/pcp";
import { useRouter } from "next/router";
import Head from "next/head";
import RootLayout from "@/app/layout";

export default function InitialPage() {
    const router = useRouter();
    const [pcp, setPCP] = useState<PCP>([{up:"1111", dn:"110"}, {up:"1110", dn:"1"}, {up:"1", dn:"1111"}])
    const alphabets: Set<string> = useMemo(() => new Set(pcp.flatMap(tile => tile.up + tile.dn).join("")), [pcp])
  
    function done() {
      router.push("/explore" + "?" + new URLSearchParams(
        pcp.map(tile => ["up", tile.up]).concat(pcp.map(tile => ["dn", tile.dn]))
        )
      )
    }
  
    return<div>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
      </Head>

      <PCPInput onChange={setPCP} pcp={pcp}></PCPInput>
      alphabets: {alphabets}
      <button onClick={done}>OK</button>
    </div>
}
