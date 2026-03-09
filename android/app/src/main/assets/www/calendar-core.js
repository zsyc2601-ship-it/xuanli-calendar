(function (global) {
  "use strict";

  const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  const ZODIACS = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
  const ZODIAC_ICONS = ["🐭", "🐮", "🐯", "🐰", "🐲", "🐍", "🐴", "🐐", "🐵", "🐔", "🐶", "🐷"];
  const SHICHEN_RANGES = [
    "23:00-00:59",
    "01:00-02:59",
    "03:00-04:59",
    "05:00-06:59",
    "07:00-08:59",
    "09:00-10:59",
    "11:00-12:59",
    "13:00-14:59",
    "15:00-16:59",
    "17:00-18:59",
    "19:00-20:59",
    "21:00-22:59",
  ];
  const SOLAR_TERM_NAMES = [
    "小寒",
    "大寒",
    "立春",
    "雨水",
    "惊蛰",
    "春分",
    "清明",
    "谷雨",
    "立夏",
    "小满",
    "芒种",
    "夏至",
    "小暑",
    "大暑",
    "立秋",
    "处暑",
    "白露",
    "秋分",
    "寒露",
    "霜降",
    "立冬",
    "小雪",
    "大雪",
    "冬至",
  ];
  const SOLAR_TERM_INFO = [
    0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693,
    263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532,
    504758,
  ];
  const JIE_TERM_INDICES = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 0];
  const MONTH_START_STEMS = [2, 4, 6, 8, 0];
  const HUANGJI_SEQUENCE = [
    "复", "颐", "屯", "益", "震", "噬嗑", "随", "无妄", "明夷", "贲", "既济", "家人",
    "丰", "革", "同人", "临", "损", "节", "中孚", "归妹", "睽", "兑", "履", "泰",
    "大畜", "需", "小畜", "大壮", "大有", "夬", "姤", "大过", "鼎", "恒", "巽", "井",
    "蛊", "升", "讼", "困", "未济", "解", "涣", "蒙", "师", "遁", "咸", "旅", "小过",
    "渐", "蹇", "艮", "谦", "否", "萃", "晋", "豫", "观", "比", "剥",
  ];
  const WESTERN_SIGNS = [
    { name: "摩羯座", icon: "♑", start: [12, 22], end: [1, 19] },
    { name: "水瓶座", icon: "♒", start: [1, 20], end: [2, 18] },
    { name: "双鱼座", icon: "♓", start: [2, 19], end: [3, 20] },
    { name: "白羊座", icon: "♈", start: [3, 21], end: [4, 19] },
    { name: "金牛座", icon: "♉", start: [4, 20], end: [5, 20] },
    { name: "双子座", icon: "♊", start: [5, 21], end: [6, 21] },
    { name: "巨蟹座", icon: "♋", start: [6, 22], end: [7, 22] },
    { name: "狮子座", icon: "♌", start: [7, 23], end: [8, 22] },
    { name: "处女座", icon: "♍", start: [8, 23], end: [9, 22] },
    { name: "天秤座", icon: "♎", start: [9, 23], end: [10, 23] },
    { name: "天蝎座", icon: "♏", start: [10, 24], end: [11, 22] },
    { name: "射手座", icon: "♐", start: [11, 23], end: [12, 21] },
  ];
  const WEEKDAY_NAMES = ["日", "一", "二", "三", "四", "五", "六"];
  const HEXAGRAM_DETAILS = {
    复: { keywords: "复归、转机、新始", summary: "一阳来复，事情在低点后回转，适合重新起步。", reading: "先守后进，回到正轨比急着扩张更重要。" },
    颐: { keywords: "养正、节制、口德", summary: "重在养身养德，也重视言语与摄取之道。", reading: "把基础养好，节制欲望，后续才稳。" },
    屯: { keywords: "草创、艰难、萌芽", summary: "万事初生，路难走，但生机已在。", reading: "不要怕乱，先立秩序，再求速度。" },
    益: { keywords: "增益、扶助、利涉", summary: "得人相助，能加分增势，适合做长期有益之事。", reading: "利他往往也是利己，顺势加码即可。" },
    震: { keywords: "惊动、启动、奋发", summary: "以动破局，一声雷起，能唤醒停滞之势。", reading: "先惊后定，别被突发之事打乱根本。" },
    噬嗑: { keywords: "决断、去障、执法", summary: "有阻碍就要咬开，靠明确规则处理问题。", reading: "该硬的时候要硬，含糊反而拖累全局。" },
    随: { keywords: "随顺、应势、通达", summary: "因时因势而动，顺着大势更容易通达。", reading: "不是盲从，而是识势而行。" },
    无妄: { keywords: "真诚、无妄念、守正", summary: "不妄作、不妄求，凭真实与正道行事。", reading: "少做多余动作，真实反而有力。" },
    明夷: { keywords: "晦明、隐忍、自保", summary: "光明受伤时，宜收敛锋芒，内明外晦。", reading: "此时不宜强出头，保存实力更关键。" },
    贲: { keywords: "文饰、修饰、审美", summary: "外在文采能成事，但不可空饰无实。", reading: "先有内容，再谈包装，才不会华而不实。" },
    既济: { keywords: "已成、调和、戒满", summary: "局面看似完成，其实最怕自满和失衡。", reading: "收尾时更要谨慎，稳定比庆功重要。" },
    家人: { keywords: "秩序、分位、内治", summary: "先安内再攘外，家庭与团队都重职责分明。", reading: "内在结构稳，外部事务才容易顺。" },
    丰: { keywords: "丰盛、明盛、当下", summary: "气势盛大、资源充沛，但盛极也要防转衰。", reading: "抓住高光期做对的事，不可沉迷一时繁华。" },
    革: { keywords: "变革、更新、决断", summary: "旧局已不适合，当断则断，以革新求生。", reading: "变化要有时机，也要有正当理由。" },
    同人: { keywords: "同道、合作、共识", summary: "与志同者同行，重公开、坦诚与协力。", reading: "把共同目标说清楚，队伍自然能聚。" },
    临: { keywords: "临事、靠近、教化", summary: "居上临下，要有担当，也要有宽厚之德。", reading: "位置越高，越要稳住气度与判断。" },
    损: { keywords: "减损、取舍、成全", summary: "适当减法反能成事，把资源用在最关键处。", reading: "舍不得放弃，往往就得不到真正的增益。" },
    节: { keywords: "节度、边界、制度", summary: "事情要成，必须有界限、有章法、有节制。", reading: "立规则不是束缚，而是保证长久。" },
    中孚: { keywords: "诚信、感通、内实", summary: "内心真实，才能感通他人，建立长期信任。", reading: "少技巧，多真诚，事情更容易成。" },
    归妹: { keywords: "婚嫁、配合、未正", summary: "关系与合作正在形成，但次序可能未尽圆满。", reading: "可以推进，但别忽略名分与结构问题。" },
    睽: { keywords: "分歧、异向、求同", summary: "意见不一、方向不同，重在异中求同。", reading: "先承认差异，再寻找最低共识。" },
    兑: { keywords: "喜悦、说服、交流", summary: "以悦服人，以沟通化解阻力。", reading: "语气柔和不代表立场软弱。" },
    履: { keywords: "践行、谨慎、礼序", summary: "走在危险边界上，更要守礼、审慎、知分寸。", reading: "能走远的人，往往最懂分寸。" },
    泰: { keywords: "通泰、和合、顺畅", summary: "上下交泰，局势通达，适合推进大事。", reading: "顺的时候别浪费，趁势把基础做深。" },
    大畜: { keywords: "积蓄、止健、厚积", summary: "力量在蓄而不发，重在长期积累与管束。", reading: "越有本钱，越要懂得收。" },
    需: { keywords: "等待、蓄势、时机", summary: "时机未到时，等待本身就是行动的一部分。", reading: "急着推进，不如先把条件准备齐。" },
    小畜: { keywords: "小积、小阻、柔蓄", summary: "力量尚小，只能渐进积累，不宜猛冲。", reading: "看起来慢，其实是在攒真正的势。" },
    大壮: { keywords: "强盛、奋进、戒躁", summary: "力量大了，最怕刚而过度。", reading: "有实力时更要收着用，才不折损。" },
    大有: { keywords: "丰有、光明、掌控", summary: "拥有资源与位置，关键在于能否光明正大地驾驭。", reading: "有，不等于稳；会用，才是真的有。" },
    夬: { keywords: "决断、扬善、去恶", summary: "该决就决，要清除旧弊，但方式仍须正。", reading: "决裂不是目的，清障才是目的。" },
    姤: { keywords: "相遇、突来、戒偏", summary: "突然相逢，往往带来机会，也带来偏差风险。", reading: "遇到新事物要辨别，不可一见即全盘投入。" },
    大过: { keywords: "过重、承压、支撑", summary: "梁木承重，局势压力大，需要非常手段支撑。", reading: "不是不能扛，而是必须找准受力点。" },
    鼎: { keywords: "鼎新、成器、调和", summary: "以鼎烹饪，重在更新、整合、成器。", reading: "当下适合把杂乱资源熬成真正有价值的成果。" },
    恒: { keywords: "恒常、持续、定力", summary: "能坚持，才有积累；能守常，才见长久。", reading: "别被短期波动带偏节奏。" },
    巽: { keywords: "入、顺、渗透", summary: "以柔入之，讲究方式、节奏和长期渗透。", reading: "硬推不如巧入，柔和反而更能深入。" },
    井: { keywords: "井养、公共、更新", summary: "井水养人，重在公共资源的维护与利用。", reading: "把基础系统修好，人人都能受益。" },
    蛊: { keywords: "整弊、治乱、更新", summary: "旧病已深，宜正本清源，治腐扶正。", reading: "清理烂账是痛，但不清理会更痛。" },
    升: { keywords: "上升、渐进、积累", summary: "由下而上，稳步上升，贵在踏实。", reading: "一步一步抬升，比急跃更稳。" },
    讼: { keywords: "争辩、冲突、慎争", summary: "有争则需辨理，但争到极处易两败。", reading: "可争是非，不必争意气。" },
    困: { keywords: "受困、压制、求通", summary: "外部受困，内在更要守住精神与方向。", reading: "困局里最重要的不是快，而是不乱。" },
    未济: { keywords: "未成、过渡、续进", summary: "事情尚未完成，仍在关键过渡阶段。", reading: "离成功近时，反而要最谨慎。" },
    解: { keywords: "解结、缓释、化险", summary: "紧张之势开始化解，宜顺势疏通。", reading: "先拆结，再前进，效果最好。" },
    涣: { keywords: "涣散、疏导、聚心", summary: "局面有散，重在重新凝聚人心与方向。", reading: "散不是坏事，关键是能否重组。" },
    蒙: { keywords: "启蒙、求教、养正", summary: "事在初学，最怕自以为是，宜求教受教。", reading: "先把基本认知立正，比急着表现重要。" },
    师: { keywords: "统众、纪律、用兵", summary: "带队行事，讲纪律、责任与统一号令。", reading: "人多事大时，规则比情绪重要。" },
    遁: { keywords: "退避、藏锋、保全", summary: "不利时及时后退，是为了更好的保全与转机。", reading: "退不是输，而是换一条更对的路。" },
    咸: { keywords: "感应、互动、相悦", summary: "彼此感应，关系与合作更容易建立。", reading: "真诚互动，比控制更有效。" },
    旅: { keywords: "行旅、暂居、谨慎", summary: "身在他处，根基未稳，要特别谨慎。", reading: "在陌生环境中，先求安身，再谋扩展。" },
    小过: { keywords: "小行、小调、谨细", summary: "只宜小步调整，不宜大开大合。", reading: "细节决定这段时间的成败。" },
    渐: { keywords: "渐进、层层推进、婚嫁", summary: "如木上山，进展缓而稳，宜循序渐进。", reading: "慢一点没有关系，只要方向是对的。" },
    蹇: { keywords: "艰阻、险难、反省", summary: "前路有阻，宜止步审势，转向求助。", reading: "逞强过关不如认清障碍。" },
    艮: { keywords: "止、定、收束", summary: "该停时停，能止才能定，能定才能明。", reading: "停止盲动，就是一种力量。" },
    谦: { keywords: "谦逊、受益、藏器", summary: "以谦受益，越有能力越应收敛锋芒。", reading: "真正强的人，往往最不张扬。" },
    否: { keywords: "闭塞、不通、待时", summary: "天地不交，局势闭塞，宜守不宜躁进。", reading: "局不通时，先保温，不要硬冲。" },
    萃: { keywords: "聚合、号召、汇流", summary: "众力汇聚，适合整合资源与人心。", reading: "能把人聚起来，就有成事之机。" },
    晋: { keywords: "上进、显明、晋升", summary: "光明上升，容易被看见，也更适合推进。", reading: "机会来了，关键是有没有准备好。" },
    豫: { keywords: "愉悦、动员、预备", summary: "人心舒畅，适合动员，但不可沉迷安逸。", reading: "先把氛围做好，再把行动落地。" },
    观: { keywords: "观察、示范、风化", summary: "先看清局势，也让他人看见你的格局。", reading: "观察不是迟疑，而是为了判断更准。" },
    比: { keywords: "亲比、结盟、辅佐", summary: "重在亲附与互助，寻找可靠同盟。", reading: "关系要经营，依附要择善。" },
    剥: { keywords: "剥落、消耗、保存", summary: "旧结构正在剥落，宜守内、护本、等待新机。", reading: "不要强撑外壳，先保住核心。" },
    乾: { keywords: "天行、刚健、自强", summary: "刚健不息，主创造、领导与开拓。", reading: "有能力时更要自律，才能行远。" },
    坤: { keywords: "承载、柔顺、包容", summary: "厚德载物，重在承接、成全与配合。", reading: "真正的力量，有时是安静地承载。" },
    坎: { keywords: "险陷、反复、持中", summary: "反复入险，唯有守中与诚信才能过关。", reading: "遇险先稳心，路才会慢慢显出来。" },
    离: { keywords: "光明、文明、依附", summary: "主明丽与显现，也提醒凡光明都需所附。", reading: "让自己发光，但别忘了根基。" }
  };
  const HEXAGRAM_ORIGINALS = global.XUAN_HEXAGRAM_ORIGINALS || {};
  const REIGN_PERIODS = [
    { start: -220, end: -209, dynasty: "秦", ruler: "秦始皇 嬴政", eraName: "始皇帝" },
    { start: -209, end: -206, dynasty: "秦", ruler: "秦二世 胡亥", eraName: "二世皇帝" },
    { start: -206, end: -205, dynasty: "秦", ruler: "秦王 子婴", eraName: "子婴" },
    { start: -205, end: -201, dynasty: "西楚", ruler: "西楚霸王 项羽", eraName: "霸王" },
    { start: -201, end: -194, dynasty: "西汉", ruler: "汉高祖 刘邦", eraName: "未置年号" },
    { start: -194, end: -187, dynasty: "西汉", ruler: "汉惠帝 刘盈", eraName: "未置年号" },
    { start: -187, end: -184, dynasty: "西汉", ruler: "前少帝 刘恭", eraName: "未置年号" },
    { start: -184, end: -180, dynasty: "西汉", ruler: "后少帝 刘弘", eraName: "未置年号" },
    { start: -179, end: -157, dynasty: "西汉", ruler: "汉文帝 刘恒", eraName: "未置年号" },
    { start: -156, end: -141, dynasty: "西汉", ruler: "汉景帝 刘启", eraName: "未置年号" },
    { start: -140, end: -135, dynasty: "西汉", ruler: "汉武帝 刘彻", eraName: "建元" },
    { start: -134, end: -129, dynasty: "西汉", ruler: "汉武帝 刘彻", eraName: "元光" },
    { start: -128, end: -123, dynasty: "西汉", ruler: "汉武帝 刘彻", eraName: "元朔" },
    { start: -122, end: -117, dynasty: "西汉", ruler: "汉武帝 刘彻", eraName: "元狩" },
    { start: -116, end: -111, dynasty: "西汉", ruler: "汉武帝 刘彻", eraName: "元鼎" },
    { start: -110, end: -105, dynasty: "西汉", ruler: "汉武帝 刘彻", eraName: "元封" },
    { start: -104, end: -101, dynasty: "西汉", ruler: "汉武帝 刘彻", eraName: "太初" },
    { start: -100, end: -97, dynasty: "西汉", ruler: "汉武帝 刘彻", eraName: "天汉" },
    { start: -96, end: -93, dynasty: "西汉", ruler: "汉武帝 刘彻", eraName: "太始" },
    { start: -92, end: -89, dynasty: "西汉", ruler: "汉武帝 刘彻", eraName: "征和" },
    { start: -88, end: -87, dynasty: "西汉", ruler: "汉武帝 刘彻", eraName: "后元" },
    { start: -86, end: -80, dynasty: "西汉", ruler: "汉昭帝 刘弗陵", eraName: "始元" },
    { start: -79, end: -75, dynasty: "西汉", ruler: "汉昭帝 刘弗陵", eraName: "元凤" },
    { start: -74, end: -74, dynasty: "西汉", ruler: "汉昭帝 刘弗陵", eraName: "元平" },
    { start: -73, end: -70, dynasty: "西汉", ruler: "汉宣帝 刘询", eraName: "本始" },
    { start: -69, end: -66, dynasty: "西汉", ruler: "汉宣帝 刘询", eraName: "地节" },
    { start: -65, end: -62, dynasty: "西汉", ruler: "汉宣帝 刘询", eraName: "元康" },
    { start: -61, end: -58, dynasty: "西汉", ruler: "汉宣帝 刘询", eraName: "神爵" },
    { start: -57, end: -54, dynasty: "西汉", ruler: "汉宣帝 刘询", eraName: "五凤" },
    { start: -53, end: -50, dynasty: "西汉", ruler: "汉宣帝 刘询", eraName: "甘露" },
    { start: -49, end: -48, dynasty: "西汉", ruler: "汉宣帝 刘询", eraName: "黄龙" },
    { start: -48, end: -44, dynasty: "西汉", ruler: "汉元帝 刘奭", eraName: "初元" },
    { start: -43, end: -39, dynasty: "西汉", ruler: "汉元帝 刘奭", eraName: "永光" },
    { start: -38, end: -34, dynasty: "西汉", ruler: "汉元帝 刘奭", eraName: "建昭" },
    { start: -33, end: -33, dynasty: "西汉", ruler: "汉元帝 刘奭", eraName: "竟宁" },
    { start: -32, end: -29, dynasty: "西汉", ruler: "汉成帝 刘骜", eraName: "建始" },
    { start: -28, end: -25, dynasty: "西汉", ruler: "汉成帝 刘骜", eraName: "河平" },
    { start: -24, end: -21, dynasty: "西汉", ruler: "汉成帝 刘骜", eraName: "阳朔" },
    { start: -20, end: -17, dynasty: "西汉", ruler: "汉成帝 刘骜", eraName: "鸿嘉" },
    { start: -16, end: -13, dynasty: "西汉", ruler: "汉成帝 刘骜", eraName: "永始" },
    { start: -12, end: -9, dynasty: "西汉", ruler: "汉成帝 刘骜", eraName: "元延" },
    { start: -8, end: -7, dynasty: "西汉", ruler: "汉成帝 刘骜", eraName: "绥和" },
    { start: -6, end: -3, dynasty: "西汉", ruler: "汉哀帝 刘欣", eraName: "建平" },
    { start: -2, end: -1, dynasty: "西汉", ruler: "汉哀帝 刘欣", eraName: "元寿" },
    { start: 1, end: 5, dynasty: "西汉", ruler: "汉平帝 刘衎", eraName: "元始" },
    { start: 6, end: 8, dynasty: "西汉", ruler: "孺子婴", eraName: "居摄" },
    { start: 9, end: 13, dynasty: "新朝", ruler: "新帝 王莽", eraName: "始建国" },
    { start: 14, end: 19, dynasty: "新朝", ruler: "新帝 王莽", eraName: "天凤" },
    { start: 20, end: 23, dynasty: "新朝", ruler: "新帝 王莽", eraName: "地皇" },
    { start: 24, end: 24, dynasty: "更始政权", ruler: "更始帝 刘玄", eraName: "更始" },
    { start: 25, end: 56, dynasty: "东汉", ruler: "汉光武帝 刘秀", eraName: "建武" },
    { start: 56, end: 57, dynasty: "东汉", ruler: "汉光武帝 刘秀", eraName: "建武中元" },
    { start: 58, end: 75, dynasty: "东汉", ruler: "汉明帝 刘庄", eraName: "永平" },
    { start: 76, end: 83, dynasty: "东汉", ruler: "汉章帝 刘炟", eraName: "建初" },
    { start: 84, end: 86, dynasty: "东汉", ruler: "汉章帝 刘炟", eraName: "元和" },
    { start: 87, end: 88, dynasty: "东汉", ruler: "汉章帝 刘炟", eraName: "章和" },
    { start: 89, end: 104, dynasty: "东汉", ruler: "汉和帝 刘肇", eraName: "永元" },
    { start: 105, end: 105, dynasty: "东汉", ruler: "汉和帝 刘肇", eraName: "元兴" },
    { start: 106, end: 106, dynasty: "东汉", ruler: "汉殇帝 刘隆", eraName: "延平" },
    { start: 107, end: 113, dynasty: "东汉", ruler: "汉安帝 刘祜", eraName: "永初" },
    { start: 114, end: 119, dynasty: "东汉", ruler: "汉安帝 刘祜", eraName: "元初" },
    { start: 120, end: 120, dynasty: "东汉", ruler: "汉安帝 刘祜", eraName: "永宁" },
    { start: 121, end: 121, dynasty: "东汉", ruler: "汉安帝 刘祜", eraName: "建光" },
    { start: 122, end: 125, dynasty: "东汉", ruler: "汉安帝 刘祜", eraName: "延光" },
    { start: 126, end: 131, dynasty: "东汉", ruler: "汉顺帝 刘保", eraName: "永建" },
    { start: 132, end: 135, dynasty: "东汉", ruler: "汉顺帝 刘保", eraName: "阳嘉" },
    { start: 136, end: 141, dynasty: "东汉", ruler: "汉顺帝 刘保", eraName: "永和" },
    { start: 142, end: 143, dynasty: "东汉", ruler: "汉顺帝 刘保", eraName: "汉安" },
    { start: 144, end: 144, dynasty: "东汉", ruler: "汉顺帝 刘保", eraName: "建康" },
    { start: 145, end: 145, dynasty: "东汉", ruler: "汉冲帝 刘炳", eraName: "永嘉" },
    { start: 146, end: 146, dynasty: "东汉", ruler: "汉质帝 刘缵", eraName: "本初" },
    { start: 147, end: 149, dynasty: "东汉", ruler: "汉桓帝 刘志", eraName: "建和" },
    { start: 150, end: 150, dynasty: "东汉", ruler: "汉桓帝 刘志", eraName: "和平" },
    { start: 151, end: 152, dynasty: "东汉", ruler: "汉桓帝 刘志", eraName: "元嘉" },
    { start: 153, end: 154, dynasty: "东汉", ruler: "汉桓帝 刘志", eraName: "永兴" },
    { start: 155, end: 158, dynasty: "东汉", ruler: "汉桓帝 刘志", eraName: "永寿" },
    { start: 159, end: 167, dynasty: "东汉", ruler: "汉桓帝 刘志", eraName: "延熹" },
    { start: 167, end: 167, dynasty: "东汉", ruler: "汉桓帝 刘志", eraName: "永康" },
    { start: 168, end: 171, dynasty: "东汉", ruler: "汉灵帝 刘宏", eraName: "建宁" },
    { start: 172, end: 177, dynasty: "东汉", ruler: "汉灵帝 刘宏", eraName: "熹平" },
    { start: 178, end: 183, dynasty: "东汉", ruler: "汉灵帝 刘宏", eraName: "光和" },
    { start: 184, end: 189, dynasty: "东汉", ruler: "汉灵帝 刘宏", eraName: "中平" },
    { start: 190, end: 193, dynasty: "东汉", ruler: "汉献帝 刘协", eraName: "初平" },
    { start: 194, end: 195, dynasty: "东汉", ruler: "汉献帝 刘协", eraName: "兴平" },
    { start: 196, end: 219, dynasty: "东汉", ruler: "汉献帝 刘协", eraName: "建安" },
    { start: 220, end: 226, dynasty: "曹魏", ruler: "魏文帝 曹丕", eraName: "黄初" },
    { start: 227, end: 233, dynasty: "曹魏", ruler: "魏明帝 曹叡", eraName: "太和" },
    { start: 233, end: 237, dynasty: "曹魏", ruler: "魏明帝 曹叡", eraName: "青龙" },
    { start: 237, end: 239, dynasty: "曹魏", ruler: "魏明帝 曹叡", eraName: "景初" },
    { start: 240, end: 248, dynasty: "曹魏", ruler: "魏齐王 曹芳", eraName: "正始" },
    { start: 249, end: 254, dynasty: "曹魏", ruler: "魏齐王 曹芳", eraName: "嘉平" },
    { start: 254, end: 256, dynasty: "曹魏", ruler: "高贵乡公 曹髦", eraName: "正元" },
    { start: 256, end: 260, dynasty: "曹魏", ruler: "高贵乡公 曹髦", eraName: "甘露" },
    { start: 260, end: 264, dynasty: "曹魏", ruler: "魏元帝 曹奂", eraName: "景元" },
    { start: 264, end: 265, dynasty: "曹魏", ruler: "魏元帝 曹奂", eraName: "咸熙" },
    { start: 265, end: 274, dynasty: "西晋", ruler: "晋武帝 司马炎", eraName: "泰始" },
    { start: 275, end: 280, dynasty: "西晋", ruler: "晋武帝 司马炎", eraName: "咸宁" },
    { start: 280, end: 289, dynasty: "西晋", ruler: "晋武帝 司马炎", eraName: "太康" },
    { start: 290, end: 290, dynasty: "西晋", ruler: "晋武帝 司马炎", eraName: "太熙" },
    { start: 291, end: 299, dynasty: "西晋", ruler: "晋惠帝 司马衷", eraName: "元康" },
    { start: 300, end: 300, dynasty: "西晋", ruler: "晋惠帝 司马衷", eraName: "永康" },
    { start: 301, end: 301, dynasty: "西晋", ruler: "晋惠帝 司马衷", eraName: "永宁" },
    { start: 302, end: 303, dynasty: "西晋", ruler: "晋惠帝 司马衷", eraName: "太安" },
    { start: 304, end: 306, dynasty: "西晋", ruler: "晋惠帝 司马衷", eraName: "永兴" },
    { start: 306, end: 306, dynasty: "西晋", ruler: "晋惠帝 司马衷", eraName: "光熙" },
    { start: 307, end: 313, dynasty: "西晋", ruler: "晋怀帝 司马炽", eraName: "永嘉" },
    { start: 313, end: 316, dynasty: "西晋", ruler: "晋愍帝 司马邺", eraName: "建兴" },
    { start: 317, end: 317, dynasty: "东晋", ruler: "晋元帝 司马睿", eraName: "建武" },
    { start: 318, end: 321, dynasty: "东晋", ruler: "晋元帝 司马睿", eraName: "太兴" },
    { start: 322, end: 322, dynasty: "东晋", ruler: "晋元帝 司马睿", eraName: "永昌" },
    { start: 323, end: 325, dynasty: "东晋", ruler: "晋明帝 司马绍", eraName: "太宁" },
    { start: 326, end: 334, dynasty: "东晋", ruler: "晋成帝 司马衍", eraName: "咸和" },
    { start: 335, end: 342, dynasty: "东晋", ruler: "晋成帝 司马衍", eraName: "咸康" },
    { start: 343, end: 344, dynasty: "东晋", ruler: "晋康帝 司马岳", eraName: "建元" },
    { start: 345, end: 356, dynasty: "东晋", ruler: "晋穆帝 司马聃", eraName: "永和" },
    { start: 357, end: 361, dynasty: "东晋", ruler: "晋穆帝 司马聃", eraName: "升平" },
    { start: 362, end: 362, dynasty: "东晋", ruler: "晋哀帝 司马丕", eraName: "隆和" },
    { start: 363, end: 365, dynasty: "东晋", ruler: "晋哀帝 司马丕", eraName: "兴宁" },
    { start: 366, end: 371, dynasty: "东晋", ruler: "晋废帝 司马奕", eraName: "太和" },
    { start: 372, end: 372, dynasty: "东晋", ruler: "晋简文帝 司马昱", eraName: "咸安" },
    { start: 373, end: 375, dynasty: "东晋", ruler: "晋孝武帝 司马曜", eraName: "宁康" },
    { start: 376, end: 396, dynasty: "东晋", ruler: "晋孝武帝 司马曜", eraName: "太元" },
    { start: 397, end: 401, dynasty: "东晋", ruler: "晋安帝 司马德宗", eraName: "隆安" },
    { start: 402, end: 404, dynasty: "东晋", ruler: "晋安帝 司马德宗", eraName: "元兴" },
    { start: 405, end: 418, dynasty: "东晋", ruler: "晋安帝 司马德宗", eraName: "义熙" },
    { start: 419, end: 420, dynasty: "东晋", ruler: "晋恭帝 司马德文", eraName: "元熙" },
    { start: 420, end: 422, dynasty: "刘宋", ruler: "宋武帝 刘裕", eraName: "永初" },
    { start: 423, end: 424, dynasty: "刘宋", ruler: "宋少帝 刘义符", eraName: "景平" },
    { start: 424, end: 453, dynasty: "刘宋", ruler: "宋文帝 刘义隆", eraName: "元嘉" },
    { start: 454, end: 456, dynasty: "刘宋", ruler: "宋孝武帝 刘骏", eraName: "孝建" },
    { start: 457, end: 464, dynasty: "刘宋", ruler: "宋孝武帝 刘骏", eraName: "大明" },
    { start: 465, end: 465, dynasty: "刘宋", ruler: "前废帝 刘子业", eraName: "永光" },
    { start: 465, end: 465, dynasty: "刘宋", ruler: "前废帝 刘子业", eraName: "景和" },
    { start: 465, end: 471, dynasty: "刘宋", ruler: "宋明帝 刘彧", eraName: "泰始" },
    { start: 472, end: 472, dynasty: "刘宋", ruler: "宋明帝 刘彧", eraName: "泰豫" },
    { start: 473, end: 477, dynasty: "刘宋", ruler: "后废帝 刘昱", eraName: "元徽" },
    { start: 477, end: 479, dynasty: "刘宋", ruler: "宋顺帝 刘准", eraName: "升明" },
    { start: 479, end: 482, dynasty: "南齐", ruler: "齐高帝 萧道成", eraName: "建元" },
    { start: 483, end: 493, dynasty: "南齐", ruler: "齐武帝 萧赜", eraName: "永明" },
    { start: 494, end: 494, dynasty: "南齐", ruler: "郁林王 萧昭业", eraName: "隆昌" },
    { start: 494, end: 494, dynasty: "南齐", ruler: "海陵王 萧昭文", eraName: "延兴" },
    { start: 494, end: 498, dynasty: "南齐", ruler: "齐明帝 萧鸾", eraName: "建武" },
    { start: 498, end: 498, dynasty: "南齐", ruler: "齐明帝 萧鸾", eraName: "永泰" },
    { start: 499, end: 501, dynasty: "南齐", ruler: "东昏侯 萧宝卷", eraName: "永元" },
    { start: 501, end: 502, dynasty: "南齐", ruler: "齐和帝 萧宝融", eraName: "中兴" },
    { start: 502, end: 519, dynasty: "梁", ruler: "梁武帝 萧衍", eraName: "天监" },
    { start: 520, end: 526, dynasty: "梁", ruler: "梁武帝 萧衍", eraName: "普通" },
    { start: 527, end: 529, dynasty: "梁", ruler: "梁武帝 萧衍", eraName: "大通" },
    { start: 529, end: 534, dynasty: "梁", ruler: "梁武帝 萧衍", eraName: "中大通" },
    { start: 535, end: 545, dynasty: "梁", ruler: "梁武帝 萧衍", eraName: "大同" },
    { start: 546, end: 546, dynasty: "梁", ruler: "梁武帝 萧衍", eraName: "中大同" },
    { start: 547, end: 549, dynasty: "梁", ruler: "梁武帝 萧衍", eraName: "太清" },
    { start: 550, end: 551, dynasty: "梁", ruler: "梁简文帝 萧纲", eraName: "大宝" },
    { start: 552, end: 555, dynasty: "梁", ruler: "梁元帝 萧绎", eraName: "承圣" },
    { start: 555, end: 556, dynasty: "梁", ruler: "梁敬帝 萧方智", eraName: "绍泰" },
    { start: 556, end: 557, dynasty: "梁", ruler: "梁敬帝 萧方智", eraName: "太平" },
    { start: 557, end: 559, dynasty: "陈", ruler: "陈武帝 陈霸先", eraName: "永定" },
    { start: 560, end: 566, dynasty: "陈", ruler: "陈文帝 陈蒨", eraName: "天嘉" },
    { start: 566, end: 566, dynasty: "陈", ruler: "陈文帝 陈蒨", eraName: "天康" },
    { start: 567, end: 568, dynasty: "陈", ruler: "陈废帝 陈伯宗", eraName: "光大" },
    { start: 569, end: 582, dynasty: "陈", ruler: "陈宣帝 陈顼", eraName: "太建" },
    { start: 583, end: 586, dynasty: "陈", ruler: "陈后主 陈叔宝", eraName: "至德" },
    { start: 587, end: 589, dynasty: "陈", ruler: "陈后主 陈叔宝", eraName: "祯明" },
    { start: 589, end: 600, dynasty: "隋", ruler: "隋文帝 杨坚", eraName: "开皇" },
    { start: 601, end: 604, dynasty: "隋", ruler: "隋文帝 杨坚", eraName: "仁寿" },
    { start: 605, end: 617, dynasty: "隋", ruler: "隋炀帝 杨广", eraName: "大业" },
    { start: 617, end: 618, dynasty: "隋", ruler: "隋恭帝 杨侑", eraName: "义宁" },
    { start: 618, end: 626, dynasty: "唐", ruler: "唐高祖 李渊", eraName: "武德" },
    { start: 627, end: 649, dynasty: "唐", ruler: "唐太宗 李世民", eraName: "贞观" },
    { start: 650, end: 655, dynasty: "唐", ruler: "唐高宗 李治", eraName: "永徽" },
    { start: 656, end: 660, dynasty: "唐", ruler: "唐高宗 李治", eraName: "显庆" },
    { start: 661, end: 663, dynasty: "唐", ruler: "唐高宗 李治", eraName: "龙朔" },
    { start: 664, end: 665, dynasty: "唐", ruler: "唐高宗 李治", eraName: "麟德" },
    { start: 666, end: 668, dynasty: "唐", ruler: "唐高宗 李治", eraName: "乾封" },
    { start: 668, end: 670, dynasty: "唐", ruler: "唐高宗 李治", eraName: "总章" },
    { start: 670, end: 674, dynasty: "唐", ruler: "唐高宗 李治", eraName: "咸亨" },
    { start: 674, end: 676, dynasty: "唐", ruler: "唐高宗 李治", eraName: "上元" },
    { start: 676, end: 679, dynasty: "唐", ruler: "唐高宗 李治", eraName: "仪凤" },
    { start: 679, end: 680, dynasty: "唐", ruler: "唐高宗 李治", eraName: "调露" },
    { start: 680, end: 681, dynasty: "唐", ruler: "唐高宗 李治", eraName: "永隆" },
    { start: 681, end: 682, dynasty: "唐", ruler: "唐高宗 李治", eraName: "开耀" },
    { start: 682, end: 683, dynasty: "唐", ruler: "唐高宗 李治", eraName: "永淳" },
    { start: 683, end: 683, dynasty: "唐", ruler: "唐高宗 李治", eraName: "弘道" },
    { start: 684, end: 684, dynasty: "唐", ruler: "唐中宗 李显", eraName: "嗣圣" },
    { start: 684, end: 684, dynasty: "唐", ruler: "武则天", eraName: "光宅" },
    { start: 685, end: 688, dynasty: "武周", ruler: "武则天", eraName: "垂拱" },
    { start: 689, end: 689, dynasty: "武周", ruler: "武则天", eraName: "永昌" },
    { start: 690, end: 692, dynasty: "武周", ruler: "武则天", eraName: "天授" },
    { start: 692, end: 694, dynasty: "武周", ruler: "武则天", eraName: "长寿" },
    { start: 694, end: 695, dynasty: "武周", ruler: "武则天", eraName: "延载" },
    { start: 695, end: 695, dynasty: "武周", ruler: "武则天", eraName: "证圣" },
    { start: 695, end: 696, dynasty: "武周", ruler: "武则天", eraName: "天册万岁" },
    { start: 696, end: 697, dynasty: "武周", ruler: "武则天", eraName: "万岁通天" },
    { start: 698, end: 700, dynasty: "武周", ruler: "武则天", eraName: "圣历" },
    { start: 700, end: 701, dynasty: "武周", ruler: "武则天", eraName: "久视" },
    { start: 701, end: 705, dynasty: "武周", ruler: "武则天", eraName: "长安" },
    { start: 705, end: 707, dynasty: "唐", ruler: "唐中宗 李显", eraName: "神龙" },
    { start: 707, end: 710, dynasty: "唐", ruler: "唐中宗 李显", eraName: "景龙" },
    { start: 710, end: 710, dynasty: "唐", ruler: "唐殇帝 李重茂", eraName: "唐隆" },
    { start: 710, end: 711, dynasty: "唐", ruler: "唐睿宗 李旦", eraName: "景云" },
    { start: 712, end: 712, dynasty: "唐", ruler: "唐睿宗 李旦", eraName: "太极" },
    { start: 712, end: 712, dynasty: "唐", ruler: "唐睿宗 李旦", eraName: "延和" },
    { start: 713, end: 741, dynasty: "唐", ruler: "唐玄宗 李隆基", eraName: "开元" },
    { start: 742, end: 756, dynasty: "唐", ruler: "唐玄宗 李隆基", eraName: "天宝" },
    { start: 756, end: 758, dynasty: "唐", ruler: "唐肃宗 李亨", eraName: "至德" },
    { start: 758, end: 760, dynasty: "唐", ruler: "唐肃宗 李亨", eraName: "乾元" },
    { start: 760, end: 762, dynasty: "唐", ruler: "唐肃宗 李亨", eraName: "上元" },
    { start: 762, end: 763, dynasty: "唐", ruler: "唐肃宗 李亨", eraName: "宝应" },
    { start: 763, end: 765, dynasty: "唐", ruler: "唐代宗 李豫", eraName: "广德" },
    { start: 765, end: 766, dynasty: "唐", ruler: "唐代宗 李豫", eraName: "永泰" },
    { start: 766, end: 779, dynasty: "唐", ruler: "唐代宗 李豫", eraName: "大历" },
    { start: 780, end: 783, dynasty: "唐", ruler: "唐德宗 李适", eraName: "建中" },
    { start: 784, end: 784, dynasty: "唐", ruler: "唐德宗 李适", eraName: "兴元" },
    { start: 785, end: 805, dynasty: "唐", ruler: "唐德宗 李适", eraName: "贞元" },
    { start: 805, end: 805, dynasty: "唐", ruler: "唐顺宗 李诵", eraName: "永贞" },
    { start: 806, end: 820, dynasty: "唐", ruler: "唐宪宗 李纯", eraName: "元和" },
    { start: 821, end: 824, dynasty: "唐", ruler: "唐穆宗 李恒", eraName: "长庆" },
    { start: 825, end: 827, dynasty: "唐", ruler: "唐敬宗 李湛", eraName: "宝历" },
    { start: 827, end: 835, dynasty: "唐", ruler: "唐文宗 李昂", eraName: "太和" },
    { start: 836, end: 840, dynasty: "唐", ruler: "唐文宗 李昂", eraName: "开成" },
    { start: 841, end: 846, dynasty: "唐", ruler: "唐武宗 李炎", eraName: "会昌" },
    { start: 847, end: 859, dynasty: "唐", ruler: "唐宣宗 李忱", eraName: "大中" },
    { start: 860, end: 873, dynasty: "唐", ruler: "唐懿宗 李漼", eraName: "咸通" },
    { start: 874, end: 879, dynasty: "唐", ruler: "唐僖宗 李儇", eraName: "乾符" },
    { start: 880, end: 881, dynasty: "唐", ruler: "唐僖宗 李儇", eraName: "广明" },
    { start: 881, end: 885, dynasty: "唐", ruler: "唐僖宗 李儇", eraName: "中和" },
    { start: 885, end: 888, dynasty: "唐", ruler: "唐僖宗 李儇", eraName: "光启" },
    { start: 888, end: 889, dynasty: "唐", ruler: "唐僖宗 李儇", eraName: "文德" },
    { start: 889, end: 890, dynasty: "唐", ruler: "唐昭宗 李晔", eraName: "龙纪" },
    { start: 890, end: 892, dynasty: "唐", ruler: "唐昭宗 李晔", eraName: "大顺" },
    { start: 892, end: 894, dynasty: "唐", ruler: "唐昭宗 李晔", eraName: "景福" },
    { start: 894, end: 898, dynasty: "唐", ruler: "唐昭宗 李晔", eraName: "乾宁" },
    { start: 898, end: 901, dynasty: "唐", ruler: "唐昭宗 李晔", eraName: "光化" },
    { start: 901, end: 904, dynasty: "唐", ruler: "唐昭宗 李晔", eraName: "天复" },
    { start: 904, end: 907, dynasty: "唐", ruler: "唐昭宗李晔 / 唐哀帝李柷", eraName: "天祐" },
    { start: 907, end: 911, dynasty: "后梁", ruler: "后梁太祖 朱温", eraName: "开平" },
    { start: 911, end: 915, dynasty: "后梁", ruler: "后梁太祖 朱温", eraName: "乾化" },
    { start: 915, end: 921, dynasty: "后梁", ruler: "后梁末帝 朱友贞", eraName: "贞明" },
    { start: 921, end: 923, dynasty: "后梁", ruler: "后梁末帝 朱友贞", eraName: "龙德" },
    { start: 923, end: 926, dynasty: "后唐", ruler: "后唐庄宗 李存勖", eraName: "同光" },
    { start: 926, end: 930, dynasty: "后唐", ruler: "后唐明宗 李嗣源", eraName: "天成" },
    { start: 930, end: 934, dynasty: "后唐", ruler: "后唐明宗 李嗣源", eraName: "长兴" },
    { start: 934, end: 934, dynasty: "后唐", ruler: "后唐闵帝 李从厚", eraName: "应顺" },
    { start: 934, end: 936, dynasty: "后唐", ruler: "后唐末帝 李从珂", eraName: "清泰" },
    { start: 936, end: 942, dynasty: "后晋", ruler: "后晋高祖 石敬瑭", eraName: "天福" },
    { start: 942, end: 944, dynasty: "后晋", ruler: "后晋出帝 石重贵", eraName: "天福" },
    { start: 944, end: 947, dynasty: "后晋", ruler: "后晋出帝 石重贵", eraName: "开运" },
    { start: 947, end: 947, dynasty: "后汉", ruler: "后汉高祖 刘知远", eraName: "天福" },
    { start: 948, end: 951, dynasty: "后汉", ruler: "后汉高祖刘知远 / 后汉隐帝刘承祐", eraName: "乾祐" },
    { start: 951, end: 954, dynasty: "后周", ruler: "后周太祖 郭威", eraName: "广顺" },
    { start: 954, end: 960, dynasty: "后周", ruler: "后周世宗 柴荣", eraName: "显德" },
    { start: 960, end: 963, dynasty: "北宋", ruler: "宋太祖 赵匡胤", eraName: "建隆" },
    { start: 963, end: 968, dynasty: "北宋", ruler: "宋太祖 赵匡胤", eraName: "乾德" },
    { start: 968, end: 976, dynasty: "北宋", ruler: "宋太祖 赵匡胤", eraName: "开宝" },
    { start: 976, end: 984, dynasty: "北宋", ruler: "宋太宗 赵炅", eraName: "太平兴国" },
    { start: 984, end: 988, dynasty: "北宋", ruler: "宋太宗 赵炅", eraName: "雍熙" },
    { start: 988, end: 990, dynasty: "北宋", ruler: "宋太宗 赵炅", eraName: "端拱" },
    { start: 990, end: 995, dynasty: "北宋", ruler: "宋太宗 赵炅", eraName: "淳化" },
    { start: 995, end: 998, dynasty: "北宋", ruler: "宋太宗 赵炅", eraName: "至道" },
    { start: 998, end: 1004, dynasty: "北宋", ruler: "宋真宗 赵恒", eraName: "咸平" },
    { start: 1004, end: 1008, dynasty: "北宋", ruler: "宋真宗 赵恒", eraName: "景德" },
    { start: 1008, end: 1016, dynasty: "北宋", ruler: "宋真宗 赵恒", eraName: "大中祥符" },
    { start: 1017, end: 1021, dynasty: "北宋", ruler: "宋真宗 赵恒", eraName: "天禧" },
    { start: 1022, end: 1022, dynasty: "北宋", ruler: "宋真宗 赵恒", eraName: "乾兴" },
    { start: 1023, end: 1032, dynasty: "北宋", ruler: "宋仁宗 赵祯", eraName: "天圣" },
    { start: 1032, end: 1033, dynasty: "北宋", ruler: "宋仁宗 赵祯", eraName: "明道" },
    { start: 1034, end: 1038, dynasty: "北宋", ruler: "宋仁宗 赵祯", eraName: "景祐" },
    { start: 1038, end: 1040, dynasty: "北宋", ruler: "宋仁宗 赵祯", eraName: "宝元" },
    { start: 1040, end: 1041, dynasty: "北宋", ruler: "宋仁宗 赵祯", eraName: "康定" },
    { start: 1041, end: 1048, dynasty: "北宋", ruler: "宋仁宗 赵祯", eraName: "庆历" },
    { start: 1049, end: 1054, dynasty: "北宋", ruler: "宋仁宗 赵祯", eraName: "皇祐" },
    { start: 1054, end: 1056, dynasty: "北宋", ruler: "宋仁宗 赵祯", eraName: "至和" },
    { start: 1056, end: 1063, dynasty: "北宋", ruler: "宋仁宗 赵祯", eraName: "嘉祐" },
    { start: 1064, end: 1067, dynasty: "北宋", ruler: "宋英宗 赵曙", eraName: "治平" },
    { start: 1068, end: 1077, dynasty: "北宋", ruler: "宋神宗 赵顼", eraName: "熙宁" },
    { start: 1078, end: 1085, dynasty: "北宋", ruler: "宋神宗 赵顼", eraName: "元丰" },
    { start: 1086, end: 1094, dynasty: "北宋", ruler: "宋哲宗 赵煦", eraName: "元祐" },
    { start: 1094, end: 1098, dynasty: "北宋", ruler: "宋哲宗 赵煦", eraName: "绍圣" },
    { start: 1098, end: 1101, dynasty: "北宋", ruler: "宋哲宗 赵煦", eraName: "元符" },
    { start: 1101, end: 1101, dynasty: "北宋", ruler: "宋徽宗 赵佶", eraName: "建中靖国" },
    { start: 1102, end: 1106, dynasty: "北宋", ruler: "宋徽宗 赵佶", eraName: "崇宁" },
    { start: 1107, end: 1110, dynasty: "北宋", ruler: "宋徽宗 赵佶", eraName: "大观" },
    { start: 1111, end: 1118, dynasty: "北宋", ruler: "宋徽宗 赵佶", eraName: "政和" },
    { start: 1118, end: 1119, dynasty: "北宋", ruler: "宋徽宗 赵佶", eraName: "重和" },
    { start: 1119, end: 1125, dynasty: "北宋", ruler: "宋徽宗 赵佶", eraName: "宣和" },
    { start: 1126, end: 1127, dynasty: "北宋", ruler: "宋钦宗 赵桓", eraName: "靖康" },
    { start: 1127, end: 1130, dynasty: "南宋", ruler: "宋高宗 赵构", eraName: "建炎" },
    { start: 1131, end: 1162, dynasty: "南宋", ruler: "宋高宗 赵构", eraName: "绍兴" },
    { start: 1163, end: 1164, dynasty: "南宋", ruler: "宋孝宗 赵昚", eraName: "隆兴" },
    { start: 1165, end: 1173, dynasty: "南宋", ruler: "宋孝宗 赵昚", eraName: "乾道" },
    { start: 1174, end: 1189, dynasty: "南宋", ruler: "宋孝宗 赵昚", eraName: "淳熙" },
    { start: 1190, end: 1194, dynasty: "南宋", ruler: "宋光宗 赵惇", eraName: "绍熙" },
    { start: 1195, end: 1200, dynasty: "南宋", ruler: "宋宁宗 赵扩", eraName: "庆元" },
    { start: 1201, end: 1204, dynasty: "南宋", ruler: "宋宁宗 赵扩", eraName: "嘉泰" },
    { start: 1205, end: 1207, dynasty: "南宋", ruler: "宋宁宗 赵扩", eraName: "开禧" },
    { start: 1208, end: 1224, dynasty: "南宋", ruler: "宋宁宗 赵扩", eraName: "嘉定" },
    { start: 1225, end: 1227, dynasty: "南宋", ruler: "宋理宗 赵昀", eraName: "宝庆" },
    { start: 1228, end: 1233, dynasty: "南宋", ruler: "宋理宗 赵昀", eraName: "绍定" },
    { start: 1234, end: 1236, dynasty: "南宋", ruler: "宋理宗 赵昀", eraName: "端平" },
    { start: 1237, end: 1240, dynasty: "南宋", ruler: "宋理宗 赵昀", eraName: "嘉熙" },
    { start: 1241, end: 1252, dynasty: "南宋", ruler: "宋理宗 赵昀", eraName: "淳祐" },
    { start: 1253, end: 1258, dynasty: "南宋", ruler: "宋理宗 赵昀", eraName: "宝祐" },
    { start: 1259, end: 1259, dynasty: "南宋", ruler: "宋理宗 赵昀", eraName: "开庆" },
    { start: 1260, end: 1264, dynasty: "南宋", ruler: "宋理宗 赵昀", eraName: "景定" },
    { start: 1265, end: 1274, dynasty: "南宋", ruler: "宋度宗 赵禥", eraName: "咸淳" },
    { start: 1275, end: 1276, dynasty: "南宋", ruler: "宋恭帝 赵㬎", eraName: "德祐" },
    { start: 1276, end: 1278, dynasty: "南宋", ruler: "宋端宗 赵昰", eraName: "景炎" },
    { start: 1278, end: 1279, dynasty: "南宋", ruler: "宋帝昺 赵昺", eraName: "祥兴" },
    { start: 1280, end: 1294, dynasty: "元", ruler: "元世祖 忽必烈", eraName: "至元" },
    { start: 1295, end: 1297, dynasty: "元", ruler: "元成宗 铁穆耳", eraName: "元贞" },
    { start: 1297, end: 1307, dynasty: "元", ruler: "元成宗 铁穆耳", eraName: "大德" },
    { start: 1308, end: 1311, dynasty: "元", ruler: "元武宗 海山", eraName: "至大" },
    { start: 1312, end: 1313, dynasty: "元", ruler: "元仁宗 爱育黎拔力八达", eraName: "皇庆" },
    { start: 1314, end: 1320, dynasty: "元", ruler: "元仁宗 爱育黎拔力八达", eraName: "延祐" },
    { start: 1321, end: 1323, dynasty: "元", ruler: "元英宗 硕德八剌", eraName: "至治" },
    { start: 1324, end: 1328, dynasty: "元", ruler: "元泰定帝 也孙铁木儿", eraName: "泰定" },
    { start: 1328, end: 1328, dynasty: "元", ruler: "元泰定帝 也孙铁木儿", eraName: "致和" },
    { start: 1328, end: 1330, dynasty: "元", ruler: "元文宗 图帖睦尔", eraName: "天历" },
    { start: 1330, end: 1333, dynasty: "元", ruler: "元文宗 图帖睦尔", eraName: "至顺" },
    { start: 1333, end: 1335, dynasty: "元", ruler: "元惠宗 妥懽贴睦尔", eraName: "元统" },
    { start: 1335, end: 1340, dynasty: "元", ruler: "元惠宗 妥懽贴睦尔", eraName: "至元" },
    { start: 1341, end: 1368, dynasty: "元", ruler: "元惠宗 妥懽贴睦尔", eraName: "至正" },
    { start: 1368, end: 1398, dynasty: "明", ruler: "明太祖 朱元璋", eraName: "洪武" },
    { start: 1399, end: 1402, dynasty: "明", ruler: "明惠帝 朱允炆", eraName: "建文" },
    { start: 1403, end: 1424, dynasty: "明", ruler: "明成祖 朱棣", eraName: "永乐" },
    { start: 1425, end: 1425, dynasty: "明", ruler: "明仁宗 朱高炽", eraName: "洪熙" },
    { start: 1426, end: 1435, dynasty: "明", ruler: "明宣宗 朱瞻基", eraName: "宣德" },
    { start: 1436, end: 1449, dynasty: "明", ruler: "明英宗 朱祁镇", eraName: "正统" },
    { start: 1450, end: 1457, dynasty: "明", ruler: "明代宗 朱祁钰", eraName: "景泰" },
    { start: 1457, end: 1464, dynasty: "明", ruler: "明英宗 朱祁镇", eraName: "天顺" },
    { start: 1465, end: 1487, dynasty: "明", ruler: "明宪宗 朱见深", eraName: "成化" },
    { start: 1488, end: 1505, dynasty: "明", ruler: "明孝宗 朱祐樘", eraName: "弘治" },
    { start: 1506, end: 1521, dynasty: "明", ruler: "明武宗 朱厚照", eraName: "正德" },
    { start: 1522, end: 1566, dynasty: "明", ruler: "明世宗 朱厚熜", eraName: "嘉靖" },
    { start: 1567, end: 1572, dynasty: "明", ruler: "明穆宗 朱载坖", eraName: "隆庆" },
    { start: 1573, end: 1620, dynasty: "明", ruler: "明神宗 朱翊钧", eraName: "万历" },
    { start: 1620, end: 1620, dynasty: "明", ruler: "明光宗 朱常洛", eraName: "泰昌" },
    { start: 1621, end: 1627, dynasty: "明", ruler: "明熹宗 朱由校", eraName: "天启" },
    { start: 1628, end: 1644, dynasty: "明", ruler: "明思宗 朱由检", eraName: "崇祯" },
    { start: 1644, end: 1661, dynasty: "清", ruler: "清世祖 福临", eraName: "顺治" },
    { start: 1662, end: 1722, dynasty: "清", ruler: "清圣祖 玄烨", eraName: "康熙" },
    { start: 1723, end: 1735, dynasty: "清", ruler: "清世宗 胤禛", eraName: "雍正" },
    { start: 1736, end: 1795, dynasty: "清", ruler: "清高宗 弘历", eraName: "乾隆" },
    { start: 1796, end: 1820, dynasty: "清", ruler: "清仁宗 颙琰", eraName: "嘉庆" },
    { start: 1821, end: 1850, dynasty: "清", ruler: "清宣宗 旻宁", eraName: "道光" },
    { start: 1851, end: 1861, dynasty: "清", ruler: "清文宗 奕詝", eraName: "咸丰" },
    { start: 1862, end: 1874, dynasty: "清", ruler: "清穆宗 载淳", eraName: "同治" },
    { start: 1875, end: 1908, dynasty: "清", ruler: "清德宗 载湉", eraName: "光绪" },
    { start: 1909, end: 1911, dynasty: "清", ruler: "清宣统帝 溥仪", eraName: "宣统" },
    { start: 1912, end: 1948, dynasty: "中华民国", ruler: "", eraName: "民国", hideRuler: true, modern: true },
    { start: 1949, end: 99999, dynasty: "中华人民共和国", ruler: "", eraName: "", hideRuler: true, modern: true },
  ];
  const TRIGRAM_LINES = {
    乾: [1, 1, 1],
    兑: [1, 1, 0],
    离: [1, 0, 1],
    震: [1, 0, 0],
    巽: [0, 1, 1],
    坎: [0, 1, 0],
    艮: [0, 0, 1],
    坤: [0, 0, 0],
  };
  const HEXAGRAMS = {
    乾: ["乾", "乾"],
    坤: ["坤", "坤"],
    屯: ["坎", "震"],
    蒙: ["艮", "坎"],
    需: ["坎", "乾"],
    讼: ["乾", "坎"],
    师: ["坤", "坎"],
    比: ["坎", "坤"],
    小畜: ["巽", "乾"],
    履: ["乾", "兑"],
    泰: ["坤", "乾"],
    否: ["乾", "坤"],
    同人: ["乾", "离"],
    大有: ["离", "乾"],
    谦: ["坤", "艮"],
    豫: ["震", "坤"],
    随: ["兑", "震"],
    蛊: ["艮", "巽"],
    临: ["坤", "兑"],
    观: ["巽", "坤"],
    噬嗑: ["离", "震"],
    贲: ["艮", "离"],
    剥: ["艮", "坤"],
    复: ["坤", "震"],
    无妄: ["乾", "震"],
    大畜: ["艮", "乾"],
    颐: ["艮", "震"],
    大过: ["兑", "巽"],
    坎: ["坎", "坎"],
    离: ["离", "离"],
    咸: ["兑", "艮"],
    恒: ["震", "巽"],
    遁: ["乾", "艮"],
    大壮: ["震", "乾"],
    晋: ["离", "坤"],
    明夷: ["坤", "离"],
    家人: ["巽", "离"],
    睽: ["离", "兑"],
    蹇: ["坎", "艮"],
    解: ["震", "坎"],
    损: ["艮", "兑"],
    益: ["巽", "震"],
    夬: ["兑", "乾"],
    姤: ["乾", "巽"],
    萃: ["兑", "坤"],
    升: ["坤", "巽"],
    困: ["兑", "坎"],
    井: ["坎", "巽"],
    革: ["兑", "离"],
    鼎: ["离", "巽"],
    震: ["震", "震"],
    艮: ["艮", "艮"],
    渐: ["巽", "艮"],
    归妹: ["震", "兑"],
    丰: ["震", "离"],
    旅: ["离", "艮"],
    巽: ["巽", "巽"],
    兑: ["兑", "兑"],
    涣: ["巽", "坎"],
    节: ["坎", "兑"],
    中孚: ["巽", "兑"],
    小过: ["震", "艮"],
    既济: ["坎", "离"],
    未济: ["离", "坎"],
  };

  const HEXAGRAM_REVERSE = {};
  Object.entries(HEXAGRAMS).forEach(([name, [upper, lower]]) => {
    HEXAGRAM_REVERSE[TRIGRAM_LINES[lower].concat(TRIGRAM_LINES[upper]).join("")] = name;
  });

  const lunarFormatter = new Intl.DateTimeFormat("zh-CN-u-ca-chinese", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const weekdayFormatter = new Intl.DateTimeFormat("zh-CN", { weekday: "long" });
  const lunarCache = new Map();
  const solarTermCache = new Map();
  const lunarMonthCache = new Map();

  function mod(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
  }

  function createDate(year, month, day, hour) {
    const date = new Date(0);
    date.setFullYear(year, month - 1, day);
    date.setHours(hour == null ? 12 : hour, 0, 0, 0);
    return date;
  }

  function cloneDate(date) {
    return new Date(date.getTime());
  }

  function addDays(date, days) {
    const copy = cloneDate(date);
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function addMonths(date, months) {
    const copy = cloneDate(date);
    const year = copy.getFullYear();
    const month = copy.getMonth() + 1;
    const nextMonthIndex = year * 12 + (month - 1) + months;
    const nextYear = Math.floor(nextMonthIndex / 12);
    const normalizedMonth = mod(nextMonthIndex, 12) + 1;
    const day = Math.min(copy.getDate(), daysInMonth(nextYear, normalizedMonth));
    const hour = copy.getHours();
    return createDate(nextYear, normalizedMonth, day, hour);
  }

  function daysInMonth(year, month) {
    return new Date(createDate(year, month + 1, 1, 12).getTime() - 24 * 60 * 60 * 1000).getDate();
  }

  function isLeapYear(year) {
    return (mod(year, 4) === 0 && mod(year, 100) !== 0) || mod(year, 400) === 0;
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function dateKey(date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours()].join("-");
  }

  function getDisplayYearParts(year) {
    if (year >= 1) {
      return { era: "公元", yearNumber: year };
    }
    return { era: "公元前", yearNumber: 1 - year };
  }

  function formatEraYear(year) {
    const info = getDisplayYearParts(year);
    return info.era + info.yearNumber + "年";
  }

  function formatGregorian(date) {
    return formatEraYear(date.getFullYear()) + pad(date.getMonth() + 1) + "月" + pad(date.getDate()) + "日";
  }

  function formatMonthLabel(date) {
    return formatEraYear(date.getFullYear()) + pad(date.getMonth() + 1) + "月";
  }

  function formatTime(date) {
    return pad(date.getHours()) + ":" + pad(date.getMinutes());
  }

  function compareTime(a, b) {
    return a.getTime() - b.getTime();
  }

  function toChineseDay(day) {
    const labels = [
      "",
      "初一",
      "初二",
      "初三",
      "初四",
      "初五",
      "初六",
      "初七",
      "初八",
      "初九",
      "初十",
      "十一",
      "十二",
      "十三",
      "十四",
      "十五",
      "十六",
      "十七",
      "十八",
      "十九",
      "二十",
      "廿一",
      "廿二",
      "廿三",
      "廿四",
      "廿五",
      "廿六",
      "廿七",
      "廿八",
      "廿九",
      "三十",
    ];
    return labels[day] || String(day);
  }

  function getLunarInfo(date) {
    const key = dateKey(createDate(date.getFullYear(), date.getMonth() + 1, date.getDate(), 12));
    if (lunarCache.has(key)) {
      return lunarCache.get(key);
    }

    const parts = lunarFormatter.formatToParts(date);
    const mapped = {};
    parts.forEach((part) => {
      mapped[part.type] = part.value;
    });

    const dayNumber = Number(mapped.day);
    const yearName = mapped.yearName || "";
    const branchChar = yearName.slice(1, 2);
    const lunarInfo = {
      relatedYear: Number(mapped.relatedYear),
      yearName,
      monthText: mapped.month,
      dayNumber,
      dayText: toChineseDay(dayNumber),
      weekday: mapped.weekday || weekdayFormatter.format(date),
      zodiac: ZODIACS[BRANCHES.indexOf(branchChar)] || "",
      isLeapMonth: mapped.month ? mapped.month.startsWith("闰") : false,
    };

    lunarCache.set(key, lunarInfo);
    return lunarInfo;
  }

  function getSolarTermsForYear(year) {
    if (solarTermCache.has(year)) {
      return solarTermCache.get(year);
    }

    const terms = SOLAR_TERM_NAMES.map((name, index) => ({
      name,
      index,
      date: new Date(31556925974.7 * (year - 1900) + SOLAR_TERM_INFO[index] * 60000 + Date.UTC(1900, 0, 6, 2, 5)),
    }));

    solarTermCache.set(year, terms);
    return terms;
  }

  function formatTerm(term) {
    return term.name + " · " + pad(term.date.getMonth() + 1) + "月" + pad(term.date.getDate()) + "日 " + formatTime(term.date);
  }

  function getNeighborTerms(date) {
    const year = date.getFullYear();
    const terms = getSolarTermsForYear(year - 1)
      .concat(getSolarTermsForYear(year))
      .concat(getSolarTermsForYear(year + 1))
      .sort((a, b) => a.date - b.date);

    let previous = terms[0];
    let next = terms[terms.length - 1];

    for (let i = 0; i < terms.length; i += 1) {
      if (compareTime(terms[i].date, date) <= 0) {
        previous = terms[i];
      }
      if (compareTime(terms[i].date, date) > 0) {
        next = terms[i];
        break;
      }
    }

    const sameDay =
      previous.date.getFullYear() === date.getFullYear() &&
      previous.date.getMonth() === date.getMonth() &&
      previous.date.getDate() === date.getDate();

    return {
      previous,
      current: previous,
      next,
      todayIsTerm: sameDay,
    };
  }

  function getEffectiveDateForPillars(date) {
    if (date.getHours() >= 23) {
      return addDays(date, 1);
    }
    return cloneDate(date);
  }

  function getYearPillar(date) {
    const effectiveDate = getEffectiveDateForPillars(date);
    const year = effectiveDate.getFullYear();
    const liChun = getSolarTermsForYear(year)[2].date;
    const pillarYear = compareTime(effectiveDate, liChun) < 0 ? year - 1 : year;
    const cycleIndex = mod(pillarYear - 1984, 60);
    const stemIndex = mod(cycleIndex, 10);
    const branchIndex = mod(cycleIndex, 12);

    return {
      text: STEMS[stemIndex] + BRANCHES[branchIndex],
      stemIndex,
      branchIndex,
      yearNumber: pillarYear,
    };
  }

  function getMonthPillar(date) {
    const effectiveDate = getEffectiveDateForPillars(date);
    const yearPillar = getYearPillar(effectiveDate);
    const starts = JIE_TERM_INDICES.map((termIndex, order) => {
      const targetYear = termIndex === 0 ? yearPillar.yearNumber + 1 : yearPillar.yearNumber;
      return {
        order,
        date: getSolarTermsForYear(targetYear)[termIndex].date,
      };
    });

    let order = 11;
    for (let i = 0; i < starts.length; i += 1) {
      if (compareTime(starts[i].date, effectiveDate) <= 0) {
        order = starts[i].order;
      }
    }

    const startStemIndex = MONTH_START_STEMS[mod(yearPillar.stemIndex, 5)];
    const stemIndex = mod(startStemIndex + order, 10);
    const branchIndex = mod(2 + order, 12);

    return {
      text: STEMS[stemIndex] + BRANCHES[branchIndex],
      stemIndex,
      branchIndex,
    };
  }

  function julianDayNumber(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  function getDayPillar(date) {
    const effectiveDate = getEffectiveDateForPillars(date);
    const jdn = julianDayNumber(effectiveDate.getFullYear(), effectiveDate.getMonth() + 1, effectiveDate.getDate());
    const cycleIndex = mod(jdn + 49, 60);
    const stemIndex = mod(cycleIndex, 10);
    const branchIndex = mod(cycleIndex, 12);

    return {
      text: STEMS[stemIndex] + BRANCHES[branchIndex],
      stemIndex,
      branchIndex,
    };
  }

  function getHourBranchIndex(date) {
    return mod(Math.floor((date.getHours() + 1) / 2), 12);
  }

  function getHourPillar(date, dayStemIndex) {
    const branchIndex = getHourBranchIndex(date);
    const startStemIndex = mod(dayStemIndex, 5) * 2;
    const stemIndex = mod(startStemIndex + branchIndex, 10);

    return {
      text: STEMS[stemIndex] + BRANCHES[branchIndex],
      stemIndex,
      branchIndex,
      range: SHICHEN_RANGES[branchIndex],
    };
  }

  function getWesternSign(month, day) {
    const value = month * 100 + day;
    return WESTERN_SIGNS.find((sign) => {
      const start = sign.start[0] * 100 + sign.start[1];
      const end = sign.end[0] * 100 + sign.end[1];
      if (start > end) {
        return value >= start || value <= end;
      }
      return value >= start && value <= end;
    });
  }

  function getReignInfo(year) {
    if (year < -220) {
      return {
        dynasty: "秦前时期",
        title: "暂无帝王纪年",
        subtitle: "朝代标示当前从秦朝起算",
        note: "帝王年号当前从秦始皇起开始展示。",
        showRuler: false,
      };
    }

    const reign = REIGN_PERIODS.filter((item) => year >= item.start && year <= item.end).at(-1);
    if (!reign) {
      return {
        dynasty: "未知时期",
        title: "暂无映射",
        subtitle: formatEraYear(year),
        note: "该年份暂未纳入帝王纪年映射。",
        showRuler: false,
      };
    }

    if (reign.modern && year >= 1949) {
      return {
        dynasty: reign.dynasty,
        title: reign.dynasty,
        subtitle: formatEraYear(year),
        note: "1949 年及以后按你的要求不显示领导人。",
        showRuler: false,
      };
    }

    if (reign.modern) {
      return {
        dynasty: reign.dynasty,
        title: "民国" + (year - 1911) + "年",
        subtitle: reign.dynasty,
        note: "帝制已终结，这里只显示纪年，不显示领导人。",
        showRuler: false,
      };
    }

    const regnalYear = year - reign.start + 1;
    const eraText = reign.eraName === "未置年号" ? "未置年号 · 在位第" + regnalYear + "年" : reign.eraName + regnalYear + "年";
    return {
      dynasty: reign.dynasty,
      title: reign.ruler,
      subtitle: eraText,
      note: "采用中原主线纪年；多政权并立或同年改元时，取该年主展示条目。",
      eraName: reign.eraName,
      regnalYear,
      showRuler: true,
    };
  }

  function getDynastyInfo(year, reignInfo) {
    if (year < -201) {
      return {
        label: "汉前时期",
        yearText: "朝代标示从西汉起算",
      };
    }

    if (!reignInfo) {
      return {
        label: "未知时期",
        yearText: "暂无映射",
      };
    }

    if (year >= 1949) {
      return {
        label: reignInfo.dynasty,
        yearText: "1949 年后隐藏领导人",
      };
    }

    if (year >= 1912) {
      return {
        label: reignInfo.dynasty,
        yearText: "民国第 " + (year - 1911) + " 年",
      };
    }

    return {
      label: reignInfo.dynasty,
      yearText: reignInfo.eraName === "未置年号" ? "未置年号" : reignInfo.eraName + " · 第 " + reignInfo.regnalYear + " 年",
    };
  }

  function getHexagramLines(name) {
    const mapping = HEXAGRAMS[name];
    const upper = mapping[0];
    const lower = mapping[1];
    return TRIGRAM_LINES[lower].concat(TRIGRAM_LINES[upper]);
  }

  function getBranchAnimal(branchIndex) {
    return {
      name: ZODIACS[branchIndex],
      icon: ZODIAC_ICONS[branchIndex],
    };
  }

  function getHexagramDetail(name) {
    const mapping = HEXAGRAMS[name];
    if (!mapping) {
      return null;
    }

    const upper = mapping[0];
    const lower = mapping[1];
    const detail = HEXAGRAM_DETAILS[name] || {
      keywords: "卦意待补充",
      summary: "此卦可用于观察当下结构与趋势。",
      reading: "先看上下卦如何互动，再看自身处境。",
    };

    return {
      name,
      upper,
      lower,
      lines: getHexagramLines(name),
      keywords: detail.keywords,
      summary: detail.summary,
      reading: detail.reading,
    };
  }

  async function getHexagramOriginalText(name) {
    return HEXAGRAM_ORIGINALS[name] || null;
  }

  function flipHexagram(name, linesToFlip) {
    const lines = getHexagramLines(name).slice();
    linesToFlip.forEach((line) => {
      lines[line - 1] = 1 - lines[line - 1];
    });
    return HEXAGRAM_REVERSE[lines.join("")];
  }

  function getYearHexagram(year) {
    const accumulatedYearIndex = 67016 + year;
    const hui = Math.floor(accumulatedYearIndex / 10800) + 1;
    const huiRemainder = mod(accumulatedYearIndex, 10800);
    const yun = Math.floor(huiRemainder / 360) + 1;
    const yunRemainder = mod(huiRemainder, 360);
    const shi = Math.floor(yunRemainder / 30) + 1;
    const yearInShi = mod(yunRemainder, 30) + 1;
    const yunSequenceIndex = mod(hui - 1, 12) * 5 + Math.floor((yun - 1) / 6);
    const yunHexagram = HUANGJI_SEQUENCE[yunSequenceIndex];
    const pairIndex = Math.floor((shi - 1) / 2) + 1;
    const shiHexagram = pairIndex === 6 ? yunHexagram : flipHexagram(yunHexagram, [6, pairIndex]);
    const offsetInSixty = mod(shi - 1, 2) * 30 + yearInShi - 1;
    const startIndex = HUANGJI_SEQUENCE.indexOf(shiHexagram);

    return {
      text: shiHexagram,
      value: HUANGJI_SEQUENCE[(startIndex + offsetInSixty) % HUANGJI_SEQUENCE.length],
      hui,
      yun,
      shi,
      yearInShi,
      yunHexagram,
      shiHexagram,
    };
  }

  function buildMonthCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const firstDay = createDate(year, month, 1, 12);
    const startOffset = firstDay.getDay();
    const gridStart = addDays(firstDay, -startOffset);
    const today = new Date();
    const cells = [];

    for (let i = 0; i < 42; i += 1) {
      const cellDate = addDays(gridStart, i);
      const lunar = getLunarInfo(cellDate);
      const selected =
        cellDate.getFullYear() === date.getFullYear() &&
        cellDate.getMonth() === date.getMonth() &&
        cellDate.getDate() === date.getDate();
      const isToday =
        cellDate.getFullYear() === today.getFullYear() &&
        cellDate.getMonth() === today.getMonth() &&
        cellDate.getDate() === today.getDate();

      cells.push({
        solarYear: cellDate.getFullYear(),
        solarMonth: cellDate.getMonth() + 1,
        solarDay: cellDate.getDate(),
        weekday: WEEKDAY_NAMES[cellDate.getDay()],
        isCurrentMonth: cellDate.getMonth() + 1 === month,
        selected,
        isToday,
        lunarLabel: lunar.dayNumber === 1 ? lunar.monthText : lunar.dayText,
      });
    }

    return cells;
  }

  function getLunarMonthSequence(date) {
    const lunar = getLunarInfo(date);
    const targetKey = lunar.relatedYear + "-" + lunar.yearName;
    if (lunarMonthCache.has(targetKey)) {
      return lunarMonthCache.get(targetKey);
    }

    const result = [];
    const start = addDays(date, -430);
    const end = addDays(date, 430);

    for (let cursor = cloneDate(start); compareTime(cursor, end) <= 0; cursor = addDays(cursor, 1)) {
      const info = getLunarInfo(cursor);
      if (info.relatedYear === lunar.relatedYear && info.dayNumber === 1) {
        result.push({
          monthText: info.monthText,
          gregorianText:
            formatEraYear(cursor.getFullYear()) + pad(cursor.getMonth() + 1) + "月" + pad(cursor.getDate()) + "日",
        });
      }
    }

    lunarMonthCache.set(targetKey, result);
    return result;
  }

  function buildSnapshot(date) {
    const selectedDate = cloneDate(date);
    const lunar = getLunarInfo(selectedDate);
    const yearPillar = getYearPillar(selectedDate);
    const monthPillar = getMonthPillar(selectedDate);
    const dayPillar = getDayPillar(selectedDate);
    const hourPillar = getHourPillar(selectedDate, dayPillar.stemIndex);
    const sign = getWesternSign(selectedDate.getMonth() + 1, selectedDate.getDate());
    const reign = getReignInfo(selectedDate.getFullYear());
    const dynasty = getDynastyInfo(selectedDate.getFullYear(), reign);
    const terms = getNeighborTerms(selectedDate);
    const yearHexagram = getYearHexagram(selectedDate.getFullYear());
    const yearHexagramDetail = getHexagramDetail(yearHexagram.value);
    const yearDisplay = getDisplayYearParts(selectedDate.getFullYear());

    return {
      selectedDate,
      yearDisplay,
      solarText: formatGregorian(selectedDate),
      monthTitle: formatMonthLabel(selectedDate),
      weekdayText: weekdayFormatter.format(selectedDate),
      leapYearText: isLeapYear(selectedDate.getFullYear()) ? "该公历年为闰年" : "该公历年为平年",
      lunar,
      yearZodiac: getBranchAnimal(yearPillar.branchIndex),
      mysticLunarText: yearPillar.text + "年 · " + monthPillar.text + "月 · " + dayPillar.text + "日 · " + hourPillar.text + "时",
      pillars: {
        year: yearPillar,
        month: monthPillar,
        day: dayPillar,
        hour: hourPillar,
      },
      westernSign: sign,
      dynasty,
      reign,
      terms,
      yearHexagram,
      yearHexagramDetail,
      monthCalendar: buildMonthCalendar(selectedDate),
      lunarMonthSequence: getLunarMonthSequence(selectedDate),
      note: "古代年份的农历与节气采用现代历法回推；帝王纪年采用中原主线展示，不等同于逐朝逐月的实历复原。",
    };
  }

  global.XuanCalendar = {
    buildSnapshot,
    createDate,
    addDays,
    addMonths,
    daysInMonth,
    getDisplayYearParts,
    formatTerm,
    getHexagramDetail,
    getHexagramOriginalText,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = global.XuanCalendar;
  }
})(typeof window !== "undefined" ? window : globalThis);
