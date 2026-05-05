import styled from 'styled-components';
import { Avatar } from '../ui/Avatar';

export const DoctorCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: none;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.background.ivory};
    border-color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const DoctorName = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: 1rem;
`;

export const DoctorSpecialty = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0.25rem 0;
`;

export const DoctorFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const DoctorRating = styled.div`
  color: ${({ theme }) => theme.colors.primary[500]};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  font-weight: 500;
`;
