import { ServiceAPIResponse } from '../../types/service-response'
import Product from '../models/factory/product'
import { IProduct } from '../models/types'

const createProduct = async (
    product: IProduct,
): Promise<ServiceAPIResponse<IProduct>> => {
    try {
        const newProduct = await Product.create({
            name: product.name,
            description: product.description,
            type: product.type,
            stockStatus: product.stockStatus,
            price: product.price,
            quantity: product.quantity,
            menuId: product.menuId,
            thumbnail: product.thumbnail
        })

        if (!newProduct) {
            return {
                statusCode: 404,
                body: {} as IProduct,
                message: 'Product not found',
            }
        }

        return {
            statusCode: 201,
            body: newProduct,
            message: 'Product created successfully',
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
            body: {} as IProduct,
            message: error.message,
        }
    }
}

const getAllProducts = async (): Promise<ServiceAPIResponse<IProduct[]>> => {
    try {
        const products = await Product.findAll()
        if (!products) {
            return {
                statusCode: 404,
                body: [],
                message: 'No products found',
            }
        }
        return {
            statusCode: 200,
            body: products,
            message: 'Products found !',
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

const getProductById = async (id: string): Promise<ServiceAPIResponse<Product>> => {
    try {
        const product = await Product.findByPk(id)
        if (!product) {
            return {
                statusCode: 404,
                body: {} as Product,
                message: 'No Product found',
            }
        }
        return {
            statusCode: 200,
            body: product,
            message: 'Product found',
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
            body: {} as Product,
            message: error.message,
        }
    }
}

const removeProduct = async (id: string): Promise<ServiceAPIResponse<Product>> => {
    try {
        const product = await Product.findByPk(id)
        if (!product) {
            return {
                statusCode: 404,
                body: {} as Product,
                message: 'Product not found',
            }
        }
        await product.destroy()
        return {
            statusCode: 200,
            body: product,
            message: 'Product deleted',
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
            body: {} as Product,
            message: error.message,
        }
    }
}

const updateProduct = async (id: string, product: IProduct): Promise<ServiceAPIResponse<Product | null>> => {
    try {
        const existingProduct = await Product.findByPk(id)
        if (!existingProduct) {
            return {
                statusCode: 404,
                body: {} as Product,
                message: 'Product not found',
            }
        }

        const [affectedCount] = await Product.update({
            name: product.name,
            description: product.description,
            type: product.type,
            stockStatus: product.stockStatus,
            price: product.price,
            quantity: product.quantity,
            menuId: product.menuId,
            thumbnail: product.thumbnail
        }, {
            where: {
                _id: id,
            }
        })

        if (affectedCount > 0) {
            const updatedProduct = await Product.findByPk(id)
            return {
                statusCode: 200,
                body: updatedProduct,
                message: 'Product updated',
            }
        } else {
            return {
                statusCode: 404,
                body: {} as Product,
                message: 'Product not found or not updated',
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
            body: {} as Product,
            message: error.message,
        }
    }
}

export { createProduct, getAllProducts, getProductById, removeProduct, updateProduct }
