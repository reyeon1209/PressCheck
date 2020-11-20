
from flask import Flask
import pymongo
import numpy as np
from collections import Counter
import random 

app = Flask(__name__)
client = pymongo.MongoClient("mongodb+srv://choi95:qpdlf52425@cluster0.kz4b2.mongodb.net/<dbname>?retryWrites=true&w=majority")
db = client.get_database('CapstonTest') 
collection = db.ArticleTest
today_collection = db.TodaysTest

all_max_frequency_keyword = []
policy_max_frequency_keyword = []
society_max_frequency_keyword = []
economy_max_frequency_keyword = []
global_max_frequency_keyword = []
sports_max_frequency_keyword = []
culture_max_frequency_keyword = []

all__headline = []
policy_headline = []
society_headline = []
economy_headline = []
global_headline = []
sports_headline = []
culture_headline = []

times_dict = {} 
times_count = []
times_cnt = []
times_total = []

# 하루단위 
def todaysClear():


    all__headline.clear()
    policy_headline.clear()
    society_headline.clear()
    economy_headline.clear()
    global_headline.clear()
    sports_headline.clear()
    culture_headline.clear()
    times_cnt.clear()
    times_total.clear()
    mongo_cnt = 0  # 시간별 키워드 insert

# 6시간 단위    
def todaysdictClear():
    time_dict.clear()
    time_count.clear()
    mongo_cnt += 1  # 시간별 키워드 update

# 6시간 단위
def todaysTimes():

    all_frequency_keyword = []
    for content in collection.find({"category": '전체'}): 
        for i in content['keyword']:
            all_frequency_keyword.append(i)

    today_keyword_cnt = []
    keyword_cnt = Counter(all_frequency_keyword).most_common(8)
    today_keyword_cnt.append(keyword_cnt[4:])
    total_keyword_cnt = []
    total_cnt = Counter(all_frequency_keyword).most_common(50)
    total_keyword_cnt.append(total_cnt)

    keyword_dict = {}
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

    if mongo_cnt == 0:
        today_collection.insert_one{"category": '전체','time_keyword' : keyword_dict }   
    else 
        today_collection.update_one{"category": '전체','time_keyword' : keyword_dict }   

 
    all_frequency_keyword = []
    for content in collection.find({"category": '정치'}): 
        for i in content['keyword']:
            all_frequency_keyword.append(i)

    today_keyword_cnt = []
    keyword_cnt = Counter(all_frequency_keyword).most_common(8)
    today_keyword_cnt.append(keyword_cnt[4:])
    total_keyword_cnt = []
    total_cnt = Counter(all_frequency_keyword).most_common(50)
    total_keyword_cnt.append(total_cnt)

    keyword_dict = {}
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

    if mongo_cnt == 0:
        today_collection.insert_one{"category": '정치','time_keyword' : keyword_dict }   
    else
        today_collection.update_one{"category": '정치','time_keyword' : keyword_dict }   


    all_frequency_keyword = []
    for content in collection.find({"category": '사회'}): 
        for i in content['keyword']:
            all_frequency_keyword.append(i)

    today_keyword_cnt = []
    keyword_cnt = Counter(all_frequency_keyword).most_common(8)
    today_keyword_cnt.append(keyword_cnt[4:])
    total_keyword_cnt = []
    total_cnt = Counter(all_frequency_keyword).most_common(50)
    total_keyword_cnt.append(total_cnt)

    keyword_dict = {}
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

    if mongo_cnt == 0:
        today_collection.insert_one{"category": '사회','time_keyword' : keyword_dict }   
    else 
        today_collection.update_one{"category": '사회','time_keyword' : keyword_dict }   


   for content in collection.find({"category": '경제'}): 
        for i in content['keyword']:
            all_frequency_keyword.append(i)

    today_keyword_cnt = []
    keyword_cnt = Counter(all_frequency_keyword).most_common(8)
    today_keyword_cnt.append(keyword_cnt[4:])
    total_keyword_cnt = []
    total_cnt = Counter(all_frequency_keyword).most_common(50)
    total_keyword_cnt.append(total_cnt)

    keyword_dict = {}
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

    if mongo_cnt == 0:
        today_collection.insert_one{"category": '경제','time_keyword' : keyword_dict }   
    else 
        today_collection.update_one{"category": '경제','time_keyword' : keyword_dict }   

    all_frequency_keyword = []
    for content in collection.find({"category": '국제'}): 
        for i in content['keyword']:
            all_frequency_keyword.append(i)

    today_keyword_cnt = []
    keyword_cnt = Counter(all_frequency_keyword).most_common(8)
    today_keyword_cnt.append(keyword_cnt[4:])
    total_keyword_cnt = []
    total_cnt = Counter(all_frequency_keyword).most_common(50)
    total_keyword_cnt.append(total_cnt)

    keyword_dict = {}
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

    if mongo_cnt == 0:
        today_collection.insert_one{"category": '국제','time_keyword' : keyword_dict }   
    else 
        today_collection.update_one{"category": '국제','time_keyword' : keyword_dict }   


    all_frequency_keyword = []
    for content in collection.find({"category": '스포츠'}): 
        for i in content['keyword']:
            all_frequency_keyword.append(i)

    today_keyword_cnt = []
    keyword_cnt = Counter(all_frequency_keyword).most_common(8)
    today_keyword_cnt.append(keyword_cnt[4:])
    total_keyword_cnt = []
    total_cnt = Counter(all_frequency_keyword).most_common(50)
    total_keyword_cnt.append(total_cnt)

    keyword_dict = {}
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

    if mongo_cnt == 0:
        today_collection.insert_one{"category": '스포츠','time_keyword' : keyword_dict }   
    else 
        today_collection.update_one{"category": '스포츠','time_keyword' : keyword_dict }


    all_frequency_keyword = []
    for content in collection.find({"category": '문화'}): 
        for i in content['keyword']:
            all_frequency_keyword.append(i)

    today_keyword_cnt = []
    keyword_cnt = Counter(all_frequency_keyword).most_common(8)
    today_keyword_cnt.append(keyword_cnt[4:])
    total_keyword_cnt = []
    total_cnt = Counter(all_frequency_keyword).most_common(50)
    total_keyword_cnt.append(total_cnt)

    keyword_dict = {}
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

    if mongo_cnt == 0:
        today_collection.insert_one{"category": '문화','time_keyword' : keyword_dict }   
    else 
        today_collection.update_one{"category": '문화','time_keyword' : keyword_dict }      


def todays():
      
    # 오늘의 키워드
    
    for content in collection.find({"category": '전체'}):
        for i in content['keyword']:
            all_max_frequency_keyword.append(i)
    
    cnt = Counter(all_max_frequency_keyword)
    all_dictionary = cnt.most_common(7)   
    today_collection.insert_one({"category": '전체','keyword' : all_dictionary[4:]})   
    
    for content in collection.find({"category": '정치'}): 
        for i in content['keyword']:
            policy_max_frequency_keyword.append(i)

    cnt = Counter(policy_max_frequency_keyword)
    policy_dictionary = cnt.most_common(7)
    today_collection.insert_one({'category' : '정치' , 'keyword' : policy_dictionary[4:] })
   
    for content in collection.find({"category": '사회'}): 
        for i in content['keyword']:
            society_max_frequency_keyword.append(i)
        
    cnt = Counter(society_max_frequency_keyword)
    society_dictionary = cnt.most_common(7)
    today_collection.insert_one({'category' : '사회' ,'keyword' : society_dictionary[4:] })
  
    for content in collection.find({"category": '경제'}): 
        for i in content['keyword']:        
            economy_max_frequency_keyword.append(i)
        
    cnt = Counter(economy_max_frequency_keyword)
    economy_dictionary = cnt.most_common(7)
    today_collection.insert_one({'category' : '경제' ,'keyword' : economy_dictionary[4:] })    

    for content in collection.find({"category": '국제'}): 
        for i in content['keyword']:        
            global_max_frequency_keyword.append(i)
    cnt = Counter(global_max_frequency_keyword)
    global_dictionary = cnt.most_common(7)
    today_collection.insert_one({'category' : '국제' ,'keyword' : global_dictionery[4:] })

    for content in collection.find({"category": '스포츠'}): 
        for i in content['keyword']: 
             sports_max_frequency_keyword.append(i)
    cnt = Counter(sports_max_frequency_keyword)
    sports_dictionary = cnt.most_common(7)
    today_collection.insert_one({'category' : '스포츠' ,'keyword' : sports_dictionary[4:] })
        

    for content in collection.find({"category": '문화'}): 
        for i in content['keyword']: 
            culture_max_frequency_keyword.append(i)
    cnt = Counter(culture_max_frequency_keyword)
    culture_dictionary = cnt.most_common(7)
    today_collection.insert_one({'category' : '문화' ,'keyword' : culture_dictionary[4:] })   
    
    all_headline = []
    policy_headline = []
    society_headline = []
    economy_headline = []
    global_headline = []
    sports_headline = []
    culture_headline = []
    
    # 오늘의 기사 헤드라인       
    for content in collection.find({"category": '전체'}): 
        all_headline.append(content['title'])
    random_headline = random.sample(all_headline,3)
    today_collection.insert_one({"category": '전체' ,'headline' : random_headline })
     
    for content in collection.find({"category": '정치'}): 
        social_headline.append(content['title'])
    random_headline = random.sample(social_headline,3)
    today_collection.insert_one({"category": '정치', 'headline' : random_headline })

    for content in collection.find({"category": '사회'}: 
        social_headline.append(content['title'])
    random_headline = random.sample(society_headline,3)
    today_collection.update_one({"category": '사회','headline' : random_headline })

    for content in collection.find({"category": '경제'}): 
        economy_headline.append(content['title'])
    random_headline = random.sample(economy_headline,3)  
    today_collection.update_one({"category": '경제','headline' : random_headline })

    for content in collection.find({"category": '국제'}): 
        global_headline.append(content['title'])
    random_headline = random.sample(global_headline,3)   
    today_collection.update_one({"category": '국제','global_headline' : random_headline })

    for content in collection.find({"category": '스포츠'}): 
        sport_headline.append(content['title'])
    random_headline = random.sample(sports_headline,3)  
    today_collection.insert_one({"category": '스포츠','headline' : random_headline})
  
    for content in collection.find({"category": '문화'}): 
        culture_headline.append(content['title'])
    random_headline = random.sample(culture_headline,3)  
    today_collection.update_one{"category": '문화','headline' : random_headline })




