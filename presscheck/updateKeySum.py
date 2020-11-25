# -*- coding: utf-8 -*-
import fasttext
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import sent_tokenize
from krwordrank.word import KRWordRank
from konlpy.tag import Okt
import networkx as nx
import numpy as np
from konlpy.tag import Hannanum
import re
from presscheck.utils.db import *

word_dict = {}
embedding_dim = 300
zero_vector = np.zeros(embedding_dim)

def insert_summary():
    mongoDB = myMongoDB("CapstoneTest")
    #fasttext.util.download_model('ko', if_exists='ignore')
    ft = fasttext.load_model('cc.ko.300.bin')

    total_clean_sentence = []
    string_id = []

    for content in mongoDB.collected.find({}, {"_id": 1, "content": 1}):
        cleaned_sentence = []
        clean_sentence = []
        string_id.append(list(content.values())[0])
        string = list(content.values())[1]
        string = string.replace(u'\xa0', u' ')
        string = string.replace(u'\n', u' ')
        string = string.replace(u'\r', u' ')
        clean_sentence.append(sent_tokenize(string))
        for i in clean_sentence:
            for j in i:
                cleaned_sentence.append(j)
            total_clean_sentence.append(cleaned_sentence)

    temp = []
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
        article_embedding = articles_to_vectors(clean_sentence)
        similar_matrix = similarity_matrix(article_embedding)
        score = calculate_score(similar_matrix)
        summaryShort_list = summaryShort(clean_sentence, score)
        summaryMed_list = summaryMed(clean_sentence, score)
        summaryLong_list = summaryLong(clean_sentence, score)
        mongoDB.collected.update_one({'_id': string_id[string_idx]}, {
            '$set': {'sum_short': summaryShort_list, 'sum_mid': summaryMed_list, 'sum_long': summaryLong_list}})
        string_idx += 1


def insert_keyword():
    mongoDB = myMongoDB("CapstoneTest")
    
    okt = Okt()
    min_count = 1  # 단어의 최소 출현 빈도수 (그래프 생성 시)
    max_length = 10  # 단어의 최대 길이
    string_idx = 0
    total_clean_sentence = []
    string_id = []

    stop_words = [
        '이', '있', '하', '것', '들', '그', '되', '수', '이', '보', '않', '없', '나', '사람', '주','섯알', '가운데', '보이',
        '아니', '등', '같', '우리', '때', '년', '가', '한', '지', '대하', '오', '말', '일', '김재', '종', '매사', '스스로', '하자',
        '그렇', '위하', '대한', '확', '관련', '이상', '미만', '경우', '텔레', '다시', '때문', '대규모', '뭔가', '디섐보', '퍼터',
        '제대로', '관', '지난', '비준', '지난해', '위해', '곳곳', '현재', '당일', '주요', '일대', '기', '날', '코로', '물이', '간사',
        '요즘', '거기', '내', '지금', '정도', '이번', '처음', '모두', '통해', '더욱', '앞서', '진짜', '거', '올레', '가가', '해도',
        '한번', '원래', '사실', '옆', '정말', '올해', '스', '민', '초', '최근', '앞', '역시', '이후', '군', '먼저', '노', '해당',
        '최고', '가장', '중', '양', '대해', '사이', '얼마', '아주', '대비', '셈', '각국', '실거주', '실수요자', '실', '대부분', '섯알',
        '셀', '내년', '유독', '언제', '문득', '늘', '다른', '동안', '덩', '역시', '당시', '최', '변', '살', '이번', '씨', '랄라블',
        '점차', '건수', '번', '쥴', '리', '상대로', '송', '이제', '매년', '곳', '오늘', '듯', '아무', '괜', '하나', '차지', '오히려',
        '순간', '속', '누군가', '밥주', '스마', '문하', '정유', '주얼', '좀더', '먼저', '디섐보', '일주', '것처', '에브리'
        '이전', '비대', '각종', '임', '누구', '일일', '필', '부', '트럼', '초등학', '이하', '에브리'
    ]

    for content in mongoDB.collected.find({}, {"_id": 1, "content": 1}):
        cleaned_sentence = []
        clean_sentence = []
        string_id.append(list(content.values())[0])
        string = list(content.values())[1]
        string = string.replace(u'\xa0', u' ')
        string = string.replace(u'\n', u' ')
        string = string.replace(u'\r', u' ')
        clean_sentence.append(sent_tokenize(string))
        for i in clean_sentence:
            for j in i:
                cleaned_sentence.append(j)
            total_clean_sentence.append(cleaned_sentence)

    for clean_sentence in total_clean_sentence:
        noun_keyword_list = []
        stop_keyword_list = []
        keyword_list = []
        wordrank_extractor = KRWordRank(min_count=min_count, max_length=max_length)
        beta = 0.85
        max_iter = 10

        try:
            keywords, rank, graph = wordrank_extractor.extract(clean_sentence, beta, max_iter)
        except ValueError:
            mongoDB.collected.update_one({'_id': string_id[string_idx]}, {'$set': {'keyword': 'keywords'}})
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

        mongoDB.collected.update_one({'_id': string_id[string_idx]}, {'$set': {'keyword': s1_list, 'point_keyword': s2_list}})
        string_idx += 1


# 단어 백터들의 평균을 구함으로서 문장 벡터를 얻는다.
def calculate_article_vector(sentence):
    if len(sentence) != 0:
        return sum([word_dict.get(word, zero_vector) for word in sentence]) / len(sentence)
    else:
        return zero_vector


# 모든 기사에 대한 문장 벡터를 반환
def articles_to_vectors(sentences):
    return [calculate_article_vector(sentence)
            for sentence in sentences]


# 문장 벡터들 간의 코사인 유사도를 구한 유사도 행렬
def similarity_matrix(sentence_embedding):
    sim_mat = np.zeros([len(sentence_embedding), len(sentence_embedding)])
    for i in range(len(sentence_embedding)):
        for j in range(len(sentence_embedding)):
            sim_mat[i][j] = cosine_similarity(sentence_embedding[i].reshape(1, embedding_dim),
                                              sentence_embedding[j].reshape(1, embedding_dim))[0, 0]
    return sim_mat


# 페이지 랭크 알고리즘을 입력으로 사용하여 각 문장의 점수를 구한다.
def calculate_score(sim_matrix):
    nx_graph = nx.from_numpy_array(sim_matrix)
    scores = nx.pagerank(nx_graph)
    return scores


# score점수가 가장 높은 상위 1개의 문장
def summaryShort(sentences, scores):
    top_scores = sorted(((scores[i], s) for i, s in enumerate(sentences)), reverse=True)
    top_1_sentences = [sentence
                       for score, sentence in top_scores[:1]]
    return " ".join(top_1_sentences)


# score점수가 가장 높은 상위 2개의 문장
def summaryMed(sentences, scores):
    top_scores = sorted(((scores[i], s) for i, s in enumerate(sentences)), reverse=True)
    top_2_sentences = [sentence for score, sentence in top_scores[:2]]
    return " ".join(top_2_sentences)


# score점수가 가장 높은 상위 3개의 문장
def summaryLong(sentences, scores):
    top_scores = sorted(((scores[i], s) for i, s in enumerate(sentences)), reverse=True)
    top_3_sentences = [sentence for score, sentence in top_scores[:3]]
    return " ".join(top_3_sentences)
