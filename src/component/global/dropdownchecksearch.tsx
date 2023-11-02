import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import { Checkbox, InputAdornment, TextField } from "@mui/material";
import { ListItemIcon, ListSubheader } from "@mui/material";
import { Select } from "@mui/material";
import * as React from "react";
import { Search } from "@mui/icons-material";
import { useEffect } from "react";

export default function Dropdownchecksearch(props) {
  const [selected, setSelected] = React.useState<string[]>([props.selected]);
  const isAllSelected =
    props?.name?.length > 0 && props?.selected?.length === props?.name?.length;

  const [searchText, setSearchText] = React.useState("");

  const [displayedOptions, setDisplayedOptions] = React.useState(props?.name);

  // const containsText = (text, searchText) =>
  //     text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  // displayedOptions = React.useMemo(
  //     () => props?.name.filter((option) => containsText(option, searchText)),
  //     [searchText]
  // );

  useEffect(() => {
    setDisplayedOptions(props?.name);
  }, [props?.name]);

  const searchData = (e) => {
    setSearchText(e.target.value);

    const updateData = props?.name.filter((item) => {
      return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    setDisplayedOptions(updateData);
  };

  const selectData = (selected) => {
    let selectedString = selected + `, `;
    const lastCommaRemoved = selectedString.endsWith(`, `)
      ? selectedString.slice(0, -2)
      : selectedString;
    return lastCommaRemoved;
  };

  return (
    <FormControl sx={{ m: 1, width: props?.width }}>
      <Select
        SelectDisplayProps={{
          style: { padding: "2px 10px", fontSize: "13px" },
        }}
        labelId="mutiple-select-label"
        multiple
        variant="outlined"
        value={props.selected || []}
        onChange={props.handleChange}
        renderValue={(selected) => selectData(selected)}
        // onClose={props.handleClose}
        onClose={() => setDisplayedOptions(props?.name)}
        MenuProps={{
          autoFocus: false,
          PaperProps: { sx: { maxHeight: 170, maxWidth: 270, zIndex: 999 } },
        }}
      >
        <ListSubheader>
          <TextField
            size="small"
            // Autofocus on textfield
            autoFocus
            placeholder="Type to search..."
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={searchData}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {
                // Prevents autoselecting item while typing (default Select behaviour)
                e.stopPropagation();
              }
            }}
          />
        </ListSubheader>
        {props?.selectall && (
          <MenuItem
            value="all"
            onClick={() => props?.setUpdate && props?.setUpdate(true)}
          >
            <ListItemIcon>
              <Checkbox
                checked={isAllSelected}
                indeterminate={
                  props?.selected?.length > 0 &&
                  props?.selected.length < props?.name.length
                }
              />
            </ListItemIcon>

            <ListItemText primary="Select All" />
          </MenuItem>
        )}
        {displayedOptions.sort().map((option) => (
          <MenuItem key={option?.id} value={option}>
            <ListItemIcon>
              <Checkbox checked={props.selected?.includes(option)} />
            </ListItemIcon>
            <ListItemText primary={option?.title}>{option}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
