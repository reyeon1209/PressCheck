#!/usr/bin/env python
# coding: utf-8

# In[4]:


#get_ipython().system('pip install flask')
#get_ipython().system('pip install krwordrank')
#get_ipython().system('pip install konlpy')

# -*- coding: utf-8 -*-
from flask import Flask
import pymongo
from nltk.tokenize import sent_tokenize
from krwordrank.word import KRWordRank
from konlpy.tag import Okt
import fasttext.util
import numpy as np
from apscheduler.schedulers.background import BackgroundScheduler
from models import todays
from models import Analysis as an
from konlpy.tag import Hannanum

word_dict = {}
strip_clean_sentence = []
total_clean_sentence = []
string_id = []


def clean_text(text):
    content = text
    cleaned_text = re.sub('[a-zA-Z]', '', content)
    cleaned_text = re.sub('[\{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"▲△▽▼◁◀▷▶]', '', cleaned_text)
    cleaned_text = cleaned_text.replace("연합뉴스TV 기사문의 및 제보", "")
    cleaned_text = cleaned_text.replace("카톡/라인 jebo23 (끝)", "")
    cleaned_text = cleaned_text.replace("아티클 공통  관련기사", "")
    cleaned_text = cleaned_text.replace("아티클 공통   250", "")
    return cleaned_text


def insert_summary():
    client = pymongo.MongoClient(
        "mongodb+srv://han:qpdlf52425@cluster0.kz4b2.mongodb.net/scheduleTest?retryWrites=true&w=majority")
    db = client.get_database('scheduleTest')
    collection = db.mostread1

    total_clean_sentence = []
    string_id = []

    for content in collection.find({}, {"_id": 1, "content": 1}):
        string = ""
        sent_list = []
        content_list = []
        clean_sentence = []
        cleaned_sentence = []
        string_id.append(list(content.values())[0])
        string = list(content.values())[1]
        string = string.replace(u'\xa0', u' ')
        string = string.replace(u'\n', u' ')
        clean_sentence.append(sent_tokenize(string))
        for i in clean_sentence:
            for j in i:
                if '기자' not in j:
                    cleaned_sentence.append(j)
            total_clean_sentence.append(cleaned_sentence)

    temp = []
    okt = Okt()
    hannanum = Hannanum()
    for clean_sentence in total_clean_sentence:
        for s in clean_sentence:
            noun = hannanum.nouns(s)
            for i in noun:
                temp.append(i)

    for i in temp:
        word_vector_arr = np.asarray(ft[i], dtype='float32')
        word_dict[i] = word_vector_arr

    string_idx = 0

    for clean_sentence in total_clean_sentence:
        summaryShort_list = ""
        summaryMed_list = ""
        summaryLong_list = ""
        article_embedding = an.articles_to_vectors(clean_sentence)
        similar_matrix = an.similarity_matrix(article_embedding)
        score = an.calculate_score(similar_matrix)
        summaryShort_list = an.summaryShort(clean_sentence, score)
        summaryMed_list = an.summaryMed(clean_sentence, score)
        summaryLong_list = an.summaryLong(clean_sentence, score)
        collection.update_one({'_id': string_id[string_idx]}, {
            '$set': {'sum_short': summaryShort_list, 'sum_mid': summaryMed_list, 'sum_long': summaryLong_list}})
        string_idx += 1


def insert_keyword():
    client = pymongo.MongoClient(
        "mongodb+srv://han:qpdlf52425@cluster0.kz4b2.mongodb.net/scheduleTest1?retryWrites=true&w=majority")
    db = client.get_database('scheduleTest1')
    collection = db.test5

    okt = Okt()
    min_count = 3  # 단어의 최소 출현 빈도수 (그래프 생성 시)
    max_length = 10  # 단어의 최대 길이
    string_idx = 0

    stop_words = ['이', '있', '하', '것', '들', '그', '되', '수', '이', '보', '않', '없', '나', '사람', '주',
                  '아니', '등', '같', '우리', '때', '년', '가', '한', '지', '대하', '오', '말', '일',
                  '그렇', '위하', '대한', '확', '관련', '이상', '미만', '경우', '텔레', '다시', '때문',
                  '제대로', '관', '지난', '비준', '지난해', '위해', '곳곳', '현재', '당일', '주요', '일대',
                  '요즘', '거기', '내', '지금', '정도', '이번', '처음', '모두', '통해'
        , '더욱', '앞서', '진짜', '한번', '원래', '사실', '옆', '정말', '올해', '스',
                  '민', '초', '최근', '앞', '역시', '이후', '군', '최고', '가장', '중', '양',
                  '대해', '사이', '얼마', '아주', '대비', '셈', '각국', '실거주', '실수요자', '실',
                  '셀', '내년', '유독', '언제', '문득', '늘', '다른', '동안', '덩',
                  '역시', '당시', '최', '변', '살', '이번', '점차', '건수', '번', '쥴', '리', '상대로', '송',
                  '이제', '매년', '곳', '오늘', '듯', '아무', '괜', '하나', '차지', '오히려',
                  '순간', '속', '누군가', '밥주', '스마', '문하', '정유', '주얼', '좀더', '먼저', '디섐보', '일주'
                                                                                     '섯알', '가운데', '보이', '것처', '해도',
                  '대부분', '섯알', '먼저', '노', '해당', '거', '올레', '가가',
                  '씨', '랄라블', '대규모', '뭔가', '디섐보', '퍼터', '김재', '종', '매사', '스스로', '하자',
                  '기', '날', '코로', '물이', '간사']

    for clean_sentence in total_clean_sentence:
        cleaned_sentence = []
        noun_keyword_list = []
        stop_keyword_list = []
        keyword_list = []
        wordrank_extractor = KRWordRank(min_count=min_count, max_length=max_length)
        beta = 0.85
        max_iter = 10

        try:
            keywords, rank, graph = wordrank_extractor.extract(clean_sentence, beta, max_iter)
        except ValueError:
            collection.update_one({'_id': string_id[string_idx]}, {'$set': {'keyword': ''}})
            string_idx += 1
            continue

        for word, r in sorted(keywords.items(), key=lambda x: x[1], reverse=True)[:]:
            keyword_list.append(word)
        for i in keyword_list:
            a = okt.pos(i)
            if a[0][1] == 'Noun':
                noun_keyword_list.append(a[0][0])

        for i in noun_keyword_list:
            if i not in stop_words:
                stop_keyword_list.append(i)
        if len(stop_keyword_list) == 0:
            stop_keyword_list.append('')

        s1 = set(stop_keyword_list)
        s1_list = list(s1)
        s2_list = s1_list[:5]

        collection.update_one({'_id': string_id[string_idx]}, {'$set': {'keyword': s1_list, 'point_keyword': s2_list}})
        string_idx += 1

# In[ ]:




