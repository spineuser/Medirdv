import styled, { css } from 'styled-components';

const badgeVariants = {
  success: css`
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
  `,

  error: css`
    background: rgba(255, 77, 0, 0.1);
    color: ${({ theme }) => theme.colors.primary.warm};
  `,

  blue: css`
    background: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary[500]};
  `,

  gray: css`
    background: ${({ theme }) => theme.colors.background.ivory};
    color: ${({ theme }) => theme.colors.text.secondary};
  `,
};

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 2px;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  
  ${({ variant = 'gray' }) => badgeVariants[variant]}
`;

export const Pill = Badge; // Aliasing for compatibility
