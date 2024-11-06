import { slugify } from "~/utils/formatters"
import { boardModel } from "~/models/boardModel"
import ApiError from "~/utils/ApiError"
import { StatusCodes } from "http-status-codes"
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createBoard = await boardModel.createNew(newBoard)

    // Lấy bản ghi board sau khi gọi
    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)
    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    // B1: CloneDeep dữ liệu
    const resBoard = cloneDeep(board)
    // B2: Đưa card về đúng columns
    resBoard.columns.forEach(column => {
      // MongoDB có hỗ trợ object Equal
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
      // toString là của Javascript
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    // B3: Xóa mảng card khỏi board ban đầu
    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}

