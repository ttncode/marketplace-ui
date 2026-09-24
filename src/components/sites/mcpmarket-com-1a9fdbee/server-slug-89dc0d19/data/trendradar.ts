import type { ServerDetail } from "../types";

export const trendradar: ServerDetail = {
  "slug": "trendradar",
  "title": "TrendRadar: AI-Powered Trending Topic Monitoring & Analysis",
  "metaDescription": "TrendRadar aggregates trending topics from 35+ platforms, offering AI-powered analysis, smart filtering, and real-time notifications across multiple channels. Stay informed effortlessly.",
  "name": "TrendRadar",
  "author": {
    "name": "sansan0",
    "href": "https://github.com/sansan0",
    "avatar": {
      "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-77180927.png",
      "alt": "sansan0"
    }
  },
  "stars": "62k",
  "links": {
    "share": "https://mcpmarket.com/server/trendradar",
    "github": "https://github.com/sansan0/trendradar",
    "npm": null
  },
  "categories": [
    {
      "label": "Data Science & ML",
      "href": "/categories/data-science-ml"
    },
    {
      "label": "Analytics & Monitoring",
      "href": "/categories/analytics-monitoring"
    },
    {
      "label": "Web Scraping & Data Collection",
      "href": "/categories/web-scraping-data-collection"
    }
  ],
  "description": "Aggregates trending topics from over 35 platforms, offering intelligent filtering, automated multi-channel notifications, and AI-powered conversational analysis for deep news insights.",
  "tabs": {
    "slug": "trendradar",
    "hasReadme": true,
    "longDescription": "TrendRadar is an innovative tool designed to cut through information overload by intelligently aggregating and analyzing trending topics from over 35 diverse platforms, including popular Chinese social media like Douyin, Zhihu, Bilibili, and Weibo. It empowers users to move beyond algorithm-driven feeds by offering smart content filtering based on custom keywords, automated real-time push notifications across multiple channels (WeCom, Feishu, DingTalk, Telegram, Email, ntfy), and sophisticated AI-powered conversational analysis via the MCP protocol. With features like topic trend tracking, sentiment analysis, and cross-platform comparisons, TrendRadar allows for deep, natural language-based exploration of news data, all with zero-code deployment in minutes, enabling users to truly understand and act on the most relevant information.",
    "features": [
      "Multi-platform Trending Topic Aggregation from over 35 sources",
      "AI-Powered Conversational Analysis with 13 tools via MCP protocol",
      "Intelligent Content Filtering using custom keywords and groups",
      "Customizable Push Strategies including daily summary, current list, and incremental monitoring with time window control",
      "Multi-channel Real-time Notifications to WeCom, Feishu, DingTalk, Telegram, Email, and ntfy",
      "4,591 GitHub stars"
    ],
    "useCases": [
      "Monitoring stock market investments and financial news for investors",
      "Tracking brand sentiment and public relations for corporate communications",
      "Identifying and analyzing industry trends for content creators, self-media professionals, or researchers"
    ],
    "faq": [
      {
        "question": "What is TrendRadar and what does it do?",
        "answer": "TrendRadar is an analytics and monitoring tool that aggregates trending topics from over 35 platforms. It provides intelligent content filtering, AI-powered conversational analysis, and multi-channel real-time notifications to help users gain deep insights into news and trends."
      },
      {
        "question": "How does TrendRadar help me filter irrelevant information?",
        "answer": "TrendRadar features intelligent content filtering, allowing you to set custom keywords and groups. It supports 'ordinary', 'must-include (+)', and 'exclude (!)' syntaxes, ensuring you only receive news relevant to your interests, avoiding information overload."
      },
      {
        "question": "Which platforms does TrendRadar monitor and notify me through?",
        "answer": "TrendRadar aggregates trends from popular platforms like Weibo, Douyin, Zhihu, and over 30 others. It sends real-time notifications to multiple channels including WeCom, Feishu, DingTalk, Telegram, Email, and ntfy, so you get updates on your preferred platform."
      },
      {
        "question": "What kind of analytical capabilities does TrendRadar offer?",
        "answer": "Beyond aggregation, TrendRadar provides AI-powered conversational analysis for deep news insights. It also offers hot spot trend analysis, tracking news evolution, ranking changes, appearance frequency, and identifying new topics to give you a comprehensive understanding of how trends develop."
      },
      {
        "question": "Is TrendRadar easy to set up and use?",
        "answer": "Yes, TrendRadar is designed for lightweight and easy deployment, often within 30 seconds, with Docker support for simplified setup. Its customizable push strategies and intuitive filtering options make it user-friendly for various monitoring needs."
      }
    ],
    "mcpTools": [
      {
        "name": "get_latest_news",
        "description": "获取最新一批爬取的新闻数据，快速了解当前热点\n\nArgs:\n    platforms: 平台ID列表，如 ['zhihu', 'weibo', 'douyin']\n               - 不指定时：使用 config.yaml 中配置的所有平台\n               - 支持的平台来自 config/config.yaml 的 platforms 配置\n               - 每个平台都有对应的name字段（如\"知乎\"、\"微博\"），方便AI识别\n    limit: 返回条数限制，默认50，最大1000\n           注意：实际返回数量可能少于请求值，取决于当前可用的新闻总数\n    include_url: 是否包含URL链接，默认False（节省token）\n\nReturns:\n    JSON格式的新闻列表\n\n**重要：数据展示建议**\n本工具会返回完整的新闻列表（通常50条）给你。但请注意：\n- **工具返回**：完整的50条数据 ✅\n- **建议展示**：向用户展示全部数据，除非用户明确要求总结\n- **用户期望**：用户可能需要完整数据，请谨慎总结\n\n**何时可以总结**：\n- 用户明确说\"给我总结一下\"或\"挑重点说\"\n- 数据量超过100条时，可先展示部分并询问是否查看全部\n\n**注意**：如果用户询问\"为什么只显示了部分\"，说明他们需要完整数据",
        "params": [
          {
            "name": "limit",
            "type": "integer",
            "required": false
          },
          {
            "name": "platforms",
            "type": "any",
            "required": false
          },
          {
            "name": "include_url",
            "type": "boolean",
            "required": false
          }
        ]
      },
      {
        "name": "get_trending_topics",
        "description": "获取个人关注词的新闻出现频率统计（基于 config/frequency_words.txt）\n\n注意：本工具不是自动提取新闻热点，而是统计你在 config/frequency_words.txt 中\n设置的个人关注词在新闻中出现的频率。你可以自定义这个关注词列表。\n\nArgs:\n    top_n: 返回TOP N关注词，默认10\n    mode: 模式选择\n        - daily: 当日累计数据统计\n        - current: 最新一批数据统计（默认）\n\nReturns:\n    JSON格式的关注词频率统计列表",
        "params": [
          {
            "name": "mode",
            "type": "string",
            "required": false
          },
          {
            "name": "top_n",
            "type": "integer",
            "required": false
          }
        ]
      },
      {
        "name": "get_news_by_date",
        "description": "获取指定日期的新闻数据，用于历史数据分析和对比\n\nArgs:\n    date_query: 日期查询，可选格式:\n        - 自然语言: \"今天\", \"昨天\", \"前天\", \"3天前\"\n        - 标准日期: \"2024-01-15\", \"2024/01/15\"\n        - 默认值: \"今天\"（节省token）\n    platforms: 平台ID列表，如 ['zhihu', 'weibo', 'douyin']\n               - 不指定时：使用 config.yaml 中配置的所有平台\n               - 支持的平台来自 config/config.yaml 的 platforms 配置\n               - 每个平台都有对应的name字段（如\"知乎\"、\"微博\"），方便AI识别\n    limit: 返回条数限制，默认50，最大1000\n           注意：实际返回数量可能少于请求值，取决于指定日期的新闻总数\n    include_url: 是否包含URL链接，默认False（节省token）\n\nReturns:\n    JSON格式的新闻列表，包含标题、平台、排名等信息\n\n**重要：数据展示建议**\n本工具会返回完整的新闻列表（通常50条）给你。但请注意：\n- **工具返回**：完整的50条数据 ✅\n- **建议展示**：向用户展示全部数据，除非用户明确要求总结\n- **用户期望**：用户可能需要完整数据，请谨慎总结\n\n**何时可以总结**：\n- 用户明确说\"给我总结一下\"或\"挑重点说\"\n- 数据量超过100条时，可先展示部分并询问是否查看全部\n\n**注意**：如果用户询问\"为什么只显示了部分\"，说明他们需要完整数据",
        "params": [
          {
            "name": "limit",
            "type": "integer",
            "required": false
          },
          {
            "name": "platforms",
            "type": "any",
            "required": false
          },
          {
            "name": "date_query",
            "type": "any",
            "required": false
          },
          {
            "name": "include_url",
            "type": "boolean",
            "required": false
          }
        ]
      },
      {
        "name": "analyze_topic_trend",
        "description": "统一话题趋势分析工具 - 整合多种趋势分析模式\n\nArgs:\n    topic: 话题关键词（必需）\n    analysis_type: 分析类型，可选值：\n        - \"trend\": 热度趋势分析（追踪话题的热度变化）\n        - \"lifecycle\": 生命周期分析（从出现到消失的完整周期）\n        - \"viral\": 异常热度检测（识别突然爆火的话题）\n        - \"predict\": 话题预测（预测未来可能的热点）\n    date_range: 日期范围（trend和lifecycle模式），可选\n                - **格式**: {\"start\": \"YYYY-MM-DD\", \"end\": \"YYYY-MM-DD\"}\n                - **示例**: {\"start\": \"2025-10-18\", \"end\": \"2025-10-25\"}\n                - **说明**: AI需要根据用户的自然语言（如\"最近7天\"）自动计算日期范围\n                - **默认**: 不指定时默认分析最近7天\n    granularity: 时间粒度（trend模式），默认\"day\"（仅支持 day，因为底层数据按天聚合）\n    threshold: 热度突增倍数阈值（viral模式），默认3.0\n    time_window: 检测时间窗口小时数（viral模式），默认24\n    lookahead_hours: 预测未来小时数（predict模式），默认6\n    confidence_threshold: 置信度阈值（predict模式），默认0.7\n\nReturns:\n    JSON格式的趋势分析结果\n\n**AI使用说明：**\n当用户使用相对时间表达时（如\"最近7天\"、\"过去一周\"、\"上个月\"），\nAI需要自动计算对应的日期范围并传递给 date_range 参数。\n\nExamples:\n    - analyze_topic_trend(topic=\"人工智能\", analysis_type=\"trend\", date_range={\"start\": \"2025-10-18\", \"end\": \"2025-10-25\"})\n    - analyze_topic_trend(topic=\"特斯拉\", analysis_type=\"lifecycle\", date_range={\"start\": \"2025-10-18\", \"end\": \"2025-10-25\"})\n    - analyze_topic_trend(topic=\"比特币\", analysis_type=\"viral\", threshold=3.0)\n    - analyze_topic_trend(topic=\"ChatGPT\", analysis_type=\"predict\", lookahead_hours=6)",
        "params": [
          {
            "name": "topic",
            "type": "string",
            "required": true
          },
          {
            "name": "threshold",
            "type": "number",
            "required": false
          },
          {
            "name": "date_range",
            "type": "any",
            "required": false
          },
          {
            "name": "granularity",
            "type": "string",
            "required": false
          },
          {
            "name": "time_window",
            "type": "integer",
            "required": false
          },
          {
            "name": "analysis_type",
            "type": "string",
            "required": false
          },
          {
            "name": "lookahead_hours",
            "type": "integer",
            "required": false
          },
          {
            "name": "confidence_threshold",
            "type": "number",
            "required": false
          }
        ]
      },
      {
        "name": "analyze_data_insights",
        "description": "统一数据洞察分析工具 - 整合多种数据分析模式\n\nArgs:\n    insight_type: 洞察类型，可选值：\n        - \"platform_compare\": 平台对比分析（对比不同平台对话题的关注度）\n        - \"platform_activity\": 平台活跃度统计（统计各平台发布频率和活跃时间）\n        - \"keyword_cooccur\": 关键词共现分析（分析关键词同时出现的模式）\n    topic: 话题关键词（可选，platform_compare模式适用）\n    date_range: **【对象类型】** 日期范围（可选）\n                - **格式**: {\"start\": \"YYYY-MM-DD\", \"end\": \"YYYY-MM-DD\"}\n                - **示例**: {\"start\": \"2025-01-01\", \"end\": \"2025-01-07\"}\n                - **重要**: 必须是对象格式，不能传递整数\n    min_frequency: 最小共现频次（keyword_cooccur模式），默认3\n    top_n: 返回TOP N结果（keyword_cooccur模式），默认20\n\nReturns:\n    JSON格式的数据洞察分析结果\n\nExamples:\n    - analyze_data_insights(insight_type=\"platform_compare\", topic=\"人工智能\")\n    - analyze_data_insights(insight_type=\"platform_activity\", date_range={\"start\": \"2025-01-01\", \"end\": \"2025-01-07\"})\n    - analyze_data_insights(insight_type=\"keyword_cooccur\", min_frequency=5, top_n=15)",
        "params": [
          {
            "name": "top_n",
            "type": "integer",
            "required": false
          },
          {
            "name": "topic",
            "type": "any",
            "required": false
          },
          {
            "name": "date_range",
            "type": "any",
            "required": false
          },
          {
            "name": "insight_type",
            "type": "string",
            "required": false
          },
          {
            "name": "min_frequency",
            "type": "integer",
            "required": false
          }
        ]
      },
      {
        "name": "analyze_sentiment",
        "description": "分析新闻的情感倾向和热度趋势\n\nArgs:\n    topic: 话题关键词（可选）\n    platforms: 平台ID列表，如 ['zhihu', 'weibo', 'douyin']\n               - 不指定时：使用 config.yaml 中配置的所有平台\n               - 支持的平台来自 config/config.yaml 的 platforms 配置\n               - 每个平台都有对应的name字段（如\"知乎\"、\"微博\"），方便AI识别\n    date_range: **【对象类型】** 日期范围（可选）\n                - **格式**: {\"start\": \"YYYY-MM-DD\", \"end\": \"YYYY-MM-DD\"}\n                - **示例**: {\"start\": \"2025-01-01\", \"end\": \"2025-01-07\"}\n                - **重要**: 必须是对象格式，不能传递整数\n    limit: 返回新闻数量，默认50，最大100\n           注意：本工具会对新闻标题进行去重（同一标题在不同平台只保留一次），\n           因此实际返回数量可能少于请求的 limit 值\n    sort_by_weight: 是否按热度权重排序，默认True\n    include_url: 是否包含URL链接，默认False（节省token）\n\nReturns:\n    JSON格式的分析结果，包含情感分布、热度趋势和相关新闻\n\n**重要：数据展示策略**\n- 本工具返回完整的分析结果和新闻列表\n- **默认展示方式**：展示完整的分析结果（包括所有新闻）\n- 仅在用户明确要求\"总结\"或\"挑重点\"时才进行筛选",
        "params": [
          {
            "name": "limit",
            "type": "integer",
            "required": false
          },
          {
            "name": "topic",
            "type": "any",
            "required": false
          },
          {
            "name": "platforms",
            "type": "any",
            "required": false
          },
          {
            "name": "date_range",
            "type": "any",
            "required": false
          },
          {
            "name": "include_url",
            "type": "boolean",
            "required": false
          },
          {
            "name": "sort_by_weight",
            "type": "boolean",
            "required": false
          }
        ]
      },
      {
        "name": "find_similar_news",
        "description": "查找与指定新闻标题相似的其他新闻\n\nArgs:\n    reference_title: 新闻标题（完整或部分）\n    threshold: 相似度阈值，0-1之间，默认0.6\n               注意：阈值越高匹配越严格，返回结果越少\n    limit: 返回条数限制，默认50，最大100\n           注意：实际返回数量取决于相似度匹配结果，可能少于请求值\n    include_url: 是否包含URL链接，默认False（节省token）\n\nReturns:\n    JSON格式的相似新闻列表，包含相似度分数\n\n**重要：数据展示策略**\n- 本工具返回完整的相似新闻列表\n- **默认展示方式**：展示全部返回的新闻（包括相似度分数）\n- 仅在用户明确要求\"总结\"或\"挑重点\"时才进行筛选",
        "params": [
          {
            "name": "limit",
            "type": "integer",
            "required": false
          },
          {
            "name": "threshold",
            "type": "number",
            "required": false
          },
          {
            "name": "include_url",
            "type": "boolean",
            "required": false
          },
          {
            "name": "reference_title",
            "type": "string",
            "required": true
          }
        ]
      },
      {
        "name": "generate_summary_report",
        "description": "每日/每周摘要生成器 - 自动生成热点摘要报告\n\nArgs:\n    report_type: 报告类型（daily/weekly）\n    date_range: **【对象类型】** 自定义日期范围（可选）\n                - **格式**: {\"start\": \"YYYY-MM-DD\", \"end\": \"YYYY-MM-DD\"}\n                - **示例**: {\"start\": \"2025-01-01\", \"end\": \"2025-01-07\"}\n                - **重要**: 必须是对象格式，不能传递整数\n\nReturns:\n    JSON格式的摘要报告，包含Markdown格式内容",
        "params": [
          {
            "name": "date_range",
            "type": "any",
            "required": false
          },
          {
            "name": "report_type",
            "type": "string",
            "required": false
          }
        ]
      },
      {
        "name": "search_news",
        "description": "统一搜索接口，支持多种搜索模式\n\nArgs:\n    query: 搜索关键词或内容片段\n    search_mode: 搜索模式，可选值：\n        - \"keyword\": 精确关键词匹配（默认，适合搜索特定话题）\n        - \"fuzzy\": 模糊内容匹配（适合搜索内容片段，会过滤相似度低于阈值的结果）\n        - \"entity\": 实体名称搜索（适合搜索人物/地点/机构）\n    date_range: 日期范围（可选）\n                - **格式**: {\"start\": \"YYYY-MM-DD\", \"end\": \"YYYY-MM-DD\"}\n                - **示例**: {\"start\": \"2025-01-01\", \"end\": \"2025-01-07\"}\n                - **说明**: AI需要根据用户的自然语言（如\"最近7天\"）自动计算日期范围\n                - **默认**: 不指定时默认查询今天的新闻\n                - **注意**: start和end可以相同（表示单日查询）\n    platforms: 平台ID列表，如 ['zhihu', 'weibo', 'douyin']\n               - 不指定时：使用 config.yaml 中配置的所有平台\n               - 支持的平台来自 config/config.yaml 的 platforms 配置\n               - 每个平台都有对应的name字段（如\"知乎\"、\"微博\"），方便AI识别\n    limit: 返回条数限制，默认50，最大1000\n           注意：实际返回数量取决于搜索匹配结果（特别是 fuzzy 模式下会过滤低相似度结果）\n    sort_by: 排序方式，可选值：\n        - \"relevance\": 按相关度排序（默认）\n        - \"weight\": 按新闻权重排序\n        - \"date\": 按日期排序\n    threshold: 相似度阈值（仅fuzzy模式有效），0-1之间，默认0.6\n               注意：阈值越高匹配越严格，返回结果越少\n    include_url: 是否包含URL链接，默认False（节省token）\n\nReturns:\n    JSON格式的搜索结果，包含标题、平台、排名等信息\n\n**重要：数据展示策略**\n- 本工具返回完整的搜索结果列表\n- **默认展示方式**：展示全部返回的新闻，无需总结或筛选\n- 仅在用户明确要求\"总结\"或\"挑重点\"时才进行筛选\n\n**AI使用说明：**\n当用户使用相对时间表达时（如\"最近7天\"、\"过去一周\"、\"最近半个月\"），\nAI需要自动计算对应的日期范围。计算规则：\n- \"最近7天\" → {\"start\": \"今天-6天\", \"end\": \"今天\"}\n- \"过去一周\" → {\"start\": \"今天-6天\", \"end\": \"今天\"}\n- \"最近30天\" → {\"start\": \"今天-29天\", \"end\": \"今天\"}\n\nExamples:\n    - 今天的新闻: search_news(query=\"人工智能\")\n    - 最近7天: search_news(query=\"人工智能\", date_range={\"start\": \"2025-10-18\", \"end\": \"2025-10-25\"})\n    - 精确日期: search_news(query=\"人工智能\", date_range={\"start\": \"2025-01-01\", \"end\": \"2025-01-07\"})\n    - 模糊搜索: search_news(query=\"特斯拉降价\", search_mode=\"fuzzy\", threshold=0.4)",
        "params": [
          {
            "name": "limit",
            "type": "integer",
            "required": false
          },
          {
            "name": "query",
            "type": "string",
            "required": true
          },
          {
            "name": "sort_by",
            "type": "string",
            "required": false
          },
          {
            "name": "platforms",
            "type": "any",
            "required": false
          },
          {
            "name": "threshold",
            "type": "number",
            "required": false
          },
          {
            "name": "date_range",
            "type": "any",
            "required": false
          },
          {
            "name": "include_url",
            "type": "boolean",
            "required": false
          },
          {
            "name": "search_mode",
            "type": "string",
            "required": false
          }
        ]
      },
      {
        "name": "search_related_news_history",
        "description": "基于种子新闻，在历史数据中搜索相关新闻\n\nArgs:\n    reference_text: 参考新闻标题（完整或部分）\n    time_preset: 时间范围预设值，可选：\n        - \"yesterday\": 昨天\n        - \"last_week\": 上周 (7天)\n        - \"last_month\": 上个月 (30天)\n        - \"custom\": 自定义日期范围（需要提供 start_date 和 end_date）\n    threshold: 相关性阈值，0-1之间，默认0.4\n               注意：综合相似度计算（70%关键词重合 + 30%文本相似度）\n               阈值越高匹配越严格，返回结果越少\n    limit: 返回条数限制，默认50，最大100\n           注意：实际返回数量取决于相关性匹配结果，可能少于请求值\n    include_url: 是否包含URL链接，默认False（节省token）\n\nReturns:\n    JSON格式的相关新闻列表，包含相关性分数和时间分布\n\n**重要：数据展示策略**\n- 本工具返回完整的相关新闻列表\n- **默认展示方式**：展示全部返回的新闻（包括相关性分数）\n- 仅在用户明确要求\"总结\"或\"挑重点\"时才进行筛选",
        "params": [
          {
            "name": "limit",
            "type": "integer",
            "required": false
          },
          {
            "name": "threshold",
            "type": "number",
            "required": false
          },
          {
            "name": "include_url",
            "type": "boolean",
            "required": false
          },
          {
            "name": "time_preset",
            "type": "string",
            "required": false
          },
          {
            "name": "reference_text",
            "type": "string",
            "required": true
          }
        ]
      },
      {
        "name": "get_current_config",
        "description": "获取当前系统配置\n\nArgs:\n    section: 配置节，可选值：\n        - \"all\": 所有配置（默认）\n        - \"crawler\": 爬虫配置\n        - \"push\": 推送配置\n        - \"keywords\": 关键词配置\n        - \"weights\": 权重配置\n\nReturns:\n    JSON格式的配置信息",
        "params": [
          {
            "name": "section",
            "type": "string",
            "required": false
          }
        ]
      },
      {
        "name": "get_system_status",
        "description": "获取系统运行状态和健康检查信息\n\n返回系统版本、数据统计、缓存状态等信息\n\nReturns:\n    JSON格式的系统状态信息",
        "params": []
      },
      {
        "name": "trigger_crawl",
        "description": "手动触发一次爬取任务（可选持久化）\n\nArgs:\n    platforms: 指定平台ID列表，如 ['zhihu', 'weibo', 'douyin']\n               - 不指定时：使用 config.yaml 中配置的所有平台\n               - 支持的平台来自 config/config.yaml 的 platforms 配置\n               - 每个平台都有对应的name字段（如\"知乎\"、\"微博\"），方便AI识别\n               - 注意：失败的平台会在返回结果的 failed_platforms 字段中列出\n    save_to_local: 是否保存到本地 output 目录，默认 False\n    include_url: 是否包含URL链接，默认False（节省token）\n\nReturns:\n    JSON格式的任务状态信息，包含：\n    - platforms: 成功爬取的平台列表\n    - failed_platforms: 失败的平台列表（如有）\n    - total_news: 爬取的新闻总数\n    - data: 新闻数据\n\nExamples:\n    - 临时爬取: trigger_crawl(platforms=['zhihu'])\n    - 爬取并保存: trigger_crawl(platforms=['weibo'], save_to_local=True)\n    - 使用默认平台: trigger_crawl()  # 爬取config.yaml中配置的所有平台",
        "params": [
          {
            "name": "platforms",
            "type": "any",
            "required": false
          },
          {
            "name": "include_url",
            "type": "boolean",
            "required": false
          },
          {
            "name": "save_to_local",
            "type": "boolean",
            "required": false
          }
        ]
      }
    ]
  },
  "primaryActions": null,
  "related": [
    {
      "title": "Related MCPs",
      "more": {
        "label": "View more",
        "href": "/categories/data-science-ml"
      },
      "items": [
        {
          "title": "Snowflake Integration",
          "href": "/server/snowflake-integration-1",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-140295050.png",
            "alt": "datawiz168"
          },
          "description": "Enables Claude to execute SQL queries and interact with Snowflake databases."
        },
        {
          "title": "Tinybird",
          "href": "/server/tinybird",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-53208553.png",
            "alt": "tinybirdco"
          },
          "description": "Connects to a Tinybird Workspace and interacts with data sources and API endpoints using the Model Context Protocol."
        },
        {
          "title": "Axiom",
          "href": "/server/axiom",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/server-slug-89dc0d19/avatars/avatar-55885315.png",
            "alt": "ThetaBird"
          },
          "description": "Enables AI agents to query data stored in Axiom using the Axiom Processing Language (APL)."
        }
      ]
    },
    {
      "title": "Related Skills",
      "more": {
        "label": "View all",
        "href": "/tools/skills"
      },
      "items": [
        {
          "title": "TaskFlow Inbox Triage",
          "href": "/tools/skills/taskflow-inbox-triage-2",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png",
            "alt": "openclaw"
          },
          "description": "Automates inbox classification, multi-channel message routing, and asynchronous reply handling using structured task workflows."
        },
        {
          "title": "Meme Maker",
          "href": "/tools/skills/meme-maker-1",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png",
            "alt": "openclaw"
          },
          "description": "Searches curated meme templates, suggests ideal joke formats, and renders custom memes in SVG, PNG, or hosted formats."
        },
        {
          "title": "Agent Skill Creator",
          "href": "/tools/skills/agent-skill-creator-1787994711990",
          "avatar": {
            "src": "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png",
            "alt": "openclaw"
          },
          "description": "Authors, repairs, and validates custom AgentSkills and SKILL.md configurations with standardized frontmatter and bundled resources."
        }
      ]
    }
  ]
};
