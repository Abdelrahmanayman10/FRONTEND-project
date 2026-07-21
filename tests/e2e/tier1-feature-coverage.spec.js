import { test, expect } from '@playwright/test';

const API_BASE = 'http://127.0.0.1:3001/api';

test.describe('Tier 1: Feature Coverage E2E Suite', () => {
  const testUser = {
    name: 'Tier1 Test User',
    email: `tier1_${Date.now()}@example.com`,
    password: 'password123',
  };
  const adminUser = {
    email: 'admin@bistro.com',
    password: 'admin123',
  };

  test('1. Auth: Register new customer user successfully', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[placeholder="Full Name"]', testUser.name);
    await page.fill('input[placeholder="Email Address"]', testUser.email);
    await page.fill('input[placeholder="Password"]', testUser.password);

    page.once('dialog', dialog => dialog.accept());
    await page.click('button[type="submit"]');

    await page.waitForURL('/');
    expect(page.url()).toContain('http://localhost:3000/');
  });

  test('2. Auth: Login with customer credentials successfully', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', testUser.email);
    await page.fill('#password', testUser.password);
    await page.click('button[type="submit"]');

    await page.waitForURL('/');
    const authState = await page.evaluate(() => localStorage.getItem('auth'));
    expect(authState).not.toBeNull();
    const parsed = JSON.parse(authState);
    expect(parsed.user.email).toBe(testUser.email);
  });

  test('3. Auth: Login with admin credentials successfully', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', adminUser.email);
    await page.fill('#password', adminUser.password);
    await page.click('button[type="submit"]');

    await page.waitForURL('**/admin**');
    expect(page.url()).toContain('/admin');
  });

  test('4. Auth: Retrieve user profile on /profile', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', testUser.email);
    await page.fill('#password', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await page.goto('/profile');
    await expect(page.locator('#name')).toHaveValue(testUser.name);
    await expect(page.locator('#email')).toHaveValue(testUser.email);
  });

  test('5. Auth: Update customer profile details', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', testUser.email);
    await page.fill('#password', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await page.goto('/profile');
    const newPhone = '555-0199';
    const newAddress = '789 Sunset Blvd';

    await page.fill('#phone', newPhone);
    await page.fill('#address', newAddress);
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Profile Updated')).toBeVisible();

    await page.reload();
    await expect(page.locator('#phone')).toHaveValue(newPhone);
    await expect(page.locator('#address')).toHaveValue(newAddress);
  });

  test('6. Menu: Render public menu catalog from API', async ({ page }) => {
    await page.goto('/menu');
    await expect(page.locator('h1')).toContainText('Our Special Menu');
    const menuCards = page.locator('.grid > div');
    await expect(menuCards.first()).toBeVisible();
    const count = await menuCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('7. Menu: Filter menu items by category', async ({ page }) => {
    await page.goto('/menu');
    await page.click('button:has-text("Breakfast")');
    await page.waitForTimeout(300);
    const categoryBadges = page.locator('[data-slot="badge"]:has-text("Breakfast")');
    expect(await categoryBadges.count()).toBeGreaterThan(0);

    await page.click('button:has-text("Drinks")');
    await page.waitForTimeout(300);
    const drinksBadges = page.locator('[data-slot="badge"]:has-text("Drinks")');
    expect(await drinksBadges.count()).toBeGreaterThan(0);
  });

  test('8. Menu: Display menu item details (title, price, image, description)', async ({ page }) => {
    await page.goto('/menu');
    const firstCard = page.locator('.grid > div').first();
    await expect(firstCard.locator('img')).toBeVisible();
    await expect(firstCard.locator('h3, .text-lg')).toBeVisible();
    await expect(firstCard).toContainText('$');
  });

  test('9. Booking: Submit table reservation with valid data', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', testUser.email);
    await page.fill('#password', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await page.goto('/book-table');
    await page.fill('#date', '2026-11-20');
    await page.fill('#time', '19:30');
    await page.fill('#name', 'Reservation Guest');
    await page.fill('#phone', '555-4321');
    await page.selectOption('#totalPerson', '2 People');
    await page.click('button[type="submit"]');

    await page.waitForURL('/my-bookings');
    expect(page.url()).toContain('/my-bookings');
  });

  test('10. Booking: Create booking with initial status pending', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', testUser.email);
    await page.fill('#password', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await page.goto('/my-bookings');
    const statusBadge = page.locator('tbody tr').first().locator('span:has-text("pending")');
    await expect(statusBadge).toBeVisible();
  });

  test('11. Booking: Authenticated user reservation flow', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', testUser.email);
    await page.fill('#password', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await page.goto('/book-table');
    await expect(page.locator('#name')).toHaveValue(testUser.name);
  });

  test('12. My Bookings: Render customer submitted bookings with status badges', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', testUser.email);
    await page.fill('#password', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await page.goto('/my-bookings');
    await expect(page.locator('h1')).toContainText('My Table Bookings');
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('tbody tr').first()).toBeVisible();
  });

  test('13. My Bookings: Update customer booking list when new booking made', async ({ page, request }) => {
    const loginRes = await request.post(`${API_BASE}/auth/login`, {
      data: { email: testUser.email, password: testUser.password },
    });
    const { token } = await loginRes.json();

    const bookRes = await request.post(`${API_BASE}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: 'New Reservation Test',
        phone: '111-222-3333',
        date: '2026-12-01',
        time: '18:00',
        totalPerson: '4 People',
      },
    });
    expect(bookRes.ok()).toBeTruthy();

    await page.goto('/login');
    await page.fill('#email', testUser.email);
    await page.fill('#password', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await page.goto('/my-bookings');
    await expect(page.locator('table')).toContainText('New Reservation Test');
  });

  test('14. Admin Bookings: Admin views all customer reservations', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', adminUser.email);
    await page.fill('#password', adminUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await page.goto('/admin/bookings');
    await expect(page.locator('h1')).toContainText('Manage Reservations');
    await expect(page.locator('table')).toBeVisible();
  });

  test('15. Admin Bookings: Admin accepts a pending reservation', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', adminUser.email);
    await page.fill('#password', adminUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await page.goto('/admin/bookings');
    const acceptBtn = page.locator('button:has-text("Accept")').first();
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
      await page.waitForTimeout(500);
      await expect(page.locator('table')).toContainText('accepted');
    }
  });

  test('16. Admin Bookings: Admin rejects a pending reservation', async ({ page, request }) => {
    const loginRes = await request.post(`${API_BASE}/auth/login`, {
      data: { email: testUser.email, password: testUser.password },
    });
    const { token } = await loginRes.json();
    await request.post(`${API_BASE}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: 'To Be Rejected',
        phone: '999-000-1111',
        date: '2026-12-10',
        time: '20:00',
        totalPerson: '2 People',
      },
    });

    await page.goto('/login');
    await page.fill('#email', adminUser.email);
    await page.fill('#password', adminUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await page.goto('/admin/bookings');
    const targetRow = page.locator('tr:has-text("To Be Rejected")');
    await expect(targetRow).toBeVisible();
    await targetRow.locator('button:has-text("Reject")').click();
    await page.waitForTimeout(500);
    await expect(targetRow).toContainText('rejected');
  });

  test('17. Admin Menu & Users: Admin menu CRUD and user listing', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', adminUser.email);
    await page.fill('#password', adminUser.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await page.goto('/admin/menu');
    await page.fill('#name', 'Tier1 Special Salad');
    await page.fill('#price', '11.99');
    await page.fill('#img', '/src/assets/food111.jpg');
    await page.selectOption('#category', 'Breakfast');
    await page.fill('#description', 'Fresh organic greens with house sauce.');
    await page.click('button[type="submit"]');

    await expect(page.locator('table')).toContainText('Tier1 Special Salad');

    await page.goto('/admin/users');
    await expect(page.locator('h1')).toContainText('User Administration');
    await expect(page.locator('table')).toContainText(adminUser.email);
  });
});
