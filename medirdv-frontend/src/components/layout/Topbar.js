import styled from 'styled-components';

export const Topbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `0 ${theme.spacing.xl}`};
  height: 80px;
  background: rgba(250, 247, 242, 0.7); /* Semi-transparent paper */
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.line};
`;

export const TopbarTitle = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TopbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SearchMini = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.background.ivory};
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  padding: 8px 16px;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: none;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.background.paper};
    border-color: ${({ theme }) => theme.colors.text.primary};
  }

  svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
  }
`;

export const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: none;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.background.ivory};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: ${({ theme }) => theme.colors.text.primary};
    fill: none;
    stroke-width: 1.8;
  }
`;

export const NotificationDot = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.warm};
  border: 2px solid ${({ theme }) => theme.colors.background.paper};
`;
