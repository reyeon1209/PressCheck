# -*- coding: utf-8 -*-
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import networkx as nx
import fasttext.util
from konlpy.tag import Okt


# 단어 백터들의 평균을 구함으로서 문장 벡터를 얻는다.
def calculate_article_vector(sentence):
    if len(sentence) != 0:
        return sum([word_dict.get(word, zero_vector) for word in sentence]) / len(sentence)
    else:
        return zero_vector


# 모든 기사에 대한 문장 벡터를 반환
def articles_to_vectors(sentences):
    return [calculate_article_vector(sentence) for sentence in sentences]


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
    top_1_sentences = [sentence for score, sentence in top_scores[:1]]
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


if __name__ == '__main__':
    # example contents
    lines = [
        '오패산터널 총격전 용의자 검거 서울 연합뉴스 경찰 관계자들이 19일 오후 서울 강북구 오패산 터널 인근에서 사제 총기를 발사해 경찰을 살해한 용의자 성모씨를 검거하고 있다 성씨는 검거 당시 서바이벌 게임에서 쓰는 방탄조끼에 헬멧까지 착용한 상태였다',
        '서울 연합뉴스 김은경 기자 사제 총기로 경찰을 살해한 범인 성모 46 씨는 주도면밀했다',
        '경찰에 따르면 성씨는 19일 오후 강북경찰서 인근 부동산 업소 밖에서 부동산업자 이모 67 씨가 나오기를 기다렸다 이씨와는 평소에도 말다툼을 자주 한 것으로 알려졌다',
        '이씨가 나와 걷기 시작하자 성씨는 따라가면서 미리 준비해온 사제 총기를 이씨에게 발사했다 총알이 빗나가면서 이씨는 도망갔다 그 빗나간 총알은 지나가던 행인 71 씨의 배를 스쳤다',
        '성씨는 강북서 인근 치킨집까지 이씨 뒤를 쫓으며 실랑이하다 쓰러뜨린 후 총기와 함께 가져온 망치로 이씨 머리를 때렸다',
        '이 과정에서 오후 6시 20분께 강북구 번동 길 위에서 사람들이 싸우고 있다 총소리가 났다 는 등의 신고가 여러건 들어왔다',
        '5분 후에 성씨의 전자발찌가 훼손됐다는 신고가 보호관찰소 시스템을 통해 들어왔다 성범죄자로 전자발찌를 차고 있던 성씨는 부엌칼로 직접 자신의 발찌를 끊었다',
        '용의자 소지 사제총기 2정 서울 연합뉴스 임헌정 기자 서울 시내에서 폭행 용의자가 현장 조사를 벌이던 경찰관에게 사제총기를 발사해 경찰관이 숨졌다 19일 오후 6시28분 강북구 번동에서 둔기로 맞았다 는 폭행 피해 신고가 접수돼 현장에서 조사하던 강북경찰서 번동파출소 소속 김모 54 경위가 폭행 용의자 성모 45 씨가 쏜 사제총기에 맞고 쓰러진 뒤 병원에 옮겨졌으나 숨졌다 사진은 용의자가 소지한 사제총기',
        '신고를 받고 번동파출소에서 김창호 54 경위 등 경찰들이 오후 6시 29분께 현장으로 출동했다 성씨는 그사이 부동산 앞에 놓아뒀던 가방을 챙겨 오패산 쪽으로 도망간 후였다',
        '김 경위는 오패산 터널 입구 오른쪽의 급경사에서 성씨에게 접근하다가 오후 6시 33분께 풀숲에 숨은 성씨가 허공에 난사한 10여발의 총알 중 일부를 왼쪽 어깨 뒷부분에 맞고 쓰러졌다',
        '김 경위는 구급차가 도착했을 때 이미 의식이 없었고 심폐소생술을 하며 병원으로 옮겨졌으나 총알이 폐를 훼손해 오후 7시 40분께 사망했다',
        '김 경위는 외근용 조끼를 입고 있었으나 총알을 막기에는 역부족이었다',
        '머리에 부상을 입은 이씨도 함께 병원으로 이송됐으나 생명에는 지장이 없는 것으로 알려졌다',
        '성씨는 오패산 터널 밑쪽 숲에서 오후 6시 45분께 잡혔다',
        '총격현장 수색하는 경찰들 서울 연합뉴스 이효석 기자 19일 오후 서울 강북구 오패산 터널 인근에서 경찰들이 폭행 용의자가 사제총기를 발사해 경찰관이 사망한 사건을 조사 하고 있다',
        '총 때문에 쫓던 경관들과 민간인들이 몸을 숨겼는데 인근 신발가게 직원 이모씨가 다가가 성씨를 덮쳤고 이어 현장에 있던 다른 상인들과 경찰이 가세해 체포했다',
        '성씨는 경찰에 붙잡힌 직후 나 자살하려고 한 거다 맞아 죽어도 괜찮다 고 말한 것으로 전해졌다',
        '성씨 자신도 경찰이 발사한 공포탄 1발 실탄 3발 중 실탄 1발을 배에 맞았으나 방탄조끼를 입은 상태여서 부상하지는 않았다',
        '경찰은 인근을 수색해 성씨가 만든 사제총 16정과 칼 7개를 압수했다 실제 폭발할지는 알 수 없는 요구르트병에 무언가를 채워두고 심지를 꽂은 사제 폭탄도 발견됐다',
        '일부는 숲에서 발견됐고 일부는 성씨가 소지한 가방 안에 있었다'

    ]

    # load model
    ft = fasttext.load_model('./models/cc.ko.300.bin')

    # tokenize & create word dictionary (only noun)
    okt = Okt()
    temp = []
    for line in lines:
        tokenlist = okt.pos(line, stem=True, norm=True)  # 단어 토큰화
        for word in tokenlist:
            if word[1] in ["Noun"]:  # 명사일 때만
                temp.append((word[0]))  # 해당 단어를 저장함

    # make word to vector
    word_dict = {}
    for i in temp:
        word_vector_arr = np.asarray(ft[i], dtype='float32')
        word_dict[i] = word_vector_arr

    # parameter setting &
    embedding_dim = 300
    zero_vector = np.zeros(embedding_dim)
    sentence_vector = calculate_article_vector(temp)
    sentence_embedding = articles_to_vectors(lines)
    similar_matrix = similarity_matrix(sentence_embedding)
    score = calculate_score(similar_matrix)
    threeString = summaryLong(lines, score)
    print(threeString)
