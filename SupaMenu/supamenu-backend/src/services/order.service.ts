import { ServiceAPIResponse } from '../../types/service-response'
import Order from '../models/factory/order'
import { IOrders } from '../models/types'

const createOrder = async (
    order: IOrders,
): Promise<ServiceAPIResponse<IOrders>> => {
    try {
        const newOrder = await Order.create({
            userId: order.userId,
            productId: order.productId,
            quantity: order.quantity,
            paymentStatus: order.paymentStatus,
            total: order.total,
            paymentDate: order.paymentDate,
        })

        if (!newOrder) {
            return {
                statusCode: 404,
                body: {} as IOrders,
                message: 'Order not found',
            }
        }

        return {
            statusCode: 201,
            body: newOrder,
            message: 'Order created successfully',
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
            body: {} as IOrders,
            message: error.message,
        }
    }
}

const getAllOrders = async (): Promise<ServiceAPIResponse<IOrders[]>> => {
    try {
        const orders = await Order.findAll()
        if (!orders) {
            return {
                statusCode: 404,
                body: [],
                message: 'No orders found',
            }
        }
        return {
            statusCode: 200,
            body: orders,
            message: 'Orders found !',
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

const getOrderById = async (id: string): Promise<ServiceAPIResponse<Order>> => {
    try {
        const order = await Order.findByPk(id)
        if (!order) {
            return {
                statusCode: 404,
                body: {} as Order,
                message: 'No Order found',
            }
        }
        return {
            statusCode: 200,
            body: order,
            message: 'Order found',
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
            body: {} as Order,
            message: error.message,
        }
    }
}

const removeOrder = async (id: string): Promise<ServiceAPIResponse<Order>> => {
    try {
        const order = await Order.findByPk(id)
        if (!order) {
            return {
                statusCode: 404,
                body: {} as Order,
                message: 'Order not found',
            }
        }
        await order.destroy()
        return {
            statusCode: 200,
            body: order,
            message: 'Order deleted',
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
            body: {} as Order,
            message: error.message,
        }
    }
}

const update = async (id: string, resto: IOrders): Promise<ServiceAPIResponse<Order | null>> => {
    try {
        const order = await Order.findByPk(resto._id)
        if (!order) {
            return {
                statusCode: 404,
                body: {} as Order,
                message: 'Order not found',
            }
        }

        const [affectedCount] = await Order.update({
            userId: order.userId,
            productId: order.productId,
            quantity: order.quantity,
            paymentStatus: order.paymentStatus,
            total: order.total,
            paymentDate: order.paymentDate,
        }, {
            where: {
                _id: id,
            }
        })

        if (affectedCount > 0) {
            const updateOder = await Order.findByPk(id)
            return {
                statusCode: 200,
                body: updateOder,
                message: 'Order updated',
            }
        } else {
            return {
                statusCode: 404,
                body: {} as Order,
                message: 'Order not found or not updated',
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
            body: {} as Order,
            message: error.message,
        }
    }
}
export { createOrder, getAllOrders, getOrderById, removeOrder, update }