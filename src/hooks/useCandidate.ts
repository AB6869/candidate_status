import { useReducer } from "react";
import { reducer } from "./reducer";
import { Candidates } from "../data/CandidateData";
import { Candidate } from "../types/CandidateType";

const useCandidates = () => {
  const [candidates, dispatch] = useReducer(reducer, Candidates);

  const addCandidate = (candidate: Candidate) => {
    dispatch({ type: 'addCandidate',  payload: candidate })
  };

  const updateCandidate = (updatedCandidate: Candidate) => {
    dispatch({ type: 'updateCandidate', payload: updatedCandidate})
  };

  const removeCandidate = (id: string) => {
    dispatch({ type: 'removeCandidate',  payload: id })
  };

  const handleDragDrop = (result: any) => {
    const { destination, source } = result
    console.log(result)
    const sourceIndex = source.index
    const destinationIndex = destination.index

    if(!destination) return
    if(destination.droppableId === source.droppableId && sourceIndex === destinationIndex) return

    if(destination.droppableId !== source.droppableId) {
      dispatch({ type: 'updateStatus',
        payload:
          {
            draggableId: result.draggableId,
            destination: result.destination.droppableId
          }
        })
    } else {
      dispatch({ type: 'rearangeArr', payload: {sourceIndex, destinationIndex} });
    }
  }

  return { candidates, addCandidate, updateCandidate, removeCandidate, handleDragDrop}
}

export default useCandidates
