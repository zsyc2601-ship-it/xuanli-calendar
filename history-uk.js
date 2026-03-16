(function () {
  "use strict";

  var REIGN_PERIODS = [
    { start: 1066, end: 1087, dynasty: "Norman", ruler: "William the Conqueror", eraName: "King" },
    { start: 1087, end: 1100, dynasty: "Norman", ruler: "William II", eraName: "King" },
    { start: 1100, end: 1135, dynasty: "Norman", ruler: "Henry I", eraName: "King" },
    { start: 1135, end: 1154, dynasty: "Norman", ruler: "Stephen", eraName: "King" },
    { start: 1154, end: 1189, dynasty: "Plantagenet", ruler: "Henry II", eraName: "King" },
    { start: 1189, end: 1199, dynasty: "Plantagenet", ruler: "Richard I", eraName: "King" },
    { start: 1199, end: 1216, dynasty: "Plantagenet", ruler: "John", eraName: "King" },
    { start: 1216, end: 1272, dynasty: "Plantagenet", ruler: "Henry III", eraName: "King" },
    { start: 1272, end: 1307, dynasty: "Plantagenet", ruler: "Edward I", eraName: "King" },
    { start: 1307, end: 1327, dynasty: "Plantagenet", ruler: "Edward II", eraName: "King" },
    { start: 1327, end: 1377, dynasty: "Plantagenet", ruler: "Edward III", eraName: "King" },
    { start: 1377, end: 1399, dynasty: "Plantagenet", ruler: "Richard II", eraName: "King" },
    { start: 1399, end: 1413, dynasty: "Lancaster", ruler: "Henry IV", eraName: "King" },
    { start: 1413, end: 1422, dynasty: "Lancaster", ruler: "Henry V", eraName: "King" },
    { start: 1422, end: 1461, dynasty: "Lancaster", ruler: "Henry VI", eraName: "King" },
    { start: 1461, end: 1470, dynasty: "York", ruler: "Edward IV", eraName: "King" },
    { start: 1470, end: 1471, dynasty: "Lancaster", ruler: "Henry VI (Restored)", eraName: "King" },
    { start: 1471, end: 1483, dynasty: "York", ruler: "Edward IV", eraName: "King" },
    { start: 1483, end: 1483, dynasty: "York", ruler: "Edward V", eraName: "King" },
    { start: 1483, end: 1485, dynasty: "York", ruler: "Richard III", eraName: "King" },
    { start: 1485, end: 1509, dynasty: "Tudor", ruler: "Henry VII", eraName: "King" },
    { start: 1509, end: 1547, dynasty: "Tudor", ruler: "Henry VIII", eraName: "King" },
    { start: 1547, end: 1553, dynasty: "Tudor", ruler: "Edward VI", eraName: "King" },
    { start: 1553, end: 1558, dynasty: "Tudor", ruler: "Mary I", eraName: "Queen" },
    { start: 1558, end: 1603, dynasty: "Tudor", ruler: "Elizabeth I", eraName: "Queen" },
    { start: 1603, end: 1625, dynasty: "Stuart", ruler: "James I", eraName: "King" },
    { start: 1625, end: 1649, dynasty: "Stuart", ruler: "Charles I", eraName: "King" },
    { start: 1649, end: 1658, dynasty: "Commonwealth", ruler: "Oliver Cromwell", eraName: "Lord Protector" },
    { start: 1658, end: 1659, dynasty: "Commonwealth", ruler: "Richard Cromwell", eraName: "Lord Protector" },
    { start: 1660, end: 1685, dynasty: "Stuart", ruler: "Charles II", eraName: "King" },
    { start: 1685, end: 1688, dynasty: "Stuart", ruler: "James II", eraName: "King" },
    { start: 1689, end: 1702, dynasty: "Stuart", ruler: "William III & Mary II", eraName: "King & Queen" },
    { start: 1702, end: 1714, dynasty: "Stuart", ruler: "Anne", eraName: "Queen" },
    { start: 1714, end: 1727, dynasty: "Hanover", ruler: "George I", eraName: "King" },
    { start: 1727, end: 1760, dynasty: "Hanover", ruler: "George II", eraName: "King" },
    { start: 1760, end: 1820, dynasty: "Hanover", ruler: "George III", eraName: "King" },
    { start: 1820, end: 1830, dynasty: "Hanover", ruler: "George IV", eraName: "King" },
    { start: 1830, end: 1837, dynasty: "Hanover", ruler: "William IV", eraName: "King" },
    { start: 1837, end: 1901, dynasty: "Hanover", ruler: "Victoria", eraName: "Queen" },
    { start: 1901, end: 1910, dynasty: "Saxe-Coburg and Gotha", ruler: "Edward VII", eraName: "King" },
    { start: 1910, end: 1936, dynasty: "Windsor", ruler: "George V", eraName: "King" },
    { start: 1936, end: 1936, dynasty: "Windsor", ruler: "Edward VIII", eraName: "King" },
    { start: 1936, end: 1952, dynasty: "Windsor", ruler: "George VI", eraName: "King" },
    { start: 1952, end: 2022, dynasty: "Windsor", ruler: "Elizabeth II", eraName: "Queen" },
    { start: 2022, end: 2099, dynasty: "Windsor", ruler: "Charles III", eraName: "King" }
  ];

  var REIGN_CONFIG = {
    minYear: 1066,
    fallback: {
      beforeMin: { dynasty: "Pre-Norman", title: "Anglo-Saxon Period", subtitle: "Before the Norman Conquest", note: "This timeline begins with William the Conqueror in 1066.", showRuler: false },
      notFound: { dynasty: "United Kingdom", title: "No data", subtitle: "", note: "No monarchical data for this year.", showRuler: false },
      generalNote: "British monarchical history.",
      dynastyMinYear: 1066,
      dynastyBeforeMin: { label: "Pre-Norman", yearText: "Anglo-Saxon Period" },
      noEraText: "__NONE__",
      regnalTemplate: "{era} · Year {year}",
      noEraTemplate: "Year {year} of reign",
      dynastyRegnalTemplate: "{era} · Year {year}"
    }
  };

  var DETAIL_LIBRARY = {
    "William the Conqueror": {
      lifespan: "c. 1028 – Sep 9, 1087",
      reign: "1066–1087",
      era: "Norman",
      summary: "Duke of Normandy who conquered England in 1066, fundamentally transforming its political, social, and linguistic landscape. He commissioned the Domesday Book and established Norman feudal rule across England.",
      events: [
        { period: "1066", text: "Won the Battle of Hastings and was crowned King of England on Christmas Day." },
        { period: "1069–1070", text: "The Harrying of the North: brutal suppression of Anglo-Saxon resistance." },
        { period: "1086", text: "Commissioned the Domesday Book, a comprehensive survey of English landholdings." }
      ],
      wars: [
        { period: "1066", text: "The Norman Conquest decisively defeated Anglo-Saxon England at Hastings." }
      ],
      calamities: [
        { period: "1069–1070", text: "The Harrying of the North devastated northern England, causing widespread famine and death." }
      ]
    },
    "Henry II": {
      lifespan: "Mar 5, 1133 – Jul 6, 1189",
      reign: "1154–1189",
      era: "Plantagenet",
      summary: "First Plantagenet king who restored order after The Anarchy. He reformed English law and created the foundations of common law, but clashed famously with Thomas Becket.",
      events: [
        { period: "1154", text: "Became king, ending The Anarchy and restoring strong royal governance." },
        { period: "1166", text: "Assize of Clarendon established key principles of English common law." },
        { period: "1170", text: "Murder of Thomas Becket in Canterbury Cathedral shocked Christendom." }
      ],
      wars: [
        { period: "1159–1189", text: "Continuous campaigns to maintain the vast Angevin Empire across France." }
      ],
      calamities: [
        { period: "1173–1174", text: "The Great Revolt: his own sons rebelled against him with French support." }
      ]
    },
    "Richard I": {
      lifespan: "Sep 8, 1157 – Apr 6, 1199",
      reign: "1189–1199",
      era: "Plantagenet",
      summary: "Known as Richard the Lionheart, he spent most of his reign on crusade or fighting in France. A legendary warrior-king who barely set foot in England.",
      events: [
        { period: "1189", text: "Launched the Third Crusade shortly after becoming king." },
        { period: "1191", text: "Captured Acre and won the Battle of Arsuf against Saladin." },
        { period: "1192–1194", text: "Captured and held for ransom by Duke Leopold of Austria and Emperor Henry VI." }
      ],
      wars: [
        { period: "1189–1192", text: "The Third Crusade: iconic battles but failed to recapture Jerusalem." }
      ],
      calamities: [
        { period: "1192–1194", text: "His captivity required an enormous ransom that heavily burdened England." }
      ]
    },
    "Edward I": {
      lifespan: "Jun 17, 1239 – Jul 7, 1307",
      reign: "1272–1307",
      era: "Plantagenet",
      summary: "The 'Hammer of the Scots' who conquered Wales, attempted to subjugate Scotland, and reformed English law and parliament. A formidable administrator and warrior-king.",
      events: [
        { period: "1282–1283", text: "Conquered Wales and built a ring of imposing castles to secure control." },
        { period: "1290", text: "Expelled all Jews from England — they would not return for over 350 years." },
        { period: "1295", text: "Summoned the Model Parliament, setting a precedent for parliamentary representation." }
      ],
      wars: [
        { period: "1296–1307", text: "Wars of Scottish Independence against William Wallace and Robert the Bruce." }
      ],
      calamities: [
        { period: "1290", text: "The Edict of Expulsion forced all Jews out of England." }
      ]
    },
    "Edward III": {
      lifespan: "Nov 13, 1312 – Jun 21, 1377",
      reign: "1327–1377",
      era: "Plantagenet",
      summary: "One of the most successful medieval English kings, whose claim to the French throne launched the Hundred Years' War. His reign saw great military triumphs but also the catastrophic Black Death.",
      events: [
        { period: "1337", text: "Claimed the French throne, beginning the Hundred Years' War." },
        { period: "1346", text: "Decisive English victory at the Battle of Crécy." },
        { period: "1348–1349", text: "The Black Death killed an estimated 30–50% of England's population." }
      ],
      wars: [
        { period: "1337–1377", text: "The Hundred Years' War dominated his reign with major victories at Crécy and Poitiers." }
      ],
      calamities: [
        { period: "1348–1349", text: "The Black Death was the worst demographic catastrophe in English history." }
      ]
    },
    "Henry V": {
      lifespan: "Sep 16, 1386 – Aug 31, 1422",
      reign: "1413–1422",
      era: "Lancaster",
      summary: "The warrior-king who won the legendary Battle of Agincourt and came close to uniting the crowns of England and France. His early death left an infant heir and an unstable dual monarchy.",
      events: [
        { period: "1415", text: "Won the stunning victory at the Battle of Agincourt against overwhelming odds." },
        { period: "1420", text: "The Treaty of Troyes made him heir to the French throne." },
        { period: "1422", text: "Died of dysentery at age 35, leaving nine-month-old Henry VI as king." }
      ],
      wars: [
        { period: "1415–1422", text: "Renewed the Hundred Years' War with spectacular success." }
      ],
      calamities: [
        { period: "1422", text: "His early death unraveled his achievements and led to decades of instability." }
      ]
    },
    "Henry VIII": {
      lifespan: "Jun 28, 1491 – Jan 28, 1547",
      reign: "1509–1547",
      era: "Tudor",
      summary: "Perhaps England's most famous king, Henry VIII broke with Rome to annul his first marriage, establishing the Church of England. He married six wives and transformed England's religious and political landscape forever.",
      events: [
        { period: "1534", text: "The Act of Supremacy established the King as head of the Church of England." },
        { period: "1536–1541", text: "Dissolution of the Monasteries transferred vast Church wealth to the Crown." },
        { period: "1509–1547", text: "Married six wives: Catherine of Aragon, Anne Boleyn, Jane Seymour, Anne of Cleves, Catherine Howard, Catherine Parr." }
      ],
      wars: [
        { period: "1513", text: "Battle of Flodden: a decisive English victory over Scotland." },
        { period: "1543–1546", text: "Wars with France and Scotland in the final years of his reign." }
      ],
      calamities: [
        { period: "1536", text: "The Pilgrimage of Grace: a major northern rebellion against religious reforms." },
        { period: "1536–1541", text: "The destruction of monasteries devastated charitable and educational institutions." }
      ]
    },
    "Elizabeth I": {
      lifespan: "Sep 7, 1533 – Mar 24, 1603",
      reign: "1558–1603",
      era: "Tudor",
      summary: "The 'Virgin Queen' whose 45-year reign is considered a golden age of English culture, exploration, and naval power. She established a moderate religious settlement and defeated the Spanish Armada.",
      events: [
        { period: "1559", text: "The Elizabethan Religious Settlement established a moderate Protestant church." },
        { period: "1588", text: "Defeated the Spanish Armada, securing England's independence and naval supremacy." },
        { period: "1600", text: "Chartered the East India Company, laying foundations of the British Empire." }
      ],
      wars: [
        { period: "1585–1604", text: "The Anglo-Spanish War, culminating in the defeat of the Armada." }
      ],
      calamities: [
        { period: "1587", text: "Execution of Mary, Queen of Scots created diplomatic tensions." },
        { period: "1594–1603", text: "The Nine Years' War in Ireland proved costly and difficult to resolve." }
      ]
    },
    "James I": {
      lifespan: "Jun 19, 1566 – Mar 27, 1625",
      reign: "1603–1625",
      era: "Stuart",
      summary: "United the crowns of England and Scotland. His reign saw the King James Bible, the Gunpowder Plot, and the founding of Jamestown — England's first permanent American settlement.",
      events: [
        { period: "1605", text: "The Gunpowder Plot: a failed Catholic conspiracy to blow up Parliament." },
        { period: "1607", text: "Founding of Jamestown, Virginia — the first permanent English settlement in America." },
        { period: "1611", text: "Publication of the King James Bible." }
      ],
      wars: [
        { period: "1603–1625", text: "Pursued peace policies, ending the Anglo-Spanish War in 1604." }
      ],
      calamities: [
        { period: "1605", text: "The Gunpowder Plot exposed deep religious divisions in English society." }
      ]
    },
    "Charles I": {
      lifespan: "Nov 19, 1600 – Jan 30, 1649",
      reign: "1625–1649",
      era: "Stuart",
      summary: "His belief in the divine right of kings led to a fatal conflict with Parliament, triggering the English Civil War. He was tried and executed — the only English monarch to be formally put to death.",
      events: [
        { period: "1629–1640", text: "Personal Rule: governed without Parliament for eleven years." },
        { period: "1642", text: "Raised his standard at Nottingham, beginning the English Civil War." },
        { period: "1649", text: "Tried for treason and executed at Whitehall on January 30." }
      ],
      wars: [
        { period: "1642–1649", text: "The English Civil War between Royalists and Parliamentarians." }
      ],
      calamities: [
        { period: "1642–1649", text: "The Civil War killed an estimated 200,000 people in England alone." }
      ]
    },
    "Oliver Cromwell": {
      lifespan: "Apr 25, 1599 – Sep 3, 1658",
      reign: "1653–1658",
      era: "Commonwealth",
      summary: "Parliamentary military leader who defeated Charles I and became Lord Protector. He ruled as a military dictator, conquered Ireland with exceptional brutality, and remains one of England's most divisive historical figures.",
      events: [
        { period: "1649", text: "Instrumental in the trial and execution of Charles I." },
        { period: "1653", text: "Dissolved the Rump Parliament and became Lord Protector." },
        { period: "1658", text: "Died on September 3; the Protectorate collapsed soon after." }
      ],
      wars: [
        { period: "1649–1653", text: "Cromwellian conquest of Ireland caused massive death and displacement." },
        { period: "1650–1651", text: "Invaded Scotland and defeated Royalist forces." }
      ],
      calamities: [
        { period: "1649–1653", text: "The conquest of Ireland killed or displaced perhaps a third of the Irish population." }
      ]
    },
    "Charles II": {
      lifespan: "May 29, 1630 – Feb 6, 1685",
      reign: "1660–1685",
      era: "Stuart",
      summary: "The 'Merry Monarch' whose restoration ended the republican experiment. His reign saw the Great Plague, the Great Fire of London, and the growth of English colonial and commercial power.",
      events: [
        { period: "1660", text: "The Restoration: returned from exile to reclaim the throne." },
        { period: "1665", text: "The Great Plague killed an estimated 100,000 Londoners." },
        { period: "1666", text: "The Great Fire of London destroyed much of the medieval city." }
      ],
      wars: [
        { period: "1665–1667", text: "Second Anglo-Dutch War over trade and colonial rivalry." }
      ],
      calamities: [
        { period: "1665–1666", text: "Plague and fire devastated London in successive years." }
      ]
    },
    "William III & Mary II": {
      lifespan: "William: Nov 14, 1650 – Mar 8, 1702; Mary: Apr 30, 1662 – Dec 28, 1694",
      reign: "1689–1702",
      era: "Stuart",
      summary: "The Glorious Revolution of 1688 brought them to power, establishing parliamentary sovereignty through the Bill of Rights. Their reign laid the foundations of constitutional monarchy.",
      events: [
        { period: "1688", text: "The Glorious Revolution: James II fled and William and Mary were invited to rule." },
        { period: "1689", text: "The English Bill of Rights established parliamentary supremacy and individual liberties." },
        { period: "1694", text: "The Bank of England was founded; Mary II died of smallpox." }
      ],
      wars: [
        { period: "1689–1697", text: "The Nine Years' War against Louis XIV's France." }
      ],
      calamities: [
        { period: "1692", text: "The Massacre of Glencoe and continued Jacobite unrest in Scotland." }
      ]
    },
    "George III": {
      lifespan: "Jun 4, 1738 – Jan 29, 1820",
      reign: "1760–1820",
      era: "Hanover",
      summary: "The longest-reigning king before Victoria, his era saw the loss of the American colonies, the Napoleonic Wars, and the Industrial Revolution. His later years were marked by mental illness, leading to the Regency.",
      events: [
        { period: "1776", text: "The American colonies declared independence." },
        { period: "1801", text: "The Act of Union merged Britain and Ireland into the United Kingdom." },
        { period: "1811", text: "The Regency began as the King's mental illness made him unable to rule." }
      ],
      wars: [
        { period: "1775–1783", text: "The American Revolutionary War ended in the loss of the thirteen colonies." },
        { period: "1803–1815", text: "The Napoleonic Wars culminated in victory at Waterloo." }
      ],
      calamities: [
        { period: "1780s–1810s", text: "Recurrent episodes of mental illness (likely porphyria) incapacitated the King." }
      ]
    },
    "Victoria": {
      lifespan: "May 24, 1819 – Jan 22, 1901",
      reign: "1837–1901",
      era: "Hanover",
      summary: "The longest-reigning British monarch until Elizabeth II, her 63-year reign saw Britain become the world's preeminent imperial, industrial, and naval power. The Victorian era defined an age of progress, morality, and global expansion.",
      events: [
        { period: "1851", text: "The Great Exhibition showcased British industrial supremacy." },
        { period: "1876", text: "Proclaimed Empress of India, symbolising the height of Empire." },
        { period: "1837–1901", text: "Railways, telegraph, and urbanisation transformed British society." }
      ],
      wars: [
        { period: "1853–1856", text: "The Crimean War against Russia." },
        { period: "1899–1902", text: "The Second Boer War in South Africa." }
      ],
      calamities: [
        { period: "1845–1852", text: "The Great Irish Famine killed over a million and caused mass emigration." },
        { period: "1857", text: "The Indian Rebellion challenged British colonial rule." }
      ]
    },
    "Edward VII": {
      lifespan: "Nov 9, 1841 – May 6, 1910",
      reign: "1901–1910",
      era: "Saxe-Coburg and Gotha",
      summary: "The 'Uncle of Europe' whose diplomatic skills helped forge the Entente Cordiale with France. His short reign marked the transition from Victorian to modern Britain.",
      events: [
        { period: "1904", text: "The Entente Cordiale established a crucial alliance with France." },
        { period: "1901–1910", text: "Edwardian era saw growing social reform movements and imperial tensions." }
      ],
      wars: [
        { period: "1899–1902", text: "The Boer War concluded during his reign." }
      ],
      calamities: [
        { period: "1900s", text: "Growing awareness of poverty and inequality led to welfare reforms." }
      ]
    },
    "George V": {
      lifespan: "Jun 3, 1865 – Jan 20, 1936",
      reign: "1910–1936",
      era: "Windsor",
      summary: "Led Britain through World War I and the turbulent interwar years. Changed the royal house name from Saxe-Coburg and Gotha to Windsor during anti-German sentiment in 1917.",
      events: [
        { period: "1917", text: "Changed the royal house name to Windsor due to anti-German sentiment." },
        { period: "1918", text: "End of World War I; women over 30 gained the vote." },
        { period: "1932", text: "Began the tradition of the Royal Christmas broadcast." }
      ],
      wars: [
        { period: "1914–1918", text: "World War I killed nearly a million British soldiers." }
      ],
      calamities: [
        { period: "1914–1918", text: "The Great War devastated an entire generation." },
        { period: "1926", text: "The General Strike reflected deep economic and social divisions." }
      ]
    },
    "George VI": {
      lifespan: "Dec 14, 1895 – Feb 6, 1952",
      reign: "1936–1952",
      era: "Windsor",
      summary: "Became king unexpectedly after his brother's abdication. He led the nation through World War II and the beginning of decolonisation, becoming a symbol of courage during the Blitz.",
      events: [
        { period: "1936", text: "Became king after Edward VIII's abdication crisis." },
        { period: "1940–1941", text: "Remained in London during the Blitz, boosting national morale." },
        { period: "1947", text: "Indian independence marked the beginning of the end of Empire." }
      ],
      wars: [
        { period: "1939–1945", text: "World War II: Britain stood alone against Nazi Germany in 1940–1941." }
      ],
      calamities: [
        { period: "1940–1941", text: "The Blitz killed over 40,000 British civilians." },
        { period: "1945–1952", text: "Post-war austerity and the rapid dissolution of the British Empire." }
      ]
    },
    "Elizabeth II": {
      lifespan: "Apr 21, 1926 – Sep 8, 2022",
      reign: "1952–2022",
      era: "Windsor",
      summary: "The longest-reigning British monarch at 70 years, she oversaw the transformation of Britain from imperial power to modern nation, the Troubles in Northern Ireland, European integration and Brexit, and the digital revolution.",
      events: [
        { period: "1953", text: "Coronation was the first to be televised, watched by millions worldwide." },
        { period: "1997", text: "Hong Kong returned to China; death of Princess Diana caused national mourning." },
        { period: "2022", text: "Platinum Jubilee celebrated 70 years on the throne; died on September 8." }
      ],
      wars: [
        { period: "1982", text: "The Falklands War reasserted British sovereignty over the islands." }
      ],
      calamities: [
        { period: "1968–1998", text: "The Troubles in Northern Ireland caused decades of violence." },
        { period: "2020–2021", text: "The COVID-19 pandemic was the greatest public health crisis in generations." }
      ]
    },
    "Charles III": {
      lifespan: "Nov 14, 1948 –",
      reign: "2022–present",
      era: "Windsor",
      summary: "Became king at age 73 after the longest apprenticeship in British royal history. A lifelong advocate for environmental causes and architectural heritage, he acceded to the throne in a rapidly changing Britain.",
      events: [
        { period: "2022", text: "Acceded to the throne upon the death of Queen Elizabeth II on September 8." },
        { period: "2023", text: "Coronation at Westminster Abbey on May 6, 2023." }
      ],
      wars: [],
      calamities: [
        { period: "2022–present", text: "Navigating the monarchy's role in post-Brexit Britain amid cost-of-living pressures." }
      ]
    }
  };

  var DYNASTY_DETAIL_LIBRARY = {
    "Norman": {
      summary: "The Norman Conquest of 1066 replaced the Anglo-Saxon ruling class with a French-speaking Norman elite, transforming English governance, culture, and architecture.",
      events: ["The Domesday Book surveyed all of England.", "Norman castles and cathedrals reshaped the landscape."],
      wars: ["The conquest itself and suppression of Anglo-Saxon resistance."],
      calamities: ["The Harrying of the North devastated northern England."]
    },
    "Plantagenet": {
      summary: "The longest-ruling royal house (1154–1399) oversaw the development of common law, Parliament, and English national identity, as well as the Hundred Years' War.",
      events: ["Magna Carta (1215) limited royal power.", "The Black Death transformed society and labour."],
      wars: ["The Hundred Years' War with France began in 1337."],
      calamities: ["The Black Death killed 30–50% of the population."]
    },
    "Lancaster": {
      summary: "The Lancastrian kings ruled during the height of the Hundred Years' War and the descent into the Wars of the Roses.",
      events: ["Henry V's victories in France.", "Loss of French territories under Henry VI."],
      wars: ["The Hundred Years' War and the Wars of the Roses."],
      calamities: ["Civil war and dynastic instability dominated the period."]
    },
    "York": {
      summary: "The Yorkist kings emerged from the Wars of the Roses, ruling briefly before the Tudor victory at Bosworth Field.",
      events: ["Edward IV restored stability after Lancastrian defeat.", "The Princes in the Tower remain one of history's great mysteries."],
      wars: ["The Wars of the Roses concluded at Bosworth Field (1485)."],
      calamities: ["Dynastic murder and political instability marked the era."]
    },
    "Tudor": {
      summary: "The Tudor dynasty (1485–1603) saw the English Reformation, the defeat of the Spanish Armada, and a cultural golden age under Elizabeth I.",
      events: ["Henry VIII's break with Rome.", "The Elizabethan age of Shakespeare and exploration."],
      wars: ["Wars with France, Scotland, and Spain."],
      calamities: ["Religious upheaval and persecution under multiple Tudor monarchs."]
    },
    "Stuart": {
      summary: "The Stuart era (1603–1714) encompassed the union of English and Scottish crowns, the Civil War, the Glorious Revolution, and the foundation of constitutional monarchy.",
      events: ["The English Civil War and execution of Charles I.", "The Glorious Revolution and Bill of Rights."],
      wars: ["The Civil War, wars with the Dutch, and the Nine Years' War."],
      calamities: ["The Great Plague and Great Fire of London."]
    },
    "Commonwealth": {
      summary: "The only period without a monarch (1649–1660), when England was ruled as a republic under Oliver Cromwell's Protectorate.",
      events: ["Execution of Charles I in 1649.", "Cromwell became Lord Protector in 1653."],
      wars: ["The conquest of Ireland and Scotland."],
      calamities: ["Religious intolerance and military dictatorship defined the period."]
    },
    "Hanover": {
      summary: "The Hanoverian era (1714–1901) saw Britain become the world's greatest imperial and industrial power, encompassing the Napoleonic Wars, the Industrial Revolution, and the Victorian age.",
      events: ["The American Revolution, the Act of Union with Ireland, and the Great Exhibition.", "The Victorian era transformed global culture."],
      wars: ["The Napoleonic Wars and numerous colonial conflicts."],
      calamities: ["The Irish Famine and the human costs of industrialisation and empire."]
    },
    "Saxe-Coburg and Gotha": {
      summary: "A brief royal house name (1901–1917) covering the Edwardian era and the beginning of World War I.",
      events: ["The Entente Cordiale with France.", "Beginning of the welfare state."],
      wars: ["World War I began in 1914."],
      calamities: ["The catastrophic losses of World War I."]
    },
    "Windsor": {
      summary: "The House of Windsor (1917–present) has guided Britain through two world wars, decolonisation, European integration, and into the modern era.",
      events: ["Victory in World War II.", "Decolonisation and entry into the European Community."],
      wars: ["World War II, the Falklands War, and interventions in the Middle East."],
      calamities: ["The Blitz, the Troubles, the COVID-19 pandemic, and post-Brexit uncertainty."]
    }
  };

  window.XUAN_HISTORY_UK = {
    reignPeriods: REIGN_PERIODS,
    reignConfig: REIGN_CONFIG,
    detailLibrary: DETAIL_LIBRARY,
    dynastyDetailLibrary: DYNASTY_DETAIL_LIBRARY
  };
})();
