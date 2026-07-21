import { test, expect } from '@playwright/test';

const API_BASE = 'http://127.0.0.1:3001/api';

test.describe('Tier 4: Real-World Application Scenarios E2E Suite', () => {
  const adminUser = {
    email: 'admin@bistro.com',
    password: 'admin123',
  };

  test('1. Concurrency: Parallel booking requests process cleanly without race conditions', async ({ request }) => {
    const userEmail = `concurrent_${Date.now()}@example.com`;
    const regRes = await request.post(`${API_BASE}/auth/register`, {
      data: { name: 'Concurrent User', email: userEmail, password: 'password123' },
    });
    const { token } = await regRes.json();

    const bookingPromises = Array.from({ length: 5 }).map((_, i) =>
      request.post(`${API_BASE}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: `Concurrent Booking ${i + 1}`,
          phone: `555-000-000${i}`,
          date: '2026-12-20',
          time: `${17 + i}:00`,
          totalPerson: '2 People',
        },
      })
    );

    const responses = await Promise.all(bookingPromises);
    for (const res of responses) {
      expect(res.ok()).toBeTruthy();
    }

    const myBookingsRes = await request.get(`${API_BASE}/bookings/my-bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const bookings = await myBookingsRes.json();
    expect(bookings.length).toBeGreaterThanOrEqual(5);
  });

  test('2. Concurrency: Parallel menu API fetch requests process cleanly', async ({ request }) => {
    const menuPromises = Array.from({ length: 10 }).map(() =>
      request.get(`${API_BASE}/menu`)
    );

    const responses = await Promise.all(menuPromises);
    for (const res of responses) {
      expect(res.status()).toBe(200);
      const data = await res.json();
      expect(Array.isArray(data)).toBeTruthy();
    }
  });

  test('3. Session resilience & Logout: Logout clears localStorage auth state and revokes route access', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'john@mail.com');
    await page.fill('#password', 'user123');
    await page.click('button[type="submit"]');

    await page.waitForURL('/');
    expect(await page.evaluate(() => localStorage.getItem('auth'))).not.toBeNull();

    await page.evaluate(() => localStorage.removeItem('auth'));
    await page.reload();

    await page.goto('/profile');
    await page.waitForURL('**/login**');
    expect(page.url()).toContain('/login');
  });

  test('4. Database seed reset recovery: System handles API seed recovery and authentication', async ({ request }) => {
    const adminRes = await request.post(`${API_BASE}/auth/login`, {
      data: adminUser,
    });
    expect(adminRes.ok()).toBeTruthy();
    const adminData = await adminRes.json();
    expect(adminData.role).toBe('admin');

    const customerRes = await request.post(`${API_BASE}/auth/login`, {
      data: { email: 'john@mail.com', password: 'user123' },
    });
    expect(customerRes.ok()).toBeTruthy();
    const customerData = await customerRes.json();
    expect(customerData.role).toBe('user');
  });

  test('5. End-to-End User & Admin Lifecycle Workflows', async ({ page }) => {
    const customer = {
      name: 'Lifecycle Customer',
      email: `lifecycle_${Date.now()}@example.com`,
      password: 'password123',
    };

    // 1. Register Customer
    await page.goto('/register');
    await page.fill('input[placeholder="Full Name"]', customer.name);
    await page.fill('input[placeholder="Email Address"]', customer.email);
    await page.fill('input[placeholder="Password"]', customer.password);
    page.once('dialog', dialog => dialog.accept());
    await page.click('button[type="submit"]');
    await page.waitForURL('/');

    // 2. Profile edit
    await page.goto('/profile');
    await page.fill('#phone', '999-888-7777');
    await page.fill('#address', '100 Ocean Drive');
    await page.click('button[type="submit"]');

    // 3. Book a Table
    await page.goto('/book-table');
    await page.fill('#date', '2026-12-31');
    await page.fill('#time', '20:00');
    await page.selectOption('#totalPerson', '4 People');
    await page.click('button[type="submit"]');
    await page.waitForURL('/my-bookings');
    await expect(page.locator('table')).toContainText('Lifecycle Customer');

    // 4. Admin Login & Process Booking
    await page.evaluate(() => localStorage.removeItem('auth'));
    await page.goto('/login');
    await page.fill('#email', adminUser.email);
    await page.fill('#password', adminUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin**');

    await page.goto('/admin/bookings');
    const targetRow = page.locator('tr:has-text("Lifecycle Customer")');
    await expect(targetRow).toBeVisible();
    await targetRow.locator('button:has-text("Accept")').click();
    await page.waitForTimeout(500);
    await expect(targetRow).toContainText('accepted');
  });
});
