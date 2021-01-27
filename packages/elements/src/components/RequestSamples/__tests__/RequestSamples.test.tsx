import '@testing-library/jest-dom';

import { screen } from '@testing-library/dom';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { withPersistenceBoundary } from '../../../context/Persistence';
import { RequestSamples as RequestSamplesWithoutPersistence } from '../RequestSamples';
import { IHttpRequest } from '@stoplight/types';

const RequestSamples = withPersistenceBoundary(RequestSamplesWithoutPersistence);

const sampleRequest: IHttpRequest = {
  method: 'post',
  url: 'https://google.com',
  headers: {
    'Cache-Control': 'max-age=0'
  },
  baseUrl: 'https://google.com',
  query: {}
};

describe('RequestSend', () => {
  it('Displays basic CURL request', () => {
    const { container } = render(<RequestSamples request={sampleRequest} />);

    expect(container).toHaveTextContent('curl');
    expect(container).toHaveTextContent('POST');
    expect(container).toHaveTextContent('https://google.com');
    expect(container).toHaveTextContent('max-age=0');
  });

  it('Allows language switching', () => {
    const { container } = render(<RequestSamples request={sampleRequest} />);
    const langSelector = screen.getByRole('combobox');
    const axiosOption = screen.getByRole('option', { name: /javascript.+axios/i });
    userEvent.selectOptions(langSelector, axiosOption);
    expect(container).toHaveTextContent('axios');
    expect(container).toHaveTextContent('POST');
    expect(container).toHaveTextContent('https://google.com');
    expect(container).toHaveTextContent('max-age=0');
  });

  it('preserves language and library between renders', () => {
    render(<RequestSamples request={sampleRequest} />);
    const langSelector = screen.getByRole('combobox');
    const axiosOption = screen.getByRole('option', { name: /javascript.+axios/i });
    userEvent.selectOptions(langSelector, axiosOption);

    cleanup();

    const { container } = render(<RequestSamples request={sampleRequest} />);
    const secondLangSelector = screen.getByRole('combobox');
    expect(secondLangSelector).toHaveValue('JavaScript / Axios');
    expect(container).toHaveTextContent('axios');
  });

  it('allows to change lang/lib after rerender', () => {
    render(<RequestSamples request={sampleRequest} />);
    const langSelector = screen.getByRole('combobox');
    const axiosOption = screen.getByRole('option', { name: /javascript.+axios/i });
    userEvent.selectOptions(langSelector, axiosOption);

    cleanup();

    render(<RequestSamples request={sampleRequest} />);
    const secondLangSelector = screen.getByRole('combobox');
    const secondAxiosOption = screen.getByRole('option', { name: /javascript.+fetch/i });

    userEvent.selectOptions(secondLangSelector, secondAxiosOption);

    expect(secondLangSelector).toHaveValue('JavaScript / Fetch');
  });
});
