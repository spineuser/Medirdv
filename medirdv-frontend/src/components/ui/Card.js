import styled, { css } from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.base};
  position: relative;

  ${({ hover }) =>
    hover &&
    css`
      cursor: none; /* Handled by custom cursor */

      &:hover {
        background: ${({ theme }) => theme.colors.background.ivory};
        border-color: ${({ theme }) => theme.colors.text.primary};
      }
    `}

  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;

export const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 13px;
  line-height: 1.6;
`;
