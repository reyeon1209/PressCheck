from collections import Counter
import random
from presscheck.utils.db import *


# 하루단위
def headline():
    for idx in range(len(cl)):
        headline = []
        total_headline = []
        random_headline = []
        random_link = []
        for content in collection.find({"category": cl[idx]}):
            headline_link = []
            headline_link.append(content['title'])
            headline_link.append(content['link'])
            total_headline.append(headline_link)
            
        r = random.sample(total_headline, 3)
 
        random_headline.append(r[0][0])
        random_headline.append(r[1][0])
        random_headline.append(r[2][0])
        random_link.append(r[0][1])
        random_link.append(r[1][1])
        random_link.append(r[2][1])

        mongoDB.todays.insert_one({"category": cl[idx], 'link' : random_link , 'keyword' : '\0', 'timeKeywords' : '\0', 'headline' : random_headline })


# 하루단위
def todays_keyword():
    for idx in range(len(cl)):
        frequency_keyword = []
        frequency_dictionary = {}
        for content in collection.find({"category": cl[idx]}):
            for i in content['keyword']:
                frequency_keyword.append(i)
        cnt = Counter(frequency_keyword[3:])
        frequency_dictionary = cnt.most_common(7)
        # print(frequency_dictionary[4:])
        mongoDB.todays.update_one({'category' : cl[idx] }, {'$set' : {'keyword' : frequency_dictionary[4:] }})


def timedict1():
    timedict = {'title': '6시~12시', 'keyword': [0, 0, 0, 0, 0], 'keywordFreq': [0, 0, 0, 0, 0]}
    return timedict


def timedict2():
    timedict = {'title': '12시~18시', 'keyword': [0, 0, 0, 0, 0], 'keywordFreq': [0, 0, 0, 0, 0]}
    return timedict


def timedict3():
    timedict = {'title': '18시~24시', 'keyword': [0, 0, 0, 0, 0], 'keywordFreq': [0, 0, 0, 0, 0]}
    return timedict

# keyword 딕셔너리
def keyword_dictionary(today_keyword_cnt):
    for i in today_keyword_cnt:
        for j in i:
            keyword_list = []
            for k in total_keyword_cnt:
                flag = 0
                for kk in k:
                    if j[0] == kk[0]:
                        flag = 1
                        keyword_list.append(kk[1])
                if flag == 0:
                    keyword_list.append(0)
            keyword_dict[j[0]] = keyword_list
    return keyword_dict


# 6시간 단위
def keyword_series():
    global mongo_cnt
    mongo_cnt += 1
    keyword1 = []
    keyword_number1 = []
    keyword2 = []
    keyword_number2 = []
    keyword3 = []
    keyword_number3 = []
    keyword4 = []
    keyword_number4 = []

    for idx in range(len(cl)):
        all_frequency_keyword = []
        for content in collection.find({"category": cl[idx]}):
            for i in content['keyword']:
                all_frequency_keyword.append(i)

        today_keyword_cnt = []
        keyword_cnt = Counter(all_frequency_keyword[3:]).most_common(9)
        today_keyword_cnt.append(keyword_cnt[4:])
        #print(today_keyword_cnt)
        total_keyword_cnt = []
        total_cnt = Counter(all_frequency_keyword[3:]).most_common(30)
        total_keyword_cnt.append(total_cnt[4:])

        keyword_dict = keyword_dictionary(today_keyword_cnt)

            keyword = []
            for key in keyword_dict.keys():
                keyword.append(key)
            for val in keyword_dict.values():
                keyword_number.append(val[0])

            if mongo_cnt == 1:    
                keyword1 = keyword 
                keyword_number1 = keyword_number 
            if mongo_cnt == 2:       
                keyword2 = keyword
                keyword_number2 = keyword_number
            if mongo_cnt == 3:   
                keyword3 = keyword
                keyword_number3 = keyword_number
            if mongo_cnt == 4:   
                keyword4 = keyword
                keyword_number4 = keyword_number

        timeKeywords = []

        if mongo_cnt == 1:
            timedict = {'title': '0시~6시', 'keyword': keyword1, 'keywordFreq': keyword_number1}
            timeKeywords.append(timedict)
            timeKeywords.append(timedict1())
            timeKeywords.append(timedict2())
            timeKeywords.append(timedict3())
        if mongo_cnt == 2:
            timedict = {'title': '0시~6시', 'keyword': keyword1, 'keywordFreq': keyword_number1}
            timeKeywords.append(timedict)
            timedict = {'title': '6시~12시', 'keyword': keyword2, 'keywordFreq': keyword_number2}
            timeKeywords.append(timedict)
            timeKeywords.append(timedict2)
            timeKeywords.append(timedict3)
        if mongo_cnt == 3:
            timedict = {'title': '0시~6시', 'keyword': keyword1, 'keywordFreq': keyword_number1}
            timeKeywords.append(timedict)
            timedict = {'title': '6시~12시', 'keyword': keyword2, 'keywordFreq': keyword_number2}
            timeKeywords.append(timedict)
            timedict = {'title': '12시~18시', 'keyword': keyword3, 'keywordFreq': keyword_number3}
            timeKeywords.append(timedict)
            timeKeywords.append(timedict2)
            timeKeywords.append(timedict3)
        if mongo_cnt == 4:
            timedict = {'title': '0시~6시', 'keyword': keyword1, 'keywordFreq': keyword_number1}
            timeKeywords.append(timedict)
            timedict = {'title': '6시~12시', 'keyword': keyword2, 'keywordFreq': keyword_number2}
            timeKeywords.append(timedict)
            timedict = {'title': '12시~18시', 'keyword': keyword3, 'keywordFreq': keyword_number3}
            timeKeywords.append(timedict)
            timedict =  {'title': '18시~24시', 'keyword': keyword4, 'keywordFreq': keyword_number4}
            timeKeywords.append(timedict)
        print(timeKeywords)
        mongoDB.todays.update_one({"category": cl[idx]}, {'$set': {'timeKeywords': timeKeywords}})


if __name__ == '__main__':
    mongoDB = myMongoDB("CapstoneTest")
    collection = mongoDB.collected
    todays = mongoDB.todays

    cl = ['전체', '정치', '사회', '경제', '국제', '스포츠', '문화']

    timeKeywords = []
    mongo_cnt = 0
