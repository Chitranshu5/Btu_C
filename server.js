
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import multer from 'multer';
import admin from 'firebase-admin';
import { connectToDatabase } from './model/db.js'; // Import your MongoDB model for storing PDFs
import { PdfModel } from './model/pdf.model.js';

// Load environment variables
config();

connectToDatabase(); // Connect to MongoDB

const FIREBASE_SERVICE_ACCOUNT_KEYC={
  "type": "service_account",
  "project_id": "kahani-cc1ab",
  "private_key_id": "858737eea250367e7cc7eb74fa56cca451588a1c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCf0My4Ad+PLJks\nUqeqpkvpZSzjP8JDY+1NnlohaDdZp3myODa/ACD/wqNpdtZrti948YdaFrUkKKgn\nbn4CaDyTXPWKT8VRo8OAMoJnZSQhXIvJOkIsGsmU0THLpD7tiW5UjVmzhSgGjXa9\n8x6k74/0+Krp1N5aRCblnwvTx3CXrPl8nOnuHTzD118qvVjKW7AVj+zSJ/REmY0I\naiUkBE182mZBhlXF5Cz1MO35bdcBMyjqbhD1rKKzxQIeHBOu5xmzISgrM4PwWZNJ\njOQcOj6Ww1WlUm5zwrKi5SxTlUsBaIWfPAbLGi4Ie8f3cXnTbc15uLTIc73cpEP+\ndotSAdDXAgMBAAECggEADuD8Jkd6XlSLIC7D0GXyHFUglDmr5uVHQxoyjviqaozm\njhqgsjCbYeRnnVqEhPutuMdX0CHcFHU6jo1Bawz0Us3tSEa7+qlR+r35GRI4Bmkc\n1Iu5fGy0BshhJ/HvL+NDI9kTGF0VyGJkQzP+zuFE2ExMcT+xwdqlemxPyBRB3cUF\nnmTkDFvdn7PBSAsNg5HPnEfqdaeJk7eNPQ2zdbommeqQuRlzeq4s77BPg5b6Nk4E\n8VLddq2fzyOcn05BpKpmq3XPZUL4BhltyII/gKfn2DOKifZCeETAdPUojqLW20Si\nDtvsjWCTJcr9gTKsyMxIFfARCWbVl0jIuT8q2cw1gQKBgQDbLXk8zRJgxBftjQdo\nDGZrwb0oUNKZ+gzmGEHttOm9AgQOYmyorH1mrx7VX5Ps/nHSFX76+X+NkusoBNu2\n5Rl5xI3wOu/kFG8trRCbIMr8o0ZBJyy6zdH9UVN0k1PAUkeowFC6sKibt3puKNgT\n8inxifAwLZ5QfLnVmLR8zSluVwKBgQC6qj+UfWoEscFKZRNq/9EXrnL4TEzOBMUL\nRgufUoFobd2Yj+Y71MDknT8rlzVTVOsIsZKEVHMhTkXLy3fqYAcs7xRTcDJIxk9O\n5Ow5wX74cCsWEOZkQ7sZUGkaVlx1F7+ScIgCj6p2zFpO09C4CF26/cT+o0W/BI9S\nTlnEzVghgQKBgQCnVyfKkTQn52/xcgyml1kXirsWbebtoul4QCsOB2OyaDialvEp\nM1EnNitPdALoHjje0oS5sAaAHB0o19S85lw2CSjpssX3mNZtxEX6euYgT7TTB8rx\n8TUTuKUES3vVSbzmjbbVYw3IniR+uPaI/AqkHNHipuHJyADGoSmkY6vvTwKBgDAO\n7wmi9G26+iHWPhaZQFMRheYpdsi/759EbG+bhVfGmXvS6JrU3si9N2tYpdELluuJ\nFEjfmTik91FN1FTSXmaSMzB8PWYBMKAGTk9cYv1Bm8Y1mauMyJnu2vB99ZXsBFWG\nhW3rYR7u4/1RiXYoKUGgXlyU2rsgSGoPZAtINv2BAoGBAKYQ/P5YCuFBXck1grIO\npj5+dUYIGj41ibowUmQo3v1ogSa7qA/CWLoiur98umrIs5H3mJiuTKHvpqnVXb0k\nBdLEDzfEQvwfCCIs5va72O1lc7udmahbU7BcBBGsd4jIJ4Y6mMex2sjzuYPxoLkp\nXYRXGqAUYUxZjjUFuqsJhBTy\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ita23@kahani-cc1ab.iam.gserviceaccount.com",
  "client_id": "109647248737301350247",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ita23%40kahani-cc1ab.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT_KEYC),
  storageBucket: "kahani-cc1ab.appspot.com",
});


const bucket = admin.storage().bucket();

// Set up Express app
const app = express();
app.use(cors());
app.use(express.json());

// Set up multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// API endpoint to upload a PDF to Firebase Storage and store URL in MongoDB
// app.post('/uploadPdf', upload.single('pdf'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: 'No PDF file uploaded' });
//     }

//     const fileName = `${Date.now()}_${req.file.originalname}`;
//     const file = bucket.file(fileName);

//     await file.save(req.file.buffer, {
//       metadata: { contentType: req.file.mimetype },
//     });

//     await file.makePublic();
//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

//     // Suggesting a download link
//     const downloadUrl = `${publicUrl}?alt=media&download=${fileName}`;

//     // Save both the public URL and download URL to MongoDB
//     const newPdf = new PdfModel({
//       url: publicUrl,
//       downloadUrl: downloadUrl,
//       fileName: fileName
//     });
//     await newPdf.save();

//     res.status(201).json({ success: true, url: publicUrl, downloadUrl: downloadUrl });
//   } catch (error) {
//     console.error('Error uploading PDF:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
//   }
// });



app.post('/uploadPdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No PDF file uploaded' });
    }

    const fileName = `${Date.now()}_${req.file.originalname}`;
    const file = bucket.file(fileName);

    // Set metadata to force file download
    const metadata = {
      contentType: req.file.mimetype,
      metadata: {
        contentDisposition: `attachment; filename="${fileName}"`, // Forces download
      },
    };

    await file.save(req.file.buffer, { metadata });

    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Suggesting a download link
    const downloadUrl = `${publicUrl}?alt=media&download=${fileName}`;

    // Save both the public URL and download URL to MongoDB
    const newPdf = new PdfModel({
      url: publicUrl,
      downloadUrl: downloadUrl,
      fileName: fileName
    });
    await newPdf.save();

    res.status(201).json({ success: true, url: publicUrl, downloadUrl: downloadUrl });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});


// API to fetch all PDFs from MongoDB
app.get('/getPdfs', async (req, res) => {
  try {
    const pdfs = await PdfModel.find(); // Fetch all PDF records
    res.status(200).json({ success: true, data: pdfs });
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

