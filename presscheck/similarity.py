#!/usr/bin/env python
# coding: utf-8


from kobert_transformers import get_tokenizer
from numpy import dot
from numpy.linalg import norm
from tensorflow.keras.preprocessing.sequence import pad_sequences
from bson import ObjectId
from presscheck.utils.db import *


def load_all_objectId(collection):
    res = []
    data = collection.find({}, {'_id'})
    for elem in data:
        res.append(str(elem['_id']))
    return res


def setting_standard(collection, standard_id):
    origin_news_data = collection.find({'_id': ObjectId(standard_id)},
                                       {'_id', 'pre_content', 'press', 'category', 'keyword'})
    for elem in origin_news_data:
        myid = elem['_id']
        pre_content = elem['pre_content']
        press = elem['press']
        category = elem['category']
        keyword = elem['keyword']
        return [(myid, pre_content)], myid, press, category, keyword


def setting_targets(collection, press, category):
    targets_news_data = collection.find({'press': {'$ne': press}, 'category': category},
                                        {'press': 1, "title": 1, 'pre_content': 1, 'keyword': 1})
    targets = []
    targets_title = []
    targets_press = []
    targets_keyword = []
    for elem in targets_news_data:
        targets.append((elem['_id'], elem['pre_content']))
        targets_title.append(elem['title'])
        targets_press.append(elem['press'])
        targets_keyword.append(elem['keyword'])
    return targets, targets_title, targets_press, targets_keyword


def calc_similarity(origin_id, standard, targets, standard_keyword, targets_keyword):
    def setting_similarity(standard, targets):
        # combine separated sentences to the only one sentence & setting encoding form
        def setting_encoding_form(separated_sentences_list):
            for idx, content in enumerate(separated_sentences_list):
                res = ""
                for sentence in content:
                    res += sentence + " "
                separated_sentences_list[idx] = "[CLS] " + res + "[SEP]"
            return separated_sentences_list

        # calculate similarity
        def cos_sim(A, B):
            return dot(A, B) / (norm(A) * norm(B))

        # merge data & separate from ids to contents
        merge_data = standard + targets
        ids = list(i[0] for i in merge_data)
        contents = list(i[1] for i in merge_data)

        # similarity function
        contents = setting_encoding_form(contents)
        tokenizer = get_tokenizer()
        tokenized_texts = [tokenizer.tokenize(content) for content in contents]
        input_ids = [tokenizer.convert_tokens_to_ids(x) for x in tokenized_texts]
        input_ids = pad_sequences(input_ids, maxlen=1000, dtype=int, truncating="post", padding="post")

        res = {}
        for i in range(1, len(input_ids)):
            similar_val = round(cos_sim(input_ids[0], input_ids[i]) * 100, 1)
            res.update({ids[i]: {'similarity': similar_val}})
        return res

    def setting_ranking(ids, json_data):
        ranking = [(idx, json_data[val]['similarity']) for idx, val in enumerate(ids)]
        ranking.sort(key=lambda x: x[1])
        for i in range(len(ranking)):
            json_data[ids[i]].update({'ranking': ranking[i][0] + 1})
        return json_data

    def setting_diffKeyword(ids, json_data, standard_keyword, target_keyword):
        for i in range(len(target_keyword)):
            json_data[ids[i]].update({'diffKeyword': list(set(target_keyword[i]) - set(standard_keyword))})
        return json_data

    def setting_etc(ids, json_data, target_press, target_title):
        for i in range(len(target_press)):
            json_data[ids[i]].update({'press': target_press[i], 'title': target_title[i]})
        return json_data

    def setting_real_form(ids, json_data, origin_id):
        res = []
        for i in range(len(ids)):
            r1 = {'origin_id': origin_id, 'target_id': ids[i]}
            r2 = json_data[ids[i]]
            res.append({**r1, **r2})

        chk_similar = []
        real_res = []
        for each_val in res:
            if each_val['similarity'] > 0:
                print(each_val['similarity'], each_val['similarity']//1)
                if not each_val['similarity'] // 1 in chk_similar:
                    chk_similar.append(each_val['similarity'] // 1)
                    real_res.append(each_val)
        real_res = sorted(res, key=lambda x: x['ranking'])
        print(real_res)
        return real_res

    ids = [myid for myid, mycontent in targets]
    res = setting_similarity(standard, targets)
    res = setting_diffKeyword(ids, res, standard_keyword, targets_keyword)
    res = setting_etc(ids, res, target_press, target_title)
    res = setting_ranking(ids, res)
    res = setting_real_form(ids, res, origin_id)
    return res


if __name__ == '__main__':
    # connect pymongo
    mongoDB = myMongoDB("CapstoneTest")

    # delete docs in similarityTest collection
    mongoDB.similarity.delete_many({})

    # load all objectId (article)
    list_objectId = load_all_objectId(mongoDB.collected)

    # setting standard, target article & check similarity
    for objId in list_objectId:
        standard, standard_id, standard_press, standard_category, standard_keyword \
            = setting_standard(mongoDB.collected, objId)
        target, target_title, target_press, target_keyword \
            = setting_targets(mongoDB.collected, standard_press, standard_category)
        res = calc_similarity(standard_id, standard, target, standard_keyword, target_keyword)
        break
        # mongoDB.similarity.insert_many(res)
