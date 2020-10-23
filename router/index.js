const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const parseString = require('xml2js').parseString;
var request = require('request');

// RSS 다운로드 ---- (※1)
var 중앙RSS = [
'https://rss.joins.com/sonagi/joins_sonagi_total_list.xml', //전체기사
,'https://rss.joins.com/sonagi/joins_sonagi_money_list.xml', //경제
,'https://rss.joins.com/sonagi/joins_sonagi_politics_list.xml', //정치
,'https://rss.joins.com/sonagi/joins_sonagi_star_list.xml' //문화
,'https://rss.joins.com/sonagi/joins_sonagi_life_list.xml', //사회
,'https://rss.joins.com/sonagi/joins_sonagi_sports_list.xml' //스포츠
,'https://rss.joins.com/sonagi/joins_sonagi_world_list.xml' //국제
]

var 동아일보RSS = [
'http://rss.donga.com/total.xml' //전체
,'http://rss.donga.com/politics.xml' // 정치
,'http://rss.donga.com/national.xml' // 사회
,'http://rss.donga.com/economy.xml' // 경제
,'http://rss.donga.com/international.xml' //국제
,'http://rss.donga.com/culture.xml' //문화
,'http://rss.donga.com/sports.xml' //스포츠
]

var 조선일보RSS = [


]

var 연합뉴스RSS = [
'http://www.yonhapnewstv.co.kr/browse/feed/' //전체
,'http://www.yonhapnewstv.co.kr/category/news/politics/feed/' //정치
,'http://www.yonhapnewstv.co.kr/category/news/economy/feed/' // 경제
,'http://www.yonhapnewstv.co.kr/category/news/society/feed/' //사회
,'http://www.yonhapnewstv.co.kr/category/news/culture/feed/' //문화
,'http://www.yonhapnewstv.co.kr/category/news/sports/feed/' //스포츠
,'http://www.yonhapnewstv.co.kr/category/news/international/feed/' //국제
]

var KBSRSS = [
'http://world.kbs.co.kr/rss/rss_news.htm?lang=k'//전체
,'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Po' //정치
,'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Ec' //경제
,'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=In' //국제
,'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Dm' //사회
,'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Cu' //문화
,'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Sp' //스포츠
]

var SBSRSS = [
'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=01&plink=RSSREADER' //정치
,'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=02&plink=RSSREADER' //경제
,'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=03&plink=RSSREADER' //사회
,'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=07&plink=RSSREADER' //문화
,'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=08&plink=RSSREADER' // 국제
,'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=09&plink=RSSREADER' //스포츠
]

var 국민일보RSS = [
'http://rss.kmib.co.kr/data/kmibRssAll.xml' //전체
,'http://rss.kmib.co.kr/data/kmibPolRss.xml' //정치
,'http://rss.kmib.co.kr/data/kmibEcoRss.xml' //경제
,'http://rss.kmib.co.kr/data/kmibSocRss.xml' //사회
,'http://rss.kmib.co.kr/data/kmibIntRss.xml' //국제
,'http://rss.kmib.co.kr/data/kmibSpoRss.xml' //스포츠
,'http://rss.kmib.co.kr/data/kmibCulRss.xml' //문화
]

request(RSS, function (err, response, body) {
    if (!err && response.statusCode == 200) {
        analyzeRSS(body);
    }
});

// RSS 해석 ---- (※2)
function analyzeRSS(xml) {
    // XML을 JS 오브젝트로 변환
    parseString(xml, function (err, obj) {
        if (err) {
            console.log(err);
            return;
        }
        //console.log(JSON.stringify(obj)); // ----- (※4)
        var press = obj.rss.channel[0].title[0].split('|')[0];
        var category = obj.rss.channel[0].title[0].split('|')[1];

        var item = obj.rss.channel[0].item;
       
      
        for (var i in item) {
            var title = item[i].title;
            var link = item[i].link;
            var description = item[i].description;
            var pubDate = item[i].pubDate;
            console.log(title);
        }
    });
}


