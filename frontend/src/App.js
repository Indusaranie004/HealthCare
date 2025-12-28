import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import SearchPatients from "./components/SearchPatients";
import ScanHealthCard from "./components/ScanHealthCard";
import PatientRecords from "./components/PatientRecords";
import PatientMedicalRecords from "./components/PatientMedicalRecords";
import CreateRecordForm from "./components/CreateRecordForm";
import UpdateRecordForm from "./components/UpdateRecordForm";
import RecordUpdatedSuccess from "./components/RecordUpdatedSuccess";
import StaffLogin from "./components/StaffLogin";
import Analyze from "./components/Analyze";
import HomePageNew from "./components/HomePageNew";
import AboutUs from "./components/AboutUs";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageNew />} />
        <Route path="/login" element={<StaffLogin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search-patients" element={<SearchPatients />} />
        <Route path="/scan-health-card" element={<ScanHealthCard />} />
        <Route path="/manage-patient-records" element={<PatientRecords />} />
        <Route path="/patient-medical-records" element={<PatientMedicalRecords />} />
        <Route path="/create-medical-record/:patientId" element={<CreateRecordForm />} />
        <Route path="/update-medical-record/:recordId" element={<UpdateRecordForm />} />
        <Route path="/record-updated-success" element={<RecordUpdatedSuccess />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/about-us" element={<AboutUs />} />
        
      </Routes>
    </Router>
  );
}

export default App;
