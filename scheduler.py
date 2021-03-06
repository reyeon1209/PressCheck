from presscheck import crawler, mostRead, similarity, summaries, todays, updateKeySum


if __name__ == '__main__':
    # put your function to start scheduling
    crawler.batch_collect()
    mostRead.getMostRead()
    updateKeySum.insert_keyword()
    updateKeySum.insert_summary()

    mostRead.insertMostRead(mostRead.reran90k(mostRead.makeDic()))
    updateKeySum.insert_keyword()
    updateKeySum.insert_summary()

    # 많이본뉴스
    # sched.add_job(mostRead.insertMostRead(mostRead.rerank(mostRead.makeDic())), 'interval', minute="55")#55분주기

    # Keyword,Summary
    # sched.add_job(insert_summary, 'interval' ,minute=55)         #매 55분마다 함수실행
    # sched.add_job(insert_keyword, 'interval' ,minute=55)         #매 55분마다
    # shced.add_job(similarity.,'interval',minute=55)             #55분마다

    # Todays
    sched.add_job(todays.todays_Keyword(), 'interval' ,hours=24)  #하루
    sched.add_job(todays.keyword_series(), 'interval' ,hours=6)  #6시간단위
    sched.add_job(todays.headline(), 'interval' ,hours=24)        #하루
    sched.add_job(todays.init(),'interval',hours=24)                         #하루

    # sched.start()