// pages/api/updatePassword.js or pages/[your_page].js

import {GoogleAuth} from 'google-auth-library';

// This is a makeshift approach; place this inside [your_page].js for testing
export default async function updatePasswordHandler(req, res) {
  // Only proceed for POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { emailAddress, newPassword } = req.body;

  // For demonstration, let's assume you have a secure way to handle keyFilePath
  const keyFilePath = './src/pages/ab.json';
  const targetAudience = 'https://us-central1-ab-automations-402216.cloudfunctions.net/updatePassword';

  const auth = new GoogleAuth({
    keyFilename: keyFilePath,
  });

  try {
    const client = await auth.getIdTokenClient(targetAudience);
    const response = await client.request({
      url: targetAudience,
      method: 'POST',
      data: JSON.stringify({ emailAddress, newPassword }),
      headers: {
          'Content-Type': 'application/json',
      },
  });

    if (response.status === 200) {
      return res.status(200).json({ message: 'Password updated successfully' });
    } else {
      return res.status(response.status).json({ error: 'Failed to update password' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
