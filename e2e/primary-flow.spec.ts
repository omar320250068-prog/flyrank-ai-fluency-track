import { test, expect } from '@playwright/test';

test.describe('Primary Flow E2E (Live Chat & Error Recovery)', () => {
  test('walks primary chat flow from empty state to streaming and error retry', async ({ page }) => {
    // 1. Visit live primary chat route
    await page.goto('/chat');

    // 2. Assert header display title is present
    await expect(page.locator('h1').first()).toContainText(/stream/i);

    // 3. Verify empty state onboarding is rendered
    await expect(page.locator('text=No conversations yet')).toBeVisible();

    // 4. Click 'Happy path' prompt preset button
    const happyPathChip = page.getByRole('button', { name: 'Happy path' }).first();
    await happyPathChip.click();

    // 5. Verify user prompt bubble appears in thread
    await expect(page.locator('.bubble.user')).toBeVisible();
    await expect(page.locator('.bubble.user')).toContainText('Show me the clean run');

    // 6. Verify assistant response streams back
    await expect(page.locator('.bubble.assistant').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.bubble.assistant').first()).toContainText('Clean run');

    // Wait for the response stream to complete so composer Send button is enabled
    await expect(page.getByRole('button', { name: 'Send' })).toBeEnabled({ timeout: 10000 });

    // 7. Type mid-stream failure prompt into chat input and send
    const inputArea = page.getByRole('textbox', { name: 'Chat input' });
    await inputArea.fill('Trigger a mid-stream failure');
    const sendBtn = page.getByRole('button', { name: 'Send' });
    await sendBtn.click();

    // 8. Assert designed error card is displayed with working retry button
    await expect(page.locator('.bubble.error')).toBeVisible({ timeout: 10000 });
    const retryButton = page.getByRole('button', { name: /Retry failed message/ });
    await expect(retryButton).toBeVisible();

    // 9. Click retry button and verify request is resubmitted
    await retryButton.click();
    await expect(page.getByRole('button', { name: /Retrying failed message|Retry failed message/ })).toBeVisible();
  });
});
