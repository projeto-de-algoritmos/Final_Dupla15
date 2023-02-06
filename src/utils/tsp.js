import attractions from "./pontos_turisticos"

const CalculateTSPCostNPath = (nodes) => {
    const N = nodes.length // Quantity of nodes

    // MEMOIZATION
    let memo = new Array(N)
    for (let i = 0; i < N; i++) {
        memo[i] = new Array(1 << N).fill(-1)
    }

    // PATH (necessary to backtracking)
    let path = new Array(N)
    for (let i = 0; i < N; i++) {
        path[i] = new Array(1 << N).fill(-1)
    }

    let row = 0
    let mapNodes = {}  // Maps the index used in the function with the original index of the attraction 
    let dist = new Array(N)  // Matriz of distances according with the selected attractions
    for (let i = 0; i < attractions.length; i++) {
        if (nodes.includes(i)) {
            mapNodes[row] = i
            dist[row] = new Array(N)
            let column = 0
            for (let j = 0; j < attractions.length; j++) {
                if (nodes.includes(j)) {
                    dist[row][column] = attractions[i].dist[j]
                    column += 1
                }
            }
            row += 1
        }
    }

    const calculateTSPCost = (i, mask) => {
        if (mask === (1 << N) - 1) {
            return dist[i][0]
        }

        if (memo[i][mask] !== -1)
            return memo[i][mask]

        let res = Infinity
        for (let j = 0; j < N; j++) {
            if (mask & (1 << j))
                continue

            let cost = calculateTSPCost(j, mask | (1 << j), N) + dist[i][j]
            if (cost < res) {
                res = cost
                path[i][mask] = j
            }
        }

        memo[i][mask] = res
        return res
    }

    const getPath = () => {
        let result = [0];

        let i = 0
        let mask = 1
        while (mask !== (1 << N) - 1) {
            let next = path[i][mask];
            result.push(mapNodes[next]);
            mask |= (1 << next);
            i = next;
        }
        result.push(0)

        return result;
    }

    return { cost: calculateTSPCost(0, 1), path: getPath() }
}

export default CalculateTSPCostNPath