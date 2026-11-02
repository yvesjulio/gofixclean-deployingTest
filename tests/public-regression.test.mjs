import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import ts from "typescript";
const baseline = JSON.parse(
  fs.readFileSync(new URL("./public-baseline.json", import.meta.url), "utf8"),
);
const root = new URL("../", import.meta.url);
test("public pages, components and assets match original upload", () => {
  for (const [path, hash] of Object.entries(baseline)) {
    assert.equal(
      crypto
        .createHash("sha256")
        .update(fs.readFileSync(new URL(path, root)))
        .digest("hex"),
      hash,
      path,
    );
  }
});
test("all original public routes remain registered", () => {
  const source = ts.createSourceFile(
    "App.tsx",
    fs.readFileSync(new URL("src/App.tsx", root), "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const paths = [];
  function walk(n) {
    if (
      ts.isJsxAttribute(n) &&
      n.name.getText(source) === "path" &&
      n.initializer &&
      ts.isStringLiteral(n.initializer)
    )
      paths.push(n.initializer.text);
    ts.forEachChild(n, walk);
  }
  walk(source);
  for (const path of [
    "/",
    "/services",
    "/about",
    "/become-provider",
    "/booking",
    "/service-details/:category",
    "/careers",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/provider/verification",
    "/admin-login",
    "*",
  ])
    assert(paths.includes(path), path);
});
test("legacy admin aliases remain available", () => {
  const app = fs.readFileSync(new URL("src/App.tsx", root), "utf8");
  for (const path of [
    "/admin/dashboard",
    "/admin/booking",
    "/admin/provider",
    "/admin/verification",
  ])
    assert(app.includes(`path="${path}"`));
});
test("new admin CSS rules stay scoped to the admin root", async () => {
  const { default: postcss } = await import("postcss");
  const css = fs.readFileSync(
    new URL("src/components/admin/admin.css", root),
    "utf8",
  );
  postcss.parse(css).walkRules((rule) => {
    let parent = rule.parent;
    while (parent) {
      if (parent.type === "atrule" && /keyframes$/.test(parent.name)) return;
      parent = parent.parent;
    }
    for (const selector of rule.selectors)
      assert(selector.trim().startsWith(".ops"), selector);
  });
});
