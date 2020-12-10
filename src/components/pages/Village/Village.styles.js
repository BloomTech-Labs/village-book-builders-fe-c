import styled from 'styled-components';

export const VillageProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  margin: auto;
  width: fit-content;
  letter-spacing: 0.05rem;
`;

export const Label = styled.h4`
  display: inline;
  font-weight: 800;
  margin-right: 0.6rem;
  font-size: 1rem;
  width: fit-content;
`;

export const Form = styled.form``;

export const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const FormContainer = styled.div`
  padding: 1rem;

  .ant-col {
    align-self: center;
  }

  .ant-col-8 {
    max-width: 33%;
    min-width: 15rem;
  }

  .ant-col-16 {
    max-width: 50%;
  }
`;
