(function () {
  "use strict";

  var REIGN_PERIODS = [
    { start: 1789, end: 1796, dynasty: "Founding Era", ruler: "George Washington", eraName: "1st President" },
    { start: 1797, end: 1800, dynasty: "Founding Era", ruler: "John Adams", eraName: "2nd President" },
    { start: 1801, end: 1808, dynasty: "Jeffersonian Era", ruler: "Thomas Jefferson", eraName: "3rd President" },
    { start: 1809, end: 1816, dynasty: "Jeffersonian Era", ruler: "James Madison", eraName: "4th President" },
    { start: 1817, end: 1824, dynasty: "Era of Good Feelings", ruler: "James Monroe", eraName: "5th President" },
    { start: 1825, end: 1828, dynasty: "Era of Good Feelings", ruler: "John Quincy Adams", eraName: "6th President" },
    { start: 1829, end: 1836, dynasty: "Jacksonian Era", ruler: "Andrew Jackson", eraName: "7th President" },
    { start: 1837, end: 1840, dynasty: "Jacksonian Era", ruler: "Martin Van Buren", eraName: "8th President" },
    { start: 1841, end: 1841, dynasty: "Antebellum", ruler: "William Henry Harrison", eraName: "9th President" },
    { start: 1841, end: 1844, dynasty: "Antebellum", ruler: "John Tyler", eraName: "10th President" },
    { start: 1845, end: 1848, dynasty: "Antebellum", ruler: "James K. Polk", eraName: "11th President" },
    { start: 1849, end: 1850, dynasty: "Antebellum", ruler: "Zachary Taylor", eraName: "12th President" },
    { start: 1850, end: 1852, dynasty: "Antebellum", ruler: "Millard Fillmore", eraName: "13th President" },
    { start: 1853, end: 1856, dynasty: "Antebellum", ruler: "Franklin Pierce", eraName: "14th President" },
    { start: 1857, end: 1860, dynasty: "Antebellum", ruler: "James Buchanan", eraName: "15th President" },
    { start: 1861, end: 1865, dynasty: "Civil War & Reconstruction", ruler: "Abraham Lincoln", eraName: "16th President" },
    { start: 1865, end: 1868, dynasty: "Civil War & Reconstruction", ruler: "Andrew Johnson", eraName: "17th President" },
    { start: 1869, end: 1876, dynasty: "Civil War & Reconstruction", ruler: "Ulysses S. Grant", eraName: "18th President" },
    { start: 1877, end: 1880, dynasty: "Gilded Age", ruler: "Rutherford B. Hayes", eraName: "19th President" },
    { start: 1881, end: 1881, dynasty: "Gilded Age", ruler: "James A. Garfield", eraName: "20th President" },
    { start: 1881, end: 1884, dynasty: "Gilded Age", ruler: "Chester A. Arthur", eraName: "21st President" },
    { start: 1885, end: 1888, dynasty: "Gilded Age", ruler: "Grover Cleveland", eraName: "22nd President" },
    { start: 1889, end: 1892, dynasty: "Gilded Age", ruler: "Benjamin Harrison", eraName: "23rd President" },
    { start: 1893, end: 1896, dynasty: "Gilded Age", ruler: "Grover Cleveland", eraName: "24th President" },
    { start: 1897, end: 1901, dynasty: "Progressive Era", ruler: "William McKinley", eraName: "25th President" },
    { start: 1901, end: 1908, dynasty: "Progressive Era", ruler: "Theodore Roosevelt", eraName: "26th President" },
    { start: 1909, end: 1912, dynasty: "Progressive Era", ruler: "William Howard Taft", eraName: "27th President" },
    { start: 1913, end: 1920, dynasty: "Progressive Era", ruler: "Woodrow Wilson", eraName: "28th President" },
    { start: 1921, end: 1923, dynasty: "Interwar Period", ruler: "Warren G. Harding", eraName: "29th President" },
    { start: 1923, end: 1928, dynasty: "Interwar Period", ruler: "Calvin Coolidge", eraName: "30th President" },
    { start: 1929, end: 1932, dynasty: "Interwar Period", ruler: "Herbert Hoover", eraName: "31st President" },
    { start: 1933, end: 1945, dynasty: "World War II Era", ruler: "Franklin D. Roosevelt", eraName: "32nd President" },
    { start: 1945, end: 1952, dynasty: "Cold War", ruler: "Harry S. Truman", eraName: "33rd President" },
    { start: 1953, end: 1960, dynasty: "Cold War", ruler: "Dwight D. Eisenhower", eraName: "34th President" },
    { start: 1961, end: 1963, dynasty: "Cold War", ruler: "John F. Kennedy", eraName: "35th President" },
    { start: 1963, end: 1968, dynasty: "Cold War", ruler: "Lyndon B. Johnson", eraName: "36th President" },
    { start: 1969, end: 1974, dynasty: "Cold War", ruler: "Richard Nixon", eraName: "37th President" },
    { start: 1974, end: 1976, dynasty: "Cold War", ruler: "Gerald Ford", eraName: "38th President" },
    { start: 1977, end: 1980, dynasty: "Cold War", ruler: "Jimmy Carter", eraName: "39th President" },
    { start: 1981, end: 1988, dynasty: "Cold War", ruler: "Ronald Reagan", eraName: "40th President" },
    { start: 1989, end: 1992, dynasty: "Post-Cold War", ruler: "George H. W. Bush", eraName: "41st President" },
    { start: 1993, end: 2000, dynasty: "Post-Cold War", ruler: "Bill Clinton", eraName: "42nd President" },
    { start: 2001, end: 2008, dynasty: "Modern Era", ruler: "George W. Bush", eraName: "43rd President" },
    { start: 2009, end: 2016, dynasty: "Modern Era", ruler: "Barack Obama", eraName: "44th President" },
    { start: 2017, end: 2020, dynasty: "Modern Era", ruler: "Donald Trump", eraName: "45th President" },
    { start: 2021, end: 2024, dynasty: "Modern Era", ruler: "Joe Biden", eraName: "46th President" },
    { start: 2025, end: 2099, dynasty: "Modern Era", ruler: "Donald Trump", eraName: "47th President" }
  ];

  var REIGN_CONFIG = {
    minYear: 1776,
    fallback: {
      beforeMin: { dynasty: "Colonial Period", title: "Pre-Independence", subtitle: "Before the United States", note: "US presidential history begins with George Washington in 1789.", showRuler: false },
      notFound: { dynasty: "United States", title: "No data", subtitle: "", note: "No presidential data available for this year.", showRuler: false },
      generalNote: "US presidential history timeline.",
      dynastyMinYear: 1776,
      dynastyBeforeMin: { label: "Colonial Period", yearText: "Before Independence" },
      noEraText: "__NONE__",
      regnalTemplate: "{era} · Year {year}",
      noEraTemplate: "Year {year} in office",
      dynastyRegnalTemplate: "{era} · Year {year}"
    }
  };

  var DETAIL_LIBRARY = {
    "George Washington": {
      lifespan: "Feb 22, 1732 – Dec 14, 1799",
      reign: "1789–1797",
      era: "1st President",
      summary: "Commander-in-chief of the Continental Army during the Revolutionary War and the first President of the United States. Washington set crucial precedents for the office, including the two-term tradition and the peaceful transfer of power.",
      events: [
        { period: "1789", text: "Unanimously elected as the first President; established the Cabinet system." },
        { period: "1791", text: "Signed the Bill of Rights into law, securing fundamental liberties." },
        { period: "1796", text: "Delivered his Farewell Address, warning against partisan divisions and foreign entanglements." }
      ],
      wars: [
        { period: "1775–1783", text: "Led the Continental Army to victory in the American Revolutionary War." },
        { period: "1794", text: "Suppressed the Whiskey Rebellion, establishing federal authority over domestic unrest." }
      ],
      calamities: [
        { period: "1789–1797", text: "Navigated intense factional disputes between Federalists and Democratic-Republicans." },
        { period: "1793", text: "Maintained neutrality during the French Revolutionary Wars despite domestic pressure." }
      ]
    },
    "John Adams": {
      lifespan: "Oct 30, 1735 – Jul 4, 1826",
      reign: "1797–1801",
      era: "2nd President",
      summary: "A key architect of American independence and the second President. His presidency was marked by the Quasi-War with France and the controversial Alien and Sedition Acts.",
      events: [
        { period: "1797", text: "Inaugurated as the 2nd President after serving as Washington's Vice President." },
        { period: "1798", text: "Signed the Alien and Sedition Acts, sparking fierce debate over civil liberties." }
      ],
      wars: [
        { period: "1798–1800", text: "The Quasi-War: an undeclared naval conflict with France." }
      ],
      calamities: [
        { period: "1800", text: "Lost re-election to Jefferson amid bitter partisan conflict; established peaceful transfer of power." }
      ]
    },
    "Thomas Jefferson": {
      lifespan: "Apr 13, 1743 – Jul 4, 1826",
      reign: "1801–1809",
      era: "3rd President",
      summary: "Principal author of the Declaration of Independence and third President. His presidency doubled the nation's size through the Louisiana Purchase and championed agrarian democracy.",
      events: [
        { period: "1803", text: "Completed the Louisiana Purchase from France, doubling the territory of the United States." },
        { period: "1804–1806", text: "Commissioned the Lewis and Clark Expedition to explore the western territories." },
        { period: "1807", text: "Signed the Embargo Act to avoid entanglement in European wars, causing economic hardship." }
      ],
      wars: [
        { period: "1801–1805", text: "First Barbary War against North African pirates to protect American shipping." }
      ],
      calamities: [
        { period: "1807–1809", text: "The Embargo Act devastated American commerce and proved deeply unpopular." }
      ]
    },
    "Andrew Jackson": {
      lifespan: "Mar 15, 1767 – Jun 8, 1845",
      reign: "1829–1837",
      era: "7th President",
      summary: "A populist hero and controversial figure, Jackson expanded democratic participation while forcibly removing Native Americans. He dismantled the Second Bank of the United States and strengthened the executive branch.",
      events: [
        { period: "1830", text: "Signed the Indian Removal Act, leading to the Trail of Tears." },
        { period: "1832", text: "Vetoed the recharter of the Second Bank of the United States." },
        { period: "1832–1833", text: "Faced down the Nullification Crisis with South Carolina." }
      ],
      wars: [
        { period: "1815", text: "Won fame at the Battle of New Orleans during the War of 1812." }
      ],
      calamities: [
        { period: "1830s", text: "Forced removal of southeastern Native American nations caused immense suffering and death." },
        { period: "1837", text: "The Panic of 1837 struck shortly after Jackson left office, partly caused by his banking policies." }
      ]
    },
    "Abraham Lincoln": {
      lifespan: "Feb 12, 1809 – Apr 15, 1865",
      reign: "1861–1865",
      era: "16th President",
      summary: "Preserved the Union during the Civil War and abolished slavery through the Emancipation Proclamation and the 13th Amendment. Widely regarded as one of the greatest American presidents, he was assassinated shortly after the war ended.",
      events: [
        { period: "1861", text: "Inaugurated as secession crisis escalated; Fort Sumter fell, beginning the Civil War." },
        { period: "1863", text: "Issued the Emancipation Proclamation; delivered the Gettysburg Address." },
        { period: "1865", text: "Assassinated by John Wilkes Booth at Ford's Theatre on April 14." }
      ],
      wars: [
        { period: "1861–1865", text: "The American Civil War: the bloodiest conflict in American history, with over 600,000 dead." },
        { period: "1863", text: "Turning points at Gettysburg and Vicksburg shifted the war decisively toward the Union." }
      ],
      calamities: [
        { period: "1861–1865", text: "Massive casualties, economic devastation in the South, and deep national trauma from civil war." },
        { period: "1863", text: "New York City draft riots reflected intense social tensions over the war and conscription." }
      ]
    },
    "Theodore Roosevelt": {
      lifespan: "Oct 27, 1858 – Jan 6, 1919",
      reign: "1901–1909",
      era: "26th President",
      summary: "A dynamic progressive reformer who busted trusts, championed conservation, and projected American power globally. He won the Nobel Peace Prize for mediating the end of the Russo-Japanese War.",
      events: [
        { period: "1901", text: "Became president after McKinley's assassination; youngest president at age 42." },
        { period: "1903", text: "Secured the Panama Canal Zone and began construction of the canal." },
        { period: "1906", text: "Signed the Pure Food and Drug Act and the Meat Inspection Act." }
      ],
      wars: [
        { period: "1898", text: "Led the Rough Riders in the Spanish-American War before his presidency." },
        { period: "1905", text: "Mediated the Treaty of Portsmouth ending the Russo-Japanese War." }
      ],
      calamities: [
        { period: "1906", text: "The San Francisco earthquake and fire devastated the city." },
        { period: "1907", text: "The Panic of 1907 threatened financial stability." }
      ]
    },
    "Woodrow Wilson": {
      lifespan: "Dec 28, 1856 – Feb 3, 1924",
      reign: "1913–1921",
      era: "28th President",
      summary: "Led the nation through World War I and championed the League of Nations. His progressive domestic agenda included the Federal Reserve Act and antitrust legislation, though his presidency was also marked by racial segregation of federal offices.",
      events: [
        { period: "1913", text: "Signed the Federal Reserve Act, creating the modern central banking system." },
        { period: "1917", text: "Led the United States into World War I after German unrestricted submarine warfare." },
        { period: "1919", text: "Proposed the League of Nations at the Paris Peace Conference; suffered a debilitating stroke." }
      ],
      wars: [
        { period: "1917–1918", text: "American entry into World War I proved decisive in Allied victory." }
      ],
      calamities: [
        { period: "1918–1919", text: "The Spanish Flu pandemic killed an estimated 675,000 Americans." },
        { period: "1919–1920", text: "Senate rejected the Treaty of Versailles and League of Nations membership." }
      ]
    },
    "Franklin D. Roosevelt": {
      lifespan: "Jan 30, 1882 – Apr 12, 1945",
      reign: "1933–1945",
      era: "32nd President",
      summary: "The only president elected four times, FDR led the nation through the Great Depression with the New Deal and through World War II. He fundamentally transformed the relationship between the federal government and the American people.",
      events: [
        { period: "1933", text: "Launched the New Deal: a sweeping series of programs to combat the Great Depression." },
        { period: "1935", text: "Signed the Social Security Act, creating the modern social safety net." },
        { period: "1941", text: "After Pearl Harbor, led the United States into World War II." }
      ],
      wars: [
        { period: "1941–1945", text: "Led the Allied war effort in both the European and Pacific theaters of World War II." },
        { period: "1944", text: "D-Day invasion at Normandy and the island-hopping campaign in the Pacific." }
      ],
      calamities: [
        { period: "1929–1939", text: "The Great Depression: unprecedented economic collapse with 25% unemployment." },
        { period: "1942", text: "Executive Order 9066 authorized internment of Japanese Americans — a grave injustice." }
      ]
    },
    "Harry S. Truman": {
      lifespan: "May 8, 1884 – Dec 26, 1972",
      reign: "1945–1953",
      era: "33rd President",
      summary: "Assumed the presidency upon FDR's death and made the momentous decision to use atomic weapons against Japan. He oversaw the beginning of the Cold War, the Marshall Plan, and the Korean War.",
      events: [
        { period: "1945", text: "Authorized the atomic bombings of Hiroshima and Nagasaki; Japan surrendered." },
        { period: "1947", text: "Announced the Truman Doctrine and Marshall Plan to contain Soviet expansion." },
        { period: "1948", text: "Ordered desegregation of the U.S. armed forces." }
      ],
      wars: [
        { period: "1950–1953", text: "The Korean War: a major Cold War conflict that ended in stalemate." }
      ],
      calamities: [
        { period: "1945–1953", text: "The early Cold War and nuclear arms race created a new era of global tension." },
        { period: "1950–1953", text: "McCarthyism and Red Scare politics gripped the nation." }
      ]
    },
    "John F. Kennedy": {
      lifespan: "May 29, 1917 – Nov 22, 1963",
      reign: "1961–1963",
      era: "35th President",
      summary: "The youngest elected president inspired a generation with his vision of a 'New Frontier.' His brief presidency was defined by the Cuban Missile Crisis, the space race, and the beginnings of the civil rights movement. He was assassinated in Dallas in 1963.",
      events: [
        { period: "1961", text: "Established the Peace Corps and pledged to land a man on the Moon by the end of the decade." },
        { period: "1962", text: "The Cuban Missile Crisis brought the world to the brink of nuclear war." },
        { period: "1963", text: "Assassinated in Dallas, Texas on November 22." }
      ],
      wars: [
        { period: "1961", text: "The Bay of Pigs invasion in Cuba was a disastrous failure." },
        { period: "1961–1963", text: "Expanded U.S. military advisory role in Vietnam." }
      ],
      calamities: [
        { period: "1962", text: "The Cuban Missile Crisis was the closest the Cold War came to nuclear conflict." },
        { period: "1963", text: "His assassination traumatized the nation and raised lasting questions." }
      ]
    },
    "Richard Nixon": {
      lifespan: "Jan 9, 1913 – Apr 22, 1994",
      reign: "1969–1974",
      era: "37th President",
      summary: "Opened relations with China and negotiated détente with the Soviet Union, but his presidency was destroyed by the Watergate scandal. He remains the only president to resign from office.",
      events: [
        { period: "1972", text: "Historic visit to China; signed the SALT I arms limitation treaty with the USSR." },
        { period: "1972", text: "Watergate break-in and subsequent cover-up began to unravel." },
        { period: "1974", text: "Resigned on August 9 facing certain impeachment." }
      ],
      wars: [
        { period: "1969–1973", text: "Gradually withdrew from Vietnam while expanding bombing into Cambodia." },
        { period: "1973", text: "Paris Peace Accords ended direct U.S. military involvement in Vietnam." }
      ],
      calamities: [
        { period: "1972–1974", text: "The Watergate scandal shattered public trust in government." },
        { period: "1973", text: "The oil embargo and energy crisis caused severe economic disruption." }
      ]
    },
    "Ronald Reagan": {
      lifespan: "Feb 6, 1911 – Jun 5, 2004",
      reign: "1981–1989",
      era: "40th President",
      summary: "A transformative conservative who championed smaller government, tax cuts, and a strong anti-Soviet foreign policy. His presidency saw the beginning of the end of the Cold War.",
      events: [
        { period: "1981", text: "Survived an assassination attempt; signed major tax cuts into law." },
        { period: "1987", text: "Delivered the 'Tear down this wall' speech at the Berlin Wall." },
        { period: "1987", text: "Signed the INF Treaty with the Soviet Union, eliminating intermediate-range nuclear missiles." }
      ],
      wars: [
        { period: "1983", text: "Invasion of Grenada; Beirut barracks bombing killed 241 U.S. service members." },
        { period: "1986", text: "Iran-Contra affair revealed secret arms sales to fund Nicaraguan rebels." }
      ],
      calamities: [
        { period: "1981–1982", text: "Severe recession with unemployment peaking at 10.8%." },
        { period: "1986", text: "Space Shuttle Challenger disaster killed seven crew members." }
      ]
    },
    "Barack Obama": {
      lifespan: "Aug 4, 1961 –",
      reign: "2009–2017",
      era: "44th President",
      summary: "The first African American president, Obama took office during the worst financial crisis since the Great Depression. He signed the Affordable Care Act, ordered the operation that killed Osama bin Laden, and championed climate action.",
      events: [
        { period: "2009", text: "Signed the American Recovery and Reinvestment Act to combat the Great Recession." },
        { period: "2010", text: "Signed the Affordable Care Act, expanding healthcare coverage to millions." },
        { period: "2011", text: "Ordered the raid that killed Osama bin Laden in Pakistan." }
      ],
      wars: [
        { period: "2009–2017", text: "Continued operations in Afghanistan and Iraq; launched campaign against ISIS." },
        { period: "2011", text: "NATO intervention in Libya toppled Gaddafi's regime." }
      ],
      calamities: [
        { period: "2008–2010", text: "The Great Recession caused massive job losses and foreclosures." },
        { period: "2014–2016", text: "Rise of ISIS and the Syrian refugee crisis posed major foreign policy challenges." }
      ]
    },
    "Donald Trump": {
      lifespan: "Jun 14, 1946 –",
      reign: "2017–2021",
      era: "45th President",
      summary: "A businessman and television personality who won the presidency as a political outsider. His presidency was marked by tax reform, trade wars, the COVID-19 pandemic, and deep political polarization.",
      events: [
        { period: "2017", text: "Signed the Tax Cuts and Jobs Act, the largest tax overhaul in decades." },
        { period: "2020", text: "Managed the initial federal response to the COVID-19 pandemic; launched Operation Warp Speed." },
        { period: "2021", text: "Second impeachment following the January 6 Capitol breach; acquitted by the Senate." }
      ],
      wars: [
        { period: "2018–2020", text: "Trade war with China involved tariffs on hundreds of billions of dollars of goods." },
        { period: "2020", text: "Ordered the strike that killed Iranian General Qasem Soleimani." }
      ],
      calamities: [
        { period: "2020–2021", text: "The COVID-19 pandemic killed over 400,000 Americans during his term." },
        { period: "2021", text: "The January 6 Capitol breach was an unprecedented attack on the democratic process." }
      ]
    },
    "Joe Biden": {
      lifespan: "Nov 20, 1942 –",
      reign: "2021–2025",
      era: "46th President",
      summary: "The oldest person to assume the presidency, Biden focused on pandemic recovery, infrastructure investment, and rebuilding alliances. His term saw major legislation on infrastructure and climate, alongside inflation and geopolitical challenges.",
      events: [
        { period: "2021", text: "Signed the American Rescue Plan and oversaw mass COVID-19 vaccination campaigns." },
        { period: "2021", text: "Completed the withdrawal of U.S. forces from Afghanistan after 20 years." },
        { period: "2022", text: "Signed the Inflation Reduction Act, the largest climate investment in U.S. history." }
      ],
      wars: [
        { period: "2022–2024", text: "Provided extensive military aid to Ukraine following Russia's invasion." }
      ],
      calamities: [
        { period: "2021–2023", text: "High inflation driven by pandemic disruptions and supply chain issues." },
        { period: "2021", text: "Chaotic withdrawal from Afghanistan drew widespread criticism." }
      ]
    }
  };

  var DYNASTY_DETAIL_LIBRARY = {
    "Founding Era": {
      summary: "The birth of the American republic, establishing constitutional governance, democratic norms, and the foundations of federal power.",
      events: ["Ratification of the Constitution and Bill of Rights.", "Establishment of the Cabinet, federal judiciary, and national bank."],
      wars: ["The Revolutionary War (1775–1783) won independence from Britain."],
      calamities: ["Intense debates over federal vs. state power; the Whiskey Rebellion tested federal authority."]
    },
    "Jeffersonian Era": {
      summary: "A period of territorial expansion and agrarian idealism, marked by the Louisiana Purchase and growing tensions over slavery.",
      events: ["The Louisiana Purchase doubled the nation's size.", "Lewis and Clark explored the western territories."],
      wars: ["The War of 1812 against Britain affirmed American sovereignty."],
      calamities: ["Trade embargoes caused economic hardship; tensions with Britain and France persisted."]
    },
    "Era of Good Feelings": {
      summary: "A brief period of national unity and one-party politics following the War of 1812, though sectional tensions simmered beneath the surface.",
      events: ["The Monroe Doctrine asserted American influence in the Western Hemisphere.", "The Missouri Compromise of 1820 temporarily settled the slavery expansion debate."],
      wars: ["First Seminole War expanded American control in Florida."],
      calamities: ["The Panic of 1819 was the first major financial crisis of the new nation."]
    },
    "Jacksonian Era": {
      summary: "The rise of populist democracy and the common man, accompanied by Indian removal and the Bank War.",
      events: ["Expansion of voting rights to most white men.", "Destruction of the Second Bank of the United States."],
      wars: ["Black Hawk War and ongoing conflicts with Native American nations."],
      calamities: ["The Trail of Tears caused immense suffering among Native Americans."]
    },
    "Antebellum": {
      summary: "The decades before the Civil War, defined by westward expansion, the Mexican-American War, and the deepening crisis over slavery.",
      events: ["The Compromise of 1850 and Kansas-Nebraska Act inflamed sectional tensions.", "The Dred Scott decision further divided the nation."],
      wars: ["The Mexican-American War (1846–1848) added vast territories to the United States."],
      calamities: ["'Bleeding Kansas' and John Brown's raid at Harpers Ferry foreshadowed civil war."]
    },
    "Civil War & Reconstruction": {
      summary: "The nation's bloodiest conflict, followed by the struggle to rebuild the South and integrate formerly enslaved people into American society.",
      events: ["Emancipation Proclamation and the 13th, 14th, and 15th Amendments.", "Reconstruction attempted to rebuild the South and protect Black civil rights."],
      wars: ["The American Civil War (1861–1865) killed over 600,000 people."],
      calamities: ["Reconstruction was undermined by white supremacist violence and political compromise."]
    },
    "Gilded Age": {
      summary: "Rapid industrialization, massive immigration, and extreme wealth inequality defined this era of robber barons and labor unrest.",
      events: ["Transcontinental Railroad completed; rise of steel, oil, and banking empires.", "Labor movements emerged in response to harsh working conditions."],
      wars: ["Indian Wars continued as westward expansion displaced Native peoples."],
      calamities: ["The Panic of 1893 caused a severe depression; widespread poverty amid extreme wealth."]
    },
    "Progressive Era": {
      summary: "A reform movement addressing the excesses of the Gilded Age through trust-busting, conservation, and social legislation.",
      events: ["Antitrust laws, food safety regulations, and the Federal Reserve Act.", "Women's suffrage movement gained momentum, culminating in the 19th Amendment (1920)."],
      wars: ["The Spanish-American War (1898) and World War I (1917–1918)."],
      calamities: ["The Spanish Flu pandemic (1918–1919) killed millions worldwide."]
    },
    "Interwar Period": {
      summary: "The Roaring Twenties gave way to the Great Depression, the worst economic disaster in American history.",
      events: ["Prohibition, jazz culture, and the Harlem Renaissance.", "The stock market crash of 1929 triggered the Great Depression."],
      wars: ["The U.S. pursued isolationism while tensions grew in Europe and Asia."],
      calamities: ["The Great Depression left a quarter of Americans unemployed."]
    },
    "World War II Era": {
      summary: "America emerged from the Depression through massive wartime mobilization and became a global superpower.",
      events: ["The New Deal reshaped the federal government's role in American life.", "Victory in World War II established the U.S. as a global superpower."],
      wars: ["World War II (1941–1945) was fought in Europe, Africa, Asia, and the Pacific."],
      calamities: ["The Holocaust, atomic bombings, and Japanese American internment marked the era's darkest chapters."]
    },
    "Cold War": {
      summary: "A decades-long ideological and geopolitical rivalry with the Soviet Union that shaped American foreign and domestic policy.",
      events: ["The space race, civil rights movement, and Great Society programs.", "The fall of the Berlin Wall (1989) and collapse of the Soviet Union (1991)."],
      wars: ["The Korean War, Vietnam War, and numerous proxy conflicts around the globe."],
      calamities: ["The Cuban Missile Crisis, assassinations of JFK and MLK, Watergate, and the Vietnam quagmire."]
    },
    "Post-Cold War": {
      summary: "America as the sole superpower navigated globalization, the tech boom, and new security challenges.",
      events: ["The Gulf War, NAFTA, and the internet revolution.", "Economic prosperity and budget surpluses in the late 1990s."],
      wars: ["The Gulf War (1991) and humanitarian interventions in the Balkans."],
      calamities: ["The Oklahoma City bombing (1995) and rising domestic terrorism concerns."]
    },
    "Modern Era": {
      summary: "The 21st century brought the War on Terror, the Great Recession, political polarization, and a global pandemic.",
      events: ["September 11 attacks transformed national security policy.", "The Affordable Care Act, Paris Climate Agreement, and digital revolution."],
      wars: ["The War in Afghanistan (2001–2021) and the Iraq War (2003–2011)."],
      calamities: ["The Great Recession (2008), COVID-19 pandemic (2020), and deepening political divisions."]
    }
  };

  window.XUAN_HISTORY_US = {
    reignPeriods: REIGN_PERIODS,
    reignConfig: REIGN_CONFIG,
    detailLibrary: DETAIL_LIBRARY,
    dynastyDetailLibrary: DYNASTY_DETAIL_LIBRARY
  };
})();
