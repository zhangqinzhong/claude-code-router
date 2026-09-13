# AgentRouter

[English](README.md) · [下载 Releases](https://github.com/zhangqinzhong/claude-code-router/releases/latest)

在一个桌面应用中管理 Agent、模型供应商、请求路由、工具和日志。

当前版本 **1.0.1**，提供 macOS Apple Silicon / Intel、Windows 和 Linux 安装包。App 已内置本仓库更新源。macOS 暂未 Apple 公证，自动安装升级尚未验证。

- [中文文档](docs/README.md#中文指南)
- [日志保存与速率](docs/src/content/docs/zh/configuration/observability.md)
- [版本说明](docs/releases/1.0.1.md) · [更新记录](CHANGELOG.md)

## 为什么使用 AgentRouter？

AgentRouter 是面向编程 Agent 的本地模型网关与控制平面。它为 Claude Code、Claude Design、Codex、Grok CLI、Kimi CLI、Kilo Code、OpenCode、Pi、ZCode、WorkBuddy 和兼容 API 客户端提供**一个稳定的本地入口**，让你在一个地方管理入口背后的供应商、模型、账号、路由规则与工具。

你可以使用 AgentRouter：

- **统一管理所有 Agent 与 Provider**，不再为每个客户端维护一套独立模型配置。
- **切换供应商或模型而不改变工作流**，无需反复修改 Agent 配置文件。
- **通过重试、凭据池、Key 轮换和 Fallback 保持请求可用**。
- **通过 Fusion 视觉、联网搜索、MCP 工具和 ToolHub 扩展现有模型**。
- **通过请求日志、最终路由、耗时、Token、成本估算和账号状态了解真实运行情况**。

AgentRouter 支持 OpenAI Chat / Responses、Anthropic Messages、Gemini Generate Content / Interactions、OpenRouter、DeepSeek、SiliconFlow、Moonshot、Kimi Code、Mistral、Z.AI、百炼以及自定义兼容供应商。

<details open>
<summary><strong>支持的 Agent</strong></summary>

<div align="center">

<table width="100%">
  <tr>
    <td align="center" width="20%">
      <a href="https://github.com/anthropics/claude-code">
        <img src="/packages/ui/src/assets/agent-logos/claude-code.png" width="44" height="44" alt="Claude Code 图标" />
        <br />
        <strong>Claude Code (CLI & APP)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://github.com/openai/codex">
        <img src="/packages/ui/src/assets/agent-logos/codex.png" width="44" height="44" alt="Codex 图标" />
        <br />
        <strong>Codex (CLI & APP)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://github.com/xai-org/grok-build">
        <img src="/packages/ui/src/assets/agent-logos/grok.ico" width="44" height="44" alt="Grok CLI 图标" />
        <br />
        <strong>Grok CLI (CLI)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://github.com/MoonshotAI/kimi-cli">
        <img src="/docs/public/provider-icons/moonshot.ico" width="44" height="44" alt="Kimi CLI 图标" />
        <br />
        <strong>Kimi CLI (CLI)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://kilo.ai/">
        <img src="/packages/ui/src/assets/agent-logos/kilo.svg" width="44" height="44" alt="Kilo Code 图标" />
        <br />
        <strong>Kilo Code (CLI)</strong>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="20%">
      <a href="https://github.com/anomalyco/opencode">
        <img src="/packages/ui/src/assets/agent-logos/opencode.ico" width="44" height="44" alt="OpenCode 图标" />
        <br />
        <strong>OpenCode (CLI & APP)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://github.com/earendil-works/pi">
        <img src="/packages/ui/src/assets/agent-logos/pi.svg" width="44" height="44" alt="Pi 图标" />
        <br />
        <strong>Pi (CLI)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://zcode.z.ai/cn">
        <img src="/packages/ui/src/assets/agent-logos/zcode.png" width="44" height="44" alt="ZCode 图标" />
        <br />
        <strong>ZCode (APP)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://www.anthropic.com/news/claude-design-anthropic-labs">
        <img src="/packages/ui/src/assets/agent-logos/claude-code.png" width="44" height="44" alt="Claude Design 图标" />
        <br />
        <strong>Claude Design (APP)</strong>
      </a>
    </td>
    <td align="center" width="20%">
      <a href="https://www.workbuddy.ai/">
        <img src="/packages/ui/src/assets/agent-logos/workbuddy.png" width="44" height="44" alt="WorkBuddy 图标" />
        <br />
        <strong>WorkBuddy (APP)</strong>
      </a>
    </td>
  </tr>
</table>

</div>

</details>

## 快速开始

### 桌面端（推荐）

1. 从 [AgentRouter Releases](https://github.com/zhangqinzhong/claude-code-router/releases/latest) 下载对应平台的安装包，安装并启动 AgentRouter。

2. 打开 **供应商 → 添加供应商**。选择内置预设或自定义端点，填写 API Key，选择协议与模型，然后保存。
3. 打开 **服务** 并点击 **启动**。本地模型网关默认监听 `http://127.0.0.1:3466`。
4. 打开 **Agent配置**，选择 Claude Code、Claude Design、Codex、Grok CLI、Kimi CLI、Kilo Code、OpenCode、Pi、ZCode 或 WorkBuddy，指定模型并应用配置档案。
5. 开始使用 Agent。在 **日志** 中确认最终供应商、模型、状态、Token、耗时与错误。

现在 Agent 已经连接到 AgentRouter。如需增加条件规则、自动重试、请求改写或 Fallback 模型，请打开 **路由**。

### CLI

npm CLI 要求 Node.js 22 或更高版本。无需 Electron，也能启动相同的模型网关与浏览器管理界面：

CLI 包尚未发布到 npm。在当前源码目录中运行（需要 Node.js 22+）；全局安装见 [CLI 文档](packages/cli/README_zh.md)：

```sh
npm ci
npm run build:assets
node packages/cli/dist/main/cli.js ui
```

打开 `http://127.0.0.1:3458`，然后按照上面的 **供应商 → 服务 → Agent 配置档案** 流程操作。模型网关仍位于 `http://127.0.0.1:3466`。服务模式、鉴权和 Profile 命令见 CLI 命令参考。

### Docker

```sh
docker compose up -d --build
```

Docker 默认通过 `http://127.0.0.1:3458` 提供管理界面与网关路由。远程暴露 AgentRouter 前，请先阅读 Docker 部署指南。

## 构建桌面应用

先安装 Node.js 22+，然后执行 `npm ci`。

| 目标 | 命令 | 产物目录 |
| --- | --- | --- |
| macOS 本地 DMG/ZIP | `npm run build:app:mac` | `release-local/` |
| Windows 本地 NSIS 安装包 | `npm run build:app:win` | `release-local/` |

Windows App 打包必须在 Windows x64 上运行，因为 `better-sqlite3` 包含 Electron 原生模块，不能从 macOS 或 Linux 交叉编译。推送 `v*` tag 时，release workflow 会分别在 macOS runner 和 `windows-latest` 上构建 macOS 与 Windows 产物。

## 工作方式

```text
Claude Code · Claude Design · Codex · Grok CLI · Kimi CLI · Kilo Code · OpenCode · Pi · ZCode · WorkBuddy · 兼容 API 客户端
                              │
                              ▼
                 AgentRouter :3466
              配置档案 · 路由 · 凭据 · 工具 · 日志
                              │
                              ▼
                  命中的供应商、模型与账号
```

## 核心能力

| 能力领域 | 功能亮点 |
| --- | --- |
| **Agent** | Claude Code、Claude Design、Codex、Grok CLI、Kimi CLI、Kilo Code、OpenCode、Pi、ZCode 和 WorkBuddy 配置档案；模型覆盖；作用范围；环境变量；CLI / App 启动入口；多开工作流 |
| **供应商** | 内置预设和自定义端点；协议探测；模型发现；连通性检测；按支持情况导入本机登录态；单 Key 与凭据池 |
| **模型与路由** | 可搜索模型目录；用于任务选择的模型描述；Header / Body 条件；模型前缀；请求改写；重试；有序 Fallback |
| **工具与扩展** | Fusion 模型；ToolHub；内置浏览器自动化；Chrome 登录态导入；wrapper / core gateway plugin；本地路由与虚拟模型 |
| **访问与额度** | 独立的 AgentRouter 客户端 Key，可设置有效期以及本地请求、Token 和图片限额 |
| **日志与观测** | 请求 / 响应详情；最终供应商、模型与凭据；状态；耗时；Token；成本估算；工具调用；Agent 执行链路 |
| **AgentClaw** | 通过微信 iLink、企业微信、Slack、Discord、Telegram、LINE、飞书和钉钉接力 Agent |

## 准备好后，继续深入

完整文档位于本仓库的 `docs/` 目录。

- 安装并启动 AgentRouter
- 配置供应商
- 了解路由与完整配置
- 使用 CLI
- 通过 Docker 部署
- 排查常见问题

## 许可证

本项目基于 [MIT License](LICENSE) 发布。

AgentRouter 基于 [Claude Code Router](https://github.com/musistudio/claude-code-router) 开发，保留原项目许可证与版权声明。
