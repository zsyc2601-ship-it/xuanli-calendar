(function () {
  "use strict";

  var REIGN_PERIODS = [
    { start: 794, end: 806, dynasty: "平安時代", ruler: "桓武天皇", eraName: "延暦" },
    { start: 806, end: 809, dynasty: "平安時代", ruler: "平城天皇", eraName: "大同" },
    { start: 809, end: 823, dynasty: "平安時代", ruler: "嵯峨天皇", eraName: "弘仁" },
    { start: 823, end: 833, dynasty: "平安時代", ruler: "淳和天皇", eraName: "天長" },
    { start: 833, end: 850, dynasty: "平安時代", ruler: "仁明天皇", eraName: "承和" },
    { start: 850, end: 858, dynasty: "平安時代", ruler: "文徳天皇", eraName: "斉衡" },
    { start: 858, end: 876, dynasty: "平安時代", ruler: "清和天皇", eraName: "貞観" },
    { start: 876, end: 884, dynasty: "平安時代", ruler: "陽成天皇", eraName: "元慶" },
    { start: 884, end: 887, dynasty: "平安時代", ruler: "光孝天皇", eraName: "仁和" },
    { start: 887, end: 897, dynasty: "平安時代", ruler: "宇多天皇", eraName: "寛平" },
    { start: 897, end: 930, dynasty: "平安時代", ruler: "醍醐天皇", eraName: "延喜" },
    { start: 930, end: 946, dynasty: "平安時代", ruler: "朱雀天皇", eraName: "承平" },
    { start: 946, end: 967, dynasty: "平安時代", ruler: "村上天皇", eraName: "天暦" },
    { start: 967, end: 969, dynasty: "平安時代", ruler: "冷泉天皇", eraName: "安和" },
    { start: 969, end: 984, dynasty: "平安時代", ruler: "円融天皇", eraName: "天禄" },
    { start: 984, end: 986, dynasty: "平安時代", ruler: "花山天皇", eraName: "寛和" },
    { start: 986, end: 1011, dynasty: "平安時代", ruler: "一条天皇", eraName: "永延" },
    { start: 1011, end: 1016, dynasty: "平安時代", ruler: "三条天皇", eraName: "寛弘" },
    { start: 1016, end: 1036, dynasty: "平安時代", ruler: "後一条天皇", eraName: "長和" },
    { start: 1036, end: 1045, dynasty: "平安時代", ruler: "後朱雀天皇", eraName: "長暦" },
    { start: 1045, end: 1068, dynasty: "平安時代", ruler: "後冷泉天皇", eraName: "永承" },
    { start: 1068, end: 1073, dynasty: "平安時代", ruler: "後三条天皇", eraName: "延久" },
    { start: 1073, end: 1087, dynasty: "平安時代", ruler: "白河天皇", eraName: "延久" },
    { start: 1087, end: 1107, dynasty: "平安時代", ruler: "堀河天皇", eraName: "寛治" },
    { start: 1107, end: 1123, dynasty: "平安時代", ruler: "鳥羽天皇", eraName: "天仁" },
    { start: 1123, end: 1142, dynasty: "平安時代", ruler: "崇徳天皇", eraName: "保安" },
    { start: 1142, end: 1155, dynasty: "平安時代", ruler: "近衛天皇", eraName: "永治" },
    { start: 1155, end: 1158, dynasty: "平安時代", ruler: "後白河天皇", eraName: "久寿" },
    { start: 1158, end: 1165, dynasty: "平安時代", ruler: "二条天皇", eraName: "平治" },
    { start: 1165, end: 1168, dynasty: "平安時代", ruler: "六条天皇", eraName: "永万" },
    { start: 1168, end: 1180, dynasty: "平安時代", ruler: "高倉天皇", eraName: "仁安" },
    { start: 1180, end: 1185, dynasty: "平安時代", ruler: "安徳天皇", eraName: "治承" },
    { start: 1185, end: 1198, dynasty: "鎌倉時代", ruler: "源頼朝（鎌倉殿）", eraName: "文治" },
    { start: 1199, end: 1203, dynasty: "鎌倉時代", ruler: "源頼家", eraName: "正治" },
    { start: 1203, end: 1219, dynasty: "鎌倉時代", ruler: "源実朝", eraName: "建仁" },
    { start: 1219, end: 1333, dynasty: "鎌倉時代", ruler: "北条執権体制", eraName: "執権政治" },
    { start: 1333, end: 1336, dynasty: "建武の新政", ruler: "後醍醐天皇", eraName: "建武" },
    { start: 1336, end: 1358, dynasty: "室町時代", ruler: "足利尊氏", eraName: "暦応" },
    { start: 1358, end: 1367, dynasty: "室町時代", ruler: "足利義詮", eraName: "延文" },
    { start: 1368, end: 1394, dynasty: "室町時代", ruler: "足利義満", eraName: "応安" },
    { start: 1394, end: 1423, dynasty: "室町時代", ruler: "足利義持", eraName: "応永" },
    { start: 1423, end: 1425, dynasty: "室町時代", ruler: "足利義量", eraName: "応永" },
    { start: 1429, end: 1441, dynasty: "室町時代", ruler: "足利義教", eraName: "永享" },
    { start: 1442, end: 1443, dynasty: "室町時代", ruler: "足利義勝", eraName: "嘉吉" },
    { start: 1449, end: 1473, dynasty: "室町時代", ruler: "足利義政", eraName: "文安" },
    { start: 1473, end: 1489, dynasty: "室町時代", ruler: "足利義尚", eraName: "文明" },
    { start: 1490, end: 1493, dynasty: "室町時代", ruler: "足利義材", eraName: "延徳" },
    { start: 1508, end: 1521, dynasty: "室町時代", ruler: "足利義稙", eraName: "永正" },
    { start: 1521, end: 1546, dynasty: "室町時代", ruler: "足利義晴", eraName: "大永" },
    { start: 1546, end: 1565, dynasty: "室町時代", ruler: "足利義輝", eraName: "天文" },
    { start: 1568, end: 1573, dynasty: "室町時代", ruler: "足利義昭", eraName: "永禄" },
    { start: 1573, end: 1582, dynasty: "安土桃山時代", ruler: "織田信長", eraName: "天正" },
    { start: 1582, end: 1598, dynasty: "安土桃山時代", ruler: "豊臣秀吉", eraName: "天正" },
    { start: 1598, end: 1603, dynasty: "安土桃山時代", ruler: "豊臣秀頼", eraName: "慶長" },
    { start: 1603, end: 1605, dynasty: "江戸時代", ruler: "徳川家康", eraName: "慶長" },
    { start: 1605, end: 1623, dynasty: "江戸時代", ruler: "徳川秀忠", eraName: "慶長" },
    { start: 1623, end: 1651, dynasty: "江戸時代", ruler: "徳川家光", eraName: "元和" },
    { start: 1651, end: 1680, dynasty: "江戸時代", ruler: "徳川家綱", eraName: "慶安" },
    { start: 1680, end: 1709, dynasty: "江戸時代", ruler: "徳川綱吉", eraName: "天和" },
    { start: 1709, end: 1712, dynasty: "江戸時代", ruler: "徳川家宣", eraName: "宝永" },
    { start: 1713, end: 1716, dynasty: "江戸時代", ruler: "徳川家継", eraName: "正徳" },
    { start: 1716, end: 1745, dynasty: "江戸時代", ruler: "徳川吉宗", eraName: "享保" },
    { start: 1745, end: 1760, dynasty: "江戸時代", ruler: "徳川家重", eraName: "延享" },
    { start: 1760, end: 1786, dynasty: "江戸時代", ruler: "徳川家治", eraName: "宝暦" },
    { start: 1787, end: 1837, dynasty: "江戸時代", ruler: "徳川家斉", eraName: "天明" },
    { start: 1837, end: 1853, dynasty: "江戸時代", ruler: "徳川家慶", eraName: "天保" },
    { start: 1853, end: 1858, dynasty: "江戸時代", ruler: "徳川家定", eraName: "嘉永" },
    { start: 1858, end: 1866, dynasty: "江戸時代", ruler: "徳川家茂", eraName: "安政" },
    { start: 1866, end: 1868, dynasty: "江戸時代", ruler: "徳川慶喜", eraName: "慶応" },
    { start: 1868, end: 1912, dynasty: "大日本帝国", ruler: "明治天皇", eraName: "明治" },
    { start: 1912, end: 1926, dynasty: "大日本帝国", ruler: "大正天皇", eraName: "大正" },
    { start: 1926, end: 1989, dynasty: "日本", ruler: "昭和天皇", eraName: "昭和" },
    { start: 1989, end: 2019, dynasty: "日本", ruler: "上皇（平成）", eraName: "平成" },
    { start: 2019, end: 2099, dynasty: "日本", ruler: "今上天皇（令和）", eraName: "令和" }
  ];

  var REIGN_CONFIG = {
    minYear: 794,
    fallback: {
      beforeMin: { dynasty: "古代", title: "奈良時代以前", subtitle: "本年表は平安時代から始まります", note: "平安時代以前のデータは未対応です。", showRuler: false },
      notFound: { dynasty: "日本", title: "データなし", subtitle: "", note: "この年のデータはありません。", showRuler: false },
      generalNote: "日本の歴史年表。",
      dynastyMinYear: 794,
      dynastyBeforeMin: { label: "古代", yearText: "奈良時代以前" },
      noEraText: "__NONE__",
      regnalTemplate: "{era}{year}年",
      noEraTemplate: "在位第{year}年",
      dynastyRegnalTemplate: "{era} · 第{year}年"
    }
  };

  var DETAIL_LIBRARY = {
    "織田信長": {
      lifespan: "1534年6月23日 - 1582年6月21日",
      reign: "1573年 - 1582年",
      era: "天正",
      summary: "戦国時代の革新者であり、室町幕府を滅ぼして天下統一への道を切り開いた。楽市楽座や鉄砲の大量運用など、従来の常識を覆す政策と戦術で知られる。本能寺の変で明智光秀に討たれた。",
      events: [
        { period: "1560年", text: "桶狭間の戦いで今川義元を破り、一躍天下の注目を集めた。" },
        { period: "1573年", text: "足利義昭を追放し、室町幕府を事実上滅亡させた。" },
        { period: "1582年", text: "本能寺の変で明智光秀に襲撃され、自害した。" }
      ],
      wars: [
        { period: "1575年", text: "長篠の戦いで武田勝頼を破り、鉄砲戦術の威力を示した。" },
        { period: "1570年代", text: "石山本願寺との十年戦争は最も困難な戦いの一つだった。" }
      ],
      calamities: [
        { period: "1571年", text: "比叡山延暦寺の焼き討ちは宗教勢力への徹底的な弾圧として知られる。" },
        { period: "1582年", text: "本能寺の変により統一事業は中断を余儀なくされた。" }
      ]
    },
    "豊臣秀吉": {
      lifespan: "1537年3月17日 - 1598年9月18日",
      reign: "1582年 - 1598年",
      era: "天正・文禄・慶長",
      summary: "農民から天下人にまで上り詰めた日本史上最も劇的な立身出世の人物。信長の事業を継承して天下統一を達成し、太閤検地や刀狩りなど近世社会の基盤を築いた。晩年の朝鮮出兵は大きな負担を残した。",
      events: [
        { period: "1582年", text: "山崎の戦いで明智光秀を討ち、信長の後継者としての地位を確立。" },
        { period: "1590年", text: "小田原征伐により北条氏を滅ぼし、天下統一を達成した。" },
        { period: "1588年", text: "刀狩令を発布し、武士と農民の身分を固定化した。" }
      ],
      wars: [
        { period: "1592年", text: "文禄の役：朝鮮半島への大規模出兵を開始。" },
        { period: "1597年", text: "慶長の役：二度目の朝鮮出兵。秀吉の死により撤退。" }
      ],
      calamities: [
        { period: "1592-1598年", text: "朝鮮出兵は膨大な人的・財政的負担を生み、豊臣政権弱体化の一因となった。" },
        { period: "1598年", text: "秀吉の死後、家臣団の対立が激化し関ヶ原の戦いへとつながった。" }
      ]
    },
    "徳川家康": {
      lifespan: "1543年1月31日 - 1616年6月1日",
      reign: "1603年 - 1605年（将軍在位）",
      era: "慶長",
      summary: "関ヶ原の戦いに勝利して江戸幕府を開き、約260年にわたる太平の世の礎を築いた。忍耐と長期的な戦略眼で知られ、日本史上最も成功した政治家の一人。",
      events: [
        { period: "1600年", text: "関ヶ原の戦いで西軍を破り、天下の実権を掌握した。" },
        { period: "1603年", text: "征夷大将軍に任命され、江戸幕府を開いた。" },
        { period: "1615年", text: "大坂夏の陣で豊臣氏を滅ぼし、徳川の天下を確定した。" }
      ],
      wars: [
        { period: "1600年", text: "関ヶ原の戦いは日本の歴史を決定づけた天下分け目の合戦。" },
        { period: "1614-1615年", text: "大坂冬の陣・夏の陣で豊臣家を滅亡させた。" }
      ],
      calamities: [
        { period: "1600年代初頭", text: "キリシタン禁制を強化し、宗教弾圧が本格化した。" }
      ]
    },
    "徳川家光": {
      lifespan: "1604年8月12日 - 1651年6月8日",
      reign: "1623年 - 1651年",
      era: "元和・寛永",
      summary: "三代将軍として幕藩体制を確立し、参勤交代を制度化した。鎖国政策を完成させ、以後200年以上にわたる日本の対外的閉鎖体制を決定づけた。",
      events: [
        { period: "1635年", text: "参勤交代を制度化し、大名統制を強化した。" },
        { period: "1639年", text: "ポルトガル船の来航を禁止し、鎖国体制を完成させた。" }
      ],
      wars: [
        { period: "1637-1638年", text: "島原の乱を鎮圧。キリシタン弾圧と鎖国の契機となった。" }
      ],
      calamities: [
        { period: "1637-1638年", text: "島原の乱は幕府にとって最大規模の内戦となった。" }
      ]
    },
    "徳川吉宗": {
      lifespan: "1684年11月27日 - 1751年7月12日",
      reign: "1716年 - 1745年",
      era: "享保",
      summary: "「享保の改革」で知られる八代将軍。財政再建と法制度整備に取り組み、「米将軍」の異名を持つ。実学の奨励や目安箱の設置など、幕政の立て直しに大きな功績を残した。",
      events: [
        { period: "1716年", text: "紀州藩主から将軍に就任。享保の改革を開始した。" },
        { period: "1721年", text: "目安箱を設置し、庶民の声を直接聞く制度を作った。" },
        { period: "1742年", text: "公事方御定書を制定し、刑事法の整備を進めた。" }
      ],
      wars: [],
      calamities: [
        { period: "1732年", text: "享保の大飢饉は西日本を中心に大きな被害をもたらした。" }
      ]
    },
    "徳川慶喜": {
      lifespan: "1837年10月28日 - 1913年11月22日",
      reign: "1866年 - 1868年",
      era: "慶応",
      summary: "江戸幕府最後の将軍。大政奉還により政権を朝廷に返上し、260年余りの幕府体制に終止符を打った。戊辰戦争での判断は賛否が分かれるが、大規模な内戦を回避した側面もある。",
      events: [
        { period: "1867年", text: "大政奉還を行い、徳川幕府の統治を終結させた。" },
        { period: "1868年", text: "鳥羽・伏見の戦いで敗北後、江戸に退いた。" },
        { period: "1868年", text: "江戸城無血開城により、大規模な市街戦を回避した。" }
      ],
      wars: [
        { period: "1868年", text: "戊辰戦争の初戦で旧幕府軍は敗退した。" }
      ],
      calamities: [
        { period: "1867-1868年", text: "幕末の動乱は社会秩序を大きく揺るがした。" }
      ]
    },
    "明治天皇": {
      lifespan: "1852年11月3日 - 1912年7月30日",
      reign: "1868年 - 1912年",
      era: "明治",
      summary: "近代日本の象徴的君主。明治維新のもとで封建制から近代国家への大転換が行われ、憲法制定、議会開設、産業革命、そして日清・日露戦争の勝利により、日本は世界の列強の仲間入りを果たした。",
      events: [
        { period: "1868年", text: "明治維新により封建制が廃止され、近代化が始まった。" },
        { period: "1889年", text: "大日本帝国憲法が発布された。" },
        { period: "1890年", text: "第一回帝国議会が開催された。" }
      ],
      wars: [
        { period: "1894-1895年", text: "日清戦争に勝利し、台湾を獲得した。" },
        { period: "1904-1905年", text: "日露戦争に勝利し、日本は世界的な大国として認められた。" }
      ],
      calamities: [
        { period: "1877年", text: "西南戦争は明治政府にとって最大の内戦だった。" },
        { period: "1880年代", text: "急速な近代化に伴う社会的混乱と民権運動の高まり。" }
      ]
    },
    "大正天皇": {
      lifespan: "1879年8月31日 - 1926年12月25日",
      reign: "1912年 - 1926年",
      era: "大正",
      summary: "大正デモクラシーの時代の天皇。政党政治の発展や大衆文化の開花が見られた一方、天皇自身は健康問題に悩まされ、晩年は摂政（後の昭和天皇）が政務を代行した。",
      events: [
        { period: "1912年", text: "明治天皇の崩御により即位。" },
        { period: "1918年", text: "米騒動が全国に拡大し、初の本格的政党内閣が誕生。" },
        { period: "1923年", text: "関東大震災が首都圏を壊滅的に破壊した。" }
      ],
      wars: [
        { period: "1914-1918年", text: "第一次世界大戦に連合国側で参戦。" }
      ],
      calamities: [
        { period: "1923年", text: "関東大震災は10万人以上の死者を出す大災害となった。" }
      ]
    },
    "昭和天皇": {
      lifespan: "1901年4月29日 - 1989年1月7日",
      reign: "1926年 - 1989年",
      era: "昭和",
      summary: "日本史上最も激動の時代を生きた天皇。軍国主義の台頭、第二次世界大戦と敗戦、そして奇跡的な経済復興と高度成長を経験した。戦後は象徴天皇として国民統合の役割を果たした。",
      events: [
        { period: "1926年", text: "大正天皇の崩御により即位。昭和の時代が始まった。" },
        { period: "1945年", text: "玉音放送で終戦を国民に告げた。" },
        { period: "1964年", text: "東京オリンピック開催。日本の戦後復興を世界に示した。" }
      ],
      wars: [
        { period: "1937-1945年", text: "日中戦争から太平洋戦争へ。日本は壊滅的な敗北を喫した。" },
        { period: "1941年", text: "真珠湾攻撃により太平洋戦争が開始された。" }
      ],
      calamities: [
        { period: "1945年", text: "広島・長崎への原爆投下、東京大空襲など、未曾有の被害を受けた。" },
        { period: "1945年", text: "敗戦と占領。日本は主権を一時的に喪失した。" }
      ]
    },
    "今上天皇（令和）": {
      lifespan: "1960年2月23日 -",
      reign: "2019年 -",
      era: "令和",
      summary: "第126代天皇。「令和」の元号のもと、災害や感染症の危機に際して国民に寄り添う姿勢を示している。水問題の研究者としても知られる。",
      events: [
        { period: "2019年", text: "父・上皇の退位により即位。「令和」の時代が始まった。" },
        { period: "2020年", text: "COVID-19パンデミックの中、国民へのメッセージを発信。" }
      ],
      wars: [],
      calamities: [
        { period: "2020-2021年", text: "COVID-19パンデミックは日本社会に大きな影響を与えた。" }
      ]
    }
  };

  var DYNASTY_DETAIL_LIBRARY = {
    "平安時代": {
      summary: "794年から1185年まで続いた貴族文化の黄金時代。かな文字の発達、源氏物語などの文学、藤原氏の摂関政治が特徴。末期には武士の台頭が始まった。",
      events: ["藤原道長による摂関政治の全盛期。", "『源氏物語』『枕草子』など世界的文学が誕生。"],
      wars: ["前九年の役・後三年の役で武士が台頭。", "源平合戦により平安時代は終焉を迎えた。"],
      calamities: ["平安末期の飢饉と疫病。", "保元・平治の乱による政治的混乱。"]
    },
    "鎌倉時代": {
      summary: "1185年から1333年まで続いた日本初の武家政権。源頼朝が開いた鎌倉幕府は御家人制度を基盤とし、北条氏の執権政治のもとで安定した統治を行った。",
      events: ["源頼朝が征夷大将軍に就任。", "北条泰時が御成敗式目を制定。"],
      wars: ["元寇（1274年・1281年）を撃退。", "承久の乱で幕府が朝廷に勝利。"],
      calamities: ["元寇後の財政困難が幕府弱体化の一因。", "永仁の徳政令など経済的混乱。"]
    },
    "建武の新政": {
      summary: "後醍醐天皇による短期間の天皇親政。鎌倉幕府滅亡後の政治再編は失敗に終わり、南北朝の分裂を招いた。",
      events: ["鎌倉幕府滅亡後、後醍醐天皇が親政を開始。"],
      wars: ["足利尊氏の離反により新政は崩壊。"],
      calamities: ["南北朝分裂による政治的混乱が始まった。"]
    },
    "室町時代": {
      summary: "1336年から1573年まで続いた足利幕府の時代。北山文化・東山文化が花開いた一方、応仁の乱以降は戦国時代へと突入した。",
      events: ["足利義満による南北朝合一。", "金閣・銀閣に象徴される室町文化。"],
      wars: ["応仁の乱（1467-1477年）が戦国時代の幕を開けた。"],
      calamities: ["応仁の乱による京都の荒廃。", "下剋上の風潮が社会秩序を動揺させた。"]
    },
    "安土桃山時代": {
      summary: "織田信長と豊臣秀吉による天下統一の時代。壮麗な城郭文化が花開き、南蛮貿易やキリスト教の伝来など、国際的な交流も活発だった。",
      events: ["織田信長の天下布武。", "豊臣秀吉の天下統一と太閤検地。"],
      wars: ["長篠の戦い、関ヶ原の戦いなど数々の合戦。", "朝鮮出兵（文禄・慶長の役）。"],
      calamities: ["朝鮮出兵の失敗と豊臣政権の動揺。", "キリシタン迫害の始まり。"]
    },
    "江戸時代": {
      summary: "1603年から1868年まで約260年続いた徳川幕府の時代。鎖国政策のもとで独自の文化が発展し、長期にわたる平和と安定を実現した。元禄文化や化政文化が花開いた。",
      events: ["参勤交代・鎖国体制の確立。", "元禄文化と化政文化の繁栄。"],
      wars: ["島原の乱以降、大きな戦争のない太平の世が続いた。"],
      calamities: ["天明の大飢饉、天保の大飢饉など周期的な飢饉。", "ペリー来航による幕末の動乱。"]
    },
    "大日本帝国": {
      summary: "明治維新から第二次世界大戦の敗戦まで。急速な近代化と帝国主義的拡大を経て、最終的には壊滅的な敗北を迎えた。",
      events: ["明治維新と急速な近代化。", "大日本帝国憲法の制定と議会政治の開始。"],
      wars: ["日清戦争、日露戦争、第一次世界大戦、太平洋戦争。"],
      calamities: ["原爆投下と敗戦。", "関東大震災。"]
    },
    "日本": {
      summary: "戦後の日本国。新憲法のもとで民主主義と平和主義を国是とし、奇跡的な経済復興を遂げて世界第二の経済大国となった。",
      events: ["日本国憲法の施行。", "東京オリンピック（1964年）と高度経済成長。"],
      wars: ["戦後は平和憲法のもと、直接的な戦争参加はなし。"],
      calamities: ["バブル崩壊と失われた30年。", "阪神大震災、東日本大震災、COVID-19パンデミック。"]
    }
  };

  window.XUAN_HISTORY_JP = {
    reignPeriods: REIGN_PERIODS,
    reignConfig: REIGN_CONFIG,
    detailLibrary: DETAIL_LIBRARY,
    dynastyDetailLibrary: DYNASTY_DETAIL_LIBRARY
  };
})();
