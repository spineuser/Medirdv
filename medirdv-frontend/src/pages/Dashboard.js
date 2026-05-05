import React, { useEffect, useState } from "react";
import { getAppointments, createAppointment, getDoctors, createDoctor } from "../api/api";
import {
  DashboardContainer,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  StatTrend,
  AppointmentList,
  AppointmentRow,
  AppointmentDate,
  AppointmentDay,
  AppointmentMonth,
  AppointmentInfo,
  AppointmentDoctor,
  AppointmentDetail,
  AppointmentActions
} from './DashboardStyles';
import { Button, IconButton } from '../components/ui/Button';
import { Card, CardTitle, CardContent } from '../components/ui/Card';
import { Sidebar, SidebarLogo, LogoText, LogoSubtext, NavItem, SidebarFooter, UserRow, UserInfo, UserName, UserRole } from '../components/layout/Sidebar';
import { Topbar, TopbarTitle, TopbarRight } from '../components/layout/Topbar';
import { Avatar, OnlineDot } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { LogButton } from "../components/ui/LogButton";
import styled from "styled-components";

const MainLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background: transparent;
`;

const ContentArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SectionHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl} 0;
`;

const SectionLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary[500]};
  margin-bottom: 0.5rem;
`;

export default function Dashboard({ onLogout }) {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [activeView, setActiveView] = useState("dashboard");
  const [currentPatientIndex, setCurrentPatientIndex] = useState(0);
  const [notification, setNotification] = useState("");
  const [role] = useState(localStorage.getItem('role') || 'doctor');
  const [newDoc, setNewDoc] = useState({ email: '', fullName: '', password: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [appts, docs] = await Promise.all([getAppointments(), getDoctors()]);
    setAppointments(appts || []);
    setDoctors(docs || []);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const goToNextPatient = () => {
    if (currentPatientIndex < appointments.length - 1) {
      setCurrentPatientIndex(prev => prev + 1);
      showNotification(`Now serving next patient...`);
    }
  };

  const currentPatient = appointments[currentPatientIndex];

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await createDoctor(newDoc);
      showNotification("New doctor added successfully!");
      setNewDoc({ email: '', fullName: '', password: '' });
      loadData();
    } catch (err) {
      alert("Failed to add doctor.");
    }
  };

  return (
    <MainLayout>
      <Sidebar>
        <SidebarLogo>
          <LogoText>Medi<span>RDV.</span></LogoText>
          <LogoSubtext>Premium Health Systems</LogoSubtext>
        </SidebarLogo>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem 0' }}>
          <NavItem $active={activeView === "dashboard"} onClick={() => setActiveView("dashboard")}>
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </NavItem>
          {role === 'admin' && (
            <NavItem $active={activeView === "doctors"} onClick={() => setActiveView("doctors")}>
              <i className="fas fa-user-md"></i>
              <span>Manage Doctors</span>
            </NavItem>
          )}
          <NavItem $active={activeView === "calendar"} onClick={() => setActiveView("calendar")}>
            <i className="fas fa-calendar-alt"></i>
            <span>Schedule</span>
          </NavItem>
          <NavItem $active={activeView === "patients"} onClick={() => setActiveView("patients")}>
            <i className="fas fa-users"></i>
            <span>Patients</span>
          </NavItem>
        </nav>

        <SidebarFooter>
          <UserRow>
            <Avatar size="sm">DR<OnlineDot /></Avatar>
            <UserInfo>
              <UserName>Dr. Sarah Connor</UserName>
              <UserRole>Administrator</UserRole>
            </UserInfo>
          </UserRow>
        </SidebarFooter>
      </Sidebar>

      <ContentArea>
        <Topbar>
          <TopbarTitle>
            <div style={{ textTransform: 'capitalize' }}>{activeView}</div>
            <p style={{ fontSize: '12px', color: '#6B6560', marginTop: '4px', fontWeight: 400 }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </TopbarTitle>

          <TopbarRight>
            <Button onClick={goToNextPatient} style={{ marginRight: '1rem' }}>
              <span>Call Next Patient</span>
            </Button>
            <LogButton variant="logout" onClick={() => {
              if(window.confirm("Are you sure you want to logout?")) onLogout();
            }} />
          </TopbarRight>
        </Topbar>

        {activeView === "dashboard" && (
          <DashboardContainer>
            <SectionLabel>Real-time Overview</SectionLabel>
            <StatsGrid>
              <StatCard>
                <StatNumber>{appointments.length}</StatNumber>
                <StatLabel>Total Visits</StatLabel>
                <StatTrend $up={true}>Today</StatTrend>
              </StatCard>
              <StatCard>
                <StatNumber>{currentPatientIndex}</StatNumber>
                <StatLabel>Completed</StatLabel>
                <StatTrend $up={true}>Served</StatTrend>
              </StatCard>
              <StatCard>
                <StatNumber>{Math.max(0, appointments.length - currentPatientIndex - 1)}</StatNumber>
                <StatLabel>Waiting</StatLabel>
                <StatTrend $up={false}>Queue</StatTrend>
              </StatCard>
              <StatCard>
                <StatNumber>{currentPatient ? `A-${currentPatient.id}` : '-'}</StatNumber>
                <StatLabel>Current</StatLabel>
              </StatCard>
            </StatsGrid>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              <Card>
                <CardTitle>Current Consultation</CardTitle>
                <CardContent>
                  {currentPatient ? (
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                      <div style={{ width: '100px', height: '100px', background: '#F5F0E8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontFamily: '"Fraunces", serif' }}>
                        {currentPatient.id}
                      </div>
                      <div>
                        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Patient #{currentPatient.patientId || "Unknown"}</h2>
                        <p style={{ fontSize: '14px' }}>Reason: {currentPatient.reason}</p>
                        <p style={{ fontSize: '14px', marginTop: '4px' }}>Doctor: Dr. {currentPatient.doctor?.fullName || "Assigned"}</p>
                        <Badge variant="success" style={{ marginTop: '1rem' }}>Active Session</Badge>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                      <p>Queue is currently empty.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div>
                <SectionLabel>Up Next</SectionLabel>
                <AppointmentList>
                  {appointments.slice(currentPatientIndex).map((appt, i) => (
                    <AppointmentRow key={appt.id}>
                      <AppointmentDate>
                        <AppointmentDay>{new Date(appt.date).getDate()}</AppointmentDay>
                        <AppointmentMonth>{new Date(appt.date).toLocaleString('default', { month: 'short' })}</AppointmentMonth>
                      </AppointmentDate>
                      <AppointmentInfo>
                        <AppointmentDoctor>Turn #{appt.id}</AppointmentDoctor>
                        <AppointmentDetail>{appt.reason}</AppointmentDetail>
                      </AppointmentInfo>
                      <AppointmentActions>
                        {i === 0 ? "Serving" : "Waiting"}
                      </AppointmentActions>
                    </AppointmentRow>
                  ))}
                </AppointmentList>
              </div>
            </div>
          </DashboardContainer>
        )}

        {activeView === "doctors" && role === 'admin' && (
          <DashboardContainer>
            <SectionLabel>Administration</SectionLabel>
            <Card>
              <CardTitle>Add New Medical Professional</CardTitle>
              <CardContent>
                <form onSubmit={handleAddDoctor} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', opacity: 0.6, textTransform: 'uppercase', fontFamily: 'DM Mono' }}>Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={newDoc.fullName}
                      onChange={e => setNewDoc({...newDoc, fullName: e.target.value})}
                      style={{ padding: '12px', border: '1px solid #ddd', background: 'rgba(255,255,255,0.5)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', opacity: 0.6, textTransform: 'uppercase', fontFamily: 'DM Mono' }}>Medical Email</label>
                    <input 
                      type="email" 
                      required 
                      value={newDoc.email}
                      onChange={e => setNewDoc({...newDoc, email: e.target.value})}
                      style={{ padding: '12px', border: '1px solid #ddd', background: 'rgba(255,255,255,0.5)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', opacity: 0.6, textTransform: 'uppercase', fontFamily: 'DM Mono' }}>Temporary Password</label>
                    <input 
                      type="password" 
                      required 
                      value={newDoc.password}
                      onChange={e => setNewDoc({...newDoc, password: e.target.value})}
                      style={{ padding: '12px', border: '1px solid #ddd', background: 'rgba(255,255,255,0.5)', outline: 'none' }}
                    />
                  </div>
                  <Button type="submit" style={{ marginTop: 'auto' }}>
                    <span>Register Doctor</span>
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div style={{ marginTop: '3rem' }}>
              <SectionLabel>Existing Medical Staff</SectionLabel>
              <StatsGrid>
                {doctors.map(doc => (
                  <StatCard key={doc.id}>
                    <StatNumber style={{ fontSize: '18px' }}>Dr. {doc.fullName}</StatNumber>
                    <StatLabel>{doc.email}</StatLabel>
                  </StatCard>
                ))}
              </StatsGrid>
            </div>
          </DashboardContainer>
        )}

        {notification && (
          <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#1A1814', color: '#FAF7F2', padding: '1rem 2rem', borderRadius: '4px', fontFamily: '"DM Mono", monospace', fontSize: '12px', zIndex: 2000, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            ✓ {notification}
          </div>
        )}
      </ContentArea>
    </MainLayout>
  );
}