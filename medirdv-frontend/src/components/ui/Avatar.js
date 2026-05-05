import styled, { css } from 'styled-components';

const avatarSizes = {
  sm: css`
    width: 2.5rem;
    height: 2.5rem;
    font-size: 11px;
  `,

  md: css`
    width: 3.5rem;
    height: 3.5rem;
    font-size: 14px;
  `,

  lg: css`
    width: 5rem;
    height: 5rem;
    font-size: 20px;
  `,
};

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-weight: 500;
  flex-shrink: 0;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border.line};

  ${({ size = 'md' }) => avatarSizes[size]}

  background: ${({ $bg, theme }) => $bg || theme.colors.background.ivory};
  color: ${({ $color, theme }) => $color || theme.colors.text.primary};

  ${({ $image }) =>
    $image &&
    css`
      background-image: url(${$image});
      background-size: cover;
      background-position: center;
    `}
`;

export const OnlineDot = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.status.success};
  border: 2px solid ${({ theme }) => theme.colors.background.paper};
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
`;
