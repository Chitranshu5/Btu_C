import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  url: { type: String, required: true },        // Public URL
  downloadUrl: { type: String, required: true }, // Download URL
  fileName: { type: String, required: true },    // File name
  createdAt: { type: Date, default: Date.now }   // Timestamp
});

export const PdfModel = mongoose.model('Pdf', pdfSchema);
