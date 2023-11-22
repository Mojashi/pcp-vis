import { useMemo, useState } from "react";
import { PCP, bfs, flattenTree } from "./model/pcp";
import { PCPTreeView } from "./comp/pcptree";
import {Sidebar, Table , Button, ListGroup} from "flowbite-react"

interface Props {
    pcp: PCP
}

export function _PCPExplore({pcp}: Props) {
    const [tree, setTree] = useState(bfs(pcp, 3))
    const configs = useMemo(() => flattenTree(tree), [tree])
    function expandNode(path: number[]) {
        setTree(tree => produce(tree, draft => {
            let node = draft
            for (const idx of path) {
                if(node.children === undefined) throw new Error("node is not present")
                const next = node.children[idx]
                if(next === undefined) throw new Error("node is not present")
                node = next
            }
            node.children = bfs(pcp, 1, node.config).children
        }))
    }

    const [collapsed, setCollapsed] = useState(true)
    return <div style={{width: '100vw', height: '100vh', display:"flex", flexDirection:"row"}}>
        <Sidebar collapseBehavior="hide" collapsed={collapsed}>
            <Table>
                <Table.Body className="divide-y text-gray-800">
                    <Table.Row className="bg-white divide-x">
                        {pcp.map((tile, idx) => <Table.Cell key={idx}>{tile.up}</Table.Cell>)}
                    </Table.Row>
                    <Table.Row className="bg-white divide-x">
                        {pcp.map((tile, idx) => <Table.Cell key={idx}>{tile.dn}</Table.Cell>)}
                    </Table.Row>
                </Table.Body>
            </Table>
            Upper
            <ListGroup style={{"display":"90vh"}}>
                {configs.filter(a => a.dir === "UP").map((a, idx) => 
                <ListGroup.Item key={idx}>{a.config}</ListGroup.Item>
                )}
            </ListGroup>
            Lower
            <ListGroup>
                {configs.filter(a => a.dir === "DN").map((a, idx) => 
                <ListGroup.Item key={idx}>{a.config}</ListGroup.Item>
                )}
            </ListGroup>
        </Sidebar>
        <div style={{width: '100vw', flexGrow:"1"}}>
            <Button className="absolute" onClick={()=>setCollapsed(b=>!b)}>{">"}</Button>
            <PCPTreeView pcpTree={tree} onClickNode={expandNode}></PCPTreeView>
        </div>
    </div>
}

import dynamic from "next/dynamic";
import { produce } from "immer";

export const PCPExplore = dynamic(
  () => import("./explore").then((module) => module._PCPExplore),
  { ssr: false }
);
