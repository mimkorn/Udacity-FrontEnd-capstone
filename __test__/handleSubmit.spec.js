const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../src/client/views/index.html'), 'utf8');
const event = { preventDefault: () => {} };

import { handleSubmit } from '../src/client/js/formHandler'

jest.mock('../src/client/js/postData')

beforeEach(() => {
    console.log = jest.fn();
    window.alert = jest.fn();
    document.documentElement.innerHTML = html.toString();
});

test('check prevent default is called', () => {
    jest.spyOn(event, 'preventDefault')
    handleSubmit(event)
    expect(event.preventDefault).toBeCalled()
});

test('alert on empty input field', () => {
    document.getElementById("city").value = "";
    handleSubmit(event)
    expect(window.alert).toBeCalledWith("Seems like you didn't put any search term into the input field. Home sweet home.");
});

