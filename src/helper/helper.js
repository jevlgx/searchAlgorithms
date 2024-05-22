function sortFirstAndSecond1(matrix) {
    const sortedMatrix = [];
  
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];
  
      // Check if the first element is greater than the second element
      if (row[0] > row[1]) {
        // Swap the elements
        const temp = row[0];
        row[0] = row[1];
        row[1] = temp;
      }
  
      sortedMatrix.push(row);
    }
  
    return sortedMatrix;
  }
  
  function sortFirstAndSecond2(matrix) {
    const sortedMatrix = [];
  
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];
  
      // Check if the first element is smaller than the second element
      if (row[0] < row[1]) {
        // Swap the elements
        const temp = row[1];
        row[1] = row[0];
        row[0] = temp;
      }
  
      sortedMatrix.push(row);
    }
  
    return sortedMatrix;
  }
  
  function convertMatrixToIntegers(adjMatrix) {
    const numVertices = adjMatrix.length;
    const intMatrix = [];
  
    for (let i = 0; i < numVertices; i++) {
      const row = [];
      for (let j = 0; j < numVertices; j++) {
        row.push(parseInt(adjMatrix[i][j]));
      }
      intMatrix.push(row);
    }
  
    return intMatrix;
  }
  
  function calculateTotalWeight(solution) {
    let total = 0;
    for (let i = 0; i < solution.length; i++) {
      total += solution[i][2];
    }
  
    return total;
  }
  
  function findMinDistanceVertex(distances, visited) {
    let minDistance = Infinity;
    let minDistanceVertex = -1;
  
    for (let v = 0; v < distances.length; v++) {
      if (!visited[v] && distances[v] < minDistance) {
        minDistance = distances[v];
        minDistanceVertex = v;
      }
    }
  
    return minDistanceVertex;
  }
  
  export {
    sortFirstAndSecond1,
    sortFirstAndSecond2,
    convertMatrixToIntegers,
    calculateTotalWeight,
    findMinDistanceVertex,
  };