import { useEffect, useState, useRef } from "react";
import { getDoctors, createAppointment } from "../api/api";
import styled from "styled-components";
import { LogButton } from "../components/ui/LogButton";

const HomeContainer = styled.div`
  min-height: 100vh;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  position: relative;
  background: transparent;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: ${({ theme }) => theme.spacing['3xl']};
  position: relative;
  background: transparent;
`;

const HeroIndex = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: 1rem;

  &::before {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(52px, 9vw, 140px);
  font-weight: ${({ theme }) => theme.typography.fontWeights.extraBold};
  line-height: 0.92;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const HeroBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const HeroDesc = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 13px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 320px;
`;

const AvailabilityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  background: rgba(250, 247, 226, 0.5);
  margin-top: 1.5rem;
  display: inline-flex;
  backdrop-filter: blur(5px);
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.status.success};
  animation: pulse 2s infinite;
`;

const ScrollIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.primary[500]}, transparent);
  animation: scrollLine 2s ease-in-out infinite;
`;

const MarqueeContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border.line};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.line};
  overflow: hidden;
  background: rgba(26, 24, 20, 0.9);
  backdrop-filter: blur(10px);
  padding: 14px 0;
`;

const MarqueeTrack = styled.div`
  display: flex;
  animation: marquee 25s linear infinite;
  white-space: nowrap;
`;

const MarqueeItem = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.background.ivory};
  padding: 0 2rem;
  opacity: 0.7;
`;

const MarqueeSep = styled.span`
  color: ${({ theme }) => theme.colors.primary[500]};
  opacity: 1 !important;
  padding: 0 1rem;
`;

const SectionLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary[500]};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border.line};
    max-width: 80px;
  }
`;

const SpecialistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1px;
  background: ${({ theme }) => theme.colors.border.line};
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const SpecialistCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ $selected, theme }) => $selected ? 'rgba(0, 71, 255, 0.05)' : 'rgba(250, 247, 242, 0.8)'};
  border: 1px solid ${({ $selected, theme }) => $selected ? theme.colors.primary[500] : 'transparent'};
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  cursor: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  padding: 4px;
`;

const DoctorName = styled.h3`
  font-size: 24px;
  margin-bottom: 4px;
`;

const Specialty = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.secondary};
  letter-spacing: 0.1em;
`;

const Button = styled.button`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.background.paper};
  background: ${({ theme }) => theme.colors.background.charcoal};
  padding: 14px 28px;
  border: none;
  position: relative;
  overflow: hidden;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  margin-top: 1.5rem;
  transition: color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.primary[500]};
    transform: translateY(101%);
    transition: transform 0.3s ease;
    z-index: 0;
  }

  &:hover::before {
    transform: translateY(0);
  }

  span {
    position: relative;
    z-index: 1;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(250, 247, 242, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.line};
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  
  span {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

// --- NEW BOOKING SECTION COMPONENTS ---
const BookingWrapper = styled.section`
  padding: 8rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.line};
  background: transparent;
`;

const ScheduleCard = styled.div`
  background: rgba(250, 247, 242, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  padding: 3rem;
  max-width: 700px;
  margin: 4rem auto 0;
  text-align: center;
  animation: fadeUp 1s ease both;
`;

const InputGroup = styled.div`
  text-align: left;
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: 11px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 8px;
  }
  
  input, select {
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid ${({ theme }) => theme.colors.border.line};
    padding: 12px;
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.primary};
    outline: none;
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary[500]};
    }
  }
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.colors.border.line};
  border: 1px solid ${({ theme }) => theme.colors.border.line};
  margin-top: 1rem;
`;

const TimeSlot = styled.button`
  background: ${({ $selected, theme }) => $selected ? theme.colors.primary[500] : 'rgba(250, 247, 242, 0.9)'};
  color: ${({ $selected, theme }) => $selected ? theme.colors.background.paper : theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 13px;
  padding: 1.5rem;
  border: none;
  cursor: none;
  transition: all 0.2s;

  &:hover {
    background: ${({ $selected, theme }) => $selected ? theme.colors.primary[500] : theme.colors.background.ivory};
  }
`;

const PlainSection = styled.section`
  padding: 8rem 0;
  background: transparent;
`;

export default function Home({ goLogin }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [checkupReason, setCheckupReason] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  
  const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:15 PM'];

  useEffect(() => {
    getDoctors().then(setDoctors).catch(console.error);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleBookingSubmit = async () => {
    if (!selectedDoctor || !selectedTime || !checkupReason || !bookingDate) {
      alert("Please fill in all booking details.");
      return;
    }
    
    // Check for login
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login as a patient to confirm your booking.");
      goLogin();
      return;
    }

    try {
      await createAppointment({
        doctorId: selectedDoctor.id,
        reason: checkupReason,
        date: bookingDate,
        time: selectedTime
      });
      alert("Appointment requested! Dr. " + selectedDoctor.fullName + " will review it.");
      // Reset
      setSelectedDoctor(null);
      setSelectedTime(null);
      setCheckupReason("");
      setBookingDate("");
    } catch (err) {
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <HomeContainer>
      <Nav>
        <Logo>Medi<span>RDV.</span></Logo>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <LogButton onClick={goLogin} label="Portal Login" />
        </div>
      </Nav>

      <HeroSection>
        <div className="reveal">
          <HeroIndex>
            <span>Healthcare Redefined</span>
            <span>&amp; Humanized</span>
          </HeroIndex>

          <HeroTitle>
            <div>The New</div>
            <div><span className="serif-word">Standard</span> of</div>
            <div className="outline-text">Medical Care.</div>
          </HeroTitle>

          <HeroBottom>
            <div>
              <HeroDesc>
                Bridging the gap between<br />
                sophisticated technology and<br />
                <strong style={{ color: '#1A1814' }}>compassionate healthcare.</strong>
              </HeroDesc>
              <AvailabilityBadge>
                <Dot />
                Specialists Available Today
              </AvailabilityBadge>
            </div>
            <ScrollIndicator>
              <ScrollLine />
              <span>Scroll</span>
            </ScrollIndicator>
          </HeroBottom>
        </div>
      </HeroSection>

      <MarqueeContainer>
        <MarqueeTrack>
          {["Cardiology", "Dermatology", "Pediatrics", "Neurology", "Psychiatry", "Orthopedics"].map((s, i) => (
            <span key={i}>
              <MarqueeItem>{s}</MarqueeItem>
              <MarqueeSep>✦</MarqueeSep>
            </span>
          ))}
          {["Cardiology", "Dermatology", "Pediatrics", "Neurology", "Psychiatry", "Orthopedics"].map((s, i) => (
            <span key={i + 10}>
              <MarqueeItem>{s}</MarqueeItem>
              <MarqueeSep>✦</MarqueeSep>
            </span>
          ))}
        </MarqueeTrack>
      </MarqueeContainer>

      <BookingWrapper id="booking-section">
        <SectionLabel className="reveal">Select Your Path</SectionLabel>
        <h2 className="reveal" style={{ fontSize: 'clamp(32px, 4vw, 56px)', maxWidth: '800px' }}>
          Expert care, <span className="serif-word">without the waiting room.</span>
        </h2>
        <p className="reveal" style={{ marginTop: '1.5rem', maxWidth: '500px' }}>
          Select a specialist from our vetted network and secure your consultation instantly. We prioritize your health and your time.
        </p>

        <SpecialistsGrid className="reveal">
          {doctors.slice(0, 4).map((doc) => (
            <SpecialistCard 
              key={doc.id} 
              $selected={selectedDoctor?.id === doc.id}
              onClick={() => setSelectedDoctor(doc)}
            >
              <Specialty>Senior Specialist</Specialty>
              <DoctorName>Dr. {doc.fullName}</DoctorName>
              <p style={{ marginTop: '1rem', fontSize: '12px' }}>
                Dedicated to providing patient-centered care with over 12 years of clinical experience.
              </p>
            </SpecialistCard>
          ))}
        </SpecialistsGrid>

        <ScheduleCard className="reveal">
          <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Schedule your visit</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
            <InputGroup>
              <label>Reason for Visit</label>
              <input 
                type="text" 
                placeholder="e.g. Annual Checkup" 
                value={checkupReason}
                onChange={(e) => setCheckupReason(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Consultation Date</label>
              <input 
                type="date" 
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </InputGroup>
          </div>

          <InputGroup>
            <label>Available Time Slots</label>
            <TimeGrid>
              {timeSlots.map((time) => (
                <TimeSlot 
                  key={time} 
                  $selected={selectedTime === time}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </TimeSlot>
              ))}
            </TimeGrid>
          </InputGroup>

          <Button 
            fullWidth 
            onClick={handleBookingSubmit}
            disabled={!selectedDoctor || !selectedTime}
          >
            <span>
              {!selectedDoctor ? 'Select a Doctor above' : 
               !selectedTime ? 'Select a Time Slot' : 
               `Book with Dr. ${selectedDoctor.fullName}`}
            </span>
          </Button>
        </ScheduleCard>
      </BookingWrapper>

      <PlainSection>
        <SectionLabel className="reveal">Our Vetted Network</SectionLabel>
        <h2 className="reveal" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Expertise you can <span className="serif-word">trust</span>.
        </h2>
        
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
          {doctors.slice(0, 6).map((doc) => (
            <div key={doc.id} style={{ textAlign: 'center' }}>
              <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doc.fullName}`} alt={doc.fullName} />
              <DoctorName style={{ fontSize: '18px' }}>Dr. {doc.fullName}</DoctorName>
              <Specialty>Specialist</Specialty>
            </div>
          ))}
        </div>
      </PlainSection>

      <footer style={{ padding: '4rem 0', borderTop: '1px solid rgba(26,24,20,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '12px' }}>© 2025 MediRDV. Premium Medical Solutions.</p>
        <Logo>Medi<span>RDV.</span></Logo>
        <p style={{ fontSize: '12px' }}>Built for Excellence.</p>
      </footer>
    </HomeContainer>
  );
}