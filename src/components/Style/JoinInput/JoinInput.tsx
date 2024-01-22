'use client';

import styled from 'styled-components';

export const JoinInput = styled.input<{
  width: number;
}>`
  width: ${({ width }) => width}px;
  height: 31px;
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-left: 10px;
  border-bottom: 1px solid #d9d9d9;
  &:focus {
    outline: 1px solid #FF6135;
    border-radius: 5px;
  }
`;
