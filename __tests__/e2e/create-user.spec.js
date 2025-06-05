const { test, expect } = require('@playwright/test');



test('Skapa användare via formuläret', async ({ page }) => {
  // 1. Gå till startsidan
  await page.goto('http://localhost:3000');

  // 2. Klicka på "Create user"
  await page.click('text=Create user');

  // 3. Fyll i formuläret
  await page.fill('input[name="name"]', 'Sirius Stjärnson');
  await page.fill('input[name="nickname"]', 'Siri');
  await page.fill('input[name="age"]', '42');
  await page.fill('input[name="email"]', 'siri@stars.com');
  await page.fill('input[name="phone"]', '0701234567');
  await page.fill('textarea[name="bio"]', 'Jag bor på en galax långt långt borta.');

  // 4. Klicka på “Save”
  await page.click('button[type="submit"]');

  // 5. Verifiera att vi är på startsidan och användaren visas
  await expect(page).toHaveURL('http://localhost:3000/');
  await expect(page.locator('body')).toContainText('Sirius Stjärnson');
});



test('Visa alla användare på startsidan', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.locator('h1')).toContainText('All users');

  const userLinks = page.locator('a[href^="/user?id="]');
  const count = await userLinks.count();
  expect(count).toBeGreaterThan(0);
});


test('Redigera användare via edit-formulär', async ({ page }) => {
  // 1. Gå till startsidan
  await page.goto('http://localhost:3000');

  // 2. Hämta första användaren i listan
  const firstUserItem = page.locator('.user-list li').first();
  const oldName = await firstUserItem.locator('a').textContent();
  await firstUserItem.locator('a').click();

  // 3. Klicka på "Edit user"
  await page.click('text=Edit user');

  // 4. Fyll i nytt namn
  await page.fill('input[name="name"]', 'Uppdaterad Användare');

  // 5. Klicka "Save change" och vänta på redirect
  await Promise.all([
    page.waitForURL('http://localhost:3000/'),
    page.click('button[type="submit"]')
  ]);

  // 6. Verifiera att det nya namnet visas
const updatedFirstUser = page.locator('.user-list li').first();
await expect(updatedFirstUser).toContainText('Uppdaterad Användare');

// 7. Verifiera att det gamla namnet inte längre är på plats 1
if (oldName) {
  await expect(updatedFirstUser).not.toContainText(oldName.trim());
}
});

test('Ta bort första användaren via x-knappen', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Hitta första användarraden
  const firstUserRow = page.locator('.user-row').first();
  const userName = await firstUserRow.locator('a').textContent();

  // Hantera "confirm"-popup automatiskt
  page.once('dialog', dialog => {
    dialog.accept(); // Klickar "OK"
  });

  // Klicka på x-knappen och vänta på redirect
  await Promise.all([
    page.waitForURL('http://localhost:3000/'),
    firstUserRow.locator('form.delete-form button').click()
  ]);

  // Verifiera att användaren är borta
  await expect(page.locator('body')).not.toContainText(userName.trim());
});
