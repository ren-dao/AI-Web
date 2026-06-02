import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始播种...");

  // 清空旧数据
  await prisma.rating.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.sideHustle.deleteMany();

  const sideHustles = [
    {
      title: "微信公众号写作",
      slug: "wechat-public-account-writing",
      category: "自媒体",
      description: "运营个人微信公众号，通过原创内容吸引粉丝，实现流量变现和广告收入。",
      fullDescription: `微信公众号写作是当前最流行的副业之一。你只需要选择一个你擅长的领域，持续产出优质内容，积累粉丝后通过流量主、软文广告、知识付费等方式变现。

**为什么选择公众号？**
- 微信拥有超过12亿月活用户，流量池巨大
- 公众号生态成熟，变现路径清晰
- 内容形式灵活，图文、视频、音频都支持
- 私域流量可沉淀，粉丝价值高

**变现方式**
1. 流量主广告（粉丝满500可开通）
2. 软文广告合作
3. 付费文章 / 付费订阅
4. 电商带货
5. 课程/咨询服务导流`,
      difficulty: "入门",
      timeInvestment: "10-20 小时/周",
      incomeMin: 2000,
      incomeMax: 15000,
      requiredSkills: JSON.stringify(["写作能力", "选题策划", "排版设计", "数据分析", "用户运营"]),
      toolsResources: JSON.stringify(["微信公众平台", "秀米/135编辑器", "Canva", "新榜/西瓜数据"]),
      startupCost: "0-300元",
      stepsToStart: JSON.stringify([
        "确定内容定位和目标受众",
        "注册微信公众号（个人订阅号免费）",
        "完成账号基础设置（头像、简介、菜单栏）",
        "准备3-5篇优质内容作为启动文章",
        "制定内容日历，保持稳定更新频率",
        "在朋友圈和相关社群推广",
        "持续优化内容质量和发布时间",
      ]),
      pros: JSON.stringify(["门槛低，手机即可操作", "粉丝积累后可产生复利效应", "变现方式多样", "工作时间完全自由"]),
      cons: JSON.stringify(["前期涨粉较慢，需要耐心", "内容创作需要持续投入", "竞争激烈，需要差异化定位", "算法推荐机制不稳定"]),
      tipsForSuccess: JSON.stringify([
        "选择一个垂直细分领域，做小而精的内容",
        "保持稳定的更新频率，培养读者阅读习惯",
        "重视标题和封面图，这是点击率的关键",
        "多和粉丝互动，建立信任关系",
        "关注数据分析，优化内容策略",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "微信公众平台官网", "url": "https://mp.weixin.qq.com" },
        { "title": "新榜 - 内容产业服务平台", "url": "https://www.newrank.cn" },
        { "title": "秀米编辑器", "url": "https://xiumi.us" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
      isFeatured: true,
      submitterName: "李明",
      submitterEmail: "liming@example.com",
    },
    {
      title: "闲鱼无货源电商",
      slug: "xianyu-no-inventory-ecommerce",
      category: "电商",
      description: "利用闲鱼平台做无货源电商，从1688/拼多多选品转卖，赚取差价利润。",
      fullDescription: `闲鱼无货源电商是一种低风险的电商副业模式。你不需要自己囤货，只需在货源平台（如1688、拼多多）找到优质商品，将商品信息和图片发布到闲鱼，有人下单后你再去货源平台下单，货源方直接发货给买家。

**核心优势**
- 零库存风险，不需要垫资囤货
- 操作简单，手机即可完成所有操作
- 闲鱼流量大，免费流量充足
- 适合新手入门电商行业

**操作流程**
1. 选品 → 在1688/拼多多找到性价比高的商品
2. 上架 → 优化标题、描述、图片后发布到闲鱼
3. 接单 → 买家下单付款
4. 代购 → 去货源平台下单，填写买家地址
5. 售后 → 跟踪物流，处理买家问题`,
      difficulty: "入门",
      timeInvestment: "15-25 小时/周",
      incomeMin: 1000,
      incomeMax: 8000,
      requiredSkills: JSON.stringify(["选品眼光", "文案撰写", "图片处理", "客服沟通", "价格敏感度"]),
      toolsResources: JSON.stringify(["闲鱼APP", "1688/阿里巴巴", "拼多多", "美图秀秀/醒图"]),
      startupCost: "0-500元",
      stepsToStart: JSON.stringify([
        "下载闲鱼APP并注册账号",
        "完成实名认证和芝麻信用授权",
        "在1688和拼多多浏览热门品类",
        "选择5-10款商品作为初始选品",
        "优化商品标题和描述文案",
        "每天上新3-5款商品",
        "及时回复买家咨询，提高成交率",
      ]),
      pros: JSON.stringify(["零库存零风险", "启动成本极低", "平台流量免费", "可兼职操作"]),
      cons: JSON.stringify(["利润空间有限", "竞争激烈价格透明", "售后问题需要耐心处理", "平台规则变化风险"]),
      tipsForSuccess: JSON.stringify([
        "选择高颜值、高性价比的商品，图片很重要",
        "标题要包含热搜关键词",
        "每天擦亮商品获取更多曝光",
        "保持高回复率和好评率",
        "节假日是销售高峰期，提前备好选品",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "闲鱼官网", "url": "https://2.taobao.com" },
        { "title": "1688货源平台", "url": "https://www.1688.com" },
        { "title": "拼多多批发", "url": "https://pifa.pinduoduo.com" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      isFeatured: true,
      submitterName: "王芳",
      submitterEmail: "wangfang@example.com",
    },
    {
      title: "在线英语家教",
      slug: "online-english-tutor",
      category: "在线教育",
      description: "通过在线平台教授英语，利用业余时间进行一对一或小班教学，收入稳定且灵活。",
      fullDescription: `在线英语家教是一份高需求的副业。随着全球化的深入，英语学习需求持续增长。你可以通过各类在线教育平台接单，教授中小学生、大学生或成人学员英语。

**教学方向**
- K12英语辅导（中考、高考）
- 成人口语/商务英语
- 雅思/托福考试辅导
- 少儿英语启蒙

**收入参考**
- 初级教师：50-100元/小时
- 有经验教师：100-200元/小时
- 资深/外教水平：200-500元/小时`,
      difficulty: "中级",
      timeInvestment: "8-15 小时/周",
      incomeMin: 3000,
      incomeMax: 12000,
      requiredSkills: JSON.stringify(["英语能力(CET6/TEM8优先)", "教学经验", "沟通能力", "耐心和责任心"]),
      toolsResources: JSON.stringify(["电脑+摄像头+麦克风", "腾讯会议/Zoom", "PPT/Google Slides", "各类英语教材PDF"]),
      startupCost: "0-500元",
      stepsToStart: JSON.stringify([
        "评估自己的英语水平和教学能力",
        "准备个人简历和教学Demo视频",
        "在各大在线教育平台注册成为教师",
        "确定教学方向和目标学员群体",
        "准备教学材料和课程大纲",
        "通过平台审核后开始接单",
        "积累好评和学员推荐",
      ]),
      pros: JSON.stringify(["时间灵活，可按自己的空闲排课", "收入稳定，按小时计费", "帮助学生成长的成就感", "英语能力持续提升"]),
      cons: JSON.stringify(["需要较强的英语基础", "备课需要额外时间投入", "学生流失需要持续获客", "高峰期（寒暑假）外课量可能减少"]),
      tipsForSuccess: JSON.stringify([
        "准备标准化的试听课，提高转化率",
        "针对不同学员定制教学方案",
        "记录每节课的进度和反馈",
        "定期与家长沟通学习情况",
        "持续学习教学法，提升专业能力",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "iTalki - 在线语言教学平台", "url": "https://www.italki.com" },
        { "title": "Preply - 在线辅导平台", "url": "https://preply.com" },
        { "title": "VIPKID", "url": "https://www.vipkid.com" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800",
      isFeatured: true,
      submitterName: "张雪",
      submitterEmail: "zhangxue@example.com",
    },
    {
      title: "Freelancer 平面设计",
      slug: "freelancer-graphic-design",
      category: "设计创意",
      description: "在自由职业平台承接平面设计项目，包括Logo设计、海报、品牌VI、社交媒体素材等。",
      fullDescription: `平面设计是自由职业市场最热门的技能之一。企业和个人对视觉内容的需求持续增长，从Logo设计到社交媒体素材，设计外包市场广阔。

**热门服务类型**
- 品牌Logo设计
- 社交媒体视觉内容
- 海报/传单/名片设计
- 包装设计
- PPT美化设计
- UI界面设计

**接单渠道**
- 国内：猪八戒网、一品威客、站酷
- 国际：Fiverr、Upwork、99designs
- 社群：微信群、QQ群、知识星球`,
      difficulty: "中级",
      timeInvestment: "10-20 小时/周",
      incomeMin: 3000,
      incomeMax: 20000,
      requiredSkills: JSON.stringify(["Photoshop/Illustrator", "设计审美", "排版能力", "沟通理解能力", "品牌意识"]),
      toolsResources: JSON.stringify(["Adobe Creative Suite", "Canva", "Figma", "Pinterest/Behance(灵感)"]),
      startupCost: "0-1000元",
      stepsToStart: JSON.stringify([
        "学习并掌握至少一个设计工具（推荐先学Canva或PS）",
        "建立个人作品集（至少10个作品）",
        "在自由职业平台注册并完善个人资料",
        "从低价项目开始积累好评",
        "逐步提升客单价和服务范围",
        "建立长期客户关系",
        "打造个人品牌（社交媒体展示作品）",
      ]),
      pros: JSON.stringify(["发挥创作才能", "客单价较高", "可按自己节奏工作", "作品集积累后可获得更多机会"]),
      cons: JSON.stringify(["客户沟通成本高", "改稿频繁可能消耗大量时间", "需要持续学习新设计趋势", "接单不稳定"]),
      tipsForSuccess: JSON.stringify([
        "先做几个免费的mock项目建立作品集",
        "重视客户需求沟通，避免反复修改",
        "建立标准化的设计流程和交付物",
        "关注Dribbble/Behance获取设计灵感",
        "提供套餐化服务（基础/标准/高级）",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "猪八戒网", "url": "https://www.zbj.com" },
        { "title": "Fiverr", "url": "https://www.fiverr.com" },
        { "title": "Canva设计工具", "url": "https://www.canva.cn" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
      isFeatured: false,
      submitterName: "陈思",
      submitterEmail: "chensi@example.com",
    },
    {
      title: "抖音短视频带货",
      slug: "douyin-short-video-commerce",
      category: "短视频",
      description: "在抖音平台创作短视频内容，积累粉丝后通过商品橱窗和直播带货变现。",
      fullDescription: `抖音短视频带货是当前最火的副业方向之一。通过创作有趣、有价值的短视频内容吸引粉丝，然后通过精选联盟、商品橱窗或直播带货来变现。抖音的算法推荐机制使得素人也有机会获得大量曝光。

**内容方向建议**
- 好物测评/推荐
- 生活技巧分享
- 美食制作
- 穿搭美妆
- 知识科普
- 搞笑段子

**带货模式**
1. 短视频+小黄车（视频中挂商品链接）
2. 直播带货（实时互动讲解商品）
3. 商品橱窗（主页展示商品合集）
4. 精选联盟（商家设置佣金，达人带货）`,
      difficulty: "中级",
      timeInvestment: "15-30 小时/周",
      incomeMin: 2000,
      incomeMax: 50000,
      requiredSkills: JSON.stringify(["视频拍摄", "视频剪辑", "选题策划", "口才表达", "镜头感"]),
      toolsResources: JSON.stringify(["手机+补光灯", "剪映/CapCut", "抖音创作者平台", "蝉妈妈/飞瓜数据"]),
      startupCost: "0-2000元",
      stepsToStart: JSON.stringify([
        "确定内容定位和目标人群",
        "注册抖音号并完善个人资料",
        "学习热门视频的内容结构和剪辑技巧",
        "每天发布1-3条内容测试反应",
        "分析数据，优化内容和发布时间",
        "粉丝达1000后开通商品橱窗",
        "开始选品和带货内容创作",
      ]),
      pros: JSON.stringify(["流量红利大，素人也有爆火机会", "变现天花板高", "创意空间大，工作有趣", "多种变现方式可选"]),
      cons: JSON.stringify(["竞争激烈，需要持续输出创意", "算法变化影响流量", "前期投入时间大收入低", "容易产生创作焦虑"]),
      tipsForSuccess: JSON.stringify([
        "前3秒决定完播率，开头一定要抓人",
        "保持内容垂直，让算法识别你的定位",
        "多研究对标账号的爆款内容",
        "互动引导很重要（点赞+关注+评论）",
        "直播前做好脚本和选品准备",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "抖音创作者平台", "url": "https://creator.douyin.com" },
        { "title": "剪映 - 视频剪辑工具", "url": "https://www.capcut.cn" },
        { "title": "蝉妈妈数据平台", "url": "https://www.chanmama.com" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
      isFeatured: true,
      submitterName: "刘洋",
      submitterEmail: "liuyang@example.com",
    },
    {
      title: "独立站 Dropshipping",
      slug: "dropshipping-independent-store",
      category: "电商",
      description: "搭建独立跨境电商网站，通过Facebook/Google广告引流做Dropshipping，面向海外市场。",
      fullDescription: `独立站Dropshipping是一种高级电商模式。你通过Shopify等平台搭建自己的品牌独立站，从速卖通等平台选品，通过Facebook Ads或Google Ads投放广告获取流量，面向欧美等海外市场销售产品。

**为什么选择独立站？**
- 品牌自主可控，不受平台规则限制
- 利润空间大（通常售价是进货价的3-5倍）
- 客户数据完全属于你
- 可建立长期品牌资产

**关键环节**
1. 选品（找到有爆款潜力的产品）
2. 建站（Shopify搭建品牌独立站）
3. 广告投放（Facebook/Google/TikTok Ads）
4. 订单履行（通过速卖通/Oberlo代发）
5. 客户服务（邮件+在线客服）`,
      difficulty: "高级",
      timeInvestment: "20-40 小时/周",
      incomeMin: 5000,
      incomeMax: 100000,
      requiredSkills: JSON.stringify(["英语能力", "广告投放", "数据分析", "选品能力", "网站运营", "客户服务"]),
      toolsResources: JSON.stringify(["Shopify", "Facebook Ads Manager", "Google Analytics", "Oberlo/DSers", "Canva"]),
      startupCost: "2000-10000元",
      stepsToStart: JSON.stringify([
        "学习跨境电商基础知识",
        "注册Shopify账号（14天免费试用）",
        "进行市场和竞品调研，确定niche",
        "从速卖通选品并导入店铺",
        "设计品牌Logo和网站视觉",
        "设置支付方式（PayPal+Stripe）",
        "创建Facebook广告投放计划",
        "小预算测试广告效果，优化ROI",
      ]),
      pros: JSON.stringify(["利润空间大", "品牌自主可控", "市场规模大（全球）", "可规模化扩大"]),
      cons: JSON.stringify(["启动成本较高", "需要广告投放经验", "风险和不确定性大", "物流时效难控制", "退款率可能较高"]),
      tipsForSuccess: JSON.stringify([
        "从小众niche切入，避免与大卖竞争",
        "先小预算测试多个产品和受众",
        "重视网站加载速度和移动端体验",
        "建立邮件营销体系，提高复购率",
        "关注物流时效，选择ePacket线路",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "Shopify建站平台", "url": "https://www.shopify.com" },
        { "title": "速卖通(AliExpress)", "url": "https://www.aliexpress.com" },
        { "title": "DSers代发工具", "url": "https://www.dsers.com" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
      isFeatured: false,
      submitterName: "赵磊",
      submitterEmail: "zhaolei@example.com",
    },
    {
      title: "Upwork 软件开发接单",
      slug: "upwork-software-development",
      category: "软件开发",
      description: "在全球最大的自由职业平台Upwork上承接软件开发项目，用技术赚取美元收入。",
      fullDescription: `在Upwork上做软件开发是最赚钱的副业之一。Upwork是全球最大的自由职业平台，汇聚了来自世界各地的客户。中国的开发者凭借技术实力和相对合理的价格，在平台上非常有竞争力。

**热门技术方向**
- Web开发（React/Vue/Node.js）
- 移动端开发（React Native/Flutter）
- Python后端/数据分析
- WordPress/WooCommerce开发
- 小程序开发
- AI/ML项目

**收入参考（时薪）**
- Junior: $15-30/小时
- Mid-level: $30-60/小时
- Senior: $60-150/小时`,
      difficulty: "高级",
      timeInvestment: "10-20 小时/周",
      incomeMin: 8000,
      incomeMax: 50000,
      requiredSkills: JSON.stringify(["编程能力(至少精通一门语言)", "英语读写能力", "项目管理", "沟通能力", "Git版本控制"]),
      toolsResources: JSON.stringify(["Upwork平台", "GitHub/GitLab", "VS Code", "Postman", "Jira/Trello"]),
      startupCost: "0元",
      stepsToStart: JSON.stringify([
        "优化你的技术栈，确保至少熟练掌握一门热门语言/框架",
        "准备英文简历和作品集",
        "注册Upwork账号并完善个人资料",
        "从低价小项目开始积累好评",
        "考取Upwork技能认证",
        "逐步提高客单价，拓展长期客户",
        "保持100% Job Success Score",
      ]),
      pros: JSON.stringify(["赚取美元/欧元，收益高", "时间地点完全自由", "技术持续成长", "接触国际项目经验"]),
      cons: JSON.stringify(["需要较强的英语能力", "平台抽成较高（5-20%）", "竞标竞争激烈", "时差带来的沟通成本"]),
      tipsForSuccess: JSON.stringify([
        "写个性化的Proposal，不要用模板",
        "前5个项目可以不赚钱，但必须拿5星好评",
        "专注一个技术方向做深，成为该领域的专家",
        "主动和客户沟通进度，超出客户预期",
        "建立自己的团队，承接更大的项目",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "Upwork", "url": "https://www.upwork.com" },
        { "title": "Upwork技能认证指南", "url": "https://support.upwork.com" },
        { "title": "Fiverr Pro", "url": "https://pro.fiverr.com" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      isFeatured: true,
      submitterName: "周涛",
      submitterEmail: "zhoutao@example.com",
    },
    {
      title: "小红书博主",
      slug: "xiaohongshu-blogger",
      category: "内容创作",
      description: "在小红书平台分享生活方式、美妆、穿搭等内容，积累粉丝后通过品牌合作和带货变现。",
      fullDescription: `小红书是中国领先的生活方式分享平台，以年轻女性用户为主，消费力强。做小红书博主可以分享你擅长或热爱的生活方式内容，通过品牌合作、好物推荐、直播带货等方式实现收入。

**热门内容方向**
- 美妆护肤评测
- 穿搭灵感分享
- 美食探店/食谱
- 家居装修灵感
- 旅行攻略
- 学习/职场干货
- 母婴育儿

**变现方式**
1. 品牌合作（品牌付费推广产品）
2. 好物推荐/商品笔记
3. 直播带货
4. 私域引流（微信群/知识付费）
5. 开设小红书店铺`,
      difficulty: "入门",
      timeInvestment: "8-15 小时/周",
      incomeMin: 1000,
      incomeMax: 20000,
      requiredSkills: JSON.stringify(["内容创作", "摄影/拍照", "文案撰写", "审美能力", "账号运营"]),
      toolsResources: JSON.stringify(["小红书APP", "醒图/黄油相机", "Canva", "剪映"]),
      startupCost: "0-500元",
      stepsToStart: JSON.stringify([
        "确定内容领域和个人风格定位",
        "注册小红书账号并完善个人简介",
        "准备前10篇优质内容作为冷启动",
        "学习小红书笔记的封面和标题技巧",
        "保持每周3-5篇的更新频率",
        "互动社区，在相关笔记下活跃评论",
        "粉丝达1000后开启品牌合作功能",
      ]),
      pros: JSON.stringify(["用户消费力强，商业价值高", "社区氛围好，互动率高", "内容长尾效应明显", "适合有审美有生活品质的人"]),
      cons: JSON.stringify(["对图片质量要求高", "内容需要真实感和人设一致性", "平台对商业内容审核严格", "竞争日益激烈"]),
      tipsForSuccess: JSON.stringify([
        "封面图是第一生产力，一定要精心设计",
        "标题要有吸引力但不要标题党",
        "内容要真实自然，小红书用户反感硬广",
        "利用好话题标签增加曝光",
        "定期分析数据，优化内容方向",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "小红书创作中心", "url": "https://creator.xiaohongshu.com" },
        { "title": "醒图APP", "url": "https://www.xingtu.cn" },
        { "title": "千瓜数据", "url": "https://www.qian-gua.com" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      isFeatured: false,
      submitterName: "林雨",
      submitterEmail: "linyu@example.com",
    },
    {
      title: "知识星球/付费社群运营",
      slug: "knowledge-planet-paid-community",
      category: "知识付费",
      description: "在知识星球等平台建立付费社群，围绕某个专业领域提供深度内容、答疑和社群服务。",
      fullDescription: `知识付费社群是一种高粘性的变现模式。你可以在自己擅长的领域建立付费社群，为成员提供独家内容、专业答疑、资源分享、人脉链接等价值。常见的平台包括知识星球、小鹅通、微信群等。

**适合的领域**
- 投资理财
- 编程技术
- 职场成长
- 副业赚钱
- 健康减脂
- 育儿教育
- 法律财税咨询

**定价参考**
- 入门级：99-299元/年
- 专业级：299-999元/年
- 高端圈子：999-9999元/年`,
      difficulty: "中级",
      timeInvestment: "10-15 小时/周",
      incomeMin: 3000,
      incomeMax: 50000,
      requiredSkills: JSON.stringify(["专业知识储备", "内容输出能力", "社群运营", "营销推广", "个人IP打造"]),
      toolsResources: JSON.stringify(["知识星球", "小鹅通", "微信群+企业微信", "飞书/Notion"]),
      startupCost: "0-1000元",
      stepsToStart: JSON.stringify([
        "确定你的专业领域和社群定位",
        "通过免费内容建立专业形象和信任",
        "设计社群的权益和交付内容",
        "选择平台创建付费社群",
        "制定定价策略和推广计划",
        "持续输出高质量内容，维护社群活跃度",
        "收集反馈，不断优化社群价值",
      ]),
      pros: JSON.stringify(["收入可预期（年费制）", "用户粘性高，续费率可观", "沉淀个人品牌资产", "知识输出倒逼自己成长"]),
      cons: JSON.stringify(["需要一定的专业积累和影响力", "社群运营需要持续投入精力", "冷启动阶段较难", "用户期望值管理是挑战"]),
      tipsForSuccess: JSON.stringify([
        "先用免费内容建立信任，再转化付费",
        "保持社群内容的独特性和独家性",
        "定期请嘉宾分享，增加社群价值",
        "建立社群内部的链接和互助氛围",
        "设置明确的服务边界，避免过度承诺",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "知识星球", "url": "https://www.zsxq.com" },
        { "title": "小鹅通", "url": "https://www.xiaoe-tech.com" },
        { "title": "Notion", "url": "https://www.notion.so" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
      isFeatured: true,
      submitterName: "吴强",
      submitterEmail: "wuqiang@example.com",
    },
    {
      title: "摄影约拍服务",
      slug: "photography-booking-service",
      category: "摄影摄像",
      description: "利用摄影技能提供约拍服务，包括个人写真、情侣照、亲子照、活动记录等。",
      fullDescription: `摄影约拍是一份富有创意和趣味的副业。如果你有摄影基础和设备，可以利用周末和节假日提供约拍服务。市场需求包括个人写真、情侣照、亲子照、毕业照、活动跟拍、产品拍摄等。

**服务类型和定价**
- 个人写真：800-3000元/套
- 情侣/婚纱照：2000-8000元/套
- 亲子照：1000-3000元/套
- 活动跟拍：1500-5000元/场
- 产品拍摄：100-500元/件

**获客渠道**
- 小红书/朋友圈发布作品
- 大众点评/美团入驻
- 婚礼平台合作
- 老客户推荐`,
      difficulty: "中级",
      timeInvestment: "8-12 小时/周",
      incomeMin: 3000,
      incomeMax: 15000,
      requiredSkills: JSON.stringify(["摄影技术", "后期修图(LR/PS)", "构图审美", "沟通引导能力", "场景选择"]),
      toolsResources: JSON.stringify(["相机+镜头", "Lightroom/Photoshop", "反光板/闪光灯", "作品展示平台"]),
      startupCost: "5000-20000元（已有设备则忽略）",
      stepsToStart: JSON.stringify([
        "购置或升级摄影器材",
        "建立个人作品集（至少20张高质量作品）",
        "确定服务类型和定价方案",
        "在小红书/朋友圈发布作品吸引客户",
        "准备标准化的拍摄流程和合同",
        "提供优质服务，争取客户推荐",
        "逐步建立品牌和个人风格",
      ]),
      pros: JSON.stringify(["发挥创作才华", "客单价高", "工作有趣不枯燥", "时间灵活"]),
      cons: JSON.stringify(["设备投入较大", "需要后期修图时间", "天气等不可控因素", "周末和节假日最忙"]),
      tipsForSuccess: JSON.stringify([
        "发展自己的独特拍摄风格，形成差异化",
        "提供底片全送等增值服务",
        "拍摄前充分沟通，了解客户需求",
        "学习自然光和人造光的灵活运用",
        "保持作品持续更新，展示最新水平",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "500px摄影社区", "url": "https://500px.com.cn" },
        { "title": "图虫网", "url": "https://tuchong.com" },
        { "title": "Lightroom教程", "url": "https://helpx.adobe.com/lightroom-classic.html" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
      isFeatured: false,
      submitterName: "黄伟",
      submitterEmail: "huangwei@example.com",
    },
    {
      title: "知乎好物推荐",
      slug: "zhihu-good-thing-recommendation",
      category: "内容创作",
      description: "在知乎撰写优质回答和文章，通过「好物推荐」功能插入商品链接赚取佣金。",
      fullDescription: `知乎好物推荐是一种低门槛的内容变现方式。你可以在知乎上回答相关领域的问题或发布文章，在内容中自然植入商品推荐，通过知乎的好物推荐功能插入京东、淘宝等平台的商品链接，用户通过你的链接购买后你获得佣金。

**适合的领域**
- 数码3C产品评测
- 图书推荐
- 家居好物
- 美妆护肤品
- 母婴用品
- 办公效率工具

**收入模式**
- 按成交额提取佣金（通常1%-50%）
- 高佣金品类：图书、美妆、保健品
- 一篇优质内容可以持续产生收入`,
      difficulty: "入门",
      timeInvestment: "5-10 小时/周",
      incomeMin: 500,
      incomeMax: 8000,
      requiredSkills: JSON.stringify(["写作能力", "产品了解", "信息搜集", "SEO思维", "诚实可信"]),
      toolsResources: JSON.stringify(["知乎APP/网页", "京东联盟/淘宝联盟", "新榜/知乎数据分析工具"]),
      startupCost: "0元",
      stepsToStart: JSON.stringify([
        "注册知乎账号并完善个人资料",
        "确定1-2个专注领域",
        "研究热门问题和关键词",
        "撰写高质量、有深度的回答",
        "达到好物推荐开通条件（创作者等级LV4+）",
        "在回答中自然植入商品推荐",
        "持续优化内容，关注转化数据",
      ]),
      pros: JSON.stringify(["零成本启动", "内容长尾效应强", "不需要维护客户关系", "写作能力持续提升"]),
      cons: JSON.stringify(["知乎好物推荐有等级门槛", "见效慢需要耐心积累", "佣金收入不稳定", "产品熟悉需要时间"]),
      tipsForSuccess: JSON.stringify([
        "先回答问题积累粉丝和等级，再考虑变现",
        "推荐自己真正用过的产品，保持诚信",
        "长文回答更容易获得推荐和收藏",
        "关注知乎热榜，抢先回答热点问题",
        "在文中使用对比、测评等方式增加说服力",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "知乎创作者中心", "url": "https://www.zhihu.com/creator" },
        { "title": "京东联盟", "url": "https://union.jd.com" },
        { "title": "淘宝联盟", "url": "https://pub.alimama.com" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800",
      isFeatured: false,
      submitterName: "孙鹏",
      submitterEmail: "sunpeng@example.com",
    },
    {
      title: "跨境电商Shopee/虾皮",
      slug: "cross-border-ecommerce-shopee",
      category: "电商",
      description: "在东南亚电商平台Shopee开设店铺，将中国商品卖到东南亚市场，利润空间可观。",
      fullDescription: `Shopee是东南亚最大的电商平台之一，覆盖新加坡、马来西亚、泰国、印尼、菲律宾、越南和台湾等市场。中国卖家在Shopee上具有天然优势——国内供应链发达，商品价格低，而东南亚市场消费升级需求旺盛。

**目标市场特点**
- 东南亚6.5亿人口，年轻化
- 互联网和智能手机普及率高
- 电商渗透率仍在快速增长
- 对中国商品接受度高

**热门品类**
- 时尚服饰/配饰
- 美妆护肤
- 家居用品
- 3C数码配件
- 母婴用品
- 运动户外`,
      difficulty: "高级",
      timeInvestment: "20-30 小时/周",
      incomeMin: 5000,
      incomeMax: 30000,
      requiredSkills: JSON.stringify(["电商运营", "选品分析", "基础英语", "数据分析", "供应链管理"]),
      toolsResources: JSON.stringify(["Shopee卖家中心", "ERP系统(店小秘等)", "1688货源", "Google Translate"]),
      startupCost: "3000-10000元",
      stepsToStart: JSON.stringify([
        "注册Shopee卖家账号（首站可选台湾或马来）",
        "完成店铺基础设置和装修",
        "从1688选品，准备首批商品",
        "上传商品，优化标题、描述和图片",
        "设置物流和收款方式",
        "参加平台活动获取初始流量",
        "根据数据优化选品和运营策略",
      ]),
      pros: JSON.stringify(["东南亚市场增速快", "竞争相对国内小", "平台扶持新卖家", "利润空间较好"]),
      cons: JSON.stringify(["物流复杂度高", "各站点语言和文化不同", "收款和汇率风险", "平台规则需要学习"]),
      tipsForSuccess: JSON.stringify([
        "先做一个站点做熟再拓展",
        "重视商品标题的本地化翻译",
        "充分利用平台免费的营销工具",
        "关注汇率变化，合理定价",
        "做好库存管理，避免断货和积压",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "Shopee卖家中心", "url": "https://seller.shopee.cn" },
        { "title": "店小秘ERP", "url": "https://www.dianxiaomi.com" },
        { "title": "1688货源网", "url": "https://www.1688.com" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800",
      isFeatured: false,
      submitterName: "钱进",
      submitterEmail: "qianjin@example.com",
    },
    {
      title: "配音兼职",
      slug: "voiceover-part-time",
      category: "自由职业",
      description: "利用好嗓音提供配音服务，包括广告配音、有声书录制、短视频旁白、课程配音等。",
      fullDescription: `配音兼职是一份门槛不高但回报不错的副业。随着有声书、短视频、在线课程的爆发式增长，配音需求持续扩大。如果你有较好的普通话水平和嗓音条件，完全可以利用业余时间做配音。

**配音类型**
- 商业广告配音
- 有声书/有声小说录制
- 短视频旁白解说
- 在线课程配音
- 企业宣传片
- AI语音数据标注

**收入参考**
- 有声书：80-300元/小时成品
- 广告配音：200-1000元/条
- 课程配音：100-300元/课时`,
      difficulty: "入门",
      timeInvestment: "5-10 小时/周",
      incomeMin: 1000,
      incomeMax: 8000,
      requiredSkills: JSON.stringify(["普通话标准", "嗓音条件好", "情感表达", "基本音频处理", "文本理解"]),
      toolsResources: JSON.stringify(["麦克风+声卡", "Audacity/Adobe Audition", "隔音环境(或简易隔音罩)"]),
      startupCost: "500-3000元",
      stepsToStart: JSON.stringify([
        "评估自己的嗓音条件和普通话水平",
        "购买基础录音设备（麦克风+声卡）",
        "录制几个样音作为个人Demo",
        "注册配音平台（喜马拉雅、蜻蜓FM等）",
        "从有声书或小单开始接单",
        "积累作品集和客户好评",
        "逐步提升设备水平和报价",
      ]),
      pros: JSON.stringify(["时间自由，在家工作", "发挥声音天赋", "门槛相对较低", "需求持续增长"]),
      cons: JSON.stringify(["需要安静的环境", "设备有一定投入", "需要保护嗓子", "竞争激烈"]),
      tipsForSuccess: JSON.stringify([
        "多听优秀配音作品，模仿学习",
        "录制前充分熟悉文本内容",
        "投资一个好的麦克风，音质是第一位的",
        "做好隔音，减少后期处理工作量",
        "建立个人配音风格和标签",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "喜马拉雅有声书平台", "url": "https://www.ximalaya.com" },
        { "title": "Audacity免费音频软件", "url": "https://www.audacityteam.org" },
        { "title": "配音圈", "url": "https://www.peiyinquan.com" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800",
      isFeatured: false,
      submitterName: "郑音",
      submitterEmail: "zhengyin@example.com",
    },
    {
      title: "编程教学/课程录制",
      slug: "programming-teaching-course-recording",
      category: "在线教育",
      description: "录制编程技术课程在在线教育平台出售，一次录制持续产生被动收入。",
      fullDescription: `编程教学是最适合技术人的副业之一。你可以将自己擅长的技术方向录制成体系化课程，在慕课网、极客时间、B站知识区等平台发布，通过课程销售获得收入。课程一旦录制完成，可以持续产生被动收入。

**热门课程方向**
- Python数据分析/爬虫
- Web前端（React/Vue）
- Java/Go后端开发
- AI/机器学习入门
- 面试算法/系统设计
- 项目实战训练营

**收入模式**
- 平台分成：通常3:7到5:5
- 自有渠道：100%收入
- 企业内训：按场次收费`,
      difficulty: "高级",
      timeInvestment: "8-15 小时/周",
      incomeMin: 3000,
      incomeMax: 30000,
      requiredSkills: JSON.stringify(["编程能力(精通方向)", "教学表达能力", "课程设计", "PPT/Keynote", "视频录制剪辑"]),
      toolsResources: JSON.stringify(["电脑+麦克风", "OBS Studio", "ScreenFlow/剪映", "Keynote/PowerPoint", "GitHub"]),
      startupCost: "0-2000元",
      stepsToStart: JSON.stringify([
        "确定课程主题和目标学员",
        "设计课程大纲和知识点",
        "准备每节课的PPT和代码示例",
        "录制并剪辑课程视频",
        "在平台发布并设置价格",
        "通过技术社区和社交媒体推广",
        "根据学员反馈迭代优化课程",
      ]),
      pros: JSON.stringify(["被动收入，一次录制反复销售", "技术分享的成就感", "打造个人技术品牌", "收入天花板高"]),
      cons: JSON.stringify(["课程制作耗时较长", "需要一定的知名度基础", "技术更新快需要维护", "前期投入大收入不确定"]),
      tipsForSuccess: JSON.stringify([
        "选择热门且有长期需求的技术方向",
        "课程要有实战项目，不能只讲理论",
        "先免费分享一些内容建立信任",
        "提供课程答疑等增值服务",
        "及时更新课程内容跟上技术发展",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "慕课网", "url": "https://www.imooc.com" },
        { "title": "极客时间", "url": "https://time.geekbang.org" },
        { "title": "OBS Studio", "url": "https://obsproject.com" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
      isFeatured: false,
      submitterName: "吴迪",
      submitterEmail: "wudi@example.com",
    },
    {
      title: "手工作品线上售卖",
      slug: "handmade-crafts-online-selling",
      category: "其他",
      description: "制作手工饰品、文创产品等在电商平台和社交媒体销售，将爱好变成收入来源。",
      fullDescription: `手工作品售卖是一份能将兴趣与收入结合的副业。如果你喜欢手工制作，可以将自己的作品通过电商平台和社交媒体进行销售。随着消费者对个性化、有温度的手工产品越来越青睐，手工市场前景广阔。

**热门手工品类**
- 手工饰品（耳环、项链、手链）
- 文创文具（手账、贴纸、印章）
- 针织/钩编（围巾、玩偶、包包）
- 香薰蜡烛/手工皂
- 家居装饰（挂毯、花瓶、摆件）
- 定制礼品

**销售渠道**
- 淘宝/拼多多开店
- 小红书/抖音展示引流
- 闲鱼/微店
- 线下市集/手作集市`,
      difficulty: "入门",
      timeInvestment: "10-20 小时/周",
      incomeMin: 1000,
      incomeMax: 10000,
      requiredSkills: JSON.stringify(["手工制作技能", "审美设计", "产品摄影", "基础营销", "客户服务"]),
      toolsResources: JSON.stringify(["手作材料/工具", "手机摄影", "醒图/VSCO", "快递包装材料"]),
      startupCost: "200-2000元",
      stepsToStart: JSON.stringify([
        "选择1-2个手工方向深耕",
        "练习制作，打造几款成熟产品",
        "拍摄高质量产品图和制作过程",
        "选择销售平台并上架商品",
        "在社交媒体分享制作过程吸引关注",
        "参加线下手作集市增加曝光",
        "不断推出新品，保持店铺活跃",
      ]),
      pros: JSON.stringify(["兴趣与收入结合", "创作自由度高", "产品有独特性竞争力", "可从小规模起步"]),
      cons: JSON.stringify(["生产效率有限", "材料成本持续投入", "产品标准化难", "定价策略需要平衡"]),
      tipsForSuccess: JSON.stringify([
        "产品图拍摄至关重要，投资手机摄影技巧",
        "将制作过程拍成短视频增加曝光",
        "发展自己的作品风格，形成品牌辨识度",
        "重视包装设计，提升开箱体验",
        "收集客户反馈改进产品设计",
      ]),
      resourceLinks: JSON.stringify([
        { "title": "淘宝手艺人", "url": "https://www.taobao.com" },
        { "title": "Etsy(国际手工平台)", "url": "https://www.etsy.com" },
        { "title": "小红书创作中心", "url": "https://creator.xiaohongshu.com" },
      ]),
      coverImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800",
      isFeatured: false,
      submitterName: "冯艺",
      submitterEmail: "fengyi@example.com",
    },
  ];

  // 插入副业
  for (const sh of sideHustles) {
    await prisma.sideHustle.create({ data: sh });
  }
  console.log(`✅ 已插入 ${sideHustles.length} 个副业`);

  // 为前几个副业插入评分
  const ratingsData = [];
  const commentData = [];
  const allSideHustles = await prisma.sideHustle.findMany();

  const ratingTemplates = [
    { value: 5, authorName: "张伟", authorEmail: "zhangwei@test.com", content: "非常详细的分享！让我对这个副业有了全面的了解，已经按照指南开始操作了。" },
    { value: 4, authorName: "李娜", authorEmail: "lina@test.com", content: "内容很实用，对新手很友好。希望能多分享一些实操案例。" },
    { value: 5, authorName: "王强", authorEmail: "wangqiang@test.com", content: "干货满满，比很多付费课程都有用。感谢分享！" },
    { value: 3, authorName: "赵敏", authorEmail: "zhaomin@test.com", content: "整体不错，但有些数据可能需要更新了，市场竞争变化很快。" },
    { value: 4, authorName: "陈杰", authorEmail: "chenjie@test.com", content: "做得很好，已经开始做这个副业了，第一个月就有了收入。" },
    { value: 5, authorName: "刘芳", authorEmail: "liufang@test.com", content: "太棒了！分类清晰，步骤详细，完全按照指南操作的。推荐！" },
    { value: 4, authorName: "孙浩", authorEmail: "sunhao@test.com", content: "准备尝试一下这个方向，文章给了我很多启发和信心。" },
    { value: 2, authorName: "周静", authorEmail: "zhoujing@test.com", content: "有些地方写得比较理想化，实际做起来会遇到更多困难。" },
  ];

  for (const sh of allSideHustles) {
    // 为每个副业随机选3-6条评分
    const numRatings = 3 + Math.floor(Math.random() * 4);
    const shuffled = [...ratingTemplates].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, numRatings);

    for (const r of selected) {
      ratingsData.push({
        value: r.value,
        authorName: r.authorName,
        authorEmail: `${r.authorEmail?.replace("@test.com", "")}+${sh.slug}@test.com`,
        sideHustleId: sh.id,
      });
      commentData.push({
        content: r.content,
        authorName: r.authorName,
        authorEmail: `${r.authorEmail?.replace("@test.com", "")}+${sh.slug}@test.com`,
        sideHustleId: sh.id,
      });
    }
  }

  // 批量插入评分
  for (const r of ratingsData) {
    await prisma.rating.create({ data: r });
  }
  console.log(`✅ 已插入 ${ratingsData.length} 条评分`);

  // 批量插入评论
  for (const c of commentData) {
    await prisma.comment.create({ data: c });
  }

  // 为部分评论添加回复
  const allComments = await prisma.comment.findMany({ take: 20 });
  for (let i = 0; i < Math.min(10, allComments.length); i++) {
    await prisma.comment.create({
      data: {
        content: "感谢你的反馈！如果有任何问题欢迎继续交流。",
        authorName: allSideHustles[i % allSideHustles.length].submitterName,
        sideHustleId: allComments[i].sideHustleId,
        parentId: allComments[i].id,
      },
    });
  }
  console.log(`✅ 已插入 ${Math.min(10, allComments.length)} 条评论回复`);

  // 更新评分计数和平均分
  for (const sh of allSideHustles) {
    const ratings = await prisma.rating.findMany({
      where: { sideHustleId: sh.id },
    });
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length
        : 0;
    const commentCount = await prisma.comment.count({
      where: { sideHustleId: sh.id },
    });

    await prisma.sideHustle.update({
      where: { id: sh.id },
      data: {
        averageRating: Math.round(avgRating * 10) / 10,
        ratingCount: ratings.length,
        commentCount: commentCount,
      },
    });
  }
  console.log("✅ 已更新评分和评论计数");

  console.log("🌱 种子数据播种完成！");
}

main()
  .catch((e) => {
    console.error("❌ 播种失败:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
