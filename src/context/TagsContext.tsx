import { createContext, ReactNode, useEffect, useState } from "react";
import {
  Tag,
  TagsContextContext,
  TagsContextContextLoading,
} from "../models/Tags";
import { CreateAndUpateFormType } from "../models/CreateAndUpdate";
import { tagsService } from "../services/tags.service";
import localStorageService from "../services/localStorage.service";
import { nanoid } from "nanoid";

export const TagsContext = createContext<TagsContextContext | undefined>(
  undefined
);

interface TagsContextProviderProps {
  children: ReactNode;
}

export const TagsContextProvider = ({ children }: TagsContextProviderProps) => {
  const [tags, setTags] = useState<Tag[] | undefined>();
  const [isLoading, setIsLoading] = useState<TagsContextContextLoading>({
    createUpdate: false,
    delete: false,
    get: false,
  });

  useEffect(() => {
    getTags();
  }, []);

  const currentUser = localStorageService.getLocalUserId();

  const createUpdateTags = async (
    payload: Tag,
    mode: CreateAndUpateFormType,
    callback?: () => void
  ) => {
    setIsLoading((prev) => ({ ...prev, createUpdate: { id: payload.id! } }));
    try {
      const data = await tagsService.createAndUpdate<Tag>(
        payload,
        currentUser!
      );
      if (mode === "create") {
        setTags((prev) => (prev ? [...prev, data] : [data]));
      } else {
        setTags((prev) =>
          prev?.map((tag) => (tag.id === data.id ? data : tag))
        );
      }
      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, createUpdate: false }));
    }
  };

  const handleClickAddFirstTag = () => {
    createUpdateTags(
      { id: nanoid(), title: "Новый тег", createdAt: Date.now().toString() },
      "create"
    );
  };

  const getTags = async () => {
    setIsLoading((prev) => ({ ...prev, get: true }));
    try {
      const data = await tagsService.get<Tag[]>(currentUser!);
      setTags(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, get: false }));
    }
  };

  return (
    <TagsContext.Provider
      value={{ tags, isLoading, handleClickAddFirstTag, createUpdateTags }}
    >
      {children}
    </TagsContext.Provider>
  );
};
