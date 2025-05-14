import { ServiceAPIResponse } from '../../types/service-response'
import Menu from '../models/factory/menu'
import { IMenu } from '../models/types'

const createMenu = async (
    menu: IMenu,
): Promise<ServiceAPIResponse<IMenu>> => {
    try {
        const newMenu = await Menu.create({
            name: menu.name,
            restaurantId: menu.restaurantId,
            description: menu.description,
            icon: menu.icon,
        })

        if (!newMenu) {
            return {
                statusCode: 404,
                body: {} as IMenu,
                message: 'Menu not found',
            }
        }

        return {
            statusCode: 201,
            body: newMenu,
            message: 'Menu created successfully',
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
            body: {} as IMenu,
            message: error.message,
        }
    }
}

const getAllMenus = async (): Promise<ServiceAPIResponse<IMenu[]>> => {
    try {
        const menus = await Menu.findAll()
        if (!menus) {
            return {
                statusCode: 404,
                body: [],
                message: 'No menus found',
            }
        }
        return {
            statusCode: 200,
            body: menus,
            message: 'Menus found !',
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

const getMenuById = async (id: string): Promise<ServiceAPIResponse<Menu>> => {
    try {
        const menu = await Menu.findByPk(id)
        if (!menu) {
            return {
                statusCode: 404,
                body: {} as Menu,
                message: 'No Menu found',
            }
        }
        return {
            statusCode: 200,
            body: menu,
            message: 'Menu found',
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
            body: {} as Menu,
            message: error.message,
        }
    }
}

const removeMenu = async (id: string): Promise<ServiceAPIResponse<Menu>> => {
    try {
        const menu = await Menu.findByPk(id)
        if (!menu) {
            return {
                statusCode: 404,
                body: {} as Menu,
                message: 'Menu not found',
            }
        }
        await menu.destroy()
        return {
            statusCode: 200,
            body: menu,
            message: 'Menu deleted',
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
            body: {} as Menu,
            message: error.message,
        }
    }
}

const updateMenu = async (id: string, menu: IMenu): Promise<ServiceAPIResponse<Menu | null>> => {
    try {
        const existingMenu = await Menu.findByPk(id)
        if (!existingMenu) {
            return {
                statusCode: 404,
                body: {} as Menu,
                message: 'Menu not found',
            }
        }

        const [affectedCount] = await Menu.update({
            name: menu.name,
            restaurantId: menu.restaurantId,
            description: menu.description,
            icon: menu.icon,
        }, {
            where: {
                _id: id,
            }
        })

        if (affectedCount > 0) {
            const updatedMenu = await Menu.findByPk(id)
            return {
                statusCode: 200,
                body: updatedMenu,
                message: 'Menu updated',
            }
        } else {
            return {
                statusCode: 404,
                body: {} as Menu,
                message: 'Menu not found or not updated',
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
            body: {} as Menu,
            message: error.message,
        }
    }
}

export { createMenu, getAllMenus, getMenuById, removeMenu, updateMenu }
