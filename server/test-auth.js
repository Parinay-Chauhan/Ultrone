import axios from 'axios';

async function testAuth() {
  const testUser = `test_${Date.now()}`;
  const testPass = 'password123';

  console.log(`Testing registration with user: ${testUser}`);
  try {
    const regRes = await axios.post('http://localhost:3001/api/v1/users/register', {
      username: testUser,
      password: testPass
    });
    console.log("Registration SUCCESS:", regRes.status, regRes.data);
  } catch (err) {
    if (err.response) {
      console.error("Registration FAILED:", err.response.status, err.response.data);
    } else {
      console.error("Registration ERROR:", err.message);
    }
    return;
  }

  console.log(`Testing login with user: ${testUser}`);
  try {
    const loginRes = await axios.post('http://localhost:3001/api/v1/users/login', {
      username: testUser,
      password: testPass
    });
    console.log("Login SUCCESS:", loginRes.status, loginRes.data);
    const sessionToken = loginRes.data.data.sessionToken;

    console.log("Testing /token with sessionToken...");
    const tokenRes = await axios.post('http://localhost:3001/token', {}, {
      headers: { Authorization: `Bearer ${sessionToken}` }
    });
    console.log("/token SUCCESS:", tokenRes.status, tokenRes.data);
  } catch (err) {
    if (err.response) {
      console.error("FAILED with status:", err.response.status, err.response.data);
    } else {
      console.error("ERROR:", err.message);
    }
  }
}

testAuth();
