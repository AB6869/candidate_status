import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CandidateList from './components/CandidateList';
import CandidateForm from './components/CandidateForm';
import useCandidates from './hooks/useCandidate';

const App: React.FC = () => {
  const { candidates, removeCandidate, addCandidate, handleDragDrop, updateCandidate } = useCandidates()

  return (
    <Routes>
      <Route path='/' element={
        <CandidateList
          candidates={candidates}
          removeCandidate={removeCandidate}
          handleDragDrop={handleDragDrop}
        />
      }/>

      <Route path='/add' element={<CandidateForm onSubmit={addCandidate} />} />
      <Route
          path="/update/:id"
          element={
            <CandidateForm
              onSubmit={(updatedCandidate) => updateCandidate(updatedCandidate)}
            />
          }
        />
      </Routes>
  )
};

export default App;
