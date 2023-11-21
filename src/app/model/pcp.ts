export type Tile = {
    up: string
    dn: string
}

export type PCP = Tile[]

export type PCPConfig = {
    dir: "UP" | "DN"
    config: string
}

export interface PCPTree {
    config: PCPConfig
    children: (PCPTree | undefined)[] | undefined
}

export function bfs(pcp: PCP, depth: number, config: PCPConfig = {dir:"UP", config:""}): PCPTree {
    if(depth === 0) {
        return {
            config: config,
            children: undefined
        }
    }
    return {
        config: config,
        children: pcp.map((tile, tileIdx) => {
            const newConfig = applyTile(config, tile)
            return newConfig ? bfs(pcp, depth - 1, newConfig) : undefined
        })
    }
}

export function applyTile(config: PCPConfig, tile: Tile): PCPConfig | undefined {
    if ((config.config + tile.up).startsWith(tile.dn)) {
        return {
            dir: "UP",
            config: (config.config + tile.up).slice(tile.dn.length)
        }
    }
    if ((config.config + tile.dn).startsWith(tile.up)) {
        return {
            dir: "DN",
            config: (config.config + tile.dn).slice(tile.up.length)
        }
    }
    return undefined
}

export function flattenTree(tree: PCPTree): PCPConfig[] {
    if (tree.children === undefined) {
        return [tree.config]
    }
    return [tree.config].concat(tree.children.flatMap(child => child ? flattenTree(child) : []))
}
