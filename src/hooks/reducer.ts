import { Candidate } from "../types/CandidateType";

type SearchAction =
{
  type: 'removeCandidate',
  payload: string
}
type AddAction =
{
  type: 'addCandidate' | 'updateCandidate',
  payload: Candidate
}
type RearangeArr =
{
  type: 'rearangeArr',
  payload: { sourceIndex: number, destinationIndex: number}
}
type UpdateStatus =
{
  type: 'updateStatus',
  payload: { draggableId: string, destination: string }
}

export type Action = SearchAction | AddAction | RearangeArr | UpdateStatus

export const reducer = (candidates: Candidate[], action: Action): Candidate[]=> {
  switch(action.type){
    case 'addCandidate':
      return [...candidates, action.payload]
    case 'updateCandidate':
      return candidates.map(candidate => {
        if (candidate.id === action.payload.id) {
          return { ...candidate, ...action.payload };
        }
        return candidate;
      });
    case 'updateStatus':
      return candidates.map((candidate) => {
        return candidate.id === action.payload.draggableId
          ? {
              ...candidate,
              status: action.payload.destination,
            }
          : candidate
          })
    case 'removeCandidate':
      return candidates.filter(candidate => candidate.id !== action.payload)
    case 'rearangeArr':
      const rearangedArr = [...candidates];
      const [removed] = rearangedArr.splice(action.payload.sourceIndex, 1);
      rearangedArr.splice(action.payload.destinationIndex, 0, removed);
      return rearangedArr
    default:
      return candidates
  }
}
