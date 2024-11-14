import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const createColumn = await columnService.createNew(req.body)
    // Kết quả trả về phía client
    res.status(StatusCodes.CREATED).json(createColumn)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}


export const columnController = {
  createNew,
}