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


describe('App component tests', ()=> {
    const wrapper = shallow(<App />);
    
    expect(wrapper.find('button#submit')).toHaveLength(1);
    expect(wrapper.find('button#delete')).toHaveLength(1);

            //Button text
    expect(wrapper.find('button#submit').text()).toEqual('SEND');
    expect(wrapper.find('button#delete').text()).toEqual('ERASE');
        

    it('should have inputs for first name, last name, participation', ()=> {
        expect(wrapper.find('input#firstName')).toHaveLength(1);
        expect(wrapper.find('input#lastName')).toHaveLength(1);
        expect(wrapper.find('input#participation')).toHaveLength(1);
    });
});
