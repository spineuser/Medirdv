
import {
  LandingContainer,
  HeroSection,
  HeroTitle,
  HeroSubtext,
  HeroButtons,
  SearchBar,
  SpecialtyChips,
  SpecialtyChip,
  DoctorGrid,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel
} from './LandingStyles';

import { Button } from '../components/ui/Button';
import { DoctorCard, DoctorName, DoctorSpecialty } from '../components/features/DoctorCard';
import { Avatar } from '../components/ui/Avatar';

const specialties = ["Cardiology", "Dermatology", "Pediatrics", "Neurology"];

export default function Landing() {
  return (
    <LandingContainer>

      {/* HERO */}
      <HeroSection>
        <HeroTitle>
          Book Medical <span>Appointments</span> Effortlessly
        </HeroTitle>

        <HeroSubtext>
          Find trusted doctors, book instantly, and manage your health — all in one place.
        </HeroSubtext>

        <HeroButtons>
          <Button size="lg">Get Started</Button>
          <Button variant="secondary" size="lg">Browse Doctors</Button>
        </HeroButtons>

        <SearchBar>
          <input placeholder="Search doctors or specialties..." />
          <select>
            <option>All</option>
            <option>Cardiology</option>
            <option>Dermatology</option>
          </select>
          <button>Search</button>
        </SearchBar>

        <SpecialtyChips>
          {specialties.map((s, i) => (
            <SpecialtyChip key={i}>{s}</SpecialtyChip>
          ))}
        </SpecialtyChips>
      </HeroSection>

      {/* DOCTORS */}
      <DoctorGrid>
        {[1,2,3,4,5,6].map((_, i) => (
          <DoctorCard key={i}>
            <Avatar size="md">D</Avatar>
            <DoctorName>Dr. John Doe</DoctorName>
            <DoctorSpecialty>Cardiologist</DoctorSpecialty>
          </DoctorCard>
        ))}
      </DoctorGrid>

      {/* STATS */}
      <StatsGrid>
        <StatCard>
          <StatNumber>120+</StatNumber>
          <StatLabel>Doctors</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>500+</StatNumber>
          <StatLabel>Appointments</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>98%</StatNumber>
          <StatLabel>Satisfaction</StatLabel>
        </StatCard>
      </StatsGrid>

    </LandingContainer>
  );
}