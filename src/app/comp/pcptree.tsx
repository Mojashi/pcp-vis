import { Tree } from "react-d3-tree";
import { PCPTree } from "@/app/model/pcp"


interface D3Tree {
    name: string
    attributes: {
        path: number[],
        dir: "UP" | "DN",
        expanded: boolean
    }
    children: D3Tree[]
}
const EmptyD3Tree: D3Tree = {
    name: "EMPTY",
    attributes: {
        path: [],
        dir: "UP",
        expanded: false
    },
    children: []
}
function convToD3Tree(pcpTree: PCPTree, path: number[] = []): D3Tree {
    return {
        name: pcpTree.config.config,
        attributes: {
            dir: pcpTree.config.dir,
            expanded: pcpTree.children !== undefined,
            path: path,
        },
        children: pcpTree.children?.map((a, idx) => {
            if (a) return convToD3Tree(a, path.concat(idx))
            else return EmptyD3Tree
        })?.filter(a => a) ?? []
    }
}

interface Props {
    pcpTree: PCPTree
    onClickNode: (path: number[]) => void
}
export function PCPTreeView({ pcpTree, onClickNode }: Props) {
    const renderNodeWithCustomEvents = ({
        nodeDatum,
        toggleNode,
    }: { nodeDatum: D3Tree, toggleNode: (a: D3Tree) => void }) => {
        if (nodeDatum.name === "EMPTY") return (<></>)
        else return <g 
            onClick={() => nodeDatum.attributes.expanded === false ? onClickNode(nodeDatum.attributes.path) : toggleNode(nodeDatum)} >
            <title>{nodeDatum.name}</title>
            <circle r="15"
                fill={nodeDatum.attributes.dir === "UP" ? "#6c05f2" : "#f2e305"}
            />
            <text fill="black" strokeWidth="1" x={"20"}>
                {nodeDatum.name}
            </text>
            <text fill="grey" x="20" dy="20" fontWeight={"100"} strokeWidth={0.5}>
                path: {nodeDatum.attributes.path}
            </text>
            <text fill="grey" x="20" dy="40" fontWeight={"100"} strokeWidth={0.5}>
                dir: {nodeDatum.attributes.dir}
            </text>
        </g>
    }
    return <Tree data={convToD3Tree(pcpTree)}
        orientation="vertical"
        onClick={(nodeDatum: D3Tree) => {
            onClickNode(nodeDatum.attributes.path)
        }}
        renderCustomNodeElement={(rd3tProps: any) =>
            renderNodeWithCustomEvents({ ...rd3tProps })
        }
    ></Tree>
    
}
