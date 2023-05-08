import { Story } from '../models';

export const existStory = async (id: number) => {
  const foundStory = await Story.findByPk(id);
  if (!foundStory) {
    throw new Error(`La story con el siguiente id ${id}, no existe.`);
  }
};
