function prim(adjMatrix) {
    // Initialization
    let numVertices = adjMatrix.length;
    let parent = [];
    let minDistances = [];
    let visited = [];
    
    for (let i = 0; i < numVertices; i++) {
        minDistances[i] = Infinity; 
        visited[i] = false;
    }

    minDistances[0] = 0;
    parent[0] = -1;
    
    const minSpanningTree = [];
    for (let i = 0; i < numVertices; i++) {
        const minIndex = findMinDistanceVertex(minDistances, visited, numVertices);
        visited[minIndex] = true;
        
        if (adjMatrix[minIndex]) {
            for (let j = 0; j < numVertices; j++) {
                if (adjMatrix[minIndex][j] && visited[j] == false && adjMatrix[minIndex][j] < minDistances[j]) {
                    parent[j] = minIndex;
                    minDistances[j] = adjMatrix[minIndex][j];
                }
            }

            if (adjMatrix[minIndex][parent[minIndex]]) {
                minSpanningTree.push([parent[minIndex], minIndex, adjMatrix[minIndex][parent[minIndex]]]);
            }
        }
    }
    
    return minSpanningTree;
}
function findMinDistanceVertex(minDistances, visited, numVertices) {
    let minDistance = Infinity;
    let minIndex;
  
    for (let i = 0; i < numVertices; i++) {
        if (visited[i] == false && minDistances[i] < minDistance) {
            minDistance = minDistances[i];
            minIndex = i;
        }
    }
  
    return minIndex;
}

export default prim;