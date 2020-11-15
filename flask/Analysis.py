import numpy as np
import re
import pandas as pd
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
import networkx as nx
import sys
import os

import server

embedding_dim = 300
zero_vector = np.zeros(embedding_dim)

# 단어 백터들의 평균을 구함으로서 문장 벡터를 얻는다.
def calculate_article_vector(sentence):
    if len(sentence) != 0:
        return sum([server.word_dict.get(word, zero_vector) 
                for word in sentence])/len(sentence)
    else:
        return zero_vector

# 모든 기사에 대한 문장 벡터를 반환
def articles_to_vectors( sentences):      
    return [calculate_article_vector(sentence) 
            for sentence in sentences]

# 문장 벡터들 간의 코사인 유사도를 구한 유사도 행렬
def similarity_matrix( sentence_embedding):
    sim_mat = np.zeros([len(sentence_embedding), len(sentence_embedding)])
    for i in range(len(sentence_embedding)):
        for j in range(len(sentence_embedding)):
            sim_mat[i][j] = cosine_similarity(sentence_embedding[i].reshape(1, embedding_dim),
                                        sentence_embedding[j].reshape(1, embedding_dim))[0,0]
    return sim_mat

# 페이지 랭크 알고리즘을 입력으로 사용하여 각 문장의 점수를 구한다. 
def calculate_score(sim_matrix):      
    nx_graph = nx.from_numpy_array(sim_matrix)
    scores = nx.pagerank(nx_graph)
    return scores


#score점수가 가장 높은 상위 1개의 문장
def summaryShort(sentences, scores):      
    top_scores =  sorted(((scores[i],s) 
                        for i,s in enumerate(sentences)), 
                                reverse=True)
    top_1_sentences = [sentence 
                        for score,sentence in top_scores[:1]]
    return " ".join(top_1_sentences)


#score점수가 가장 높은 상위 2개의 문장
def summaryMed(sentences, scores):
    top_scores =  sorted(((scores[i],s) 
                        for i,s in enumerate(sentences)), 
                                reverse=True)
    top_2_sentences = [sentence 
                        for score,sentence in top_scores[:2]]
    return " ".join(top_2_sentences)

#score점수가 가장 높은 상위 3개의 문장
def summaryLong( sentences, scores):
    top_scores =  sorted(((scores[i],s) 
                        for i,s in enumerate(sentences)), 
                                reverse=True)
    top_3_sentences = [sentence 
                        for score,sentence in top_scores[:3]]
    return " ".join(top_3_sentences)


