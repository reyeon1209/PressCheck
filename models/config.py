
class Config(object):
    DEBUG = False
    TESTING = False
    
class DevelopmentConfig(Config):
	DEBUG = True

class TestingConfig(Config):
    DEBUG = True
    TESTING = True

class ProductionConfig(Config):
    DEBUG = False
	

