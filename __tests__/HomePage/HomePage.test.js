import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../../src/home/components/HomePage';

describe('test', () => {
    it('renders as an anchor when no page is set', () => {
        var tree = renderer.create(
            <Home />
        );

        expect(tree).toMatchSnapshot();
    });
});