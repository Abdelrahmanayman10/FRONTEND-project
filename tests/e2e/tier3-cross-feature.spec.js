import { test, expect } from '@playwright/test';

const API_BASE = 'http://127.0.0.1:3001/api';

test.describe('Tier 3: Cross-Feature & Multi-Role E2E Suite', () => {
  const adminUser = {
    email: 'admin@bistro.com',
    password: 'admin123',
  };

  test('1. Multi-role: Customer submits booking -> Admin approves -> Customer sees live "accepted" status update', async ({ page, request }) => {
    const customerEmail = `cross1_${Date.now()}@example.com`;
    const regRes = await request.post(`${API_BASE}/auth/register`, {
      data: { name: 'Cross Customer One', email: customerEmail, password: 'password123' },
    });
    const { token: customerToken } = await regRes.json();

    const bookingRes = await request.post(`${API_BASE}/bookings`, {
      headers: { Authorization: `Bearer ${customerToken}` },
      data: {
        name: 'Cross Customer One',
        phone: '555-111-2222',
        date: '2026-11-25',
        time: '18:30',
        totalPerson: '2 People',
      },
    });
    const booking = await bookingRes.json();

    const adminLoginRes = await request.post(`${API_BASE}/auth/login`, { data: adminUser });
    const { token: adminToken } = await adminLoginRes.json();

    await request.patch(`${API_BASE}/bookings/${booking._id}/status`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: { status: 'accepted' },
    });

    await page.goto('/login');
    await page.fill('#email', customerEmail);
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    await page.goto('/my-bookings');
    const targetRow = page.locator(`tr:has-text("Cross Customer One")`);
    await expect(targetRow).toContainText('accepted');
  });

  test('2. Multi-role: Customer submits booking -> Admin rejects -> Customer sees live "rejected" status update', async ({ page, request }) => {
    const customerEmail = `cross2_${Date.now()}@example.com`;
    const regRes = await request.post(`${API_BASE}/auth/register`, {
      data: { name: 'Cross Customer Two', email: customerEmail, password: 'password123' },
    });
    const { token: customerToken } = await regRes.json();

    const bookingRes = await request.post(`${API_BASE}/bookings`, {
      headers: { Authorization: `Bearer ${customerToken}` },
      data: {
        name: 'Cross Customer Two',
        phone: '555-333-4444',
        date: '2026-11-26',
        time: '19:00',
        totalPerson: '4 People',
      },
    });
    const booking = await bookingRes.json();

    const adminLoginRes = await request.post(`${API_BASE}/auth/login`, { data: adminUser });
    const { token: adminToken } = await adminLoginRes.json();

    await request.patch(`${API_BASE}/bookings/${booking._id}/status`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: { status: 'rejected' },
    });

    await page.goto('/login');
    await page.fill('#email', customerEmail);
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    await page.goto('/my-bookings');
    const targetRow = page.locator(`tr:has-text("Cross Customer Two")`);
    await expect(targetRow).toContainText('rejected');
  });

  test('3. Multi-role: Admin adds new dish on /admin/menu -> Customer views dish on public catalog', async ({ page, request }) => {
    const dishName = `Tier3 Special ${Date.now()}`;
    const adminLoginRes = await request.post(`${API_BASE}/auth/login`, { data: adminUser });
    const { token: adminToken } = await adminLoginRes.json();

    await request.post(`${API_BASE}/menu`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: {
        name: dishName,
        price: 24.99,
        img: '/src/assets/food111.jpg',
        category: 'Main Dishes',
        description: 'Multi-role sync test dish',
      },
    });

    await page.goto('/menu');
    await page.click('button:has-text("Main Dishes")');
    await expect(page.locator('.grid')).toContainText(dishName);
  });

  test('4. Multi-role: Admin deletes dish on /admin/menu -> Dish removed from public catalog', async ({ page, request }) => {
    const dishName = `ToDelete Dish ${Date.now()}`;
    const adminLoginRes = await request.post(`${API_BASE}/auth/login`, { data: adminUser });
    const { token: adminToken } = await adminLoginRes.json();

    const itemRes = await request.post(`${API_BASE}/menu`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: {
        name: dishName,
        price: 9.99,
        img: '/src/assets/food222.jpg',
        category: 'Drinks',
        description: 'Temporary dish to delete',
      },
    });
    const createdItem = await itemRes.json();

    await request.delete(`${API_BASE}/menu/${createdItem._id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    await page.goto('/menu');
    await expect(page.locator('.grid')).not.toContainText(dishName);
  });

  test('5. Cross-feature: User registration syncs profile state correctly', async ({ page }) => {
    const email = `reg_sync_${Date.now()}@example.com`;
    const name = 'Reg Sync User';

    await page.goto('/register');
    await page.fill('input[placeholder="Full Name"]', name);
    await page.fill('input[placeholder="Email Address"]', email);
    await page.fill('input[placeholder="Password"]', 'password123');

    page.once('dialog', dialog => dialog.accept());
    await page.click('button[type="submit"]');
    await page.waitForURL('/');

    await page.goto('/profile');
    await expect(page.locator('#name')).toHaveValue(name);
    await expect(page.locator('#email')).toHaveValue(email);
  });

  test('6. Cross-feature: Profile phone update autofills reservation form', async ({ page }) => {
    const email = `autofill_${Date.now()}@example.com`;
    await page.goto('/register');
    await page.fill('input[placeholder="Full Name"]', 'Autofill User');
    await page.fill('input[placeholder="Email Address"]', email);
    await page.fill('input[placeholder="Password"]', 'password123');
    page.once('dialog', dialog => dialog.accept());
    await page.click('button[type="submit"]');
    await page.waitForURL('/');

    const newPhone = '555-888-9999';
    await page.goto('/profile');
    await page.fill('#phone', newPhone);
    await page.click('button[type="submit"]');

    await page.goto('/book-table');
    await expect(page.locator('#phone')).toHaveValue(newPhone);
  });

  test('7. Multi-role: Admin toggles user role to admin -> Promoted user gains admin route access', async ({ page, request }) => {
    const email = `promote_${Date.now()}@example.com`;
    const regRes = await request.post(`${API_BASE}/auth/register`, {
      data: { name: 'Promote User', email, password: 'password123' },
    });
    const { _id: userId } = await regRes.json();

    const adminLoginRes = await request.post(`${API_BASE}/auth/login`, { data: adminUser });
    const { token: adminToken } = await adminLoginRes.json();

    await request.patch(`${API_BASE}/users/${userId}/role`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    await page.goto('/login');
    await page.fill('#email', email);
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/admin**');
    expect(page.url()).toContain('/admin');
  });

  test('8. Cross-feature: Customer reservation populates customer email on Admin Bookings view', async ({ page, request }) => {
    const customerEmail = `populated_${Date.now()}@example.com`;
    const regRes = await request.post(`${API_BASE}/auth/register`, {
      data: { name: 'Populated User', email: customerEmail, password: 'password123' },
    });
    const { token: customerToken } = await regRes.json();

    await request.post(`${API_BASE}/bookings`, {
      headers: { Authorization: `Bearer ${customerToken}` },
      data: {
        name: 'Populated Reservation',
        phone: '555-000-1111',
        date: '2026-12-15',
        time: '21:00',
        totalPerson: '3 People',
      },
    });

    await page.goto('/login');
    await page.fill('#email', adminUser.email);
    await page.fill('#password', adminUser.password);
    await page.click('button[type="submit"]');

    await page.goto('/admin/bookings');
    await expect(page.locator('table')).toContainText(customerEmail);
  });
});
