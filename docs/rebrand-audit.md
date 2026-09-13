# AgentRouter 品牌残留检查

检查范围：`packages/` 的运行代码、迁移逻辑、测试，以及打包配置。基线为 `39d6d1f`。

## 本次清理

- 菜单栏弹窗与设置预览统一引用 `build/icon.png`，删除 UI 和 Electron 中独立的旧 `logo.png`。图标不再重复缩小到容器的 72%。
- 管理服务与 profile 启动报错中的 `ccr ui`、`ccr start` 改为 `agentrouter`；桌面 CLI 日志同步更新。
- 导出文件名改为 `agentrouter-data-*.json`，保留导出格式标识以兼容读取方。
- 网关根路径声明 `agentrouter`，探测逻辑同时接受新旧身份。
- CLI 文档使用当前数据目录；provider manifest User-Agent 使用 AgentRouter。
- UI 的局部 `ccr` 变量改为 `gatewayApi`。
- Codex CLI 中间件优先查找 `.agentrouter` / Windows `agentrouter`；仅在新目录不存在且旧目录存在时读取旧目录。Claude 会话路径推断支持新旧目录。

## 保留的旧名称及原因

| 位置 / 类型 | 原因 |
| --- | --- |
| `profiles/legacy-artifacts.ts` 中 `ccr-*`、`.ccr-original`、`.ccr-backup-*` | 迁移的输入名称；直接替换会让旧文件无法识别。当前规则遇到已有新文件时保留旧文件，不删除可能仍被使用的脚本。 |
| `runtime/app-paths.ts` 中 `.claude-code-router`，旧 profile scope `ccr` | 旧数据识别与兼容读取。 |
| Profile 的 provider ID `claude-code-router`、既有 profile 内部目录 | 持久化配置与会话关联身份；不能只替换字符串，需要独立迁移与回滚验证。本次未更改已有 profile 的身份和存储位置。 |
| `CCR_UPSTREAM_PROXY_URL`、`CCR_GATEWAY_RUNTIME_ID` | `vendor/ai-gateway/src/upstream/client.ts` 与 `src/index.ts` 仍读取这些接口变量，单独重命名会破坏代理或运行时关联。 |
| `ccr.fusion-usage.v1`、`ccr.remote.v1`、导出 kind、provider manifest MIME | 协议和格式标识；如需迁移，应先支持双读，再切换新写入。 |
| 外部服务默认源与仓库入口 | 已移除旧第三方前端默认源、UI 仓库链接、文档站 GitHub 按钮和 Star 请求、包元数据及默认 GitHub 更新源。自定义前端和更新源由显式配置提供。旧前端域名仅用于识别并清退历史配置。 |
| 旧名称测试样例 | 用来验证旧配置、路径、协议仍能正确识别。 |

## 仍需单独迁移的写入位置

- `profiles/launch-service.ts` 的 Fish 配置文件名 `ccr.fish`。
- profile / agent 中默认 provider ID，以及 Claude Design、bot、WorkBuddy 和应用隔离目录的旧路径。
- bundled Claude Design 插件的内部存储与协议标记。

这些位置仍有旧名称，并未宣称已经全部清零。本次不清理用户磁盘上的历史配置、会话或应用备份。

## 验证

- TypeScript 类型检查通过。
- Core：957 通过，5 跳过；UI：203 通过；Electron：38 通过。
- 新增新旧目录发现和会话路径回归测试，网关根身份测试覆盖新旧名称。
- 生产资源构建通过；菜单栏弹窗使用构建后的页面进行图标渲染检查。

- 文档站依赖已通过 `npm ci` 安装，Astro 构建通过，生成 139 个页面；未配置站点地址，因此跳过 sitemap。

## 安装与流式指标验证

已安装到 `/Applications/AgentRouter.app`，安装包与本地最终构建的 app.asar 哈希一致。

- 修复单网关模式下首 token 延迟及输出阶段时长未传递到 raw-trace / standalone 日志的问题。
- 从请求鉴权前开始计时，跳过握手、心跳、完成事件；输出速率沿用输出 token 数除以首尾内容增量间隔。非流式或无有效间隔时不显示速率。
- WorkOpenAI 实测：客户端首 token 5197 ms，日志 5168 ms；两边输出阶段均为 6815 ms，165 个输出 token，界面 24 token/s。
- 公司 API 流式实测：客户端 10935 ms，日志 10906 ms；两边输出阶段均为 2611 ms，80 个输出 token。
- 修复非流式原始快照缺失状态码造成误计错误：通过托管网关 IPC 传递实际状态，最终实测 HTTP 200 且日志 status_code=200、ok=1。历史缺失值未伪造补写。
- 最新核心测试：960 通过、5 跳过；类型检查通过。已在桌面日志页检查首 Token / 输出速率，并确认观测页显示会话与请求。
- 配置和 Codex 历史数据库检查通过，239 份 Claude transcript 保留。备份位于 `~/Desktop/agentrouter-backup-20260912-150708`。
