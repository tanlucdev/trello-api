import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const createBoard = await boardService.createNew(req.body)
    // Kết quả trả về phía client
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    // Điều hướng dữ liệu sang tầng Service
    const board = await boardService.getDetails(boardId)
    // Kết quả trả về phía client
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    // Điều hướng dữ liệu sang tầng Service
    const updatedBoard = await boardService.update(boardId, req.body)
    // Kết quả trả về phía client
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const boardController = {
  createNew,
  getDetails,
  update
}