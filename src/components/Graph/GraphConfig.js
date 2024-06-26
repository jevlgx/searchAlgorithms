import Graph from "react-graph-vis";
import { useState, useMemo, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { sortFirstAndSecond1, sortFirstAndSecond2, } from "../../helper/helper"

const GraphSet = ({ adjacencyMatrix, solution, clusterRemove }) => {
    // Basic screen configuration
    const [windowWidth, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', updateWidth);
        return(() => {
            window.removeEventListener('resize', updateWidth);
        })

    }, [windowWidth])

    // Grpah components
    const nodeCount = adjacencyMatrix.length;
    const [graph, setGraph] = useState({
        nodes: [],
        edges: []
    })

    useEffect(() => {
        // Graph configuration
        const tempGraph = {
            nodes: [],
            edges: []
        }

        for (var i = 0; i < nodeCount; i++) {
            // Graph element
            tempGraph.nodes.push({
                id: i,
                label: "Som" + (i+1),
                color: {
                    background: '#899ff2',
                    border: "#ed6f71",
                    size: 2,
                    highlight: "#ed6f71"
                },
                labelHighlightBold: false,
                shape: "circle",
            })

            // Setup edge
            for (var j = 0; j < nodeCount; j++) {
                if (parseInt(adjacencyMatrix[i][j]) !== 0) {
                    let tempEdge;
                    if (solution) {
                        tempEdge = {
                            from: i,
                            to: j,
                            arrows: {
                                to: false, from: false
                            },
                            label: adjacencyMatrix[i][j],
                            physics: false,
                            color: {
                                color: "#feae33",
                                highlight: "#feae33"
                            },
                            labelHighlightBold: true,
                            selectionWidth: 0,
                        }

                        // Check the solution
                        let sortedAdj1 = sortFirstAndSecond1(solution);
                        for (let p = 0; p < sortedAdj1.length; p++) {
                            if (sortedAdj1[p][0] === i && sortedAdj1[p][1] === j) {
                                tempEdge.color.color = "#dc2626";
                            }
                        }
                        let sortedAdj2 = sortFirstAndSecond2(solution);
                        for (let p = 0; p < sortedAdj2.length; p++) {
                            if (sortedAdj2[p][0] === i && sortedAdj2[p][1] === j) {
                                tempEdge.color.color = "#dc2626";
                            }
                        }

                        if (clusterRemove) {
                            let arrRemove = clusterRemove.map(obj => [obj.src, obj.dest, obj.weight]);
                            // Check the clusterRemove
                            let sortedCluster1 = sortFirstAndSecond1(arrRemove);
                            for (let p = 0; p < sortedCluster1.length; p++) {
                                if (sortedCluster1[p][0] === i && sortedCluster1[p][1] === j) {
                                    tempEdge.color.color = "#e2e8f0";
                                }
                            }
                            let sortedCluster2 = sortFirstAndSecond2(arrRemove);
                            for (let p = 0; p < sortedCluster2.length; p++) {
                                if (sortedCluster2[p][0] === i && sortedCluster2[p][1] === j) {
                                    tempEdge.color.color = "#e2e8f0";
                                }
                            }
                        }

                    } else {
                        tempEdge = {
                            from: i,
                            to: j,
                            arrows: {
                                to: false, from: false
                            },
                            label: adjacencyMatrix[i][j],
                            physics: false,
                            color: {
                                color: "#5358e2",
                                highlight: "#5358e2"
                            },
                            labelHighlightBold: true,
                            selectionWidth: 0,
                        }
                    }

                    tempGraph.edges.push(tempEdge);
                }
            }
        }
        
        setGraph(tempGraph);

    }, [adjacencyMatrix, solution])

    // Graph key to make graph more static
    const graphKey = useMemo(uuid, [graph, adjacencyMatrix, solution])

    const options = {
        layout: {
            randomSeed: 1,
        },
        edges: {
            color: "#000000",
        },
        height: "400px"
    };

    const events = {
        select: function(event) {
            var { nodes, edges } = event;
        }
    };

    return ( 
        <div className="w-full">
            <Graph
                style={{
                    backgroundColor: '#fafafa',
                    overflow: 'hidden',
                    margin: 'auto',
                    width: '100%',
                    borderRadius: '10px',
                }}
                key={graphKey}
                graph={graph}
                options={options}
                events={events}
                getNetwork={network => {
                }}
            />
        </div>
     );
}
 
export default GraphSet;