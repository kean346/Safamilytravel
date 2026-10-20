import { expect, test } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

test.beforeEach(async ({ page }) => { await page.goto("/"); });

test("home loads without errors, broken assets or horizontal page overflow", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Wild places.Wonderful memories.");
  await expect(page.locator(".cinematic-hero")).toHaveAttribute("aria-roledescription", "carousel");
  await expect(page.locator(".site-header .brand-icon")).toBeVisible();
  await expect(page.getByRole("link", { name: "SA Family Travel on Instagram (opens in a new tab)" })).toHaveAttribute("href", "https://www.instagram.com/safamilytravel_/");
  await page.evaluate(() => { for (const image of document.images) image.loading = "eager"; });
  await expect(page.locator('.editorial-media[data-media-state="loading"]')).toHaveCount(0, { timeout: 20000 });
  await page.evaluate(async () => {
    await Promise.all(Array.from(document.images).map((image) => { image.loading = "eager"; return image.decode(); }));
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  const states = await page.locator(".editorial-media").evaluateAll((elements) => elements.map((element) => element.getAttribute("data-media-state")));
  expect(states.length).toBe(7);
  expect(states.every((state) => state === "photo")).toBe(true);
  console.log(`${testInfo.project.name}: all seven photographic placements loaded from local assets.`);
  await page.screenshot({ path: `test-results/landing-${testInfo.project.name}.png` });
  await page.screenshot({ path: `test-results/home-${testInfo.project.name}.png`, fullPage: true });
});

test("hero destinations can be selected with reduced motion", async ({ page }) => {
  await expect(page.locator(".cinema-pan")).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("button", { name: "Pause destination slideshow" })).not.toBeVisible();
  const cape = page.getByRole("button", { name: "Show Cape Town & surrounds", exact: true });
  await cape.click();
  await expect(cape).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".hero-scene")).toHaveAttribute("aria-label", "Cape Town & surrounds");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Wild places.Wonderful memories.");
});

test("hero slideshow pauses, resumes, and stops after manual selection", async ({ page }) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Pause destination slideshow" }).click();
  await page.clock.fastForward(20000);
  await expect(page.getByRole("button", { name: "Show Safari adventures", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Play destination slideshow" }).click();
  await page.clock.fastForward(9000);
  await expect(page.getByRole("button", { name: "Show Cape Town & surrounds", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Show The Whale Route", exact: true }).click();
  await page.clock.fastForward(20000);
  await expect(page.getByRole("button", { name: "Show The Whale Route", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Play destination slideshow" })).toBeVisible();
});

test("unavailable photographs reveal the local wildlife artwork", async ({ page }) => {
  await page.route(/\/_next\/image\?url=%2Fimages%2Fphotography%2F/, (route) => route.fulfill({ status: 503, body: "Photograph temporarily unavailable" }));
  await page.reload();
  await expect(page.locator(".hero-scene .editorial-media")).toHaveAttribute("data-media-state", "artwork");
  const wildlife = page.getByRole("img", { name: "Original wildlife artwork of an elephant and calf in golden evening light" }).first();
  await expect(wildlife).toBeVisible();
  expect(await wildlife.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(page.locator(".hero-media-credit")).toHaveText("Original wildlife artwork");
  await expect(page.locator(".hero-scene .editorial-photo")).toHaveCount(0);
});

test("all five routes reveal the correct regions and complete property counts", async ({ page }) => {
  const expected = [
    { name: "Safari adventures", count: 21, regions: 4 },
    { name: "Cape Town & surrounds", count: 6, regions: 3 },
    { name: "The Garden Route", count: 3, regions: 1 },
    { name: "The Whale Route", count: 4, regions: 1 },
    { name: "Exclusive safari extensions", count: 2, regions: 1 },
  ];
  for (const route of expected) {
    const button = page.getByRole("button", { name: `Explore ${route.name}`, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#route-preview h3")).toHaveText(route.name);
    await expect(page.locator(".property-count")).toContainText(`${route.count} handpicked stays`);
    await expect(page.locator(".region")).toHaveCount(route.regions);
    await expect(page.locator(".lodge-list li")).toHaveCount(route.count);
  }
});

test("travel options support keyboard selection", async ({ page }) => {
  const selfDrive = page.getByRole("tab", { name: "Self-drive" });
  await selfDrive.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Fly-in safaris" })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Let the adventure take flight.");
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: "Bespoke trips" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("No two families. No two journeys.");
  await page.keyboard.press("Home");
  await expect(selfDrive).toHaveAttribute("aria-selected", "true");
});

test("a lodge selection pre-fills the enquiry and route", async ({ page }) => {
  await page.getByRole("button", { name: "Explore Safari adventures", exact: true }).click();
  await page.locator("summary").filter({ hasText: "Sabi Sands Game Reserve" }).click();
  const lodge = page.locator(".lodge-list li").filter({ has: page.getByRole("heading", { name: "Singita Ebony", exact: true }) });
  await expect(lodge).toBeVisible();
  await lodge.getByRole("link", { name: "Enquire about this stay" }).click();
  await expect(page.getByLabel("Where would you love to go?")).toHaveValue("safari-adventures");
  await expect(page.getByLabel("Tell us about your dream trip")).toHaveValue(/Singita Ebony/);
});

test("form enforces required fields and prepares an unsent copyable enquiry", async ({ page, context }) => {
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(page.getByRole("heading", { name: "Your enquiry is prepared." })).not.toBeVisible();
  await page.getByLabel("Your name", { exact: false }).fill("Alex Family");
  await page.getByLabel("Email address", { exact: false }).fill("alex@example.com");
  await page.getByLabel("Where would you love to go?").selectOption("whale-route");
  await page.getByLabel("Tell us about your dream trip").fill("We would love a family coastal escape.");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(page.getByRole("heading", { name: "Your enquiry is prepared." })).toBeVisible();
  await expect(page.locator(".enquiry-draft")).toContainText("Nothing has been sent.");
  await expect(page.getByLabel("Your enquiry", { exact: true })).toHaveValue(/Journey: The Whale Route/);
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("Enquiry copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("alex@example.com");
  await page.getByLabel("Your name", { exact: false }).fill("Edited name");
  await expect(page.getByRole("heading", { name: "Your enquiry is prepared." })).not.toBeVisible();
});

test("navigation works on desktop and mobile", async ({ page }) => {
  const menu = page.getByRole("button", { name: /^(Open|Close) navigation$/ });
  if (await menu.isVisible()) {
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeFocused();
    await menu.click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Our routes" }).click();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  } else {
    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Our routes" }).click();
  }
  await expect(page).toHaveURL(/#routes$/);
});

test("unbuilt pages return a real 404 with a way home", async ({ page }) => {
  const response = await page.goto("/about");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to the Home Page" })).toHaveAttribute("href", "/");
});
