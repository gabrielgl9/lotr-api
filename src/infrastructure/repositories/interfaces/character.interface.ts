export type Character = {
  id: string;
  name: string;
  race: string;
};

export type CreateCharacter = {
  name: string;
  race: string;
};

export type FavoriteCharacter = {
  id_user: string;
  id_character: string;
};

export interface ICharacterRepository {
  createCharacter: ({ name, race }: CreateCharacter) => Promise<Character>;
  listCharacters: () => Promise<Character[]>;
  findCharacterByName: (name: string) => Promise<Character | null | undefined>;
  toggleFavoriteCharacter: ({
    id_user,
    id_character,
  }: FavoriteCharacter) => Promise<FavoriteCharacter[]>;
}
