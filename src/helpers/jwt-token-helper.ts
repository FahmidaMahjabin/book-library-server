import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const jwtTokenCreate = (
  payload: object,
  secret: Secret,
  expireTime: string
) => {
  console.log('secret from helper:', secret)
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  })
}
const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}
export const jwtHelper = {
  jwtTokenCreate,
  verifyToken,
}
