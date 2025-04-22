import { CreateAndUpateFormType } from "./CreateAndUpdate";

export interface Tag {
  id?: string;
  createdAt?: string;
  title: string;
}

export interface TagsContextContextLoading {
  delete: false | { id: string };
  get: boolean;
  createUpdate: false | { id: string };
}

export interface TagsContextContext {
  tags: Tag[] | undefined;
  isLoading: TagsContextContextLoading;
  handleClickAddFirstTag: () => void;
  createUpdateTags: (
    payload: Tag,
    mode: CreateAndUpateFormType,
    callback: () => void
  ) => void;
  deleteTag: (tagId: string) => void;
}
