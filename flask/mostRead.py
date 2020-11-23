
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

import operator
import math




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


# In[4]:


#수집된 기사 제목 벡터화
def headline_vec():
    request = requests.get('https://news.daum.net/ranking/popular/') #비교대상은 '다음 많이본 뉴스'
    html = request.content
    soup = BeautifulSoup(html,'html.parser')
    news_title = soup.select('strong.tit_thumb')
    headline=[]                                                     #수집한 (제목,제목벡터화)리스트
    count=0
    rank=0
    for i in news_title:
        if(count==30):
            break
        title = i.find('a',class_='link_txt')
        v1 = text2vec(title.text)
        headline.append([title.text,v1,rank])
        count+=1
        rank+=1
    return headline


#DB의 모든 뉴스 제목들 벡터화
def db_vec():
    db_head=[]  #DB비교용 (제목,제목벡터화,링크,이미지소스) 리스트
    client = pymongo.MongoClient("mongodb+srv://han:qpdlf52425@cluster0.kz4b2.mongodb.net/scheduleTest1?retryWrites=true&w=majority")
    for x in client.scheduleTest.collected.find():
        v2 = text2vec(x['title'])
        db_head.append([x['title'],v2,x['_id'],x['img_src'],x['category'],x['press']])
    return db_head
        
                        
#각 제목들을 cosine유사도 비교후 유사도가 0.90가 넘는 기사에 대한 (title,vector,id,img_src,category)리스트를 반환
def candidate_article():
    headline=headline_vec()
    db_head=db_vec()
    MostRead=[]
    for i in range(0,30):
        for j in range(0,len(db_head)):
            cosine = get_cosine(headline[i][1],db_head[j][1]) #headline과 db_head간 벡터값 코사인유사도 비교
            if cosine >= 0.9:
                MostRead.append([db_head[j][0],db_head[j][2],db_head[j][3],headline[i][2],db_head[j][4],db_head[j][5],cosine])
    return MostRead       
#MostRead(제목,링크(고유아이디),이미지링크,순위,카테고리,언론사,유사도)


#Dictionary화
def makeDic():      
    MostRead = candidate_article()
    dic_key=['title','link','img_src','rank','category','press']
    rank=[]      #top5리스트
    for i in range(0,len(MostRead)):
        rank.append(dict(zip(dic_key,MostRead[i])))
    return rank

#순위 재부여
def rerank(rank):
    for k in range(0,len(rank)):
        rank[k]['rank']=k+1
    return rank

def insertMostRead(rank):
    client = pymongo.MongoClient("mongodb+srv://han:qpdlf52425@cluster0.kz4b2.mongodb.net/scheduleTest?retryWrites=true&w=majority")
    db = client.get_database('scheduleTest')
    collection = db.mostread
    for i in range(0,len(rank)):
         collection.insert_one(rank[i])

def getMostRead():
    insertMostRead(rerank(makeDic()))
