'use client';

import styled from 'styled-components';

export const MainEventButton = styled.button<{
  $width: number;
  $height: number;
  $color: string;
  $textColor?: string;
  $border?: boolean;
}>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background: ${({ $color }) => $color};
  color: ${({ $textColor }) => ($textColor === '#FF6135' ? '#FF6135' : 'white')};
  border-radius: 5px;
  border: ${({ $border }) => ($border === true ? '1px solid #FF6135' : 'none')};
  cursor: pointer;
`;
