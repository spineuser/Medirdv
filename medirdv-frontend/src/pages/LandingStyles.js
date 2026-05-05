import styled from 'styled-components';

export const LandingContainer = styled.div`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing['3xl']}`};
  max-width: 900px;
  margin: 0 auto;
  animation: fadeUp 0.8s cubic-bezier(0.33, 1, 0.68, 1) both;
`;

export const HeroSection = styled.section`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.xl} 0`};
`;

export const HeroTitle = styled.h1`
  font-size: clamp(36px, 6vw, 72px);
  font-weight: ${({ theme }) => theme.typography.fontWeights.extraBold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  span {
    font-family: ${({ theme }) => theme.typography.fonts.serif};
    font-weight: 300;
    font-style: italic;
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const HeroSubtext = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 480px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SearchBar = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background.ivory};
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
  max-width: 500px;
  margin: 0 auto;

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: 13px;
    padding: 0.5rem;
    outline: none;
  }

  select {
    border: none;
    background: transparent;
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: 12px;
    padding: 0 0.5rem;
    border-left: 1px solid ${({ theme }) => theme.colors.border.line};
    outline: none;
  }

  button {
    background: ${({ theme }) => theme.colors.background.charcoal};
    color: ${({ theme }) => theme.colors.background.paper};
    padding: 10px 24px;
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: 12px;
    text-transform: uppercase;
    transition: background 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.primary[500]};
    }
  }
`;

export const SpecialtyChips = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const SpecialtyChip = styled.button`
  padding: 6px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.background.paper};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background.charcoal};
    color: ${({ theme }) => theme.colors.background.paper};
    border-color: ${({ theme }) => theme.colors.background.charcoal};
  }
`;

export const DoctorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.colors.border.line};
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

export const StatCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.paper};
`;

export const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.serif};
  font-size: 32px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.primary[500]};
`;

export const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.25rem;
`;
