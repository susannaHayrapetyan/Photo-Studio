var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = {};

config.production = {
    db:  {
        url: '',
        databaseName: '',
        options: {}
    }
};

config.development = {
    db:  {
        url: 'mongodb://127.0.0.1:27017/',
        databaseName: 'PhotoStudio',
        options: { 
            useMongoClient: true,
            keepAlive: true
        }
    },
    auth: {
        secretKey: '8349379ab6f967bc1',
        facebook: {
            clientID: '2348861868671510',
            clientSecret: '4777bd98349379ab6f967bc11ab141be',
            callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback'
        },
        google: {
            bucket: 'myphotostudio',
            projectId: 'photo-studio-180613',
            keyFilename: './Photo Studio-c2a09e72a1d4.json',
            storageUrl: 'https://storage.googleapis.com/'
        }
    }
};

module.exports = config[env];