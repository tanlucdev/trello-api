import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    const createCard = await cardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createCard)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}


export const cardController = {
  createNew,
}