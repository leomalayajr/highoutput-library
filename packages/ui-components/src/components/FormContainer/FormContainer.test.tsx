import { Input } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import FormContainer from './FormContainer';

describe('Form Container Component', () => {
  beforeEach(() => {
    render(
      <FormContainer
        id="test"
        label="Name"
        errorMsg="Error Message"
        children={<Input data-testid="input.test" />}
      />
    );
  });

  it('should renders form container form control', async () => {
    const formControl = await screen.findAllByTestId(
      'formcontainer.formcontrol'
    );
    expect(formControl).toHaveLength(1);
  });

  it('should renders form container form label', async () => {
    const formLabel = await screen.findAllByTestId('formcontainer.label');
    expect(formLabel).toHaveLength(1);
  });

  it('should renders form container form error message', async () => {
    const formErrorMessage = await screen.findAllByTestId(
      'formcontainer.error'
    );
    expect(formErrorMessage).toHaveLength(1);
  });

  it('should renders form container children react node', async () => {
    const reactNodeInput = await screen.findAllByTestId('input.test');
    expect(reactNodeInput).toHaveLength(1);
  });
});
