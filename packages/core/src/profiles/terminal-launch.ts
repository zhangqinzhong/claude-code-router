import path from "node:path";
import { createHash } from "node:crypto";

export function profileTerminalLaunch(configDir: string, launcher: string, profileId: string, platform = process.platform): {
  command: string; args: string[]; scriptFile?: string; scriptContent?: string;
} {
  const quote = (value: string) => `'${value.replaceAll("'", "'\\''")}'`;
  const id = createHash("sha256").update(profileId).digest("hex").slice(0, 20);
  if (platform === "darwin") {
    const scriptFile = path.join(configDir, "terminal-launchers", `${id}.command`);
    return { command: "/usr/bin/open", args: ["-a", "Terminal", scriptFile], scriptFile,
      scriptContent: `#!/bin/sh\nexec ${quote(launcher)} ${quote(profileId)} cli\n` };
  }
  if (platform === "win32") {
    if (/["%\r\n]/.test(launcher + profileId)) throw new Error("Terminal launch path contains unsupported Windows characters.");
    const scriptFile = path.join(configDir, "terminal-launchers", `${id}.cmd`);
    return { command: "cmd.exe", args: ["/d", "/c", "start", '""', scriptFile], scriptFile,
      scriptContent: `@echo off\r\n@setlocal DisableDelayedExpansion\r\n@call "${launcher}" "${profileId}" cli\r\n@pause\r\n` };
  }
  return { command: "x-terminal-emulator", args: ["-e", launcher, profileId, "cli"] };
}
