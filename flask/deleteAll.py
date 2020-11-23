from pymongo import MongoClient

client = MongoClient("mongodb+srv://han:qpdlf52425@cluster0.kz4b2.mongodb.net/scheduleTest?retryWrites=true&w=majority")
db = client.get_database('scheduleTest')
collection=db.collected
collection.delete_many({})