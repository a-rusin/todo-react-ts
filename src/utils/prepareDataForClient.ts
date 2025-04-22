import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";
import { Tag } from "../models/Tags";

export const prepareTags = (
  tagsKey: string[] | undefined,
  tags: Tag[] | undefined
) => {
  let updatedTags: SingleSelectOptions<string>[] = [];

  tagsKey?.forEach((tagValue) => {
    const updatedTag = tags?.find((t) => t.id === tagValue);
    if (updatedTag) {
      updatedTags.push({
        label: updatedTag.title,
        value: updatedTag.id!,
      });
    }
  });

  return updatedTags;
};
