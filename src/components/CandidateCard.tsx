import { Draggable } from "react-beautiful-dnd"
import { Candidate } from '../types/CandidateType';
import styled from 'styled-components'
import address from '../assets/images/location.svg'
import avatar from '../assets/images/avatar.svg'
import email from '../assets/images/email.png'
import { useNavigate } from "react-router-dom";

interface Props {
  candidate: Candidate;
  index: number;
  removeCandidate: (id: string) => void;
}

const CandidateCard: React.FC<Props> = ({ candidate, index, removeCandidate }) => {
  const navigate = useNavigate()

  return (
    <Draggable draggableId={candidate.id} key={candidate.id} index={index}>
      {(provided, snapshot) => (
        <CardsContainer
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          >
          <CandidateInfo onClick={() => navigate(`/update/${candidate.id}`, { state: { candidate } })}>
            <img src={avatar} alt='avatar'
              style={{ height: 30, width: 30, borderRadius: '50%', alignSelf: 'center', padding: 5 }}
            />
            <div style={{ flex: 1 }}>
              <Name>{candidate.firstName} {candidate.lastName}</Name>
              <div>Age: {candidate.age}</div>
              <IconWrapper>
                <img src={address} alt='address' style={{ paddingRight: 5 }}/>
                <div>{candidate.streetAddress}</div>
              </IconWrapper>
              <IconWrapper>
                <img src={email} alt='email' style={{height: 16, width: 16, paddingRight: 5 }}/>
                <div>{candidate.email}</div>
              </IconWrapper>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div>Status: {candidate.status}</div>
              </div>
            </div>
          </CandidateInfo>
          <div style={{ textAlign: 'right', marginTop: 10 }}>
            <Button onClick={() => removeCandidate(candidate.id)}>Remove</Button>
          </div>
        </CardsContainer>
        )}
      </Draggable>
  )
}

export default CandidateCard

const CardsContainer = styled.div`
  padding: 10px;
  border-radius: 6px;
  background-color: #ffffff;
  margin: 5px;
  border: 1px solid grey;
  box-shadow: 2px 2px 2px #969696;
`
const CandidateInfo = styled.div`
  display: flex;
`
const IconWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
`
export const Button = styled.button`
  padding: 5px 20px;
  background-color: #969696;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  cursor: pointer;
`
