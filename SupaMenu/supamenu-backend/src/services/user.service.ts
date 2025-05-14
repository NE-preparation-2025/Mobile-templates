import { ServiceAPIResponse } from '../../types/service-response'
import User from '../models/factory/user'
import { IUser } from '../models/types'

const getAll = async (): Promise<ServiceAPIResponse<User[]>> => {
    try {
        const user = await User.findAll()
        if (!user) {
            return {
                statusCode: 404,
                body: [],
                message: 'No user found',
            }
        }
        return {
            statusCode: 200,
            body: user,
            message: 'Users found !',
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
            body: [],
            message: error.message,
        }
    }
}

const getById = async (id: string): Promise<ServiceAPIResponse<User>> => {
    try {
        const user = await User.findByPk(id)
        if (!user) {
            return {
                statusCode: 404,
                body: {} as User,
                message: 'No user found',
            }
        }
        return {
            statusCode: 200,
            body: user,
            message: 'User found',
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
            message: error.message,
        }
    }
}

const remove = async (id: string): Promise<ServiceAPIResponse<User>> => {
    try {
        const user = await User.findByPk(id)
        if (!user) {
            return {
                statusCode: 404,
                body: {} as User,
                message: 'User not found',
            }
        }
        await user.destroy()
        return {
            statusCode: 200,
            body: user,
            message: 'User deleted',
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
            message: error.message,
        }
    }
}

const update = async (id: string, userInfo: IUser) : Promise<ServiceAPIResponse<User | null>> => {
    try {
        const user = await User.findByPk(userInfo._id)
        if (!user) {
            return {
                statusCode: 404,
                body: {} as User,
                message: 'User not found',
            }
        }

        const [affectedCount] = await User.update({
            fullName: userInfo.fullName,
            email: userInfo.email,
            telephone: userInfo.telephone,
            password: userInfo.password,
            role: userInfo.role,
        }, {
            where: {
                _id: id,
            }
        })

        if (affectedCount > 0) {
            const updatedUser = await User.findByPk(id)
            return {
                statusCode: 200,
                body: updatedUser,
                message: 'User updated',
            }
        } else {
            return {
                statusCode: 404,
                body: {} as User,
                message: 'User not found or not updated',
            }
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
            message: error.message,
        }
    }
}

export { getAll, getById, remove, update }
