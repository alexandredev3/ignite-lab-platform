import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Lesson } from './lesson';

import { CollapseProvider } from '../context/collapse-context';

describe('Rendering', () => {
  it('Lesson', () => {
    const { container } = render(
      <BrowserRouter>
        <CollapseProvider>
          <Lesson
            title="Getting Started with React.js"
            slug="getting-started-with-react-js"
            availableAt={new Date(8, 4, 2022)}
            type="class"
          />
        </CollapseProvider>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  }) 
});