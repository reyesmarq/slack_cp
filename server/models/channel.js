export default (sequelize, DataTypes) => {
    let Channel = sequelize.define('channel', {
        text: DataTypes.STRING,
        public: DataTypes.BOOLEAN,
    })

    Channel.associate = (models) => {
        // 1:M
        Channel.belongsTo(models.Team, {
            foreignKey: 'teamId'
        })
    }

    return Channel
}