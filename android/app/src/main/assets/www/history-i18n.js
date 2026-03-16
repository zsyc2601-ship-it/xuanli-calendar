(function () {
  "use strict";

  /*  Translation overlays for non-native history data.
      Structure: { countryId: { lang: { rulers:{}, dynasties:{}, details:{rulerName:{summary,events,wars,calamities}} } } }
      Only the fields that need translation are included; rendering falls back to original text. */

  window.XUAN_HISTORY_I18N = {
    us: {
      zh: {
        rulers: {
          "George Washington": "乔治·华盛顿", "John Adams": "约翰·亚当斯", "Thomas Jefferson": "托马斯·杰斐逊",
          "James Madison": "詹姆斯·麦迪逊", "James Monroe": "詹姆斯·门罗", "John Quincy Adams": "约翰·昆西·亚当斯",
          "Andrew Jackson": "安德鲁·杰克逊", "Martin Van Buren": "马丁·范布伦",
          "William Henry Harrison": "威廉·亨利·哈里森", "John Tyler": "约翰·泰勒",
          "James K. Polk": "詹姆斯·波尔克", "Zachary Taylor": "扎卡里·泰勒",
          "Millard Fillmore": "米勒德·菲尔莫尔", "Franklin Pierce": "富兰克林·皮尔斯",
          "James Buchanan": "詹姆斯·布坎南", "Abraham Lincoln": "亚伯拉罕·林肯",
          "Andrew Johnson": "安德鲁·约翰逊", "Ulysses S. Grant": "尤利西斯·格兰特",
          "Rutherford B. Hayes": "拉瑟福德·海斯", "James A. Garfield": "詹姆斯·加菲尔德",
          "Chester A. Arthur": "切斯特·亚瑟", "Grover Cleveland": "格罗弗·克利夫兰",
          "Benjamin Harrison": "本杰明·哈里森", "William McKinley": "威廉·麦金莱",
          "Theodore Roosevelt": "西奥多·罗斯福", "William Howard Taft": "威廉·塔夫脱",
          "Woodrow Wilson": "伍德罗·威尔逊", "Warren G. Harding": "沃伦·哈丁",
          "Calvin Coolidge": "卡尔文·柯立芝", "Herbert Hoover": "赫伯特·胡佛",
          "Franklin D. Roosevelt": "富兰克林·罗斯福", "Harry S. Truman": "哈里·杜鲁门",
          "Dwight D. Eisenhower": "德怀特·艾森豪威尔", "John F. Kennedy": "约翰·肯尼迪",
          "Lyndon B. Johnson": "林登·约翰逊", "Richard Nixon": "理查德·尼克松",
          "Gerald Ford": "杰拉尔德·福特", "Jimmy Carter": "吉米·卡特",
          "Ronald Reagan": "罗纳德·里根", "George H. W. Bush": "乔治·H·W·布什",
          "Bill Clinton": "比尔·克林顿", "George W. Bush": "乔治·W·布什",
          "Barack Obama": "贝拉克·奥巴马", "Donald Trump": "唐纳德·特朗普", "Joe Biden": "乔·拜登"
        },
        dynasties: {
          "Founding Era": "建国时期", "Jeffersonian Era": "杰斐逊时期", "Era of Good Feelings": "和睦时期",
          "Jacksonian Era": "杰克逊时期", "Antebellum": "内战前时期",
          "Civil War & Reconstruction": "内战与重建", "Gilded Age": "镀金时代",
          "Progressive Era": "进步时代", "Interwar Period": "两战之间",
          "World War II Era": "二战时期", "Cold War": "冷战时期",
          "Post-Cold War": "后冷战时期", "Modern Era": "现代",
          "Colonial Period": "殖民地时期", "Pre-Independence": "独立前时期",
          "United States": "美国"
        },
        eraNames: {
          "1st President": "第1任总统", "2nd President": "第2任总统", "3rd President": "第3任总统",
          "4th President": "第4任总统", "5th President": "第5任总统", "6th President": "第6任总统",
          "7th President": "第7任总统", "8th President": "第8任总统", "9th President": "第9任总统",
          "10th President": "第10任总统", "11th President": "第11任总统", "12th President": "第12任总统",
          "13th President": "第13任总统", "14th President": "第14任总统", "15th President": "第15任总统",
          "16th President": "第16任总统", "17th President": "第17任总统", "18th President": "第18任总统",
          "19th President": "第19任总统", "20th President": "第20任总统", "21st President": "第21任总统",
          "22nd President": "第22任总统", "23rd President": "第23任总统", "24th President": "第24任总统",
          "25th President": "第25任总统", "26th President": "第26任总统", "27th President": "第27任总统",
          "28th President": "第28任总统", "29th President": "第29任总统", "30th President": "第30任总统",
          "31st President": "第31任总统", "32nd President": "第32任总统", "33rd President": "第33任总统",
          "34th President": "第34任总统", "35th President": "第35任总统", "36th President": "第36任总统",
          "37th President": "第37任总统", "38th President": "第38任总统", "39th President": "第39任总统",
          "40th President": "第40任总统", "41st President": "第41任总统", "42nd President": "第42任总统",
          "43rd President": "第43任总统", "44th President": "第44任总统", "45th President": "第45任总统",
          "46th President": "第46任总统", "47th President": "第47任总统"
        }
      },
      ja: {
        rulers: {
          "George Washington": "ジョージ・ワシントン", "Abraham Lincoln": "エイブラハム・リンカーン",
          "Theodore Roosevelt": "セオドア・ルーズベルト", "Franklin D. Roosevelt": "フランクリン・ルーズベルト",
          "John F. Kennedy": "ジョン・F・ケネディ", "Richard Nixon": "リチャード・ニクソン",
          "Ronald Reagan": "ロナルド・レーガン", "Barack Obama": "バラク・オバマ",
          "Donald Trump": "ドナルド・トランプ", "Joe Biden": "ジョー・バイデン"
        },
        dynasties: {
          "Founding Era": "建国期", "Cold War": "冷戦", "Modern Era": "現代",
          "Civil War & Reconstruction": "南北戦争と再建", "World War II Era": "第二次世界大戦期"
        }
      }
    },
    uk: {
      zh: {
        rulers: {
          "William the Conqueror": "威廉一世（征服者）", "William II": "威廉二世", "Henry I": "亨利一世",
          "Stephen": "斯蒂芬", "Henry II": "亨利二世", "Richard I": "理查一世（狮心王）",
          "John": "约翰", "Henry III": "亨利三世", "Edward I": "爱德华一世",
          "Edward II": "爱德华二世", "Edward III": "爱德华三世", "Richard II": "理查二世",
          "Henry IV": "亨利四世", "Henry V": "亨利五世", "Henry VI": "亨利六世",
          "Henry VI (Restored)": "亨利六世（复辟）",
          "Edward IV": "爱德华四世", "Edward V": "爱德华五世", "Richard III": "理查三世",
          "Henry VII": "亨利七世", "Henry VIII": "亨利八世", "Edward VI": "爱德华六世",
          "Mary I": "玛丽一世", "Elizabeth I": "伊丽莎白一世",
          "James I": "詹姆斯一世", "Charles I": "查理一世",
          "Oliver Cromwell": "奥利弗·克伦威尔", "Richard Cromwell": "理查·克伦威尔",
          "Charles II": "查理二世", "James II": "詹姆斯二世",
          "William III & Mary II": "威廉三世与玛丽二世", "Anne": "安妮女王",
          "George I": "乔治一世", "George II": "乔治二世", "George III": "乔治三世",
          "George IV": "乔治四世", "William IV": "威廉四世", "Victoria": "维多利亚女王",
          "Edward VII": "爱德华七世", "George V": "乔治五世", "Edward VIII": "爱德华八世",
          "George VI": "乔治六世", "Elizabeth II": "伊丽莎白二世", "Charles III": "查尔斯三世"
        },
        dynasties: {
          "Norman": "诺曼王朝", "Plantagenet": "金雀花王朝", "Lancaster": "兰开斯特王朝",
          "York": "约克王朝", "Tudor": "都铎王朝", "Stuart": "斯图亚特王朝",
          "Commonwealth": "共和联邦", "Hanover": "汉诺威王朝",
          "Saxe-Coburg and Gotha": "萨克森-科堡-哥达王朝", "Windsor": "温莎王朝",
          "Pre-Norman": "诺曼征服前", "United Kingdom": "英国"
        },
        eraNames: {
          "King": "国王", "Queen": "女王", "King & Queen": "国王与女王", "Lord Protector": "护国公"
        }
      },
      ja: {
        rulers: {
          "William the Conqueror": "ウィリアム征服王", "Henry VIII": "ヘンリー8世",
          "Elizabeth I": "エリザベス1世", "Victoria": "ヴィクトリア女王",
          "Elizabeth II": "エリザベス2世", "Charles III": "チャールズ3世"
        },
        dynasties: {
          "Norman": "ノルマン朝", "Plantagenet": "プランタジネット朝", "Tudor": "テューダー朝",
          "Stuart": "ステュアート朝", "Hanover": "ハノーヴァー朝", "Windsor": "ウィンザー朝",
          "Commonwealth": "共和政"
        }
      }
    },
    jp: {
      zh: {
        dynasties: {
          "平安時代": "平安时代", "鎌倉時代": "镰仓时代", "建武の新政": "建武新政",
          "室町時代": "室町时代", "安土桃山時代": "安土桃山时代", "江戸時代": "江户时代",
          "大日本帝国": "大日本帝国", "日本": "日本", "古代": "古代"
        },
        rulers: {
          "源頼朝（鎌倉殿）": "源赖朝", "北条執権体制": "北条执权体制", "後醍醐天皇": "后醍醐天皇",
          "上皇（平成）": "上皇（平成）", "今上天皇（令和）": "今上天皇（令和）"
        }
      }
    }
  };
})();
