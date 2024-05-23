import { UnauthorizedError } from '@/app/errors'
import { JWT_SECRET } from '@/constants'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization = null } = req.headers
  if (!authorization) throw new UnauthorizedError('No token provided')

  const [, token] = authorization.split(' ')

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) throw new UnauthorizedError('Invalid token')
    return next()
  })
}

export default authenticationMiddleware
