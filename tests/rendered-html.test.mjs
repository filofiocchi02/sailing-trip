import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const clientRoot = new URL("../dist/client/", import.meta.url);

test("builds the public trip overview", async () => {
  const html = await readFile(new URL("index.html", clientRoot), "utf8");
  assert.match(html, /Youth Sailing/i);
  assert.match(html, /Croatia/i);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/i);
});

test("exports every Firebase Hosting route", async () => {
  for (const route of ["admin", "apply", "dashboard", "login", "waitlist"]) {
    await access(new URL(`${route}.html`, clientRoot));
  }
});

test("keeps the sailing imagery in the public build", async () => {
  for (const asset of [
    "images/crew-beach.jpeg",
    "images/crew-sailing.jpeg",
    "images/croatia-coastline.svg",
  ]) {
    await access(new URL(asset, clientRoot));
  }
});
