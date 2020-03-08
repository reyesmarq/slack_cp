import Sequelize from "sequelize"

let sequelize = new Sequelize(
    'slack',
    'postgres',
    'reyes859',
    {
        dialect: 'postgres'
    }
)
let models = {
    User: sequelize.import('./user'),
    Channel: sequelize.import('./channel'),
    // Member: sequelize.import('./member'),
    Message: sequelize.import('./message'),
    Team: sequelize.import('./team')
}

Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models)
    }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models