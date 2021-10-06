import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default React.forwardRef((props, ref) => {
    const { items, onChange, placeholder, label } = props;
    const [allOptions, setOptions] = React.useState(items);
    const _selectedItems = items.filter(option => option.isSelected);
    const [selectedItems, setSelectedItems] = React.useState(_selectedItems);

    const _onChange = (event, selectedElements) => {
        setSelectedItems(selectedElements);
        onChange(event, selectedElements, allOptions);
    }
    React.useImperativeHandle(ref, () => ({
        init(newOptions) {
            if (Array.isArray(newOptions)) {
                const cloneState = [...newOptions];
                const _selectedItems = cloneState.filter(option => option.isSelected);
                setSelectedItems(_selectedItems)
                setOptions(cloneState);
            }
        },
        addItem(newOptions, options = { index: null, isSelected: false }) {
            const {index,isSelected} = options;
            if (typeof newOptions !== "object") {
                return console.error("addItem should get object");
            }
            if (!newOptions.title) {
                return console.error("addItem should get object with {title:property}");
            }
            if (typeof newOptions.isSelected !== "boolean") {
                newOptions.isSelected = typeof isSelected === "boolean" ? isSelected : false;
            }
            if (newOptions.isSelected) {
                const cloneSelectedItems = [...selectedItems];
                cloneSelectedItems.unshift(newOptions);
                setSelectedItems(cloneSelectedItems);
            }
            const cloneOptions = [...allOptions];
            if (typeof index !== "number") {
                cloneOptions.unshift(newOptions);
                setOptions(cloneOptions);
            } else {
                cloneOptions.splice(index, 0, newOptions);
            }
        },
    }));
    return <CustomizedHook onChange={_onChange} placeholder={placeholder} label={label} selectedOptions={selectedItems} options={allOptions} />;
});

function CustomizedHook(props) {
    const { options = [], selectedOptions = [], onChange, placeholder, label } = props;

    return (
        <Autocomplete
            onChange={(event, selectedItems) => {
                onChange(event, selectedItems);
            }}
            multiple
            size="small"
            options={options}
            disableCloseOnSelect
            value={selectedOptions}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.title}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={placeholder} />
            )}
        />
    );
}