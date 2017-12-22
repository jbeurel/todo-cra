import ShallowRenderer from 'react-test-renderer/shallow';
import TaskForm from './TaskForm.component';
import React from 'react';

describe('[TaskForm]', () => {
  it('should display', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TaskForm/>);

    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});

