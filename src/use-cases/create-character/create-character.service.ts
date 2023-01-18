import { ICharacterRepository } from "./../../infrastructure/repositories/interfaces/character.interface";
import { schema } from "./create-character.schema";

type CreateCharacter = {
  name: string;
  race: string;
};

export class CreateCharacterService {
  constructor(private characterRepository: ICharacterRepository) {}

  async handle({ name, race }: CreateCharacter) {
    await schema.validate({ name, race });
    return await this.characterRepository.createCharacter({ name, race });
  }
}
