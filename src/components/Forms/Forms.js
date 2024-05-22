"use client"
import React, { useRef, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import dijkstra from "../../algorithms/dijkstra";
import kruskal from "../../algorithms/kruskal";
import prim from '../../algorithms/prim';
import { convertMatrixToIntegers } from '../../helper/helper';

// Compression Forms Component
const Forms = ({ algorithm, setAlgorithm, adjMatrix = [], setSolution }) => {
    
    const textRef = useRef(null);
    const [som1, setSom1] = useState("")
    const [som2, setSom2] = useState("")

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
                console.log("prim", primMST)
                primMST.length === adjMatrix.length - 1 ? setSolution(primMST) : setSolution(null);
            }
            if (algorithm === 2) {
                // Do Kruskal
                let kruskalMST = kruskal(adjacency);
                console.log("kruskal",kruskalMST)
                kruskalMST.length === adjMatrix.length - 1 ? setSolution(kruskalMST) : setSolution(null);
            } if (algorithm === 3) {
                // Do Dijkstra
                if( som1!="" && som2!="" ){
                    let dijkstraMST = dijkstra(adjacency, som1, som2)
                    console.log("solution dij",dijkstraMST.solution)
                    setSolution(dijkstraMST.solution)
                }
            }
        } else {
            toast.error("You haven't load any .txt file, yet!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    function checkNumber(event) {
        const input = event.target;
        const value = input.value;
        // Vérifier si la valeur ne contient que des chiffres
        if (!value.match(/^[0-9]*$/) || value=="0" || (value > adjMatrix.length)) {
            input.value = value.slice(0, -1)
        }
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
                                {(algorithm === 3) &&
                                    <div className="flex mt-2 gap-8">
                                        <p>Sommets</p>
                                        <div className="flex gap-4">
                                            <input type="text" onChange={(event) => {checkNumber(event); setSom1(event.target.value)}} pattern="[0-9]*" className="w-10 h-10 text-center" ></input>
                                            <input type="text" onChange={(event) => {checkNumber(event); setSom2(event.target.value)}} pattern="[0-9]*" className="w-10 h-10 text-center" ></input>
                                        </div>
                                    </div>
                                }
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