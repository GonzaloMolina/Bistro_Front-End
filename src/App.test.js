import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router';

import LogInForm from './components/component/LogInForm';
//import LogIn from './components/pages/LogIn';


import { createMemoryHistory } from 'history'
describe('LogInForm test', () => {

  test('render LogIn', () => {
    const component = render(<MemoryRouter> <LogInForm /> </MemoryRouter>)
    const email = 'E-mail';
    const password = 'Contraseña';
    const btnText = 'Iniciar Sesion';
    expect(component.getByPlaceholderText(email)).toBeDefined();// <-- tiene que estar definido
    expect(component.getByPlaceholderText(password)).toBeDefined();// <-- tiene que estar definido
    expect(component.container).toHaveTextContent(btnText);

    //console.log(prettyDOM(component.container.querySelector('img')));
    //querySelector('')< param etiqueta html >
    //prettyDOM <- te retorna el html que se obtuvo
  });

  test('Click Iniciar Sesion_ambos campos vacios', () => {
    const errorT = '';
    const email = 'E-mail';
    const password = 'Contraseña';
    const f = jest.fn()
    let component = render(<MemoryRouter> <LogInForm error={errorT} login={f} /> </MemoryRouter>)

    expect(component.getByPlaceholderText(email)).toHaveValue('');
    expect(component.getByPlaceholderText(password)).toHaveValue('');

    const btn = component.getByText('Iniciar Sesion');
    fireEvent.click(btn)
    expect(f).toHaveBeenCalledTimes(0);
  });

  test('Click Iniciar Sesion_campo email lleno', () => {
    const errorT = '';
    const email = 'E-mail';
    const password = 'Contraseña';
    const f = jest.fn()
    let component = render(<MemoryRouter> <LogInForm error={errorT} login={f} /> </MemoryRouter>)

    expect(component.getByPlaceholderText(email)).toHaveValue('');
    expect(component.getByPlaceholderText(password)).toHaveValue('');

    const value = 'admin@mail.com';
    fireEvent.change(component.getByPlaceholderText(email), { target: { value } })
    expect(component.getByPlaceholderText(email)).toHaveValue(value);

    const val = '';
    fireEvent.change(component.getByPlaceholderText(password), { target: { value: val } })
    expect(component.getByPlaceholderText(password)).toHaveValue(val);

    expect(f).toHaveBeenCalledTimes(0);
  });

  test('Click Iniciar Sesion_campo password llenos', () => {
    const errorT = '';
    const email = 'E-mail';
    const password = 'Contraseña';
    const f = jest.fn()
    let component = render(<MemoryRouter> <LogInForm error={errorT} login={f} /> </MemoryRouter>)

    expect(component.getByPlaceholderText(email)).toHaveValue('');
    expect(component.getByPlaceholderText(password)).toHaveValue('');

    const val = 'public123';
    fireEvent.change(component.getByPlaceholderText(password), { target: { value: val } })
    expect(component.getByPlaceholderText(password)).toHaveValue(val);

    const btn = component.getByText('Iniciar Sesion');
    fireEvent.click(btn)
    expect(f).toHaveBeenCalledTimes(0);
  });

  test('Click Iniciar Sesion_ambos campos llenos', () => {
    const errorT = '';
    const email = 'E-mail';
    const password = 'Contraseña';
    const f = jest.fn()
    let component = render(<MemoryRouter> <LogInForm error={errorT} login={f} /> </MemoryRouter>)

    expect(component.getByPlaceholderText(email)).toHaveValue('');
    expect(component.getByPlaceholderText(password)).toHaveValue('');

    const value = 'admin@mail.com';
    fireEvent.change(component.getByPlaceholderText(email), { target: { value } })
    expect(component.getByPlaceholderText(email)).toHaveValue(value);

    const val = 'public123';
    fireEvent.change(component.getByPlaceholderText(password), { target: { value: val } })
    expect(component.getByPlaceholderText(password)).toHaveValue(val);

    const btn = component.getByText('Iniciar Sesion');
    fireEvent.click(btn)
    expect(f).toHaveBeenCalledTimes(1);
  });
});

describe('LogIn page test', () => {
  test('', async () => {
    const f = jest.fn()
    const email = 'E-mail';
    const password = 'Contraseña';
    const btnText = 'Iniciar Sesion';

    let mock = createMemoryHistory({ initialEntries: ["/"] });
    mock.push = f;

    const page = render(<Router history={mock}> <LogIn {...{ history: mock }} /> </Router>);

    //los campos estan vacios?
    expect(page.getByPlaceholderText(email)).toHaveValue('');
    expect(page.getByPlaceholderText(password)).toHaveValue('');

    const value = 'admin@mail.com';
    fireEvent.change(page.getByPlaceholderText(email), { target: { value } })
    //se lleno el campo E-mail con value?
    expect(page.getByPlaceholderText(email)).toHaveValue(value);

    const val = 'public123';
    fireEvent.change(page.getByPlaceholderText(password), { target: { value: val } })
    //se lleno el campo password con val?
    expect(page.getByPlaceholderText(password)).toHaveValue(val);

    const btn = page.getByText(btnText);
    //antes del click estas en root?

    fireEvent.click(btn)
    expect(f).toHaveBeenCalledTimes(1);
  });
});