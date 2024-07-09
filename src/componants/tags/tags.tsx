import React, { useState } from "react";

interface TagsSelectProps {
  onSelectTags: (selectedTags: string) => void; // Callback to handle selected tags
}

const Tags: React.FC<TagsSelectProps> = ({ onSelectTags }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedValues(selectedOptions);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedValuesString = selectedValues.join(",");
    onSelectTags(selectedValuesString); // Pass selected tags to parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tags">Select tags:</label>
      <select
        id="tags"
        multiple
        onChange={handleSelectChange}
        value={selectedValues} // This ensures selected options are correctly displayed
      >
        <option value="1">Tag 1</option>
        <option value="2">Tag 2</option>
        <option value="3">Tag 3</option>
        <option value="4">Tag 4</option>
        <option value="5">Tag 5</option>
        <option value="6">Tag 6</option>
        <option value="7">Tag 7</option>
        <option value="8">Tag 8</option>
        <option value="9">Tag 9</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Tags;
