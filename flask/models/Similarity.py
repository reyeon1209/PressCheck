from kobert_transformers import get_tokenizer
from numpy import dot
from numpy.linalg import norm
from tensorflow.keras.preprocessing.sequence import pad_sequences







# the main point of Similarity part
def get_similarity_res(standard, targets):
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
    input_ids = pad_sequences(input_ids, maxlen=600, dtype=int, truncating="post", padding="post")

    res = {}
    for i in range(1, len(input_ids)):
        res.update({ids[i]: {'keyword': int(cos_sim(input_ids[0], input_ids[i]) * 100)}})
    return res


if __name__ == '__main__':
    standard = [
        ("11111", [
            '프로야구 2020 KBO 포스트시즌 두산베어스와 NC다이노스의 한국시리즈 4차전이 21일 오후 서울 고척스카이돔에서 열렸다.',
            '포토4차전 결정 박석민, 다음 경기엔 명예회복손가락 부상으로 4차전에 결장한 박석민이 더그아웃에서 경기를 지켜보고 있다.'
         ]),
    ]

    targets = [
        ("22222", [
            '‘2020 신한은행 SOL KBO리그’ 포스트시즌 한국시리즈 4차전 NC와 두산의 경기가 21일 오후 서울 고척 스카이돔에서 열렸다.',
            '강진성,펜스에 붙어서NC 1루수 강진성이 4회말 두산 죄주환의 파울타구를 잡아내고 있다.'
        ]),
        ("33333", [
            '22일 방송될 JTBC 예능프로그램 ‘뭉쳐야 찬다’에서는 ‘어쩌다FC’의 용병이 되기 위한 대한민국 남자 펜싱 레전드 최병철의 진땀나는 피지컬 테스트가 펼쳐진다.',
            '펜싱 레전드 ‘괴짜 검객’ 최병철이 0.8cm 보리과자를 찌르는 역대급 도전에 나선다.',
            '이날 ‘어쩌다FC’는 펜싱 선수들이 준비 자세부터 상대의 몸을 터치하는 공격 순간까지 단 0.03초 밖에 걸리지 않는다는 사실을 듣고 놀라움을 금치 못한다.',
            '이에 총알이 나가는 속도와 맞먹는 스피드를 눈으로 확인하고자 움직이는 과일을 찔러보는 테스트를 진행한다.',
            '최병철은 자몽, 사과, 파프리카 등 던지는 족족 과즙을 팡팡 터트리며 칼끝을 정확하게 꽂는 레전드의 실력을 보여준다.'
            '과일의 크기는 점점 작아지고 어느덧 최고난도 방울토마토가 등장하자 전설들은 “이거 성공하면 핵인정”이라며 기대에 찬 목소리를 높인다.',
            '그는 다른 과일들과 달리 방울토마토 표면을 스치기만 하는 아쉬운 결과가 이어지자 국대급 승부욕이 발동, 얼굴에 웃음기를 싹 지우고 집중해 성공시킨다고.',
            '자몽부터 방울토마토까지 그의 칼을 통과한 과일들로 원앤온리 펜싱 꼬치가 완성돼 펜싱 전설이라 가능한 진귀한 장면을 연출해낸다.',
            '이어 다음은 실에 매달린 작은 과자들이 등장, 그중에는 미세한 바람에도 크게 흔들리는 0.8cm 크기의 작은 가벼운 보리과자도 준비돼 최병철을 한층 더 긴장시킨다.',
            '터치 할 듯 말 듯 마음처럼 되지 않는 테스트에 최병철은 연신 ‘알레’를 외치며 기합을 넣었고, 현장에 있던 모든 이들이 숨죽인 채 그의 칼끝을 주시했다는 후문.',
            '한편, 최병철은 피지컬 테스트 외에도 ‘펜싱계 이단아’란 수식어에 걸맞은 화려한 변칙 기술을 선보이며 전설들의 시선을 사로잡을 예정이다.',
            '과연 보리과자 찌르기는 어떻게 끝났을지, 펜싱 전설의 기상천외한 피지컬 테스트 결과가 궁금해진다.'
        ])
    ]
    print(get_similarity_res(standard, targets))
