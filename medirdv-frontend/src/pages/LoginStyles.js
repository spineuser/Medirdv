import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 520px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
`;

export const LoginCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 0.5px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing['3xl']};
  width: 100%;
  max-width: 340px;
  animation: popIn 0.4s ease both;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const LoginLogo = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

export const LoginLogoText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.display};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

export const LoginLogoSubtext = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-top: 0.125rem;
`;

export const LoginTabs = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 0.1875rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const LoginTab = styled.button`
  flex: 1;
  text-align: center;
  padding: 0.4375rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all ${({ theme }) => theme.transitions.base};
  background: transparent;
  border: none;
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};

  &.active {
    background: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.primary[500]};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const FormRow = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  label {
    display: block;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 0.25rem;
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }

  input,
  textarea,
  select {
    width: 100%;
  }

  textarea {
    height: 4rem;
    resize: none;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.625rem;
`;

export const DividerOr = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 42%;
    height: 0.5px;
    background: ${({ theme }) => theme.colors.border.light};
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

export const SocialButton = styled.button`
  width: 100%;
  padding: 0.5625rem;
  background: transparent;
  border: 0.5px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transitions.base};
  margin-bottom: 0.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const ForgotPassword = styled.button`
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-top: 0.5rem;
  cursor: pointer;
  background: none;
  border: none;
  transition: color ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;
