# -*- coding: utf-8 -*- 
from flask import Flask, jsonify, request, redirect
from flask_restful import Api
from flask_pymongo import PyMongo
from nltk.tokenize import sent_tokenize
from models import Analysis as an
from krwordrank.word import KRWordRank

app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb+srv://choi95:qpdlf52425@cluster0.kz4b2.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongo = PyMongo(app)
    

def insert_summary():
    
    summarySort_list = []
    summaryMed_list = []
    summaryLong_list = []

    article_collection = mongo.db.dbname
    content = article_collection["content"]
    article_embedding = an.articles_to_vectors(centent)
    similar_matrix = an.similarity_matrix(article_embedding)
    score = an.calculate_score(similar_matrix)
    summarySort_list.append(summaryShort(score))
    summaryMed_list.append(an.summaryMed(score))
    summaryLong_list.append(an.summaryLong(score))
    article_collection.insert_many({'summaryShort_list' : summaryShort_list })
    article_collection.insert_many({'summaryMed_list' : summaryMed_list })
    article_collection.insert_many({'summaryLong_list' : summaryLong_list })



def insert_keyword():
    wordrank_extractor = KRWordRank(
        min_count = 2,
        max_length = 10,
        verbose = True
    )
    beta = 0.85
    max_iter = 10
    article_collection = mongo.db.dbname
    content = article_collection["content"]

    keywords, rank, graph = wordrank_extractor.extract(content, beta, max_iter)
    keyword_list = []

    for word, r in sorted(keywords.items(), key=lambda x:x[1], reverse=True)[:5]:
        keyword_list.append(word)

    article_collection.insert_many({'keyword_list' : keyword_list})


if __name__ == '__main__':
    app.run(debug=True)
    app.config.from_object(config)

    