import {GoogleAuth} from 'google-auth-library';

export default async function updatePasswordHandler(req, res) {
  // Only proceed for POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { emailAddress, newPassword } = req.body;

  // Construct credentials object from environment variables
  const credentials = {
    type: process.env.GOOGLE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    // Replace newline placeholders in private key with actual newline characters
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN, // Only if this field is needed
  };

  const targetAudience = 'https://us-central1-ab-automations-402216.cloudfunctions.net/updatePassword';

  const auth = new GoogleAuth({
    credentials,
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
