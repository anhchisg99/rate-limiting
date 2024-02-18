import client from './init_redis.js'

const getIpUser = req => {
    return ''
}

const incr = async key => {
    return await client.incr(key)
}
const expire = async (key,ttl) => {
    return await client.expire(key,ttl)
}
export {
    incr,
    expire,
}