package com.HealthCare.HealthCare.patient.util;

import com.HealthCare.HealthCare.patient.model.Patient;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

/**
 * Utility class for generating QR codes for patients.
 * <p>
 * Encodes key patient information into a QR code image and returns it
 * as a Base64 string. This allows easy storage in the database and
 * rendering on the frontend.
 * </p>
 */
public class QRCodeGenerator {

    /**
     * Generates a QR code containing key patient details.
     *
     * @param patient the patient entity
     * @return Base64-encoded PNG image of the QR code
     * @throws WriterException if QR code encoding fails
     * @throws IOException     if writing the QR code to byte stream fails
     */
    public static String generateQRCode(Patient patient) throws WriterException, IOException {
        // Handle null insurance info gracefully
        String insuranceProvider = patient.getInsurancePayment() != null
                ? patient.getInsurancePayment().getInsuranceProvider()
                : "N/A";

        String policyNumber = patient.getInsurancePayment() != null
                ? patient.getInsurancePayment().getPolicyNumber()
                : "N/A";

        // Build the content to encode in the QR code
        String content = "PatientID: " + patient.getPatientId() + "\n" +
                "Name: " + patient.getFirstName() + " " + patient.getLastName() + "\n" +
                "DOB: " + patient.getDob() + "\n" +
                "Address: " + patient.getAddress() + "\n" +
                "Contact: " + patient.getContactNumber() + "\n" +
                "Insurance: " + insuranceProvider + "\n" +
                "Policy: " + policyNumber + "\n" +
                "Status: " + patient.getStatus();

        // Generate QR code using ZXing library
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 300, 300);

        // Convert BitMatrix to Base64 string
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
            return Base64.getEncoder().encodeToString(outputStream.toByteArray());
        }
    }
}
