import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});


describe('App component tests', () => {
    
    const wrapper = shallow(<App />);

    it('should have a TEXT header' , () => {
        expect(wrapper.find('h1#data').text()).toEqual('DATA');
    })
    
    it('should have buttons for send and erase' , () => {
        expect(wrapper.find('button#submit')).toHaveLength(1);
        expect(wrapper.find('button#delete')).toHaveLength(1);
        expect(wrapper.find('button#submit').text()).toEqual('SEND');
        expect(wrapper.find('button#delete').text()).toEqual('ERASE');
    });    

    it('should have inputs for first name, last name, participation', ()=> {
        expect(wrapper.find('input#firstName')).toHaveLength(1);
        expect(wrapper.find('input#lastName')).toHaveLength(1);
        expect(wrapper.find('input#participation')).toHaveLength(1);
    });

    it('should have empty state vars: first name, last name, participation and data', ()=> {
        expect(wrapper.state('firstName')).toEqual('');
        expect(wrapper.state('lastName')).toEqual('');
        expect(wrapper.state('participation')).toEqual('');
        expect(wrapper.state('data')).toEqual([]);  // data must be an array
    });

    it('calls submit with first name last name and participation', () => {
        const handleSubmit = jest.fn()
        const container = document.createElement('div');
        ReactDOM.render(<App onSubmit={handleSubmit()}/>, container);
        const form = container.querySelector('form');
        const firstName = container.getElementsByClassName('firstName');
        const lastName = container.getElementsByClassName('lastName');
        const participation = container.getElementsByClassName('participation')
        firstName.value = 'Alex';
        lastName.value = 'Nemechek';
        participation.value = 5
        form.dispatchEvent(new window.Event('submit'))
        expect(handleSubmit).toHaveBeenCalledTimes(1)
    });
});
