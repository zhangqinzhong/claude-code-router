---
title: Tray configuration
pageTitle: Tray configuration
eyebrow: Detailed configuration
lead: Configure the AgentRouter system tray icon, balance progress, and tray window widgets.
---

## Top fields

| Field | Capability |
| --- | --- |
| Tray icon | Defaults to `Layered knot`. Other options include `Random`, `Auralis`, `Solara`, `Vesper`, and `Balance progress`. Previously saved icon choices are preserved. |
| Show Token usage in the menu bar | Available on macOS and off by default. When off, only the icon is shown; usage remains in the tooltip and context menu. When on, today's Token usage appears beside the icon. |
| Balance progress | Uses provider account usage as tray icon progress. Requires `Fetch usage` on a provider first. |
| Account | Selects the provider account used for balance progress. |
| Data | Selects the balance, subscription, or quota meter used as the progress source. |

If no account data is available, the page shows `No account data is available. Enable account monitoring on a provider first.` This usually means no provider has `Fetch usage` enabled, or usage fetching has not succeeded yet.

Icon and usage-display preferences save automatically and update the menu bar after saving, without restarting. Menu bar usage is independent of the tray window's `Header component`.

## Tray window layout

| Area | Capability |
| --- | --- |
| Components | Left-side component palette for adding or enabling tray window widgets. |
| Preview | Middle preview area showing the current tray window layout. Widgets can be dragged to reorder. |
| Component properties | Right-side editor for the selected widget's `Style`, or for removing the widget. |

## Component types

| Component | Capability |
| --- | --- |
| Provider component | Shows `Provider tabs` for switching provider data in the tray window. It is a singleton component and can be enabled only once. |
| Header component | Shows `Title and status`. It is a singleton component and can be enabled only once. |
| Account component | Shows `Account balance`. Multiple account components can be added with different styles. |
| Trend component | Shows `Token flow chart`. |
| Activity component | Shows `Token activity`. |
| Metric component | Shows `Token stats`. |
| Breakdown component | Shows `Token mix`, `Circular metrics`, or `Model share`. |

## Styles

Different components support different `Style` options. Common styles include `Cards`, `Compact`, `List`, `Pills`, `Line`, `Area`, `Bar`, `Ring`, `Donut`, `Gauges`, `Sparkline`, and `Stacked`. Style changes only affect the tray display; they do not change routing, providers, or usage stats.
