import { chromium } from '@playwright/test';

const OUT = 'C:\\Users\\sanja\\.gemini\\antigravity\\brain\\ba2de536-1b5d-4332-b2e1-89ada6ac5713\\scratch';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

console.log('Navigating to /2 ...');
await page.goto('http://localhost:5173/2', { waitUntil: 'networkidle' });

// Wait for loader animation to finish (counts 0-100)
await page.waitForTimeout(7000);

// Hero
await page.screenshot({ path: OUT + '\\v2_hero.png', fullPage: false });
console.log('Hero done');

// About
await page.evaluate(() => document.getElementById('about')?.scrollIntoView());
await page.waitForTimeout(900);
await page.screenshot({ path: OUT + '\\v2_about.png', fullPage: false });
console.log('About done');

// Experience
await page.evaluate(() => document.getElementById('experience')?.scrollIntoView());
await page.waitForTimeout(900);
await page.screenshot({ path: OUT + '\\v2_experience.png', fullPage: false });
console.log('Experience done');

// Projects
await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
await page.waitForTimeout(900);
await page.screenshot({ path: OUT + '\\v2_projects.png', fullPage: false });
console.log('Projects done');

// Contact
await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
await page.waitForTimeout(900);
await page.screenshot({ path: OUT + '\\v2_contact.png', fullPage: false });
console.log('Contact done');

// Full page
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({ path: OUT + '\\v2_fullpage.png', fullPage: true });
console.log('Full page done');

await browser.close();
console.log('All /2 screenshots saved!');
