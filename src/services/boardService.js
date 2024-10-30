import { slugify } from "~/utils/formatters"
import { boardModel } from "~/models/boardModel"

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createBoard = await boardModel.createNew(newBoard)

    // Lấy bản ghi board sau khi gọi
    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)
    console.log(getNewBoard)
    return getNewBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}