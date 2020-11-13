#!/usr/bin/env python
# coding: utf-8

# In[1]:


get_ipython().system('pip install feedparser')
get_ipython().system('pip install pymongo')
get_ipython().system('pip install pymongo[srv,tls]')
get_ipython().system('pip install dnspython==2.0.0')
get_ipython().system('pip install requests')
get_ipython().system('pip install goose3')


# In[7]:


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
from collections import Counter


# In[8]:


def clean_text(text):
  content = text
  cleaned_text = re.sub('[a-zA-Z]','',content)
  cleaned_text = re.sub('[\{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"▲△▽▼◁◀▷▶]', '', cleaned_text)
  cleaned_text = cleaned_text.replace("연합뉴스TV 기사문의 및 제보","")
  cleaned_text = cleaned_text.replace("카톡/라인 jebo23 (끝)","")
  cleaned_text = cleaned_text.replace("아티클 공통  관련기사","")
  cleaned_text = cleaned_text.replace("아티클 공통   250","")
  return cleaned_text


# In[9]:


def text2vec(text):
    Word = re.compile(r'\w+')
    words = Word.findall(text)
    return Counter(words)


def get_cosine(vec1, vec2):
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])

    sum1 = sum([vec1[x] ** 2 for x in vec1.keys()])
    sum2 = sum([vec2[x] ** 2 for x in vec2.keys()])
    denominator = math.sqrt(sum1) * math.sqrt(sum2)

    if not denominator:
        return 0.0
    else:
        return float(numerator) / denominator


# In[ ]:


client = pymongo.MongoClient("mongodb+srv://han:qpdlf52425@cluster0.kz4b2.mongodb.net/Duplication?retryWrites=true&w=majority")
db = client.get_database('Duplication')
collection = db.DupTest


# In[11]:


headline=[] #수집한 (제목,제목벡터화)리스트
db_head=[]  #DB비교용 (제목,제목벡터화) 리스트
MostRead=[] #가장 많이 본 기사5개 리스트

request = requests.get('https://news.daum.net/ranking/popular/')
html = request.content
soup = BeautifulSoup(html, 'html.parser')
news_title = soup.select('strong.tit_thumb')
count=0

#뉴스 헤드라인 벡터화
for i in news_title:
    if(count==20):
        break
    title = i.find('a',class_='link_txt')
    v1 = text2vec(title.text)
    headline.append([title.text,v1])
    count+=1

#DB의 모든 뉴스 제목들 벡터화
for x in client.Duplication.DupTest.find({'press':press,'category': category}):
    v2 = text2vec(title)
    db_head.append([title,v2])

#각 제목들을 cosine유사도 비교후 상위 5개기사에 대한 (title,link,img_src)리스트를 반환
i=0
j=0
for(i in range(20) )
    cosine = get_cosine(headline[i][1],db_head[j][1])
if cosine >= 0.5
    MostRead.append([db_head[j][0],link,img_src])


# In[ ]:


MostRead = updateMostRead(MostRead)


# In[ ]:




