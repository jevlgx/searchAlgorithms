import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Dropdown from "./components/Dropdown/Dropdown";
import Form from "./components/Forms/Forms";
import GraphSet from "./components/Graph/GraphConfig";
import { calculateTotalWeight } from './helper/helper';
import dijkstra from "./algorithms/dijkstra";

const backgroundStyle = {
    backgroundColor: "#ECEEF9",
    height: "auto",
    width: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
}

function App() {
    const [adjMatrix, setMatrix] = useState([]);
    const [solution, setSolution] = useState(null);
    const [algorithm, setAlgorithm] = useState(1);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [weight, setWeight] = useState(1);
    const [adjArray, setArray] = useState([]);

    useEffect(() => {
        if (adjMatrix) {
            const newArray = [];
            for (let i = 1; i <= adjMatrix.length; i++) {
                newArray.push(i);
            }
            setArray(newArray);
        }
    }, [adjMatrix]);

    // Handlers
    const handleAddNode = (event) => {
        event.preventDefault();
        setSolution(null);


        const newMatrix = [...adjMatrix];
        const newRow = Array(newMatrix.length + 1).fill('0');

        newMatrix.push(newRow);

        for (let i = 0; i < newMatrix.length; i++) {
            newMatrix[i].push('0');
        }

        setMatrix(newMatrix);

        toast.success("Nouveau sommet ajouté", {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const handleAddEdge = (event) => {
        event.preventDefault();
        setSolution(null);


        let newMatrix = [...adjMatrix];
        if (newMatrix[from][to] !== '0') {
            toast.error("Ce sommet existe deja", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (from === to) {
            toast.error("Ceci est un graphe non-orienté", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            // Set nilainya
            newMatrix[from][to] = weight.toString();
            // Set nilainya baru
            newMatrix[to][from] = weight.toString();
            // Reset
            setMatrix(newMatrix);
            toast.success("Nouvel arc ajouté", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    return (
        <div style={backgroundStyle} className="flex p-[1.5vh]">
            <ToastContainer />
            <div className="w-full bg-light flex rounded-xl text-gray-700">
                <div className="bg-white w-full mx-auto shadow-xl rounded-xl text-lg flex flex-row h-full">
                    <div className="text-left flex flex-col w-1/4 p-8 bg-primaryGray rounded-r-xl">
                        <Form algorithm={algorithm} setAlgorithm={setAlgorithm} setMatrix={setMatrix} adjMatrix={adjMatrix} setSolution={setSolution}/>
                    </div>
                    <div className="text-left flex flex-col w-3/4 space-y-3 p-8">
                        <div className='h-1/6 flex flex-row'>
                            <div className="w-1/3">
                                <h1 className='text-5xl font-Ubuntu'>Graphe</h1>
                                <h3 className='text-l font-Ubuntu p-2'>Ajoutez des sommets et des arcs</h3>
                            </div>
                            {adjMatrix &&
                                <div className="w-2/3 flex flex-row gap-x-4 bg-gray-200 rounded-xl ">
                                    <div className="w-1/6 p-3 flex items-center">
                                        <button className='px-4 py-1.5 text-sm text-white font-medium bg-pinkyRed hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150' onClick={(e) => handleAddNode(e)}>Ajouter sommet</button>
                                    </div>
                                    <div className="w-5/6 flex flex-row bg-gray-200 rounded-xl space-x-4 p-3">
                                        <div>
                                            <label className="font-small">
                                                Sommet
                                            </label>
                                            <Dropdown menuItems={adjArray} selectedItem={from} setSelectedItem={setFrom} />
                                        </div>
                                        <div>
                                            <label className="font-small">
                                                Sommet
                                            </label>
                                            <Dropdown menuItems={adjArray} selectedItem={to} setSelectedItem={setTo} />
                                        </div>
                                        <div>
                                            <label className="font-medium">
                                                Poids
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                required
                                                className="w-full px-4 py-1.5 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                                value={weight}
                                                onChange={(e) => setWeight(Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <button className='px-4 py-1.5 text-sm text-white font-medium bg-pinkyRed hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150' onClick={(e) => handleAddEdge(e)}>Ajouter arc</button>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                        <div className='h-5/6 p-5 rounded-lg bg-gray-200 flex flex-row w-full space-x-5'>
                            <div className='w-4/5'>
                                {adjMatrix && (
                                    <GraphSet adjacencyMatrix={adjMatrix} solution={solution} />)}
                            </div>
                            <div className='w-1/5 h-full'>
                                <h1 className='text-xl font-bold'>Resultat</h1>
                                {algorithm === 1 ? (
                                    <h3 className="text-lg py-1.5 font-semibold text-pinkyRed">Algorithme de Prim</h3>
                                ) : algorithm === 2 ? (
                                    <h3 className="text-lg py-1.5 font-semibold text-pinkyRed">Algorithme de Kruskal</h3>
                                ) : algorithm === 3 ? (
                                    <h3 className="text-lg py-1.5 font-semibold text-pinkyRed">Algorithme de Dijkstra</h3>
                                ) : null}
                                {/* {resultatDijkstra && algorithm === 3 &&(
                                    <>
                                        <h3>Poids total : {resultatDijkstra.minDistance}</h3>
                                        <h3>Ordre :</h3>
                                        <div>
                                            {function(){
                                                let minGraph = resultatDijkstra.minGraph
                                                let sokl = ""
                                                for(let i = 0; i<minGraph.length-1; i++){
                                                    sokl = sokl + "som"+minGraph[i]+"->"
                                                }
                                                sokl = sokl + minGraph[minGraph.length-1]
                                                return sokl
                                            }()

                                            }
                                        </div>
                                    </>
                                )} */}
                                {solution && solution.length === adjMatrix.length - 1 && (
                                    <>
                                        <h3>Poids total : {calculateTotalWeight(solution)}</h3>
                                        <h3>Ordre :</h3>
                                        <div>
                                            
                                            {solution.map((obj, index) => (
                                                <div>
                                                    <div>Som{obj[0] + 1} - Som{obj[1] + 1} ({obj[2]})</div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {solution && solution.length != adjMatrix.length - 1 && (//cas de dijkstra
                                    <>
                                        <h3>Poids total : {calculateTotalWeight(solution)}</h3>
                                        <h3>Ordre :</h3>
                                        <div>
                                            
                                            {solution.map((obj, index) => (
                                                <div>
                                                    <div>Som{obj[0] + 1} - Som{obj[1] + 1} ({obj[2]})</div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {/* 
                                {(!solution || solution.length !== adjMatrix.length - 1) &&(
                                    <div className="text-base">Aucune solution</div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;