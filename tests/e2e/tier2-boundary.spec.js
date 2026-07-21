import { test, expect } from '@playwright/test';

const API_BASE = 'http://127.0.0.1:3001/api';

test.describe('Tier 2: Boundary & Corner Cases E2E Suite', () => {
  const customerUser = {
    email: 'john@mail.com',
    password: 'user123',
  };

  test('1. Form validation: Login form rejects empty email or password', async ({ page }) => {
    await page.goto('/login');
    await page.click('button[type="submit"]');
    await expect(page.locator('#email')).toHaveJSProperty('validity.valueMissing', true);
  });

  test('2. Form validation: Registration form rejects missing required fields', async ({ page }) => {
    await page.goto('/register');
    await page.click('button[type="submit"]');
    const input = page.locator('input[placeholder="Full Name"]');
    await expect(input).toHaveJSProperty('validity.valueMissing', true);
  });

  test('3. Form validation: Profile update rejects password confirmation mismatch', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', customerUser.email);
    await page.fill('#password', customerUser.password);
    await page.click('button[type="submit"]');

    await page.goto('/profile');
    await page.fill('#password', 'newpass123');
    await page.fill('#confirmPassword', 'mismatch321');
    await page.click('button[type="submit"]');

    await expect(page.locator('body')).toContainText('do not match');
  });

  test('4. Form validation: Booking submission requires date, time, and phone', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', customerUser.email);
    await page.fill('#password', customerUser.password);
    await page.click('button[type="submit"]');

    await page.goto('/book-table');
    await page.fill('#name', 'Test');
    await page.fill('#phone', '');
    await page.click('button[type="submit"]');
    await expect(page.locator('#phone')).toHaveJSProperty('validity.valueMissing', true);
  });

  test('5. Auth security: Invalid email format during login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'invalid-email-format');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await expect(page.locator('#email')).toHaveJSProperty('validity.typeMismatch', true);
  });

  test('6. Auth security: Incorrect password displays error message', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', customerUser.email);
    await page.fill('#password', 'wrong_password_123');
    await page.click('button[type="submit"]');
    await expect(page.locator('.bg-red-50, .alert-danger')).toBeVisible();
  });

  test('7. Auth security: Duplicate registration displays error message', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[placeholder="Full Name"]', 'John Duplicate');
    await page.fill('input[placeholder="Email Address"]', 'john@mail.com'); // Existing seed email
    await page.fill('input[placeholder="Password"]', 'user123');
    await page.click('button[type="submit"]');

    await expect(page.locator('.alert-danger, .bg-red-50')).toBeVisible();
  });

  test('8. Auth security: Malformed JWT in localStorage redirects to login', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('auth', JSON.stringify({ token: 'malformed.fake.jwt', user: null }));
    });
    await page.goto('/profile');
    await page.waitForURL('**/login**');
    expect(page.url()).toContain('/login');
  });

  test('9. Route protection: Direct access to /profile unauthenticated redirects to /login', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForURL('**/login**');
    expect(page.url()).toContain('/login');
  });

  test('10. Route protection: Direct access to /my-bookings unauthenticated redirects to /login', async ({ page }) => {
    await page.goto('/my-bookings');
    await page.waitForURL('**/login**');
    expect(page.url()).toContain('/login');
  });

  test('11. Route protection: Direct access to /admin unauthenticated redirects to /login', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await page.waitForURL('**/login**');
    expect(page.url()).toContain('/login');
  });

  test('12. Role guard: Direct access to /admin/dashboard as customer redirects to /403 or /login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', customerUser.email);
    await page.fill('#password', customerUser.password);
    await page.click('button[type="submit"]');

    await page.goto('/admin/dashboard');
    await page.waitForTimeout(500);
    expect(page.url()).not.toContain('/admin/dashboard');
  });

  test('13. Role guard: Direct access to /admin/users as customer is blocked', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', customerUser.email);
    await page.fill('#password', customerUser.password);
    await page.click('button[type="submit"]');

    await page.goto('/admin/users');
    await page.waitForTimeout(500);
    expect(page.url()).not.toContain('/admin/users');
  });

  test('14. Role guard: Direct access to /admin/menu as customer is blocked', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', customerUser.email);
    await page.fill('#password', customerUser.password);
    await page.click('button[type="submit"]');

    await page.goto('/admin/menu');
    await page.waitForTimeout(500);
    expect(page.url()).not.toContain('/admin/menu');
  });

  test('15. API Boundary: Protected endpoint without auth header returns 401', async ({ request }) => {
    const res = await request.get(`${API_BASE}/auth/profile`);
    expect(res.status()).toBe(401);
  });

  test('16. API Boundary: Customer token calling admin endpoint returns 403', async ({ request }) => {
    const loginRes = await request.post(`${API_BASE}/auth/login`, {
      data: customerUser,
    });
    const { token } = await loginRes.json();

    const usersRes = await request.get(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(usersRes.status()).toBe(403);
  });
});
