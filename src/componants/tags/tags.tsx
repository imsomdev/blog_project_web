import { useMemo, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { TAGS } from "@/utils/constants.utils";
interface tagInterface {
  setSelectedTagIds: any;
  setSelectedKeys: any;
  selectedKeys: any;
}

const Tags = ({
  setSelectedTagIds,
  setSelectedKeys,
  selectedKeys,
}: tagInterface) => {
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSelectionChange = (keys: any) => {
    const selectedTagIds = Array.from(keys)
      .map((key) => {
        const tag = TAGS.find((tag) => tag.name === key);
        return tag ? tag.id : null;
      })
      .filter((id) => id !== null)
      .join(",");

    setSelectedKeys(new Set(keys));
    setSelectedTagIds(selectedTagIds);
  };
  console.log(selectedKeys, "TAGS");

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="capitalize"
          style={{ maxWidth: "640px" }}
        >
          {selectedKeys.size > 0 ? selectedValue : "Tags"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        variant="flat"
        closeOnSelect={false}
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        style={{ maxHeight: "250px", overflowY: "auto" }}
      >
        {TAGS.map((item) => (
          <DropdownItem key={item.name}>
            {item.name.replaceAll("_", " ")}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Tags;
