/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Checkbox } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { FormControl } from "@mui/material";

const MultiSelect = ({ items, label, placeholder, selected, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const allSelected = items?.length === selectedOptions?.length;
  const handleToggleOption = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  const handleClearOptions = () => setSelectedOptions([]);
  const getOptionLabel = (option) => `${option}`;
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedOptions(items);
    } else {
      handleClearOptions();
    }
  };

  const handleToggleSelectAll = () => {
    handleSelectAll && handleSelectAll(!allSelected);
  };

  const handleChange = (event, selectedOptions, reason) => {
    if (reason === "selectOption" || reason === "removeOption") {
      if (selectedOptions.find((option) => option === "select-all")) {
        handleToggleSelectAll();
        let result = [];
        result = items.filter((el) => el !== "select-all");
        return onChange(result);
      } else {
        handleToggleOption && handleToggleOption(selectedOptions);
        return onChange(selectedOptions);
      }
    } else if (reason === "clear") {
      handleClearOptions && handleClearOptions();
    }
  };
  const filter = createFilterOptions();
  return (
    <FormControl sx={{ m: 1 }}>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={items}
        value={selectedOptions}
        disableCloseOnSelect
        disableClearable={selectedOptions !== null}
        onChange={handleChange}
        style={{ width: 270, height: 27, maxHeight: "27px" }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
              onMouseDown={(e) => e.preventDefault()}
            />
            <>{option}</>
          </li>
        )}
        filterOptions={(options: string[], params: any) => {
          const filtered: any = filter(options, params);
          return ["select-all", ...filtered];
        }}
        renderInput={(params) => (
          <TextField {...params} label="Checkboxes" placeholder="Favorites" />
        )}
      />
    </FormControl>
  );
};

export default MultiSelect;
