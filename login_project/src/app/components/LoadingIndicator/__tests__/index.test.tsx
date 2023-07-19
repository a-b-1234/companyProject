import { render } from '@testing-library/react';

import { LoadingIndicator } from '../index';
import { DefaultTheme, ThemeProvider } from 'styled-components';

const renderWithTheme = (
  props: Parameters<typeof LoadingIndicator>[number] = {},
  theme?: DefaultTheme,
) =>
  render(
    <ThemeProvider theme={theme || lightTheme}>
      <LoadingIndicator {...props} />
    </ThemeProvider>,
  );

describe('<LoadingIndicator />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = renderWithTheme();
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot when props changed', () => {
    const loadingIndicator = renderWithTheme({ small: true });
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });

  it('should have theme', () => {
    const loadingIndicator = renderWithTheme();
    expect(loadingIndicator.container.querySelector('circle')).toHaveStyle(
      `stroke: rgba(220,120,95,1)`,
    );
  });
});


const lightTheme = {
  primary: 'rgba(215,113,88,1)',
  text: 'rgba(58,52,51,1)',
  textSecondary: 'rgba(58,52,51,0.7)',
  background: 'rgba(255,255,255,1)',
  backgroundVariant: 'rgba(251,249,249,1)',
  border: 'rgba(58,52,51,0.12)',
  borderLight: 'rgba(58,52,51,0.05)',
};
