# AgentRouter

[中文](README_zh.md) · [Download Releases](https://github.com/zhangqinzhong/claude-code-router/releases/latest)

Manage agents, model providers, routing, tools, and request logs from one desktop application.

Current version: **1.0.1**, with installers for macOS Apple Silicon / Intel, Windows, and Linux. The app includes this repository's update feed. macOS packages are not Apple-notarized; automatic installation has not been verified.

- [English documentation](docs/README.md#english-guides)
- [Log retention and rates](docs/src/content/docs/en/configuration/observability.md)
- [Release notes](docs/releases/1.0.1.md) · [Changelog](CHANGELOG.md)

## Why use AgentRouter?

AgentRouter is a local model gateway and control plane for coding agents. It gives Claude Code, Claude Design, Codex, Grok CLI, Kimi CLI, Kilo Code, OpenCode, Pi, ZCode, WorkBuddy, and compatible API clients **one stable local endpoint**, while you manage the providers, models, accounts, routing rules, and tools behind it from one place.

Use AgentRouter to:

- **Manage all agents and providers together** instead of maintaining a separate model configuration for every client.
- **Switch providers or models without changing your workflow** or repeatedly editing agent configuration files.
- **Keep requests running** with retries, credential pools, key rotation, and ordered fallback models.
- **Add capabilities to existing models** with Fusion vision, web search, MCP tools, and ToolHub.
- **See what actually happened** through request logs, resolved routes, latency, token usage, cost estimates, and account status.

AgentRouter supports OpenAI Chat / Responses, Anthropic Messages, Gemini Generate Content / Interactions, OpenRouter, DeepSeek, SiliconFlow, Moonshot, Kimi Code, Mistral, Z.AI, Bailian, and custom compatible providers.

<details open>
<summary><strong>Supported Agents</strong></summary>

<div align="center">

<table width="100%">
  <tr>
    <td align="center" width="20%">
      <a href="https://github.com/anthropics/claude-code">
        <img src="/packages/ui/src/assets/agent-logos/claude-code.png" width="44" height="44" alt="Claude Code logo" />
        <br />
        <strong>Claude Code (CLI & APP)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://github.com/openai/codex">
        <img src="/packages/ui/src/assets/agent-logos/codex.png" width="44" height="44" alt="Codex logo" />
        <br />
        <strong>Codex (CLI & APP)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://github.com/xai-org/grok-build">
        <img src="/packages/ui/src/assets/agent-logos/grok.ico" width="44" height="44" alt="Grok CLI logo" />
        <br />
        <strong>Grok CLI (CLI)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://github.com/MoonshotAI/kimi-cli">
        <img src="/docs/public/provider-icons/moonshot.ico" width="44" height="44" alt="Kimi CLI logo" />
        <br />
        <strong>Kimi CLI (CLI)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://kilo.ai/">
        <img src="/packages/ui/src/assets/agent-logos/kilo.svg" width="44" height="44" alt="Kilo Code logo" />
        <br />
        <strong>Kilo Code (CLI)</strong>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="20%">
      <a href="https://github.com/anomalyco/opencode">
        <img src="/packages/ui/src/assets/agent-logos/opencode.ico" width="44" height="44" alt="OpenCode logo" />
        <br />
        <strong>OpenCode (CLI & APP)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://github.com/earendil-works/pi">
        <img src="/packages/ui/src/assets/agent-logos/pi.svg" width="44" height="44" alt="Pi logo" />
        <br />
        <strong>Pi (CLI)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://zcode.z.ai/en">
        <img src="/packages/ui/src/assets/agent-logos/zcode.png" width="44" height="44" alt="ZCode logo" />
        <br />
        <strong>ZCode (APP)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://www.anthropic.com/news/claude-design-anthropic-labs">
        <img src="/packages/ui/src/assets/agent-logos/claude-code.png" width="44" height="44" alt="Claude Design logo" />
        <br />
        <strong>Claude Design (APP)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://www.workbuddy.ai/">
        <img src="/packages/ui/src/assets/agent-logos/workbuddy.png" width="44" height="44" alt="WorkBuddy logo" />
        <br />
        <strong>WorkBuddy (APP)</strong>
      </a>
    </td>
  </tr>
</table>

</div>

</details>

## Quick Start

### Desktop app (recommended)

1. Download the installer for your platform from [AgentRouter Releases](https://github.com/zhangqinzhong/claude-code-router/releases/latest), then install and open AgentRouter.

2. Open **Providers → Add Provider**. Choose a built-in preset or a custom endpoint, enter the API key, select the protocol and models, then save.
3. Open **Server** and click **Start**. The local model gateway listens on `http://127.0.0.1:3466` by default.
4. Open **Agent Config**, choose Claude Code, Claude Design, Codex, Grok CLI, Kimi CLI, Kilo Code, OpenCode, Pi, ZCode, or WorkBuddy, select a model, and apply the profile.
5. Start using your agent. Open **Logs** to confirm the resolved provider, model, status, tokens, latency, and errors.

Your agent is now connected to AgentRouter. To add conditions, retries, request rewrites, or fallback models, open **Routing**.

### CLI

The npm CLI requires Node.js 22 or newer. It starts the same gateway and a browser-based management UI without Electron:

The CLI package is not yet published to npm. Run from a source checkout with Node.js 22+; see the [CLI guide](packages/cli/README.md) for global installation:

```sh
npm ci
npm run build:assets
node packages/cli/dist/main/cli.js ui
```

Open `http://127.0.0.1:3458`, then follow the same **Providers → Server → Agent Profiles** flow above. The model gateway remains at `http://127.0.0.1:3466`. See the CLI reference for service modes, authentication, and profile commands.

### Docker

```sh
docker compose up -d --build
```

Docker exposes the management UI and gateway routes through `http://127.0.0.1:3458` by default. Read the Docker deployment guide before exposing AgentRouter remotely.

## Build desktop apps

Install Node.js 22+, then run `npm ci`.

| Target | Command | Output |
| --- | --- | --- |
| macOS local DMG/ZIP | `npm run build:app:mac` | `release-local/` |
| Windows local NSIS installer | `npm run build:app:win` | `release-local/` |

Windows app packaging must run on Windows x64 because `better-sqlite3` ships a native Electron module. The release workflow builds macOS on macOS runners and Windows on `windows-latest` when a `v*` tag is pushed.

## How it works

```text
Claude Code · Claude Design · Codex · Grok CLI · Kimi CLI · Kilo Code · OpenCode · Pi · ZCode · WorkBuddy · Compatible API clients
                              │
                              ▼
                 AgentRouter :3466
          Profiles · Routing · Credentials · Tools · Logs
                              │
                              ▼
             Selected provider, model, and account
```

## Core capabilities

| Area | Highlights |
| --- | --- |
| **Agents** | Profiles for Claude Code, Claude Design, Codex, Grok CLI, Kimi CLI, Kilo Code, OpenCode, Pi, ZCode, and WorkBuddy; model overrides; scopes; environment settings; CLI and app launch entries; multi-instance workflows |
| **Providers** | Presets and custom endpoints; protocol probing; model discovery; connectivity checks; local login import where supported; single keys and credential pools |
| **Models & routing** | Searchable catalog; model descriptions for task selection; conditions on headers and bodies; prefixes; rewrites; retries; ordered fallbacks |
| **Tools & extensions** | Fusion models; ToolHub; built-in browser automation; Chrome login-state import; wrapper and core gateway plugins; local routes and virtual models |
| **Access & quotas** | Separate AgentRouter client keys with expiration and local request, token, and image limits |
| **Observability** | Request and response details; resolved provider, model, and credential; status; latency; tokens; estimated cost; tool calls; agent traces |
| **AgentClaw** | Agent relay through Weixin iLink, WeCom, Slack, Discord, Telegram, LINE, Feishu, and DingTalk |

## Go deeper when you are ready

The complete documentation lives in the `docs/` directory in this repository.

- Install and launch AgentRouter
- Configure providers
- Explore routing and configuration
- Use the CLI
- Deploy with Docker
- Troubleshoot common issues

## License

This project is licensed under the [MIT License](LICENSE).

AgentRouter is based on [Claude Code Router](https://github.com/musistudio/claude-code-router) and retains the upstream license and copyright notices.
