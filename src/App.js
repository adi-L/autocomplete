import React from 'react';
import AutoCompleteWithChipsComponent from './components/autocompleteWithChips';
import ReactDOM from 'react-dom';

class AutoCompleteWithChips {
    constructor(target, props) {
        const { options = [], onChange, placeholder, label } = props;
        const elementRef = React.createRef();
        this.target = target;
        setTimeout(() => {
            this.sourceElement = target.firstElementChild;
            this.init = elementRef.current.init;
            this.addItem = elementRef.current.addItem;
        }, 0);
        ReactDOM.render(<AutoCompleteWithChipsComponent ref={elementRef} placeholder={placeholder} label={label} items={options} onChange={onChange} />, target)
    }
}
export default AutoCompleteWithChips;

