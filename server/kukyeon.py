!pip install feedparser
!pip install pymongo
!pip install pymongo[srv,tls]
!pip install dnspython==2.0.0
!pip install pymongo

import feedparser
import re
from pymongo import MongoClient
import pymongo

kmib_url = ['http://rss.kmib.co.kr/data/kmibRssAll.xml','http://rss.kmib.co.kr/data/kmibPolRss.xml','http://rss.kmib.co.kr/data/kmibSocRss.xml','http://rss.kmib.co.kr/data/kmibEcoRss.xml',
            'http://rss.kmib.co.kr/data/kmibIntRss.xml','http://rss.kmib.co.kr/data/kmibSpoRss.xml','http://rss.kmib.co.kr/data/kmibCulRss.xml']
yonhap_url = ['http://www.yonhapnewstv.co.kr/browse/feed/','http://www.yonhapnewstv.co.kr/category/news/politics/feed/','http://www.yonhapnewstv.co.kr/category/news/society/feed/',
              'http://www.yonhapnewstv.co.kr/category/news/economy/feed/','http://www.yonhapnewstv.co.kr/category/news/international/feed/','http://www.yonhapnewstv.co.kr/category/news/sports/feed/'
              ,'http://www.yonhapnewstv.co.kr/category/news/culture/feed/']

joongang_url=['https://rss.joins.com/joins_news_list.xml','https://rss.joins.com/joins_politics_list.xml','https://rss.joins.com/joins_life_list.xml',
              'https://rss.joins.com/joins_money_list.xml','https://rss.joins.com/joins_world_list.xml','https://rss.joins.com/joins_sports_list.xml',
              'https://rss.joins.com/joins_culture_list.xml']

donga_url = ['https://rss.donga.com/total.xml','https://rss.donga.com/politics.xml','https://rss.donga.com/national.xml','https://rss.donga.com/economy.xml',
             'https://rss.donga.com/international.xml','https://rss.donga.com/sports.xml','https://rss.donga.com/culture.xml']

sbs_url = ['https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=01&plink=RSSREADER',' https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=03&plink=RSSREADER','https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=02&plink=RSSREADER',
           'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=08&plink=RSSREADER','https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=09&plink=RSSREADER',' https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=07&plink=RSSREADER']

client = pymongo.MongoClient("mongodb+srv://han:qpdlf52425@cluster0.kz4b2.mongodb.net/CapstonDesign?retryWrites=true&w=majority")
db = client.get_database('CapstonDesign')
collection = db.Articles

#본인 ReadWrite권한자로 접근
print('connection complete')

cl = ['전체','정치','사회','경제','국제','스포츠','문화']                         #category list
pl = ['조선일보','중앙일보','동아일보','KBS','SBS','국민일보','연합뉴스']    

#text 정제함수
def clean_text(text):
  content = text
  cleaned_text = re.sub('[a-zA-Z]','',content)
  cleaned_text = re.sub('[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]', '', cleaned_text)
  cleaned_text = cleaned_text.replace("연합뉴스TV 기사문의 및 제보","")
  cleaned_text = cleaned_text.replace("카톡/라인 jebo23 (끝)","")
  return cleaned_text

i=0
j=0
kmib_dic = []
yonhap_dic = []

for rss in kmib_url:
  if rss == None:
    break
  else:
    parse_rss = feedparser.parse(rss)
    for p in parse_rss.entries:
      kmib_dic.append({'title':p.title,'link':p.link,'category':cl[i],'content':clean_text(p.description)},'keyword':'\0','sum_short':'\0','sum_mid':'\0','sum_long':'\0'})
      print(kmib_dic[j])
      print('\n')
      collection.insert_one(kmib_dic[j])
      j+=1
    i+=1
i=0
j=0


for rss in yonhap_url:
  if rss == None:
    break
  else:
    parse_rss = feedparser.parse(rss)
    for p in parse_rss.entries:
      yonhap_dic.append({'title':p.title,'link':p.link,'category':cl[i],'content':clean_text(p.description),'keyword':'\0','sum_short':'\0','sum_mid':'\0','sum_long':'\0'})
      print(yonhap_dic[j])
      print('\n')
      collection.insert_one(yonhap_dic[j])
      j+=1
    i+=1
i=0
j=0


i=0
j=0
joongang_dic = []
donga_dic = []

for rss in joongang_url:
  if rss == None:
    break
  else:
    parse_rss = feedparser.parse(rss)
    for p in parse_rss.entries:
      
      joongang_dic.append({'title':p.title,'link':p.link,'category':cl[i],'content':clean_text(p.description)})
      print(joongang_dic[j])
      print('\n')
      #collection.insert_one(joongang_dic[j])
      j+=1
    i+=1


request = requests.get(url)
html = request.content
soup = BeautifulSoup(html,'html.parser')
const_adress = 'chosun.com'

news_list = soup.select('a.text__link.story-card__headline.\|.box--margin-none.text--black.font--primary.h4.text__link--color')
for news in news_list:
    print(news)
    
 i=0
j=0


for rss in donga_url:
  if rss == None:
    break
  else:
    parse_rss = feedparser.parse(rss)
    for p in parse_rss.entries:
      donga_dic.append({'title':p.title,'link':p.link,'category':cl[i],'content':clean_text(p.description)})
      print(donga_dic[j])
      print('\n')
      #collection.insert_one(donga_dic[j])
      j+=1
    i+=1
i=0
j=0
