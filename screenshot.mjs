import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = 'C:\\\\Users\\\\sanja\\\\.gemini\\\\antigravity\\\\brain\\\\ba2de536-1b5d-4332-b2e1-89ada6ac5713\\\\scratch';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

// Wait for loader to finish (it animates from 0–100%)
await page.waitForTimeout(4000);

// 1. Hero section screenshot
await page.screenshot({ path: OUT + '\\\\shot_hero.png', fullPage: false });

// 2. Scroll to About
await page.evaluate(() => document.getElementById('about')?.scrollIntoView());
await page.waitForTimeout(800);
await page.screenshot({ path: OUT + '\\\\shot_about.png', fullPage: false });

// 3. Scroll to Experience
await page.evaluate(() => document.getElementById('experience')?.scrollIntoView());
await page.waitForTimeout(800);
await page.screenshot({ path: OUT + '\\\\shot_experience.png', fullPage: false });

// 4. Scroll to Projects
await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
await page.waitForTimeout(800);
await page.screenshot({ path: OUT + '\\\\shot_projects.png', fullPage: false });

// 5. Scroll to Education
await page.evaluate(() => document.getElementById('education')?.scrollIntoView());
await page.waitForTimeout(800);
await page.screenshot({ path: OUT + '\\\\shot_education.png', fullPage: false });

// 6. Scroll to Contact
await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
await page.waitForTimeout(800);
await page.screenshot({ path: OUT + '\\\\shot_contact.png', fullPage: false });

// 7. Full page screenshot
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.screenshot({ path: OUT + '\\\\shot_fullpage.png', fullPage: true });

await browser.close();
console.log('Done! Screenshots saved to scratch folder.');
