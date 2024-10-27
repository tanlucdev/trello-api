import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (tanlucdev)',
      'string.empty': 'Title is not allowed to be empty (tanlucdev)',
      'string.min': 'Title length must be at least 3 characters long (tanlucdev)',
      'string.max': 'Title length must be less than or equal to 50 characters long (tanlucdev)',
      'string.trim': 'Title must not have leading or trailing whitespace (tanlucdev)'

    }),
    description: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'Description is required (tanlucdev)',
      'string.empty': 'Description is not allowed to be empty (tanlucdev)',
      'string.min': 'Description length must be at least 3 characters long (tanlucdev)',
      'string.max': 'Description length must be less than or equal to 256 characters long (tanlucdev)',
      'string.trim': 'Description must not have leading or trailing whitespace (tanlucdev)'
    }),
  })

  try {
    // Chỉ định abortEarly: false cho trường hợp có nhiều lỗi validation thì trả về tất cả
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu hợp lệ thì cho sang Controller
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}
