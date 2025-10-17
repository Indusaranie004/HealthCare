import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar";

const RecordUpdatedSuccess = () => {
  return (
    <>
      {/* Internal CSS via <style> tag */}
      <style>
        {`
          .success-container {
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            text-align: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .checkmark-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .checkmark-icon svg {
            width: 100%;
            height: 100%;
          }

          .success-title {
            color: #1a75ff;
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .success-subtitle {
            color: #666;
            font-size: 16px;
            margin-bottom: 30px;
            line-height: 1.5;
          }

          .summary-box {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            text-align: left;
          }

          .summary-box h3 {
            margin-top: 0;
            margin-bottom: 15px;
            color: #333;
            font-size: 18px;
          }

          .change-row {
            display: flex;
            margin-bottom: 15px;
            align-items: flex-start;
          }

          .change-row .label {
            font-weight: 600;
            min-width: 120px;
            color: #555;
          }

          .change-row .value {
            flex: 1;
            color: #333;
            position: relative;
          }

          .change-row .value::before {
            content: '';
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 4px;
            background-color: #1a75ff;
            border-radius: 50%;
          }

          .change-highlight {
            color: #1a75ff;
            font-weight: 600;
            background-color: #e3f2fd;
            padding: 2px 4px;
            border-radius: 4px;
            margin-left: 4px;
          }

          .button-group {
            display: flex;
            gap: 15px;
            justify-content: center;
          }

          .btn {
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            display: inline-block;
            text-align: center;
          }

          .btn-outline {
            border: 2px solid #6c757d;
            color: #6c757d;
            background-color: transparent;
          }

          .btn-outline:hover {
            background-color: #f8f9fa;
            border-color: #495057;
          }

          .btn-primary {
            background-color: #1a75ff;
            color: white;
            border: none;
          }

          .btn-primary:hover {
            background-color: #155ecb;
          }
        `}
      </style>
          <Sidebar />
      {/* UI Content */}
      <div className="success-container">
        <div className="checkmark-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1a75ff" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l3 3 6-6" />
          </svg>
        </div>

        <h1 className="success-title">Record Updated Successfully!</h1>

        <p className="success-subtitle">
          The patient's medical records have been securely updated and saved to the system.
        </p>

        <div className="summary-box">
          <h3>Summary of Changes:</h3>
          <div className="change-row">
            <span className="label">Diagnosis:</span>
            <span className="value">
              Hypertension (Stage 1)
              <span className="change-highlight">Hypertension (Stage 2) - Updated</span>
            </span>
          </div>
          <div className="change-row">
            <span className="label">Medication:</span>
            <span className="value">
              Lisinopril 10mg
              <span className="change-highlight">Lisinopril 20mg - Increased Dosage</span>
            </span>
          </div>
          {/* <div className="change-row">
            <span className="label">Next Appointment:</span>
            <span className="value">
              2024-08-15
              <span className="change-highlight">2024-09-01 - Rescheduled</span>
            </span>
          </div> */}
          <div className="change-row">
            <span className="label">Notes:</span>
            <span className="value">
              Patient stable.
              <span className="change-highlight">Patient reported new symptoms; advised further testing. - Added</span>
            </span>
          </div>
        </div>

        <div className="button-group">
          <Link to="/patient-medical-records" className="btn btn-outline">
            Return to Patient Records
          </Link>
          <Link to="/" className="btn btn-primary">
            Continue Workflow
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecordUpdatedSuccess;