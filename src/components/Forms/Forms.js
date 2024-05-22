import React, { useRef } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import dijkstra from "../../algorithms/dijkstra";
import kruskal from "../../algorithms/kruskal";
import prim from '../../algorithms/prim';
import { convertMatrixToIntegers } from '../../helper/helper';

// Compression Forms Component
const Forms = ({ algorithm, setAlgorithm, adjMatrix = [], setSolution, setDijkstra }) => {
    const textRef = useRef(null);

    const handleCheckbox = (event) => {
        setSolution(null);

    };


    // Do the process based on the algorithm
    const handleSubmit = (e) => {
        e.preventDefault();
        setSolution(null);


        if (adjMatrix) {
            // Convert the adjMatrix into matrix of integer
            let adjacency = convertMatrixToIntegers(adjMatrix);

            // Do the algorithm
            if (algorithm === 1) {
                // Do Prim
                let primMST = prim(adjacency);
                primMST.length === adjMatrix.length - 1 ? setSolution(primMST) : setSolution(null);
            }
            if (algorithm === 2) {
                // Do Kruskal
                let kruskalMST = kruskal(adjacency);
                kruskalMST.length === adjMatrix.length - 1 ? setSolution(kruskalMST) : setSolution(null);
                console.log(kruskalMST)
            } if (algorithm === 3) {
                // Do Dijkstra
                let dijkstraMST = dijkstra(adjacency);
                setDijkstra(dijkstraMST)
            }
        } else {
            toast.error("You haven't load any .txt file, yet!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const isConfigFileValid = ({ lines }) => {
        if (!lines || lines.length === 0 || lines[0].length === 0) return { "success": false, "msg": "Configuration file is empty!" }

        const matrix = lines.map((line) => line.split(/\s+/))
        const row = matrix.length
        const column = matrix[0].length

        for (var i = 0; i < row; i++) {
            const line = matrix[i]
            if (line.length !== column)
                return {
                    "success": false,
                    "msg": "Configuration file contains rows with different length!"
                }

            for (var j = 0; j < column; j++) {
                var stringValue = line[j]
                if (!(/^\d+$/.test(stringValue)))
                    return {
                        "success": false,
                        "msg": "Configuration file contains invalid character(s)!\nPositive numbers are the only valid characters"
                    }
            }
        }

        if (row !== column)
            return {
                "success": false,
                "msg": "Adjancency matrix must have the same rows and columns count!"
            }

        for (j = 0; j < row; j++) {
            for (var k = 0; k < column; k++) {
                if (matrix[j][k] !== matrix[k][j])
                    return {
                        "success": false,
                        "msg": "Adjancency matrix for undirected graph should be symetric!"
                    }
            }
        }

        return { "success": true, "msg": "Configuration File is valid", "data": matrix };
    }

    return (
        <main className="h-full">
            <div className="h-full mx-auto px-0 text-gray-600">
                <div className="h-full mx-auto flex flex-col space-y-6">
                    <div className="flex flex-col space-y-8">
                        <h1 className='text-3xl font-bold'>TP: Recherche Opérationnelle</h1>
                    </div>
                    <div className="flex flex-col space-y-6 ">
                        <div>
                            <label className="font-medium">
                                Choisir un Algorithme
                            </label>
                            <div className="flex flex-col mt-2 grid-cols-2 space-x-2 rounded-lg bg-lightBlue p-2">
                                <div>
                                    <input type="radio" id="prim" name="prim" value="Prim" checked={algorithm === 1} onChange={() => { setAlgorithm(1); setSolution(null);   }} className="peer hidden"></input>
                                    <label htmlFor="prim" className="text-sm block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-pinkyRed font-bold peer-checked:text-white justify-center items-center">Prim</label>
                                </div>
                                <div>
                                    <input type="radio" id="kruskal" name="kruskal" value="Kruskal" checked={algorithm === 2} onChange={() => { setAlgorithm(2); setSolution(null);  }} className="peer hidden"></input>
                                    <label htmlFor="kruskal" className="text-sm block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-pinkyRed font-bold peer-checked:text-white justify-center items-center">Kruskal</label>
                                </div>
                                <div>
                                    <input type="radio" id="dijkstra" name="dijkstra" value="Dijkstra" checked={algorithm === 3} onChange={() => { setAlgorithm(3); setSolution(null);  }} className="peer hidden"></input>
                                    <label htmlFor="dijkstra" className="text-sm block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-pinkyRed font-bold peer-checked:text-whitel justify-center items-center">Dijkstra</label>
                                </div>
                            </div>
                            <button
                                className="w-full px-4 py-1.5 mt-3 text-white text-sm font-medium bg-pinkyRed hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Appliquer!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Forms;