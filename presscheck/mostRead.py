#!/usr/bin/env python
# coding: utf-8

import requests
import re
from bs4 import BeautifulSoup
from collections import Counter
import math
from presscheck.utils.db import *


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


# 수집된 기사 제목 벡터화
def headline_vec():
    request = requests.get('https://news.daum.net/ranking/popular/')  # 비교대상은 '다음 많이본 뉴스'
    html = request.content
    soup = BeautifulSoup(html, 'html.parser')
    news_title = soup.select('strong.tit_thumb')
    headline = []  # 수집한 (제목,제목벡터화)리스트
    count = 0
    rank = 0
    for i in news_title:
        if count == 30:
            break
        title = i.find('a', class_='link_txt')
        v1 = text2vec(title.text)
        headline.append([title.text, v1, rank])
        count += 1
        rank += 1
    return headline


# DB의 모든 뉴스 제목들 벡터화
def db_vec():
    db_head = []  # DB비교용 (제목,제목벡터화값,고유id,이미지소스,카테고리,언론사,링크) 리스트
    for x in mongoDB.collected.find():
        v2 = text2vec(x['title'])
        db_head.append([x['title'], v2, x['_id'], x['img_src'], x['category'], x['press'], x['link']])
    return db_head


# 각 제목들을 cosine유사도 비교후 유사도가 0.90가 넘는 기사에 반환
# 다음헤드라인뉴스[( 제목,제목벡터값,순위 )]
# DB헤드라인뉴스[ (제목,제목벡터화값,고유id,이미지소스,카테고리,언론사,링크) ]
# MostRead[ (제목,고유id,이미지소스,랭크,카테고리,언론사,링크) ]
# unique [(제목,고유id,이미지소스,랭크 ,카테고리,언론사,링크 )]
def candidate_article():
    headline = headline_vec()
    db_head = db_vec()
    MostRead = []
    for i in range(0, 30):
        for j in range(0, len(db_head)):
            cosine = get_cosine(headline[i][1], db_head[j][1])
            if cosine >= 0.9:
                MostRead.append([db_head[j][0], db_head[j][2], db_head[j][3],
                                 headline[i][2], db_head[j][4], db_head[j][5], db_head[j][6]])
    i = 0
    j = 0

    temp = []  # 링크저장용
    unique = []  # 최종랭크기사
    for i in range(0, len(MostRead)):
        if MostRead[i][6] not in temp:
            temp.append(MostRead[i][6])
            unique.append([MostRead[i][0], MostRead[i][1], MostRead[i][2], MostRead[i][3], MostRead[i][4],
                           MostRead[i][5], MostRead[i][6]])
    return unique


def makeDic():
    MostRead = candidate_article()
    dic_key = ['title', 'link', 'img_src', 'rank', 'category', 'press', 'url']
    rank = []  # top5리스트
    for i in range(0, len(MostRead)):
        rank.append(dict(zip(dic_key, MostRead[i])))
    return rank


# 순위 재부여
def rerank(rank):
    for k in range(0, len(rank)):
        rank[k]['rank'] = k + 1
    return rank


def insertMostRead(rank):
    mongoDB = myMongoDB("CapstoneTest")
    for i in range(0, len(rank)):
        mongoDB.mostRead.insert_one(rank[i])


def getMostRead():
    mongoDB.mostRead.delete_many({})
    insertMostRead(rerank(makeDic()))


if __name__ == '__main__':
    mongoDB = myMongoDB("CapstoneTest")
    getMostRead()
