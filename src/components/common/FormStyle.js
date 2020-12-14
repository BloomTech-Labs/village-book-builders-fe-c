import styled from 'styled-components';

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
  position: relative;

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

export const Required = styled.p`
  position: relative;
  display: inline;
  font-size: 0.9rem;
  margin-left: -2rem;
  @media screen and (max-width: 800px) {
    display: block;
    margin-left: -3.2rem;
    margin-top: 0.4rem;
  }
  span#required {
    color: red;
    font-size: 0.9rem;
  }
`;
