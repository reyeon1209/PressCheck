from kobert_transformers import get_tokenizer
from numpy import dot
from numpy.linalg import norm
from tensorflow.keras.preprocessing.sequence import pad_sequences


def cos_sim(A, B):
    return dot(A, B)/(norm(A) * norm(B))


def calc_similarity(contents):
    tokenizer = get_tokenizer()
    tokenized_texts = [tokenizer.tokenize(content) for content in contents]
    MAX_LEN = 10000
    input_ids = [tokenizer.convert_tokens_to_ids(x) for x in tokenized_texts]
    input_ids = pad_sequences(input_ids, maxlen=MAX_LEN, dtype=int, truncating="post", padding="post")
    res = {}
    for i in range(len(input_ids) - 1):
        for j in range(i + 1, len(input_ids)):
            res[str(i) + "-" + str(j)] = cos_sim(input_ids[i], input_ids[j])
    return res


if __name__ == '__main__':
    contents = [
        '[CLS] 프리시즌 아시아 투어를 떠나는 토트넘은 싱가포르, 중국을 차례로 방문해 ICC 경기를 치른다. [SEP]',
        '[CLS] 영국 "풋볼 런던"은 11일 "토트넘이 ICC 첫 경기에서 가장 강력한 스쿼드로 유벤투스에 맞설 것"이라고 평가했다. [SEP]',
        '[CLS] 토트넘에 합류하는 손흥민은 유벤투스전 출전을 목표로 구슬땀을 흘릴 예정이다. [SEP]'
    ]
    print(calc_similarity(contents))
