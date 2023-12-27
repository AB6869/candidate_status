import React, { useState } from 'react';
import { Candidate } from '../types/CandidateType';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CandidateCard from './CandidateCard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import search from '../assets/images/search.png';

const CANDIDATE_STATE = [
  { id: 'contact_id', status: 'Contact'},
  { id: 'dialog_id', status: 'Dialogue'},
  { id: 'interview_id', status: 'Interview'},
  { id: 'closed_id', status: 'Closed'},
]

interface CandidateListProps {
  candidates: Candidate[];
  removeCandidate: (id: string) => void;
  handleDragDrop: (result: any) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates, handleDragDrop, removeCandidate}) => {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <h1>Candidate List</h1>
      <Header>
        <LinkWrapper onClick={() => navigate('/add')}>
          Add New Candidate
        </LinkWrapper>
        <LinkWrapper>
          <SearchInput
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <img src={search} alt='search' style={{height: 20, width: 20, paddingLeft: 5 }}/>
        </LinkWrapper>
      </Header>

      {filteredCandidates.length <= 0 ? (
        <NoContent>Your search gives no results!</NoContent>
      ) : (
        <StatusColomn>
          <DragDropContext onDragEnd={(result) => handleDragDrop(result)}>
            {CANDIDATE_STATE.map((category) => (
              <Droppable droppableId={category.status} key={category.id}>
                {(provided) => (
                  <ListItem {...provided.droppableProps} ref={provided.innerRef}>
                    <Title {...provided.droppableProps}>{category.status}</Title>
                    {filteredCandidates.length > 0 && (
                      filteredCandidates
                        .filter((candidate) => candidate.status === category.status)
                        .map((candidate, index) => (
                          <CandidateCard
                            candidate={candidate}
                            removeCandidate={removeCandidate}
                            index={index}
                            key={index}
                          />
                        ))
                    )}
                    {provided.placeholder}
                  </ListItem>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </StatusColomn>
      )}
    </>
  )
}

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  @media (max-width: 400px) {
    flex-direction: column;
    marging-bottom: 10px;
  }
`;

const StatusColomn = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.div`
  overflow-anchor: none;
  background-color: #e5f3ff;
  display: flex;
  flex-direction: column;
  margin: 10px;
  border-radius: 16px;
  flex: 1;
  padding-bottom: 30px;

  @media (max-width: 800px) {
    flex: 0 0 45%;
  }

  @media (max-width: 500px) {
    flex: 0 0 100%;
  }
`;

const Title = styled.h3`
  padding-bottom: 8px;
  text-align: center;
  border-bottom: 2px solid #969696;
`;

const LinkWrapper = styled.div`
  padding: 10px;
  border: 2px solid #e5f3ff;
  max-width: 400px;
  border-radius: 6px;
  background: #e5f3ff;
  font-weight: bold;
  display: flex;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const NoContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  font-size: 20px;
  color: crimson;
  font-weight: bold;
  padding-top: 50px;
`;

const SearchInput = styled.input`
  border: none;
  height: 30px;
  min-width: 300px;
  border-radius: 6px;
  padding-left: 10px;
  font-size: 16px;
`;
export default CandidateList
