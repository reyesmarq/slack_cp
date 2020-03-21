const createResolver = (resolver) => {
    let baseResolver = resolver
    baseResolver.createResolver = (childResolver) => {
        let newResolver = async (parent, args, context, info) => {
            await resolver(parent, args, context, info)
            return childResolver(parent, args, context, info)
        }
        return createResolver(newResolver)
    }

    return baseResolver
}

export const requiresAuth = createResolver((parent, args, { user }) => {
    if (!user || !user.id) {
        throw new Error('Not authenticated')
    }
})  