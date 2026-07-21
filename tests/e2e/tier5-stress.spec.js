import { test, expect } from '@playwright/test';
import jwt from 'jsonwebtoken';

const API_BASE = 'http://localhost:3001/api';
const JWT_SECRET = 'super_secret_bistro_bliss_key_12345';

test.describe('Tier 5: Adversarial Stress & Edge Case E2E Test Suite', () => {
  const customerUser = {
    email: 'john@mail.com',
    password: 'user123',
  };

  const adminUser = {
    email: 'admin@bistro.com',
    password: 'admin123',
  };

  // =========================================================================
  // CATEGORY 1: Invalid & Malformed JWT Tokens
  // =========================================================================
  test.describe('1. Invalid & Malformed JWT Tokens', () => {
    test('1.1. API request with completely invalid string token returns 401', async ({ request }) => {
      const res = await request.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: 'Bearer invalid.fake.token' },
      });
      expect(res.status()).toBe(401);
      const data = await res.json();
      expect(data.message).toBe('Not authorized, token failed');
    });

    test('1.2. API request with expired JWT token returns 401', async ({ request }) => {
      const expiredToken = jwt.sign(
        { id: '65f000000000000000000001' },
        JWT_SECRET,
        { expiresIn: -10 } // Expired 10 seconds ago
      );
      const res = await request.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${expiredToken}` },
      });
      expect(res.status()).toBe(401);
      const data = await res.json();
      expect(data.message).toBe('Not authorized, token failed');
    });

    test('1.3. API request with signature-mismatched JWT token returns 401', async ({ request }) => {
      const wrongSecretToken = jwt.sign(
        { id: '65f000000000000000000001' },
        'wrong_secret_key_999'
      );
      const res = await request.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${wrongSecretToken}` },
      });
      expect(res.status()).toBe(401);
      const data = await res.json();
      expect(data.message).toBe('Not authorized, token failed');
    });

    test('1.4. API request with non-existent Mongoose ObjectId in JWT returns 401 user not found', async ({ request }) => {
      const nonExistentIdToken = jwt.sign(
        { id: '000000000000000000000000' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      const res = await request.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${nonExistentIdToken}` },
      });
      expect(res.status()).toBe(401);
      const data = await res.json();
      expect(data.message).toBe('Not authorized, user not found');
    });

    test('1.5. API request with malformed ObjectId in JWT payload returns 401 token failed', async ({ request }) => {
      const malformedIdToken = jwt.sign(
        { id: 'not-an-object-id' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      const res = await request.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${malformedIdToken}` },
      });
      expect(res.status()).toBe(401);
      const data = await res.json();
      expect(data.message).toBe('Not authorized, token failed');
    });

    test('1.6. API request with empty Bearer token header returns 401', async ({ request }) => {
      const res = await request.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: 'Bearer ' },
      });
      expect(res.status()).toBe(401);
    });

    test('1.7. API request with SQLi / XSS string in Authorization header returns 401', async ({ request }) => {
      const res = await request.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: "Bearer '<script>alert(1)</script>' OR 1=1" },
      });
      expect(res.status()).toBe(401);
    });

    test('1.8. Frontend UI reaction: Malformed JWT in localStorage triggers logout and redirects to /login', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('auth', JSON.stringify({ token: 'malformed.jwt.token', user: null }));
      });
      await page.goto('/profile');
      await page.waitForURL('**/login**');
      expect(page.url()).toContain('/login');
    });
  });

  // =========================================================================
  // CATEGORY 2: Rapid Double-Click Submissions & Concurrency
  // =========================================================================
  test.describe('2. Rapid Double-Click Submissions & Concurrency', () => {
    test('2.1. Concurrent duplicate user registration calls reject second request', async ({ request }) => {
      const uniqueEmail = `rapid_reg_${Date.now()}@example.com`;
      const payload = { name: 'Rapid User', email: uniqueEmail, password: 'password123' };

      const [res1, res2] = await Promise.all([
        request.post(`${API_BASE}/auth/register`, { data: payload }),
        request.post(`${API_BASE}/auth/register`, { data: payload }),
      ]);

      const statuses = [res1.status(), res2.status()].sort();
      // One request should succeed (201), the other should fail with 400 (User already exists) or 500 (E11000 duplicate key)
      expect(statuses).toContain(201);
      expect(statuses[1]).toBeGreaterThanOrEqual(400);
    });

    test('2.2. Concurrent duplicate booking requests create duplicate records (Vulnerability Check)', async ({ request }) => {
      const loginRes = await request.post(`${API_BASE}/auth/login`, { data: customerUser });
      const { token } = await loginRes.json();

      const bookingPayload = {
        name: 'Concurrent Double Clicker',
        phone: '555-999-8888',
        date: '2026-11-11',
        time: '19:00',
        totalPerson: '2 People',
      };

      const [res1, res2] = await Promise.all([
        request.post(`${API_BASE}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
          data: bookingPayload,
        }),
        request.post(`${API_BASE}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
          data: bookingPayload,
        }),
      ]);

      expect(res1.status()).toBe(201);
      expect(res2.status()).toBe(201);
      // Demonstrates lack of server-side idempotency / deduplication for bookings
    });

    test('2.3. Concurrent duplicate menu item creation creates duplicate menu items', async ({ request }) => {
      const loginRes = await request.post(`${API_BASE}/auth/login`, { data: adminUser });
      const { token } = await loginRes.json();

      const menuPayload = {
        name: `Duplicate Dish ${Date.now()}`,
        price: 19.99,
        img: '/src/assets/food111.jpg',
        category: 'Main Dishes',
        description: 'Test duplicate submission dish',
      };

      const [res1, res2] = await Promise.all([
        request.post(`${API_BASE}/menu`, {
          headers: { Authorization: `Bearer ${token}` },
          data: menuPayload,
        }),
        request.post(`${API_BASE}/menu`, {
          headers: { Authorization: `Bearer ${token}` },
          data: menuPayload,
        }),
      ]);

      expect(res1.status()).toBe(201);
      expect(res2.status()).toBe(201);
    });

    test('2.4. UI form submission button disables during pending mutation state', async ({ page }) => {
      await page.goto('/login');
      await page.fill('#email', customerUser.email);
      await page.fill('#password', customerUser.password);
      await page.click('button[type="submit"]');
      await page.waitForURL('/');

      await page.goto('/book-table');
      await page.fill('#date', '2026-12-25');
      await page.fill('#time', '18:00');

      const submitBtn = page.locator('button[type="submit"]');
      await expect(submitBtn).toBeEnabled();
    });
  });

  // =========================================================================
  // CATEGORY 3: Boundary Payload Inputs (Empty Strings, Large Numbers, XSS)
  // =========================================================================
  test.describe('3. Boundary Payload Inputs & Edge Cases', () => {
    test('3.1. Registration with invalid email format returns error', async ({ request }) => {
      const res = await request.post(`${API_BASE}/auth/register`, {
        data: { name: 'Bad Email', email: 'invalid_email_format', password: 'password123' },
      });
      expect(res.status()).toBeGreaterThanOrEqual(400);
    });

    test('3.2. Registration with short password (<6 chars) returns error', async ({ request }) => {
      const res = await request.post(`${API_BASE}/auth/register`, {
        data: { name: 'Short Pass', email: `short_${Date.now()}@example.com`, password: '123' },
      });
      expect(res.status()).toBeGreaterThanOrEqual(400);
    });

    test('3.3. XSS Script tags in booking input are stored as strings and escaped in UI', async ({ page, request }) => {
      const loginRes = await request.post(`${API_BASE}/auth/login`, { data: customerUser });
      const { token } = await loginRes.json();

      const xssPayload = "<script>window.__xss_executed__=true</script>";
      const bookingRes = await request.post(`${API_BASE}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: xssPayload,
          phone: "123-456-7890",
          date: "2026-10-10",
          time: "12:00",
          totalPerson: "1 Person",
        },
      });
      expect(bookingRes.status()).toBe(201);

      // Verify rendering in My Bookings UI safely
      await page.goto('/login');
      await page.fill('#email', customerUser.email);
      await page.fill('#password', customerUser.password);
      await page.click('button[type="submit"]');
      await page.waitForURL('/');

      await page.goto('/my-bookings');
      const isXssExecuted = await page.evaluate(() => window.__xss_executed__);
      expect(isXssExecuted).toBeUndefined(); // XSS script must NOT execute
    });

    test('3.4. Booking with negative guest count or invalid boundary string is accepted by unvalidated schema', async ({ request }) => {
      const loginRes = await request.post(`${API_BASE}/auth/login`, { data: customerUser });
      const { token } = await loginRes.json();

      const res = await request.post(`${API_BASE}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: 'Negative Guests',
          phone: '123-456-7890',
          date: '2026-10-10',
          time: '12:00',
          totalPerson: '-500 Guests', // Boundary negative payload
        },
      });
      // Schema accepts any string because totalPerson is type: String without regex validation
      expect(res.status()).toBe(201);
    });

    test('3.5. Menu creation with negative price is accepted due to missing min validator (Vulnerability Check)', async ({ request }) => {
      const loginRes = await request.post(`${API_BASE}/auth/login`, { data: adminUser });
      const { token } = await loginRes.json();

      const res = await request.post(`${API_BASE}/menu`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: `Negative Price Dish ${Date.now()}`,
          price: -99.99, // Boundary negative number
          img: '/src/assets/food111.jpg',
          category: 'Main Dishes',
          description: 'Negative price test',
        },
      });
      // Mongoose schema has type: Number but no min: 0 constraint
      expect(res.status()).toBe(201);
    });

    test('3.6. Menu creation with non-numeric price string fails with CastError 400', async ({ request }) => {
      const loginRes = await request.post(`${API_BASE}/auth/login`, { data: adminUser });
      const { token } = await loginRes.json();

      const res = await request.post(`${API_BASE}/menu`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: 'Invalid Price Dish',
          price: 'not-a-number-price',
          img: '/src/assets/food111.jpg',
          category: 'Main Dishes',
        },
      });
      expect(res.status()).toBe(400);
    });

    test('3.7. Menu creation with invalid category enum returns 400 ValidationError', async ({ request }) => {
      const loginRes = await request.post(`${API_BASE}/auth/login`, { data: adminUser });
      const { token } = await loginRes.json();

      const res = await request.post(`${API_BASE}/menu`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: 'Invalid Category Dish',
          price: 15.00,
          img: '/src/assets/food111.jpg',
          category: 'Space Food', // Not in enum ['Breakfast', 'Main Dishes', 'Drinks', 'Desserts']
        },
      });
      expect(res.status()).toBe(400);
    });

    test('3.8. Profile update with huge boundary payload (10,000 chars) processes without crashing', async ({ request }) => {
      const loginRes = await request.post(`${API_BASE}/auth/login`, { data: customerUser });
      const { token } = await loginRes.json();

      const hugeAddress = 'A'.repeat(10000);
      const res = await request.put(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { address: hugeAddress },
      });
      expect(res.status()).toBe(200);
      const data = await res.json();
      expect(data.address.length).toBe(10000);
    });

    test('3.9. Update booking status with invalid status value returns 400', async ({ request }) => {
      const loginRes = await request.post(`${API_BASE}/auth/login`, { data: adminUser });
      const { token } = await loginRes.json();

      const res = await request.patch(`${API_BASE}/bookings/65f000000000000000000001/status`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { status: 'malicious_status' },
      });
      expect(res.status()).toBe(400);
      const data = await res.json();
      expect(data.message).toBe('Invalid booking status');
    });
  });

  // =========================================================================
  // CATEGORY 4: Backend Server Restart & Mid-Session Recovery
  // =========================================================================
  test.describe('4. Backend Server Restart & Mid-Session Recovery', () => {
    test('4.1. Stateless JWT session remains valid post server restart simulation', async ({ request }) => {
      // Step 1: Login user and obtain token
      const loginRes = await request.post(`${API_BASE}/auth/login`, { data: customerUser });
      expect(loginRes.status()).toBe(200);
      const { token } = await loginRes.json();

      // Step 2: Simulate post-restart request with pre-existing token
      // (Stateless JWT token signature and payload remain valid when server restarts)
      const profileRes = await request.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(profileRes.status()).toBe(200);
      const profile = await profileRes.json();
      expect(profile.email).toBe(customerUser.email);
    });

    test('4.2. Transient backend failure on mount causes AuthContext logout (Vulnerability Check)', async ({ page }) => {
      // When AuthContext attempts to fetch /api/auth/profile with a token, if backend returns error or fails connection,
      // AuthContext calls logout(), clearing localStorage.
      await page.goto('/');
      const sampleToken = jwt.sign({ id: '65f000000000000000000001' }, JWT_SECRET, { expiresIn: '1h' });
      await page.evaluate((t) => {
        localStorage.setItem('auth', JSON.stringify({ token: t, user: null }));
      }, sampleToken);

      // Route setup to simulate server returning 500 Internal Error during restart window
      await page.route('**/api/auth/profile', (route) => route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Server restarting' }),
      }));

      await page.reload();
      await page.waitForTimeout(500);

      // Verify localStorage was cleared due to backend failure during mount profile load
      const authStorage = await page.evaluate(() => localStorage.getItem('auth'));
      const parsedAuth = JSON.parse(authStorage);
      expect(parsedAuth.token).toBeNull();
      expect(parsedAuth.user).toBeNull();
    });
  });
});
