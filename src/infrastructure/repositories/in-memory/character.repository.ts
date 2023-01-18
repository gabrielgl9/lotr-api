import {
  Character,
  ICharacterRepository,
  CreateCharacter,
  FavoriteCharacter,
} from "./../interfaces/character.interface";
import { randomUUID } from "node:crypto";

export class CharacterRepository implements ICharacterRepository {
  private characters: Character[] = [];
  private favoriteCharacters: FavoriteCharacter[] = [];

  async createCharacter({ name, race }: CreateCharacter): Promise<Character> {
    const character = {
      id: randomUUID(),
      name,
      race,
    };
    this.characters.push(character);
    return character;
  }

  async listCharacters(): Promise<Character[]> {
    return this.characters;
  }

  async findCharacterByName(
    name: string
  ): Promise<Character | null | undefined> {
    return this.characters.find((character) => character.name === name);
  }

  async toggleFavoriteCharacter({
    id_user,
    id_character,
  }: FavoriteCharacter): Promise<FavoriteCharacter[]> {
    const favoriteCharacterIndex = this.favoriteCharacters.findIndex(
      (favoriteCharacter) =>
        favoriteCharacter.id_character === id_character &&
        favoriteCharacter.id_user === id_user
    );

    if (!favoriteCharacterIndex) {
      this.favoriteCharacters.push({ id_user, id_character });
      return this.favoriteCharacters;
    }

    this.favoriteCharacters.splice(favoriteCharacterIndex, 1);
    return this.favoriteCharacters;
  }
}
