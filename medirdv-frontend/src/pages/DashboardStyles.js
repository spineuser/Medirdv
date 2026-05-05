import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  animation: fadeUp 0.8s cubic-bezier(0.33, 1, 0.68, 1) both;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.colors.border.line};
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: left;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background.ivory};
  }
`;

export const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.serif};
  font-size: 40px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.primary[500]};
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.5rem;
`;

export const StatTrend = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  margin-top: 0.25rem;
  color: ${({ $up, theme }) => ($up ? theme.colors.status.success : theme.colors.primary.warm)};
`;

export const AppointmentList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  background: ${({ theme }) => theme.colors.border.line};
  gap: 1px;
`;

export const AppointmentRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.paper};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background.ivory};
    padding-left: ${({ theme }) => theme.spacing.xl};
  }
`;

export const AppointmentDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colors.border.line};
`;

export const AppointmentDay = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.serif};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const AppointmentMonth = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 10px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const AppointmentInfo = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

export const AppointmentDoctor = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const AppointmentDetail = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 4px;
`;

export const AppointmentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.primary[500]};
  text-transform: uppercase;
`;
