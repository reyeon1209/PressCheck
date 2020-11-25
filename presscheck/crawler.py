#!/usr/bin/env python
# coding: utf-8

import feedparser
import requests
import re
import nltk
from goose3 import Goose
from goose3.text import StopWordsKorean
from bs4 import BeautifulSoup
from nltk.tokenize import sent_tokenize
from presscheck.utils.db import *


# 텍스트 전처리
def clean_text(text):
    cleaned = text
    cleaned = cleaned.replace("연합뉴스TV", "")
    cleaned = cleaned.replace("기사문의 및 제보", "")
    cleaned = cleaned.replace("카톡/라인", "")
    cleaned = cleaned.replace("jebo23", "")
    cleaned = cleaned.replace("(끝)", "")
    cleaned = cleaned.replace("관련기사", "")
    cleaned = cleaned.replace("br", "")
    cleaned = cleaned.replace("아티클 공통", "")
    cleaned = cleaned.replace("DA 250", "")
    cleaned = cleaned.replace("//", "")
    cleaned = cleaned.replace(":", "")
    cleaned = re.sub('[a-zA-Z0-9+-_.]+@[a-zA-Z0-9]+\.(co)+\.(kr)', '', cleaned)
    cleaned = re.sub('[\{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"▲△▽▼◁◀▷▶]', '', cleaned)
    cleaned = re.sub('[a-zA-Z]', '', cleaned)
    cleaned = cleaned.replace("사진연합뉴스", "")
    return cleaned


def collectJoongang():
    joongang_dic = []

    i = 0
    j = 0

    for rss in joongang_url:
        if rss is None:
            break
        else:
            parse_rss = feedparser.parse(rss)
            for index, p in enumerate(parse_rss.entries):
                if index == 20:
                    break
                pagelink = p.link
                editor = p.author
                description = ''
                news_title = p.title


                dup = False
                for article in mongoDB.collected.find({'press': '중앙', 'category': cl[i]}, {'link': 1}):
                    if pagelink == list(article.values())[1]:
                        dup = True
                        break
                if dup is True:
                    continue

                request = requests.get(pagelink)
                html = request.content
                soup = BeautifulSoup(html, 'html.parser')
                news_article = soup.find('div', itemprop='articleBody')
                for tag in news_article:
                    if tag.string is None:
                        continue
                    description += tag.string
                description = clean_text(description)

                cleaned_sentence = []

                string = description
                string = string.replace(u'\xa0', u' ')
                string = string.replace('\n', '')
                string = string.replace('\r', '')
                string = string.replace('\t', '')
                clean_sentence = sent_tokenize(string)

                for k in clean_sentence:
                    if '기자' not in k:
                        cleaned_sentence.append(k)



                uploaded = '\0'
                try:
                    upload_date = soup.find('div', class_='byline').select("em")[1]
                    uploaded = upload_date.text
                    uploaded = uploaded[3:]
                except AttributeError :
                    uploaded = '\0'
                except IndexError:
                    uploaded = '\0'


                updated = '\0'
                try:
                    update_date = soup.find('div', class_='byline').select("em")[2]
                    updated = update_date.text
                    updated = updated[4:]
                except AttributeError as err:
                    updated = '\0'
                except IndexError:
                    updated = '\0'

                img_src = '\0'
                try:
                    img1 = soup.find('div', class_='article_body')
                    img2 = img1.find('div', class_='image')
                    img3 = img2.find("img")
                    img_src = img3.get("src")
                except AttributeError as err:
                    img_src = '\0'

                joongang_dic.append(
                    {'title': news_title, 'link': pagelink, 'press': '중앙', 'category': cl[i], 'uploaded': uploaded,
                     'updated': updated, 'editor': editor, 'img_src': img_src, 'content': description,
                     'pre_content': cleaned_sentence, 'keyword': '\0', 'sum_short': '\0', 'sum_mid': '\0',
                     'sum_long': '\0'})
                mongoDB.collected.insert_one(joongang_dic[j])
                j += 1
            i += 1


def collectDonga():
    donga_dic = []

    i = 0
    j = 0

    for rss in donga_url:
        if rss is None:
            break
        else:
            parse_rss = feedparser.parse(rss)
            for index, p in enumerate(parse_rss.entries):
                if index == 20:
                    break
                pagelink = p.link

                dup = False
                for article in mongoDB.collected.find({'press': '동아', 'category': cl[i]}, {'link': 1}):
                    if pagelink == list(article.values())[1]:
                        dup = True
                        break
                if dup is True:
                    continue

                request = requests.get(pagelink)
                html = request.content
                soup = BeautifulSoup(html, 'html.parser')

                reader = Goose({'stopwords_class': StopWordsKorean})
                article = reader.extract(pagelink)
                description = article.cleaned_text
                description = clean_text(description)

                cleaned_sentence = []

                string = description
                string = string.replace(u'\xa0', u' ')
                string = string.replace('\n', '')
                string = string.replace('\r', '')
                string = string.replace('\t', '')
                clean_sentence = sent_tokenize(string)

                for k in clean_sentence:
                    if '기자' not in k:
                        cleaned_sentence.append(k)

                try:
                    upload_date = soup.find('div', class_='title_foot').find_all(class_='date01')[0]
                    uploaded = upload_date.text
                    uploaded = uploaded[3:]
                except AttributeError as err:
                    uploaded = '\0'
                except IndexError:
                    uploaded = '\0'


                try:
                    update_date = soup.find('div', class_='title_foot').find_all(class_='date01')[1]
                    updated = update_date.text
                    updated = updated[3:]
                except AttributeError as err:
                    updated = '\0'
                except IndexError:
                    updated = '\0'



                try:
                    editor = soup.find('div', class_='title_foot')
                    editor = editor.find('span', class_='report')
                    editor = editor.text
                except AttributeError:
                    editor='\0'

                img_src = '\0'
                try:
                    img1 = soup.find('div', class_='article_view')
                    img2 = img1.find('span', class_='thumb')
                    img3 = img2.find("img")
                    img_src = img3.get("src")
                except AttributeError as err:
                    img_src = '\0'

                donga_dic.append(
                    {'title': p.title, 'link': p.link, 'press': '동아', 'category': cl[i], 'uploaded': uploaded,
                     'updated': updated, 'editor': editor, 'img_src': img_src, 'content': description,
                     'pre_content': cleaned_sentence, 'keyword': '\0', 'sum_short': '\0', 'sum_mid': '\0',
                     'sum_long': '\0'})
                mongoDB.collected.insert_one(donga_dic[j])
                j += 1
            i += 1


def collectKbs():
    kbs_dic = []

    i = 0
    j = 0

    for rss in kbs_url:
        if rss is None:
            break
        else:
            parse_rss = feedparser.parse(rss)
            for index, p in enumerate(parse_rss.entries):
                if index == 20:
                    break
                pagelink = p.link

                dup = False
                for article in mongoDB.collected.find({'press': 'kbs', 'category': cl[i]}, {'link': 1}):
                    if pagelink == list(article.values())[1]:
                        dup = True
                        break
                if dup is True:
                    continue

                request = requests.get(pagelink)
                html = request.content
                soup = BeautifulSoup(html, 'html.parser')

                news_article = soup.find('div', class_='body_txt')
                description = ''
                description = news_article.text
                description = clean_text(description)

                string = ""
                clean_sentence = []
                cleaned_sentence = []
                string = description
                string = string.replace(u'\xa0', u' ')
                string = string.replace('\n', '')
                string = string.replace('\r', '')
                string = string.replace('\t', '')
                clean_sentence = sent_tokenize(string)

                for k in clean_sentence:
                    if '기자' not in k:
                        cleaned_sentence.append(k)

                try:
                    upload_date = soup.find('p', class_='date')
                    uploaded = upload_date.text[6:27]
                except AttributeError as err:
                    uploaded = '\0'
                except IndexError:
                    uploaded = '\0'



                try:
                    updated = upload_date.text[36:]
                except AttributeError as err:
                    updated = '\0'
                except IndexError:
                    updated = '\0'




                # kbs는 작성자 항목이 없습니다!
                editor = '\0'

                img_src = '\0'
                try:
                    img1 = soup.find('div', class_='photo no-print')
                    img2 = img1.find('img')
                    img_src = img2.get('src')
                except AttributeError as err:
                    img_src = '\0'

                kbs_dic.append(
                    {'title': p.title, 'link': p.link, 'press': 'kbs', 'category': cl[i], 'uploaded': uploaded,
                     'updated': updated, 'editor': editor, 'img_src': img_src, 'content': description,
                     'pre_content': cleaned_sentence, 'keyword': '\0', 'sum_short': '\0', 'sum_mid': '\0',
                     'sum_long': '\0'})
                mongoDB.collected.insert_one(kbs_dic[j])
                j += 1
            i += 1


def collectSbs1():
    sbs_dic = []

    # sbs 크롤링 - 전체카테고리

    url = sbs_topic
    main = "http://news.sbs.co.kr"
    pages = []

    i = 0
    j = 0

    request = requests.get(url)
    html = request.content
    soup = BeautifulSoup(html, 'html.parser')
    news_article = soup.find_all('a', class_='mnprcl_link')
    for na in news_article:
        pages.append(main + na.get('href'))

    for index, p in enumerate(pages):
        if index == 20:
            break
        dup = False
        for article in mongoDB.collected.find({'press': 'sbs', 'category': '전체'}, {'link': 1}):
            if p == list(article.values())[1]:
                dup = True
                break
        if dup is True:
            continue
        request = requests.get(p)
        html = request.content
        soup = BeautifulSoup(html, 'html.parser')
        news_title = soup.find(id='vmNewsTitle')
        description=''
        news_article = soup.find('div', class_='text_area')
        for tag in news_article:
            if tag.string is None:
                continue
            description += tag.string
        description = clean_text(description)
        if( len(description)<15 ):
            continue

        cleaned_sentence = []

        string = description
        string = string.replace(u'\xa0', u' ')
        string = string.replace('\n', '')
        string = string.replace('\r', '')
        string = string.replace('\t', '')
        clean_sentence = sent_tokenize(string)

        for k in clean_sentence:
            if '기자' not in k:
                cleaned_sentence.append(k)

        try:
            upload_date = soup.find('span', class_='date').find_all('span')[0]
            uploaded = upload_date.text
        except AttributeError as err:
            uploaded = '\0'
        except IndexError:
            uploaded = '\0'


        try:
            update_date = soup.find('span', class_='date').find_all('span')[1]
            updated = update_date.text
            if(len(updated)<=4): updated='\0'
        except AttributeError as err:
            updated = '\0'
        except IndexError:
            updated = '\0'


        editor = '\0'
        editor = soup.find('a', class_='name')
        if editor is None:
            editor = '\0'
        else:
            editor = editor.text


        img_src = '\0'
        img = soup.find('img', class_='mainimg')
        if img != None:
            img_src = img.get('src')[2:]
            img_src = 'http://' + img_src

        sbs_dic.append({'title': news_title.text, 'link': p, 'press': 'sbs', 'category': '전체', 'uploaded': uploaded,
                    'updated': updated, 'editor': editor, 'img_src': img_src, 'content': description,
                    'pre_content': cleaned_sentence, 'keyword': '\0', 'sum_short': '\0', 'sum_mid': '\0',
                    'sum_long': '\0'})
        mongoDB.collected.insert_one(sbs_dic[j])
        j += 1


def collectSbs2():
    # sbs 크롤링-나머지 카테고리
    i = 1
    j = 0
    sbs_else = []

    for rss in sbs_url:
        if rss == None:
            break
        else:
            parse_rss = feedparser.parse(rss)
            for index, p in enumerate(parse_rss.entries):
                if index == 20:
                    break
                pagelink = p.link
                news_title = p.title

                dup = False
                for article in mongoDB.collected.find({'press': 'sbs', 'category': cl[i]}, {'link': 1}):
                    if p == list(article.values())[1]:
                        dup = True
                        break
                    if dup is True:
                        continue

                request = requests.get(pagelink)
                html = request.content
                soup = BeautifulSoup(html, 'html.parser')

                news_article = soup.find('div', class_='text_area')

                description = news_article.text
                description = clean_text(description)

                news_article = soup.find('div', class_='text_area')
                for tag in news_article:
                    if tag.string is None:
                        continue
                    description += tag.string
                description = clean_text(description)


                cleaned_sentence = []

                string = description
                string = string.replace(u'\xa0', u' ')
                string = string.replace('\n', '')
                string = string.replace('\r', '')
                string = string.replace('\t', '')
                clean_sentence = sent_tokenize(string)

                for k in clean_sentence:
                    if '기자' not in k:
                        cleaned_sentence.append(k)

                try:
                    upload_date1 = soup.find('span', class_='date')
                    upload_date2 = upload_date1.find_all('span')[0]
                    uploaded = upload_date2.text
                except AttributeError as err:
                    uploaded = '\0'
                except IndexError:
                    updated = '\0'


                try:
                    update_date1 = soup.find('span', class_='date')
                    update_date2 = update_date1.find_all('span')[1]
                    updated = update_date2.text
                    if(len(updated) <=4): updated='\0'
                except AttributeError as err:
                    updated = '\0'
                except IndexError:
                    updated = '\0'


                editor = soup.find('a', class_='name')
                if editor != None:
                    editor = editor.text
                else:
                    editor = '\0'

                img_src = '\0'
                img = soup.find('img', class_='mainimg')
                if img != None:
                    img_src = img.get('src')[2:]
                    img_src = 'http://' + img_src
                else:
                    img_src = '\0'

                sbs_else.append(
                    {'title': news_title, 'link': p.link, 'press': 'sbs', 'category': cl[i], 'uploaded': uploaded,
                     'updated': updated, 'editor': editor, 'img_src': img_src, 'content': description,
                     'pre_content': cleaned_sentence, 'keyword': '\0', 'sum_short': '\0', 'sum_mid': '\0',
                     'sum_long': '\0'})
                mongoDB.collected.insert_one(sbs_else[j])
                j += 1
            i += 1


def collectKmib():
    kmib_dic = []

    i = 0
    j = 0

    for rss in kmib_url:
        if rss is None:
            break
        else:
            parse_rss = feedparser.parse(rss)
            for index, p in enumerate(parse_rss.entries):
                if index == 20:
                    break
                pagelink = p.link
                news_head = p.title
                description = ''

                dup = False
                for article in mongoDB.collected.find({'press': '국민', 'category': cl[i]}, {'link': 1}):
                    if pagelink == list(article.values())[1]:
                        dup = True
                        break
                if dup is True:
                    continue

                request = requests.get(pagelink)
                html = request.content
                soup = BeautifulSoup(html, 'html.parser')

                news_article = soup.find('div', id='articleBody')
                for tag in news_article:
                    if tag.string is None:
                        continue
                    description += tag.string
                description = clean_text(description)

                cleaned_sentence = []

                string = description
                string = string.replace(u'\xa0', u' ')
                string = string.replace('\n', '')
                string = string.replace('\r', '')
                string = string.replace('\t', '')
                clean_sentence = sent_tokenize(string)

                for k in clean_sentence:
                    if '기자' not in k:
                        cleaned_sentence.append(k)

                try:
                    upload_date = soup.find('div', class_='date').find_all('span', class_="t11")[0]
                    uploaded = upload_date.text
                except AttributeError as err:
                    uploaded = '\0'
                except IndexError:
                    uploaded = '\0'




                try:
                    update_date = soup.find('div', class_='date').find_all('span', class_="t11")[1]
                    updated = update_date.text
                except AttributeError as err:
                    updated = '\0'
                except IndexError:
                    updated = '\0'


                editor = '\0'
                # 국민일보 기자이름 예외처리

                img_src = '\0'
                try:
                    img1 = soup.find('div', class_='nws_arti')
                    img2 = img1.find('img')
                    img_src = img2.get('src')
                except AttributeError as err:
                    img_src = '\0'

                kmib_dic.append(
                    {'title': news_head, 'link': p.link, 'press': '국민', 'category': cl[i], 'uploaded': uploaded,
                     'updated': updated, 'editor': editor, 'img_src': img_src, 'content': description,
                     'pre_content': cleaned_sentence, 'keyword': '\0', 'sum_short': '\0', 'sum_mid': '\0',
                     'sum_long': '\0'})
                mongoDB.collected.insert_one(kmib_dic[j])
                j += 1
            i += 1


def collectYonhap():
    yonhap_dic = []

    i = 0
    j = 0

    for rss in yonhap_url:
        if rss == None:
            break
        else:
            parse_rss = feedparser.parse(rss)
            for index, p in enumerate(parse_rss.entries):
                if index == 20:
                    break
                pagelink = p.link
                news_title = p.title

                dup = False
                for article in mongoDB.collected.find({'press': '연합', 'category': cl[i]}, {'link': 1}):
                    if pagelink == list(article.values())[1]:
                        dup = True
                        break
                if dup is True:
                    continue

                request = requests.get(pagelink)
                html = request.content
                soup = BeautifulSoup(html, 'html.parser')

                content = ((p.content)[0]['value'])
                content = clean_text(content)
                description = content

                cleaned_sentence = []

                string = description
                string = string.replace(u'\xa0', u' ')
                string = string.replace('\n', '')
                string = string.replace('\r', '')
                string = string.replace('\t', '')
                clean_sentence = sent_tokenize(string)

                for k in clean_sentence:
                    if '기자' not in k:
                        cleaned_sentence.append(k)

                upload_date = soup.find('ul', class_='info')
                if upload_date != None:
                    uploaded = upload_date.text
                    uploaded = uploaded[5:]
                else:
                    uploaded = '\0'



                update_date = soup.find('ul', class_='info')
                if update_date != None:
                    updated = update_date.text
                    updated = updated[5:]
                else:
                    updated = '\0'


                # 연합뉴스 기자 이름 없음
                editor = '\0'

                img_src = '\0'
                img = soup.find('span', class_='img')
                if img != None:
                    img_src = img.get('src')
                    img_src = 'http://' + img_src
                else:
                    img_src = '\0'
                continue

                yonhap_dic.append(
                    {'title': news_title, 'link': p.link, 'press': '연합', 'category': cl[i], 'uploaded': uploaded,
                     'updated': updated, 'editor': editor, 'img_src': img_src, 'content': description,
                     'pre_content': cleaned_sentence, 'keyword': '\0', 'sum_short': '\0', 'sum_mid': '\0',
                     'sum_long': '\0'})
                mongoDB.collected.insert_one(yonhap_dic[j])
                j += 1
            i += 1


def collectHani():
    i = 0
    j = 0

    hani_dic = []
    for rss in hani_url:
        if rss == None:
            break
        else:
            parse_rss = feedparser.parse(rss)
            for index, p in enumerate(parse_rss.entries):
                if index == 20:
                    break
                pagelink = p.link
                news_title = p.title

                dup = False
                for article in mongoDB.collected.find({'press': '한겨레', 'category': cl[i]}, {'link': 1}):
                    if pagelink == list(article.values())[1]:
                        dup = True
                        break
                if dup is True:
                    continue

                request = requests.get(p.link)
                html = request.content
                soup = BeautifulSoup(html, 'html.parser')

                news_article = soup.find('div', class_='text')
                if news_article is None:
                    continue
                description = clean_text(news_article.text)

                cleaned_sentence = []
                string = description
                string = string.replace(u'\xa0', u' ')
                string = string.replace('\n', '')
                string = string.replace('\r', '')
                string = string.replace('\t', '')
                clean_sentence = sent_tokenize(string)

                for k in clean_sentence:
                    if '기자' not in k:
                        cleaned_sentence.append(k)

                try:
                    upload_date = soup.find('p', class_='date-time').find_all('span')[0]
                    uploaded = upload_date.text
                    uploaded = uploaded[4:22]
                except AttributeError as err:
                    uploaded = '\0'
                except IndexError:
                    uploaded = '\0'


                try:
                    update_date = soup.find('p', class_='date-time').find_all('span')[0]
                    updated = update_date.text
                    updated = updated[4:22]
                except AttributeError as err:
                    updated = '\0'
                except IndexError:
                    updated = '\0'


                # 한겨레 editor보류
                editor = '\0'


                img_src = '\0'
                try:
                    img1 = soup.find('div', class_='image')
                    img2 = img1.find('img')
                    img_src = img2.get('src')[2:]
                    img_src = 'http://' + img_src
                except AttributeError as err:
                    img_src = '\0'

                hani_dic.append(
                    {'title': news_title, 'link': pagelink, 'press': '한겨레', 'category': cl[i], 'uploaded': uploaded,
                     'updated': updated, 'editor': editor, 'img_src': img_src, 'content': description,
                     'pre_content': cleaned_sentence, 'keyword': '\0', 'sum_short': '\0', 'sum_mid': '\0',
                     'sum_long': '\0'})
                mongoDB.collected.insert_one(hani_dic[j])
                j += 1
            i += 1


def batch_collect():
    collectJoongang()
    collectDonga()
    collectKbs()
    collectSbs1()
    collectSbs2()
    collectKmib()
    collectYonhap()
    collectHani()


if __name__ == '__main__':
    # data
    cl = ['전체', '정치', '사회', '경제', '국제', '스포츠', '문화']
    pl = ['한겨레', '중앙', '동아', 'KBS', 'SBS', '국민', '연합']
    hani_url = [
        'http://www.hani.co.kr/rss/', 'http://www.hani.co.kr/rss/politics/', 'http://www.hani.co.kr/rss/society/',
        'http://www.hani.co.kr/rss/economy/', 'http://www.hani.co.kr/rss/international/',
        'http://www.hani.co.kr/rss/sports/', 'http://www.hani.co.kr/rss/culture/']
    joongang_url = [
        'https://rss.joins.com/joins_news_list.xml', 'https://rss.joins.com/joins_politics_list.xml',
        'https://rss.joins.com/joins_life_list.xml', 'https://rss.joins.com/joins_money_list.xml',
        'https://rss.joins.com/joins_world_list.xml', 'https://rss.joins.com/joins_sports_list.xml',
        'https://rss.joins.com/joins_culture_list.xml'
    ]
    donga_url = [
        'https://rss.donga.com/total.xml', 'https://rss.donga.com/politics.xml', 'https://rss.donga.com/national.xml',
        'https://rss.donga.com/economy.xml', 'https://rss.donga.com/international.xml',
        'https://rss.donga.com/sports.xml',
        'https://rss.donga.com/culture.xml'
    ]
    kbs_url = [
        'http://world.kbs.co.kr/rss/rss_news.htm?lang=k', 'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Po',
        'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=IK', 'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Ec',
        'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=In', 'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Sp',
        'http://world.kbs.co.kr/rss/rss_news.htm?lang=k&id=Cu'
    ]
    sbs_topic = 'https://news.sbs.co.kr/news/newsHotIssue.do?plink=GNB&cooper=SBSNEWS'  # sbs전체
    sbs_url = [
        'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=01&plink=RSSREADER',
        'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=03&plink=RSSREADER',
        'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=02&plink=RSSREADER',
        'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=08&plink=RSSREADER',
        'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=09&plink=RSSREADER',
        'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=07&plink=RSSREADER'
    ]
    kmib_url = [
        'http://rss.kmib.co.kr/data/kmibRssAll.xml', 'http://rss.kmib.co.kr/data/kmibPolRss.xml',
        'http://rss.kmib.co.kr/data/kmibSocRss.xml', 'http://rss.kmib.co.kr/data/kmibEcoRss.xml',
        'http://rss.kmib.co.kr/data/kmibIntRss.xml', 'http://rss.kmib.co.kr/data/kmibSpoRss.xml',
        'http://rss.kmib.co.kr/data/kmibCulRss.xml'
    ]
    yonhap_url = [
        'http://www.yonhapnewstv.co.kr/browse/feed/', 'http://www.yonhapnewstv.co.kr/category/news/politics/feed/',
        'http://www.yonhapnewstv.co.kr/category/news/society/feed/',
        'http://www.yonhapnewstv.co.kr/category/news/economy/feed/',
        'http://www.yonhapnewstv.co.kr/category/news/international/feed/',
        'http://www.yonhapnewstv.co.kr/category/news/sports/feed/',
        'http://www.yonhapnewstv.co.kr/category/news/culture/feed/'
    ]

    # # connect pymongo & setting db and collection
    mongoDB = myMongoDB("CapstoneTest")

    # download tokenized file & collecting news data
    nltk.download('punkt')
    batch_collect()
