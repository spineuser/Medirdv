import styled, { css } from 'styled-components';

const buttonVariants = {
  primary: css`
    background: ${({ theme }) => theme.colors.background.charcoal};
    color: ${({ theme }) => theme.colors.background.paper};
    border: none;

    &::before {
      background: ${({ theme }) => theme.colors.primary[500]};
    }
  `,

  secondary: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid ${({ theme }) => theme.colors.border.line};

    &::before {
      background: ${({ theme }) => theme.colors.background.ivory};
    }
    
    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  `,

  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid ${({ theme }) => theme.colors.border.line};

    &::before {
      background: ${({ theme }) => theme.colors.primary[500]};
    }

    &:hover {
      color: ${({ theme }) => theme.colors.background.paper};
      border-color: ${({ theme }) => theme.colors.primary[500]};
    }
  `,
};

const buttonSizes = {
  sm: css`
    padding: 10px 20px;
    font-size: 11px;
  `,

  md: css`
    padding: 14px 28px;
    font-size: 12px;
  `,

  lg: css`
    padding: 18px 40px;
    font-size: 14px;
  `,
};

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: none; /* Handled by custom cursor */
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateY(101%);
    transition: transform 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    z-index: -1;
  }

  &:hover::before {
    transform: translateY(0);
  }

  ${({ variant = 'primary' }) => buttonVariants[variant]}
  ${({ size = 'md' }) => buttonSizes[size]}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: none;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.ivory};
    border-color: ${({ theme }) => theme.colors.text.primary};
  }
`;
