import React, { useState } from 'react';
import { Candidate } from '../types/CandidateType';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface FormField {
  name: string;
  type?: string;
  children?: FormField[];
}

const formFields = [
  { name: 'full Name', children: [
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
  ]},
  { name: 'age', type: 'number' },
  { name: 'current Address', children: [
    { name: 'streetAddress', type: 'text' },
    { name: 'city', type: 'text' },
  ]},
  { name: 'email', type: 'email' },
  { name: 'status', type: 'text' },
]

interface CandidateFormProps {
  onSubmit: (candidate: Candidate) => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate()
  const location = useLocation();
  const { state } = location;
  const candidateToBeUpdate = state?.candidate

  const [formData, setFormData] = useState<Candidate>(candidateToBeUpdate || {
    id: '',
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    streetAddress: '',
    city: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (candidateToBeUpdate) {
      onSubmit(formData);
    } else {
      onSubmit({ ...formData, id: uniqueId })
    }
    setFormData({
        id: '',
        firstName: '',
        lastName: '',
        age: 0,
        email: '',
        streetAddress: '',
        city: '',
        status: '',
      })
    navigate("/")
  };

  const uniqueId = Math.random().toString(36).slice(2, 11);

  const renderField = (field: FormField) => {
    if (field.children) {
      return (
        <RowContainer key={field.name}>
          <Title>{field.name}</Title>
              <OuterDiv>
              {field.children?.map((child: FormField) =>
              <InputWrapper key={child.name}>
                <Input
                  type={child.type}
                  name={child.name as keyof Candidate}
                  value={formData[child.name as keyof Candidate]}
                  onChange={handleChange} />
                <label>{child.name}</label>
                </InputWrapper>
              )}
              </OuterDiv>
          </RowContainer>
      )
    } else {
      return (
        <RowContainer key={field.name}>
          <InputWrapper>
            <Input
              type={field.type}
              name={field.name as keyof Candidate}
              value={formData[field.name as keyof Candidate]} onChange={handleChange} />
            <label>{field.name}</label>
            </InputWrapper>
        </RowContainer>
      )
    }
  }

  return (
    <PageWrapper>
      <h1>{candidateToBeUpdate ? 'Update Candidate' : 'Add Candidate'}</h1>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => renderField(field))}

      <div style={{ textAlign: 'center'}}>
        <Button type="submit">{candidateToBeUpdate ? 'Update Candidate' : 'Add Candidate'} </Button>
      </div>
      </form>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  margin: 20px;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 6px;
  text-transform: capitalize;
`
const OuterDiv = styled.div`
  display: flex;
  flex: 1;
`
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: 20px;
  margin: 6px;
`

const Input = styled.input`
  height: 50px;
  border-color: #b8bdc9;
  border-radius: 6px;
  color: #2c3345;
  margin-bottom: 6px;
  padding-left: 10px;
  font-size: large;
`
export const Button = styled.button`
  padding: 10px 40px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`

export default CandidateForm;
