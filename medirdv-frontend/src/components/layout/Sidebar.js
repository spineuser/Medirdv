import styled, { css } from 'styled-components';
import { Avatar } from '../ui/Avatar';

export const Sidebar = styled.aside`
  width: 14rem;
  flex-shrink: 0;
  background: rgba(26, 24, 20, 0.9); /* Semi-transparent charcoal */
  backdrop-filter: blur(10px);
  border-right: 1px solid ${({ theme }) => theme.colors.border.line};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.background.ivory};
  position: relative;
  z-index: 10;
`;

export const SidebarLogo = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const LogoText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.extraBold};
  font-family: ${({ theme }) => theme.typography.fonts.display};
  color: ${({ theme }) => theme.colors.background.paper};
  
  span {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const LogoSubtext = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 0.25rem;
`;

export const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem ${({ theme }) => theme.spacing.lg};
  width: 100%;
  cursor: none; /* Handled by custom cursor */
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  transition: all ${({ theme }) => theme.transitions.fast};
  background: none;
  border: none;
  text-align: left;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.background.paper};
    background: rgba(255, 255, 255, 0.03);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0%;
    background: ${({ theme }) => theme.colors.primary[500]};
    transition: height 0.3s ease;
  }

  ${({ $active }) =>
    $active &&
    css`
      color: ${({ theme }) => theme.colors.background.paper};
      background: rgba(255, 255, 255, 0.05);
      &::before {
        height: 60%;
      }
    `}

  i {
    font-size: 14px;
    width: 20px;
    opacity: 0.8;
  }
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.background.paper};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserRole = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
