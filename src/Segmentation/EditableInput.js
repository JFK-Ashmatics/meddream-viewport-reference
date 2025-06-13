import React from 'react';
import PropTypes from 'prop-types';

export default class EditableInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            text: props.value.getValue(),
            inputVisible: false
        };
        this.inputRef = React.createRef();

        this.onClickOutSideBind = this.onClickOutSide.bind(this);
    }

    componentDidMount () {
        document.addEventListener('mousedown', this.onClickOutSideBind);
    }

    componentDidUpdate () {
        if (this.inputRef.current) {
            this.inputRef.current.focus();
        }
    }

    componentWillUnmount () {
        document.removeEventListener('mousedown', this.onClickOutSideBind);
    }

    handleKeyPress (e) {
        if (e.keyCode === 13) {
            this.finishEditing();
        } else if (e.keyCode === 27) {
            this.setInputVisible(false);
        }
    }

    onClickOutSide (e) {
        if (!this.state.inputVisible) {
            return;
        }
        if (this.inputRef.current && !this.inputRef.current.contains(e.target)) {
            this.props.value.setValue(this.state.text);
            this.setInputVisible(false);
        }
    }

    setInputVisible (inputVisible) {
        this.setState({inputVisible});
    }

    setText (text) {
        this.setState({text});
    }

    startEdit () {
        this.setText(this.props.value.getValue());
        this.setInputVisible(true);
    }

    finishEditing () {
        if (this.inputRef.current) {
            this.props.value.setValue(this.state.text);
            this.setInputVisible(false);
        }
    }

    returnEditableInput () {
        const {value, ...otherProps} = this.props;
        return (
            <input
                {...otherProps}
                ref={this.inputRef}
                value={this.state.text}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => this.handleKeyPress(e)}
                onChange={(e) => this.setText(e.target.value)}
            />
        );
    }

    returnReadOnlyView () {
        const {value, ...otherProps} = this.props;
        return (
            <div
                {...otherProps}
                onDoubleClick={() => this.startEdit()}
            >
                {this.props.value.getValue()}
            </div>
        );
    }

    render () {
        if (this.state.inputVisible) {
            return this.returnEditableInput();
        }
        return this.returnReadOnlyView();
    }
}

EditableInput.propTypes = {
    value: PropTypes.object.isRequired
};
