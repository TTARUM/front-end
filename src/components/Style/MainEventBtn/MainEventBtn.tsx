'use client';

import styled from 'styled-components';

export const MainEventButton = styled.button<{
  width: number;
  height: number;
  color: string;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: ${({ color }) => color};
  color: white;
  border-radius : 5px;
  border: none;
  cursor: pointer;
`;
