#!/usr/bin/env python
# coding: utf-8

# In[1]:


get_ipython().system('pip install feedparser')
get_ipython().system('pip install pymongo')
get_ipython().system('pip install pymongo[srv,tls]')
get_ipython().system('pip install dnspython==2.0.0')
get_ipython().system('pip install requests')
get_ipython().system('pip install goose3')


# In[2]:


import feedparser
import requests
import os,sys,time
import re
import pymongo
from goose3 import Goose
from goose3.text import StopWordsKorean
from bs4 import BeautifulSoup
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize


# In[3]:


rss_dic = []
cl = ['전체','정치','사회','경제','국제','스포츠','문화']                         #category list
pl = ['한겨레','중앙일보','동아일보','KBS','SBS','국민일보','연합뉴스']         #press list

#조선일보->한겨레로 변경

hani_url=['http://www.hani.co.kr/rss/','http://www.hani.co.kr/rss/politics/','http://www.hani.co.kr/rss/society/','http://www.hani.co.kr/rss/economy/',
         'http://www.hani.co.kr/rss/international/','http://www.hani.co.kr/rss/sports/','http://www.hani.co.kr/rss/culture/']

joongang_url=['https://rss.joins.com/joins_news_list.xml','https://rss.joins.com/joins_politics_list.xml','https://rss.joins.com/joins_life_list.xml',
              'https://rss.joins.com/joins_money_list.xml','https://rss.joins.com/joins_world_list.xml','https://rss.joins.com/joins_sports_list.xml',
              'https://rss.joins.com/joins_culture_list.xml']

donga_url = ['https://rss.donga.com/total.xml','https://rss.donga.com/politics.xml','https://rss.donga.com/national.xml','https://rss.donga.com/economy.xml',
             'https://rss.donga.com/international.xml','https://rss.donga.com/sports.xml','https://rss.donga.com/culture.xml']

kbs_url = ['http://world.kbs.co.kr/rss/rss_news.htm?lang=k','http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Po','http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=IK'
            'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Ec','http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=In','http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Sp',
           'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Cu']

sbs_url = ['https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=01&plink=RSSREADER',' https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=03&plink=RSSREADER','https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=02&plink=RSSREADER',
           'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=08&plink=RSSREADER','https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=09&plink=RSSREADER',' https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=07&plink=RSSREADER']
sbs_topic = 'https://news.sbs.co.kr/news/newsHotIssue.do?plink=GNB&cooper=SBSNEWS'#sbs전체 

kmib_url = ['http://rss.kmib.co.kr/data/kmibRssAll.xml','http://rss.kmib.co.kr/data/kmibPolRss.xml','http://rss.kmib.co.kr/data/kmibSocRss.xml','http://rss.kmib.co.kr/data/kmibEcoRss.xml',
            'http://rss.kmib.co.kr/data/kmibIntRss.xml','http://rss.kmib.co.kr/data/kmibSpoRss.xml','http://rss.kmib.co.kr/data/kmibCulRss.xml']
yonhap_url = ['http://www.yonhapnewstv.co.kr/browse/feed/','http://www.yonhapnewstv.co.kr/category/news/politics/feed/','http://www.yonhapnewstv.co.kr/category/news/society/feed/',
              'http://www.yonhapnewstv.co.kr/category/news/economy/feed/','http://www.yonhapnewstv.co.kr/category/news/international/feed/','http://www.yonhapnewstv.co.kr/category/news/sports/feed/'
              ,'http://www.yonhapnewstv.co.kr/category/news/culture/feed/']

client = pymongo.MongoClient("mongodb+srv://han:qpdlf52425@cluster0.kz4b2.mongodb.net/BatchTest?retryWrites=true&w=majority")
db = client.get_database('BatchTest')
collection = db.bachtest


# In[4]:


#텍스트 전처리

def clean_text(text):
  content = text
  cleaned_text = re.sub('[a-zA-Z]','',content)
  cleaned_text = re.sub('[\{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"▲△▽▼◁◀▷▶]', '', cleaned_text)
  cleaned_text = cleaned_text.replace("연합뉴스TV 기사문의 및 제보","")
  cleaned_text = cleaned_text.replace("카톡/라인 jebo23 (끝)","")
  cleaned_text = cleaned_text.replace("아티클 공통  관련기사","")
  cleaned_text = cleaned_text.replace("아티클 공통   250","")
  return cleaned_text

'''불용어 목록 -> txt로 제공할 예정
#stop_words = "아무거나 아무렇게나 어찌하든지 같다 비슷하다 예컨대 이럴정도로 하면 아니거든"
#stop_words=stop_words.split(' ')
#word_tokens = word_tokenize(example)
#result=[word for word in word_tokens if not word in stop_words]
#print(result)'''


# In[28]:


joongang_dic = []
donga_dic = []

i=0
j=0
count=0

for rss in joongang_url:
  if rss == None:
    break
  else:
    count=0
    parse_rss = feedparser.parse(rss)
    for p in parse_rss.entries:
      if count==20:
        break
      pagelink = p.link
      news_head = p.title
      editor = p.author
      description = ''
      request = requests.get(pagelink)
      html = request.content
      soup = BeautifulSoup(html,'html.parser')
      news_article = soup.find('div',id ='article_body')
      for tag in news_article:
        if tag.string is None:
          continue
        description += tag.string
      description = clean_text(description)
      print(description)
        
      upload_date = soup.find('div',class_='byline').select("em")[1]
      uploaded = upload_date.text
        
      #update_date = soup.find('div',class_='byline').select("em")[2]
      #updated = update_date.text
      
      img = soup.find('div',class_='article_body').find('div',class_='image').find("img")
      img_src = img.get("src")

    
      joongang_dic.append({'title':p.title,'link':p.link,'press':'중앙','category':cl[i],'uploaded':uploaded,'updated':updated,'editor':editor,'img_src':img_src,'content':description,'keyword':'\0','sum_short':'\0','sum_mid':'\0','sum_long':'\0'})
      #collection.insert_one(joongang_dic[j])
      count+=1
      j+=1
    i+=1
i=0
j=0
count=0 


# In[59]:


i=0
j=0
count=0

for rss in donga_url:
  if rss == None:
    break
  else:
    parse_rss = feedparser.parse(rss)
    count=0
    for p in parse_rss.entries:
      if(count==20):
        break
      pagelink = p.link
      news_head = p.title
      description=''
      reader = Goose({'stopwords_class':StopWordsKorean})
      article = reader.extract(pagelink)
      description = article.cleaned_text
      description = clean_text(description)
    
      request = requests.get(pagelink)
      html = request.content
      soup = BeautifulSoup(html,'html.parser')
        
      upload_date = soup.find('div',class_='title_foot').find('span',class_='date01')
      uploaded = upload_date.text
      print(uploaded)
    
      update_date = soup.find('div',class_='title_foot').find_all('span',class_='date01')[1]
      updated = update_date.text
      print(updated)
        
      editor = soup.find('div',class_='title_foot').find('span',class_='report')
      print(editor.text)
        
      img = soup.find('div',class_='article_view').find('span',class_='thumb').find("img")
      img_src = img.get("src")
      print(img_src)
      break
      
      #donga_dic.append({'title':p.title,'link':p.link,'press':'동아','category':cl[i],'uploaded':'\0','updated':'\0','editor':'\0','img_src':img_src,'content':article.cleaned_text,'keyword':'\0','sum_short':'\0','sum_mid':'\0','sum_long':'\0'})
      #collection.insert_one(donga_dic[j])
      count+=1
      #print(donga_dic[j])
      j+=1
    i+=1
i=0
j=0


# In[70]:


kbs_dic = []

client = pymongo.MongoClient("mongodb+srv://han:qpdlf52425@cluster0.kz4b2.mongodb.net/CapstonTest?retryWrites=true&w=majority")
db = client.get_database('CapstonTest')
collection = db.ArticleTest

i=0
j=0
count=0
for rss in kbs_url:
  if rss == None:
    break
  else:
    parse_rss = feedparser.parse(rss)
    count=0
    for p in parse_rss.entries:
      if count==20:
        break
      pagelink = p.link
      news_head = p.title

      request = requests.get(pagelink)
      html = request.content
      soup = BeautifulSoup(html, 'html.parser')
      news_article = soup.find('div',class_='body_txt')
      description=''
      description = news_article.text
      description = clean_text(description)
      print(description+'\n')
      kbs_dic.append({'title':p.title,'link':p.link,'press':'kbs','category':cl[i],'uploaded':'\0','updated':'\0','editor':'\0','img_src':'\0','content':description,'keyword':'\0','sum_short':'\0','sum_mid':'\0','sum_long':'\0'})
      collection.insert_one(kbs_dic[j])
      count+=1
      j+=1
    i+=1
i=0
j=0


# In[75]:


sbs_dic = []
#sbs 크롤링 - 전체카테고리
url = sbs_topic
main = "http://news.sbs.co.kr"
pages=[]

i=0
j=0
count=0

request = requests.get(url)
html = request.content
soup = BeautifulSoup(html,'html.parser')
news_article = soup.find_all('a',class_='mnprcl_link')
for na in news_article:
  pages.append(main+na.get('href'))

for p in pages:
  if(count==20):
    break
  request = requests.get(p)
  html = request.content
  soup = BeautifulSoup(html,'html.parser')
  news_title = soup.find(id='vmNewsTitle')
  news_article = soup.find('div',class_='text_area')
  print(clean_text(news_article.text)+'\n')
  #sbs_dic.append({'title':news_title.text,'link':p,'press':'sbs','category':'전체','uploaded':'\0','updated':'\0','editor':'\0','img_src':'\0','content':news_article.text,'keyword':'\0','sum_short':'\0','sum_mid':'\0','sum_long':'\0'})
  #collection.insert_one(sbs_dic[j])
  count+=1
  #print(sbs_dic[j])
  j+=1


# In[78]:


#sbs 크롤링-나머지 카테고리
i=1
j=0
count=0
sbs_else=[]
for rss in sbs_url:
  if rss == None:
    break
  else:
    parse_rss = feedparser.parse(rss)
    count=0
    for p in parse_rss.entries:
      if(count==20):
        break
      pagelink = p.link
      news_head = p.title
    
      request = requests.get(pagelink)
      html = request.content
      soup = BeautifulSoup(html, 'html.parser')
      news_article = soup.find('div',class_='text_area')
      print(clean_text(news_article.text)+'\n')
      #sbs_else.append({'title':news_title.text,'link':p.link,'press':'sbs','category':cl[i],'uploaded':'\0','updated':'\0','editor':'\0','img_src':'\0','content':clean_text(news_article.text),'keyword':'\0','sum_short':'\0','sum_mid':'\0','sum_long':'\0'})
      #collection.insert_one(sbs_else[j])
      count+=1
      #print(sbs_else[j])
      j+=1
    i+=1
i=0
j=0


# In[82]:


kmib_dic = []
yonhap_dic = []
count = 0 
for rss in kmib_url:
  if rss == None:
    break
  else:
    parse_rss = feedparser.parse(rss)
    count=0
    for p in parse_rss.entries:
      if(count==20):
        break
      pagelink = p.link
      news_head = p.title
      description = ''
      request = requests.get(pagelink)
      html = request.content
      soup = BeautifulSoup(html,'html.parser')
      news_article = soup.find('div',id ='article_body')
      for tag in news_article:
        if tag.string is None:
          continue
        description += tag.string
      description = clean_text(description)
      print(description+'\n')
      #kmib_dic.append({'title':p.title,'link':p.link,'press':'국민','category':cl[i],'uploaded':'\0','updated':'\0','editor':'\0','img_src':'\0','content':clean_text(p.description),'keyword':'\0','sum_short':'\0','sum_mid':'\0','sum_long':'\0'})
      #print(kmib_dic[j])
      #print('\n')
      #collection.insert_one(kmib_dic[j])
      count+=1
      j+=1
    i+=1
i=0
j=0


# In[71]:


i=0
j=0
count=0
for rss in yonhap_url:
  if rss == None:
    break
  else:
    parse_rss = feedparser.parse(rss)
    count=0
    for p in parse_rss.entries:
      if(count==20):
        break
      yonhap_dic.append({'title':p.title,'link':p.link,'press':'연합','category':cl[i],'uploaded':'\0','updated':'\0','editor':'\0','img_src':'\0','content':clean_text(p.description),'keyword':'\0','sum_short':'\0','sum_mid':'\0','sum_long':'\0'})
      print(clean_text(p.description)+'\n')
      #collection.insert_one(yonhap_dic[j])
      count+=1
      j+=1
    i+=1
i=0
j=0


# In[71]:


i=0
j=0
count=0
hani_dic=[]
for rss in hani_url:
  if rss == None:
    break
  else:
    parse_rss = feedparser.parse(rss)
    count=0
    for p in parse_rss.entries:
      if(count==20):
        break
      print(p.dc.category)
      request = requests.get(p.link)
      print(p.link)
      html = request.content
      soup = BeautifulSoup(html,'html.parser')
      news_article = soup.find('div',class_='text')
      news_date = soup.find('p',class_='date-time')
      uploaded =  re.findall("\d+",news_date.text)[:5]
      updated = re.findall("\d+",news_date.text)[5:]
      print(uploaded)
      print(updated)
      #editor = soup.find('meta',property='dable:author')
      #print(editor)
      #print('\n')
      #hani_dic.append({'title':p.title,'link':p.link,'press':'한겨레','category':cl[i],'uploaded':uploaded,'updated':updated,'editor':'\0','img_src':'\0','content':clean_text(news_article.text),'keyword':'\0','sum_short':'\0','sum_mid':'\0','sum_long':'\0'})
      #collection.insert_one(hani_dic[j])
      count+=1
      j+=1
    i+=1
i=0
j=0


# In[ ]:





# In[ ]:




