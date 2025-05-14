import User from '../models/factory/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { ServiceAPIResponse, ServiceAuthResponse } from '../../types/service-response'
import { IUser } from '../models/types'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

const login = async (email: string, password: string): Promise<ServiceAuthResponse<User>> => {
    try {
        const user = await User.findOne({
            where: {
                email,
            },
        })
        if (!user) {
            return {
                statusCode: 404,
                body: {} as User,
                message: 'User not found',
                token: '',
            }
        }
        if (user.password) {
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                return {
                    statusCode: 401,
                    body: {} as User,
                    message: 'Password does not match',
                    token: '',
                }
            }
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: '1d',
        })
        return {
            statusCode: 200,
            body: {
                ...user.toJSON(),
                password: undefined,
            },
            message: 'Login success',
            token,
        }
    } catch (error: any) {
        return {
            statusCode: 500,
            body: {} as User,
            message: error.errors.message,
            token: '',
        }
    }
}

const signup = async (user: IUser): Promise<ServiceAPIResponse<User>> => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
        const newUser = await User.create({
            fullName: user.fullName,
            email: user.email,
            telephone: user.telephone,
            password: user.password,
            role: user.role,
        })

        if (!newUser) {
            return {
                statusCode: 404,
                body: {} as User,
                message: 'User not found',
            }
        }
        const newUserResponse = newUser.toJSON() as User
        delete newUserResponse?.password
        return {
            statusCode: 201,
            body: newUserResponse,
            message: 'User created successfully',
        }
    } catch (error: any) {
        let statusCode = 404
        if (error.name === 'SequelizeValidationError') {
            statusCode = 422
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            statusCode = 409
        } else {
            statusCode = 500
        }
        return {
            statusCode,
            body: {} as User,
            // error: [{ message: "Validation isNumeric on telephone failed", type: "Validation error" }]
            message: error.errors[0].message,
        }
    }
}

export { login, signup }
