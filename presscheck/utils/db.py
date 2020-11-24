from pymongo import MongoClient


class myMongoDB:
    def __init__(self, dbname):
        self.client = MongoClient(
            "mongodb+srv://han:qpdlf52425@cluster0.kz4b2.mongodb.net/" + dbname + "?retryWrites=true&w=majority"
        )
        self.db = self.client.get_database(dbname)
        self.collected = self.db.get_collection('collected')
        self.mostRead = self.db.get_collection('mostRead')
        self.similarity = self.db.get_collection('similarity')
        self.todays = self.db.get_collection('todays')

    # delete single docs
    def del_collected_docs(self):
        self.collected.delete_many({})

    def del_mostRead_docs(self):
        self.mostRead.delete_many({})

    def del_similarity_docs(self):
        self.similarity.delete_many({})

    def del_todays_docs(self):
        self.todays.delete_many({})

    # delete all docs
    def del_all_collection_docs(self):
        self.del_collected_docs()
        self.del_mostRead_docs()
        self.del_similarity_docs()
        self.del_todays_docs()


if __name__ == '__main__':
    # init setting
    try:
        mongoDB = myMongoDB("CapstoneTest")
    except:
        print('[Failed] to connect mongoDB. Please check DB name')
    else:
        print('[Success] to connect mongoDB')

    #mongoDB.del_all_collection_docs()