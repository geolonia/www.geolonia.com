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

// Hamburger menu steps
Given('ブラウザサイズを {int} x {int} に設定', async function(width, height) {
  await this.page.setViewportSize({ width, height });
});

When('ブラウザサイズを {int} x {int} に変更', async function(width, height) {
  await this.page.setViewportSize({ width, height });
  await this.page.waitForTimeout(500); // Wait for resize event
});

Then('ハンバーガーメニューボタンが表示されない', async function() {
  const btn = await this.page.locator('.vk-mobile-nav-menu-btn');
  const display = await btn.evaluate(el => window.getComputedStyle(el).display);
  expect(display).toBe('none');
});

Then('通常のナビゲーションメニューが表示される', async function() {
  const nav = await this.page.locator('.global-nav');
  const display = await nav.evaluate(el => window.getComputedStyle(el).display);
  expect(display).not.toBe('none');
});

Then('ハンバーガーメニューボタンが表示される', async function() {
  const btn = await this.page.locator('.vk-mobile-nav-menu-btn');
  const display = await btn.evaluate(el => window.getComputedStyle(el).display);
  expect(display).toBe('flex');
});

Then('通常のナビゲーションメニューが表示されない', async function() {
  const nav = await this.page.locator('.global-nav');
  const display = await nav.evaluate(el => window.getComputedStyle(el).display);
  expect(display).toBe('none');
});

When('ハンバーガーメニューボタンをクリック', async function() {
  const btn = await this.page.locator('#mobile-menu-btn');
  await btn.click();
  await this.page.waitForTimeout(300); // Wait for animation
});

When('ハンバーガーメニューボタンを再度クリック', async function() {
  const btn = await this.page.locator('#mobile-menu-btn');
  await btn.click();
  await this.page.waitForTimeout(300); // Wait for animation
});

Then('モバイルメニューオーバーレイが表示される', async function() {
  const overlay = await this.page.locator('#mobile-nav-overlay');
  await expect(overlay).toHaveClass(/active/);
  const opacity = await overlay.evaluate(el => window.getComputedStyle(el).opacity);
  expect(parseFloat(opacity)).toBeGreaterThan(0);
});

Then('モバイルメニューオーバーレイが非表示になる', async function() {
  const overlay = await this.page.locator('#mobile-nav-overlay');
  const classes = await overlay.getAttribute('class');
  expect(classes).not.toContain('active');
});

Then('ハンバーガーアイコンがXマークに変わる', async function() {
  const btn = await this.page.locator('#mobile-menu-btn');
  await expect(btn).toHaveClass(/active/);
});

Then('ハンバーガーアイコンが元の形に戻る', async function() {
  const btn = await this.page.locator('#mobile-menu-btn');
  const classes = await btn.getAttribute('class');
  expect(classes).not.toContain('active');
});

When('オーバーレイの背景をクリック', async function() {
  // Click on the overlay itself (not on the menu inside)
  await this.page.evaluate(() => {
    const overlay = document.getElementById('mobile-nav-overlay');
    if (overlay) {
      overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });
  await this.page.waitForTimeout(300);
});

Then('モバイルメニューに {string} が表示される', async function(text) {
  const menu = await this.page.locator('.mobile-nav-list');
  const content = await menu.textContent();
  expect(content).toContain(text);
});

When('モバイルメニューで {string} をクリック', async function(menuText) {
  const menuItem = await this.page.locator('.mobile-menu-item-has-children > a').filter({ hasText: menuText });
  await menuItem.click();
  await this.page.waitForTimeout(300); // Wait for animation
});

When('モバイルメニューで {string} を再度クリック', async function(menuText) {
  const menuItem = await this.page.locator('.mobile-menu-item-has-children > a').filter({ hasText: menuText });
  await menuItem.click();
  await this.page.waitForTimeout(300); // Wait for animation
});

Then('{string} のサブメニューが展開される', async function(menuText) {
  const parentLi = await this.page.locator('.mobile-menu-item-has-children').filter({ hasText: menuText });
  await expect(parentLi).toHaveClass(/active/);
  const submenu = await parentLi.locator('.mobile-sub-menu');
  const maxHeight = await submenu.evaluate(el => window.getComputedStyle(el).maxHeight);
  expect(maxHeight).not.toBe('0px');
});

Then('{string} のサブメニューが折りたたまれる', async function(menuText) {
  const parentLi = await this.page.locator('.mobile-menu-item-has-children').filter({ hasText: menuText });
  const classes = await parentLi.getAttribute('class');
  expect(classes).not.toContain('active');
});

Then('サブメニューに {string} が表示される', async function(text) {
  const submenu = await this.page.locator('.mobile-sub-menu').first();
  const content = await submenu.textContent();
  expect(content).toContain(text);
});

When('サブメニューで {string} をクリック', async function(linkText) {
  const link = await this.page.locator('.mobile-sub-menu a').filter({ hasText: linkText });
  await link.click();
  await this.page.waitForLoadState('networkidle');
});
