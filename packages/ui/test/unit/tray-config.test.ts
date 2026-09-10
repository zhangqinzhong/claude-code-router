import assert from "node:assert/strict";
import test from "node:test";
import { createDefaultAppConfig } from "@agentrouter/core/config/default-config.ts";
import { normalizeConfig } from "@agentrouter/ui/pages/home/shared/config.ts";
import { normalizeTrayIconPreference } from "@agentrouter/ui/pages/home/shared/common.ts";

test("home settings accept the layered icon without removing legacy choices", () => {
  for (const icon of ["layered", "random", "violet", "orange", "cyan", "progress"] as const) {
    assert.equal(normalizeTrayIconPreference(icon), icon);
  }
  assert.equal(normalizeTrayIconPreference(undefined), "layered");
  assert.equal(normalizeTrayIconPreference("invalid"), "layered");
});

test("renderer normalization preserves explicit usage settings and defaults old configs off", () => {
  const config = createDefaultAppConfig({});
  for (const value of [true, false, undefined, "true", "false", 1, null]) {
    const normalized = normalizeConfig({
      ...config,
      trayShowTokenUsage: value as boolean
    });
    assert.equal(normalized.trayShowTokenUsage, value === true);
    assert.equal(normalized.trayIcon, "layered");
  }
});

test("renderer keeps existing icon choices and balance progress bindings", () => {
  const config = createDefaultAppConfig({});
  assert.equal(normalizeConfig({ ...config, trayIcon: "violet" }).trayIcon, "violet");
  const progress = normalizeConfig({
    ...config,
    trayBalanceProgress: { provider: "test", meterId: "balance" },
    trayIcon: "progress",
    trayShowTokenUsage: true
  });
  assert.equal(progress.trayIcon, "progress");
  assert.equal(progress.trayShowTokenUsage, true);
  assert.deepEqual(progress.trayBalanceProgress, { provider: "test", meterId: "balance" });
});
