module.exports = {
    database: process.env.MONGO_URL || 'mongodb+srv://crudproject:crudproject@cluster0.ffqoy.mongodb.net/KCS?retryWrites=true&w=majority',
    secret: "mysecret"
}