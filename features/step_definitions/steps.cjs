const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Navigation steps
Given('ホームページを開く', async function() {
  await this.page.goto(this.baseUrl);
  await this.page.waitForLoadState('networkidle');
});

Given('{string} ページを開く', async function(path) {
  await this.page.goto(`${this.baseUrl}${path}`);
  await this.page.waitForLoadState('networkidle');
});

Given('デスクトップ画面サイズでホームページを開く', async function() {
  await this.page.setViewportSize({ width: 1440, height: 900 });
  await this.page.goto(this.baseUrl);
  await this.page.waitForLoadState('networkidle');
});

Given('デスクトップ画面サイズで {string} ページを開く', async function(path) {
  await this.page.setViewportSize({ width: 1440, height: 900 });
  await this.page.goto(`${this.baseUrl}${path}`);
  await this.page.waitForLoadState('networkidle');
});

Given('モバイル画面サイズでホームページを開く', async function() {
  await this.page.setViewportSize({ width: 375, height: 667 });
  await this.page.goto(this.baseUrl);
  await this.page.waitForLoadState('networkidle');
});

When('{string} メニューをクリックする', async function(menuText) {
  const menuMap = {
    'プロダクト': '/products/',
    '会社情報': '/company/',
    '開発者向け': '/developer/',
    '各種DX資料': '/resources/',
    'お問い合わせ': '/contact/',
  };

  const href = menuMap[menuText];
  if (href) {
    await this.page.click(`a[href="${href}"]`);
    await this.page.waitForLoadState('networkidle');
  }
});

When('{string} メニューにホバーする', async function(menuText) {
  const menuMap = {
    'プロダクト': '/products/',
  };

  const href = menuMap[menuText];
  if (href) {
    await this.page.hover(`a[href="${href}"]`);
    await this.page.waitForTimeout(500); // Wait for transition
  }
});

When('{string} リンクをクリックする', async function(linkText) {
  await this.page.click(`text=${linkText}`);
  await this.page.waitForLoadState('networkidle');
});

Then('ページタイトルに {string} が含まれる', async function(text) {
  const title = await this.page.title();
  expect(title).toContain(text);
});

Then('{string} ページが表示される', async function(pageTitle) {
  const h1 = await this.page.locator('.hero-section h1, .page-header h1, h1').first();
  await h1.waitFor({ state: 'visible', timeout: 10000 });
  const text = await h1.textContent();
  expect(text.trim()).toContain(pageTitle);
});

Then('ヘッダーが表示される', async function() {
  const header = await this.page.locator('.site-header');
  await expect(header).toBeVisible();
});

Then('フッターが表示される', async function() {
  const footer = await this.page.locator('footer');
  await expect(footer).toBeVisible();
});

Then('サブメニューが表示される', async function() {
  const submenu = await this.page.locator('.sub-menu').first();
  await expect(submenu).toBeVisible();
});

Then('サブメニューに {string} が含まれる', async function(text) {
  const submenu = await this.page.locator('.sub-menu').first();
  const content = await submenu.textContent();
  expect(content).toContain(text);
});

// Header style steps
Then('ヘッダーの背景が透明である', async function() {
  const header = await this.page.locator('.site-header');
  const bgColor = await header.evaluate(el => window.getComputedStyle(el).backgroundColor);
  // transparent or rgba(0, 0, 0, 0)
  expect(bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent').toBeTruthy();
});

Then('ヘッダーの背景が白である', async function() {
  const header = await this.page.locator('.site-header');
  const bgColor = await header.evaluate(el => window.getComputedStyle(el).backgroundColor);
  // White color
  expect(bgColor).toMatch(/rgb\(255,\s*255,\s*255\)/);
});

Then('ナビゲーションのテキスト色が白である', async function() {
  const navLink = await this.page.locator('.global-nav-list > li > a').first();
  const color = await navLink.evaluate(el => window.getComputedStyle(el).color);
  // White or close to white
  expect(color).toMatch(/rgb\(255,\s*255,\s*255\)/);
});

Then('ナビゲーションのテキスト色が暗い', async function() {
  const navLink = await this.page.locator('.global-nav-list > li > a').first();
  const color = await navLink.evaluate(el => window.getComputedStyle(el).color);
  // Dark color (not white)
  expect(color).not.toMatch(/rgb\(255,\s*255,\s*255\)/);
});

Then('ロゴ画像が {string} を使用している', async function(imageName) {
  const logo = await this.page.locator('.site-header-logo img');
  const src = await logo.getAttribute('src');
  expect(src).toContain(imageName);
});

// Content steps
Then('ページに {string} が表示される', async function(text) {
  const content = await this.page.textContent('body');
  expect(content).toContain(text);
});

Then('ページにテーブルが表示される', async function() {
  const table = await this.page.locator('table');
  await expect(table).toBeVisible();
});

Then('テーブルに {string} が含まれる', async function(text) {
  const table = await this.page.locator('table');
  const content = await table.textContent();
  expect(content).toContain(text);
});

Then('{string} ページに遷移する', async function(path) {
  const url = this.page.url();
  expect(url).toContain(path);
});

// Responsive steps
Then('ヘッダーが横並びで表示される', async function() {
  const nav = await this.page.locator('.global-nav');
  const display = await nav.evaluate(el => window.getComputedStyle(el).display);
  expect(display).not.toBe('none');
});

Then('モバイルメニューボタンが非表示である', async function() {
  const btn = await this.page.locator('.vk-mobile-nav-menu-btn');
  const display = await btn.evaluate(el => window.getComputedStyle(el).display);
  expect(display).toBe('none');
});

Then('header-topが非表示である', async function() {
  const headerTop = await this.page.locator('.header-top');
  const display = await headerTop.evaluate(el => window.getComputedStyle(el).display);
  expect(display).toBe('none');
});

Then('ページが正しく表示される', async function() {
  const body = await this.page.locator('body');
  await expect(body).toBeVisible();
});

Then('コンテンツが読みやすい幅で表示される', async function() {
  const container = await this.page.locator('.container').first();
  const width = await container.evaluate(el => el.offsetWidth);
  expect(width).toBeLessThanOrEqual(1140);
  expect(width).toBeGreaterThan(0);
});
