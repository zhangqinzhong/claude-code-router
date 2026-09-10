import type { RouterFallbackConfig } from "@ccr/core/contracts/app";

export const ccrRouterPluginKey = "ar-router";
export const ccrRouterRequestTransformKey = "ar-router-request-transform";
export const ccrCodexBridgeRequestTransformKey = "ar-codex-bridge-request-transform";
export const ccrCodexBridgeResponseHookKey = "ar-codex-bridge-response-hook";
export const ccrCodexBridgeStreamHookKey = "ar-codex-bridge-stream-hook";
export const ccrOpenRouterDiscountFinalizeResponseHookKey = "ar-openrouter-discount-finalize-response-hook";
export const ccrOpenRouterDiscountFinalizeStreamHookKey = "ar-openrouter-discount-finalize-stream-hook";
export const ccrRouterRouteResolverKey = "ar-router-route-resolver";
export const ccrRouterHttpRouteKey = "ar-router-route";
export const ccrRouterHttpRoutePath = "/__ccr/route";
export const ccrRawTraceSyncAckRouteKey = "ar-raw-trace-sync-ack";
export const ccrRuntimeConfigReloadMessageType = "ar:runtime-config-reload";

export const ccrRouteStageHeader = "x-ar-route-stage";
export const ccrRouteReasonHeader = "x-ar-route-reason";
export const ccrRouteSourceHeader = "x-ar-route-source";
export const ccrRouteDiagnosticsHeader = "x-ar-route-diagnostics";
export const ccrRoutedModelHeader = "x-ar-routed-model";
export const ccrRouteFallbackHeader = "x-ar-route-fallback";
export const ccrRouteSessionIdHeader = "x-ar-route-session-id";
export const ccrRouteTokenCountHeader = "x-ar-route-token-count";
export const ccrCodexApplyPatchBridgeHeader = "x-ar-codex-apply-patch-bridge";
export const ccrCodexMultiAgentBridgeHeader = "x-ar-codex-multi-agent-bridge";
export const ccrOpenRouterDiscountRequestIdHeader = "x-ar-openrouter-discount-request-id";
export const ccrRouteHeaderNames = [
  ccrCodexApplyPatchBridgeHeader,
  ccrCodexMultiAgentBridgeHeader,
  ccrOpenRouterDiscountRequestIdHeader,
  ccrRouteDiagnosticsHeader,
  ccrRouteFallbackHeader,
  ccrRouteReasonHeader,
  ccrRouteSessionIdHeader,
  ccrRouteSourceHeader,
  ccrRouteStageHeader,
  ccrRouteTokenCountHeader,
  ccrRoutedModelHeader
] as const;

export type CcrRouterPluginRouteRequest = {
  body: Record<string, unknown>;
  headers?: Record<string, string | string[] | undefined>;
  method?: string;
  path?: string;
  url?: string;
};

export type CcrRouterPluginRouteResponse = {
  body: Record<string, unknown>;
  decision: {
    diagnostics: unknown[];
    fallback: RouterFallbackConfig;
    model?: string;
    reason: string;
    sessionId?: string;
    source: string;
    tokenCount: number;
  };
};

export function encodeCcrRouteFallbackHeader(fallback: RouterFallbackConfig): string {
  return Buffer.from(JSON.stringify(fallback), "utf8").toString("base64url");
}

export function decodeCcrRouteFallbackHeader(value: string | undefined): RouterFallbackConfig | undefined {
  if (!value) {
    return undefined;
  }
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as unknown;
    return isRouterFallbackConfig(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function isRouterFallbackConfig(value: unknown): value is RouterFallbackConfig {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const candidate = value as RouterFallbackConfig;
  return (
    (candidate.mode === "off" || candidate.mode === "retry" || candidate.mode === "model-chain") &&
    Array.isArray(candidate.models) &&
    candidate.models.every((model) => typeof model === "string") &&
    typeof candidate.retryCount === "number" &&
    Number.isFinite(candidate.retryCount)
  );
}
