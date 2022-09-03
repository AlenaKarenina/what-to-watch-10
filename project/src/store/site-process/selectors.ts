import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getAvatarUrl = (state: State): string | null => state[NameSpace.Site].avatarUrl;
