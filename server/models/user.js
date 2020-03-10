export default (sequelize, DataTypes) => {
    let User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    })

    User.associate = (models) => {
        User.belongsToMany(models.Team, {
            through: 'member',
            foreignKey: 'userId'
        })
        // N:M
        User.belongsToMany(models.Channel, {
            through: 'channelMember',
            foreignKey: 'userId'
        })
    }

    return User
}