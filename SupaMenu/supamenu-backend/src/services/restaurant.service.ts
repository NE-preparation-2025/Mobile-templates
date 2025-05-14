import { ServiceAPIResponse } from '../../types/service-response'
import Restaurant from '../models/factory/restaurant'
import { IRestaurant } from '../models/types'

const create = async (
    restaurant: IRestaurant,
): Promise<ServiceAPIResponse<IRestaurant>> => {
    try {
        const newRestaurant = await Restaurant.create({
            title: restaurant.title,
            location: restaurant.location,
            status: restaurant.status,
            thumbnail: restaurant.thumbnail,
            description: restaurant.description,
            rating: restaurant.rating,
        })

        if (!newRestaurant) {
            return {
                statusCode: 404,
                body: {} as Restaurant,
                message: 'Restaurant not found',
            }
        }

        return {
            statusCode: 201,
            body: newRestaurant,
            message: 'Restaurant created successfully',
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
            body: {} as Restaurant,
            message: error.message,
        }
    }
}

const getAll = async (): Promise<ServiceAPIResponse<IRestaurant[]>> => {
    try {
        const restaurants = await Restaurant.findAll()
        if (!restaurants) {
            return {
                statusCode: 404,
                body: [],
                message: 'No restaurants found',
            }
        }
        return {
            statusCode: 200,
            body: restaurants,
            message: 'Restaurants found !',
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

const getById = async (id: string): Promise<ServiceAPIResponse<Restaurant>> => {
    try {
        const restaurant = await Restaurant.findByPk(id)
        if (!restaurant) {
            return {
                statusCode: 404,
                body: {} as Restaurant,
                message: 'No Restaurant found',
            }
        }
        return {
            statusCode: 200,
            body: restaurant,
            message: 'Restaurant found',
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
            body: {} as Restaurant,
            message: error.message,
        }
    }
}

const remove = async (id: string): Promise<ServiceAPIResponse<Restaurant>> => {
    try {
        const restaurant = await Restaurant.findByPk(id)
        if (!restaurant) {
            return {
                statusCode: 404,
                body: {} as Restaurant,
                message: 'Restaurant not found',
            }
        }
        await restaurant.destroy()
        return {
            statusCode: 200,
            body: restaurant,
            message: 'Restaurant deleted',
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
            body: {} as Restaurant,
            message: error.message,
        }
    }
}

const update = async (id: string, resto: IRestaurant) : Promise<ServiceAPIResponse<Restaurant | null>> => {
    try {
        const restaurant = await Restaurant.findByPk(resto._id)
        if (!restaurant) {
            return {
                statusCode: 404,
                body: {} as Restaurant,
                message: 'Restaurant not found',
            }
        }

        const [affectedCount] = await Restaurant.update({
            title: restaurant.title,
            location: restaurant.location,
            status: restaurant.status,
            thumbnail: restaurant.thumbnail,
            description: restaurant.description,
            rating: restaurant.rating,
        }, {
            where: {
                _id: id,
            }
        })

        if (affectedCount > 0) {
            const updateRestaurant = await Restaurant.findByPk(id)
            return {
                statusCode: 200,
                body: updateRestaurant,
                message: 'Restaurant updated',
            }
        } else {
            return {
                statusCode: 404,
                body: {} as Restaurant,
                message: 'Restaurant not found or not updated',
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
            body: {} as Restaurant,
            message: error.message,
        }
    }
}

export { create, getAll, getById, remove, update }
