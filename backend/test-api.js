const API_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('Starting API validation tests...');

  try {
    // 1. Test Login with Admin Seed
    console.log('\nTesting login with seeded admin...');
    const adminLoginRes = await fetchJson(`${API_URL}/auth/login`, 'POST', {
      email: 'admin@bistro.com',
      password: 'admin123'
    });
    console.log('✓ Login successful!', adminLoginRes.email, adminLoginRes.role);
    const adminToken = adminLoginRes.token;

    // 2. Test Get User Profile
    console.log('\nTesting fetch profile...');
    const profileRes = await fetchJson(`${API_URL}/auth/profile`, 'GET', null, adminToken);
    console.log('✓ Profile retrieved!', profileRes.name, profileRes.email);

    // 3. Test Update User Profile
    console.log('\nTesting update profile...');
    const updateRes = await fetchJson(`${API_URL}/auth/profile`, 'PUT', {
      name: 'Admin User Updated',
      phone: '555-555-5555'
    }, adminToken);
    console.log('✓ Profile updated!', updateRes.name, updateRes.phone);

    // 4. Test Get Users (Admin only)
    console.log('\nTesting get all users (Admin only)...');
    const usersRes = await fetchJson(`${API_URL}/users`, 'GET', null, adminToken);
    console.log(`✓ Retrieved ${usersRes.length} users successfully!`);

    // 5. Test Register a new normal user
    console.log('\nTesting register normal user...');
    const userEmail = `test_${Date.now()}@mail.com`;
    const userRegisterRes = await fetchJson(`${API_URL}/auth/register`, 'POST', {
      name: 'Test Customer',
      email: userEmail,
      password: 'customer123'
    });
    console.log('✓ Customer registered!', userRegisterRes.email, userRegisterRes.role);
    const userToken = userRegisterRes.token;

    // 6. Test Book Table (Customer only)
    console.log('\nTesting book table...');
    const bookingRes = await fetchJson(`${API_URL}/bookings`, 'POST', {
      name: 'Test Reservation',
      phone: '999-999-9999',
      date: '2026-10-31',
      time: '19:00',
      totalPerson: '4 People'
    }, userToken);
    console.log('✓ Table booked!', bookingRes._id, bookingRes.status);
    const bookingId = bookingRes._id;

    // 7. Test Fetch My Bookings (Customer)
    console.log('\nTesting fetch customer bookings...');
    const myBookingsRes = await fetchJson(`${API_URL}/bookings/my-bookings`, 'GET', null, userToken);
    console.log(`✓ Retrieved ${myBookingsRes.length} bookings for user!`);

    // 8. Test Fetch All Bookings (Admin)
    console.log('\nTesting fetch all bookings (Admin)...');
    const allBookingsRes = await fetchJson(`${API_URL}/bookings`, 'GET', null, adminToken);
    console.log(`✓ Retrieved ${allBookingsRes.length} total bookings!`);

    // 9. Test Accept Booking (Admin)
    console.log('\nTesting approve booking status (Admin)...');
    const approveRes = await fetchJson(`${API_URL}/bookings/${bookingId}/status`, 'PATCH', {
      status: 'accepted'
    }, adminToken);
    console.log('✓ Booking approved!', approveRes._id, approveRes.status);

    // 10. Test Fetch Menu Items (Public)
    console.log('\nTesting get menu items (Public)...');
    const menuRes = await fetchJson(`${API_URL}/menu`, 'GET');
    console.log(`✓ Retrieved ${menuRes.length} menu items!`);

    console.log('\n=========================================');
    console.log('ALL API VALIDATION TESTS PASSED SUCCESSFULLY!');
    console.log('=========================================');
  } catch (err) {
    console.error('\n❌ Test failed with error:', err.message);
    process.exit(1);
  }
}

async function fetchJson(url, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP ${response.status} Error`);
  }

  return data;
}

runTests();
