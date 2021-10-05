import React from 'react';
import AutoCompleteWithChipsComponent from './components/autocompleteWithChips';
import ReactDOM from 'react-dom';

class AutoCompleteWithChips {
    constructor(target, props) {
        const {options = [],onChange,placeholder,label} = props;
        this.elementRef = React.createRef();
        this.target = target;
        setTimeout(() => {
        this.update = this.elementRef.current.update;
        }, 0);
        debugger
        ReactDOM.render(<AutoCompleteWithChipsComponent ref={this.elementRef} placeholder={placeholder} label={label} items={options}  onChange={onChange}/>,target)
    }
}
export default AutoCompleteWithChips;

