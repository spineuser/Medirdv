const API = "http://localhost:3001";

export const getAppointments = async () => {
  const res = await fetch(`${API}/appointments`);
  return res.json();
};

export const createAppointment = async (data) => {
  const res = await fetch(`${API}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getDoctors = async () => {
  const res = await fetch(`${API}/users`);
  const data = await res.json();
  return data.filter((u) => u.role === "doctor");
};

export const login = async (data) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (result.access_token) {
    localStorage.setItem('token', result.access_token);
    // Decode role from token or assume patient for now
    localStorage.setItem('role', result.user?.role || 'patient'); 
  }
  return result;
};

export const register = async (data) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createDoctor = async (data) => {
  const res = await fetch(`${API}/users`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ ...data, role: 'doctor' }),
  });
  return res.json();
};