import React from 'react';

import Action from './Action';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';


export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }

    handleDeleteOptions = () => {
        this.setState( () => ({options:[]}))
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }))
    }

    handleAddOption = (option) => {

        if(!option){ return 'Enter valid value to add item' }
        else if ( this.state.options.indexOf(option) > -1) {
            return 'This option already exsits';
        }
        this.setState( (prevState) => ({ options: prevState.options.concat([option]) }))
    }

    handlePickOption = () => {
        const randomNumber = Math.floor(Math.random() * this.state.options.length)
        const pickedOption = this.state.options[randomNumber]
        this.setState(() => ({
            selectedOption: pickedOption
        }))
    }

    handleClearSelectedState = () => {
        setTimeout(() => {
            this.setState(() => ({
                selectedOption: ''
            }))
        }, 200);
    }


    // Lifecycle class methods --
    // Fire when first adding
    componentDidMount(){
        try {
            const json = localStorage.getItem('optionsKey');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }));
                console.log('fetch data')
            }
        } catch (e) {
            // Do nothing
        }
    }
    // Fire when state or props update
    componentDidUpdate(prevProps, prevState){
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('optionsKey', json)
            console.log('save data')
        };
    }
    // Fire when removed from screen
    componentWillUnmount(){
        console.log('component will unmount')

    }
    // Lifecycle class methods end --

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePickOption={this.handlePickOption}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedState={this.handleClearSelectedState}
                />
            </div>
        )
    }
}