#!/usr/bin/env python
# coding: utf-8

# In[4]:


#install 코드
get_ipython().system('pip install flask')


# In[12]:


#import 코드
import crawler
import mostRead
import updateKeySum
import similarity
import todays

import flask


# In[ ]:


app = Flask(__name__)

sched = BlockingScheduler(daemon=True)#blocking

#뉴스 크롤링
sched.add_job(collector.batch_collect(),'interval',minute=55)#55분주기

#많이본뉴스
sched.add_job(mostRead.insertMostRead(mostRead.rerank(mostRead.makeDic())), 'interval', minute="55")#55분주기


#Keyword,Summary
sched.add_job(insert_summary, 'interval' ,minute=55)         #매 55분마다 함수실행
sched.add_job(insert_keyword, 'interval' ,minute=55)         #매 55분마다
#shced.add_job(similarity.,'interval',minute=55)             #55분마다

#Todays
sched.add_job(todays.todays_Keyword(), 'interval' ,hours=24)  #하루
sched.add_job(todays.keyword_series(), 'interval' ,hours=6)  #6시간단위
sched.add_job(todays.headline(), 'interval' ,hours=24)        #하루
sched.add_job(todays.init(),'interval',hours=24)                         #하루

sched.start()

if __name__ == '__main__':
    app.run(debug=True)


# In[ ]:




