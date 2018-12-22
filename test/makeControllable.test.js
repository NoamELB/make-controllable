import makeControllable from '../index';

describe('makeControllable', () => {
    it('should return state for string mapping', () => {
        expect(makeControllable({value: 1}, null, 'value')).toEqual({
            __makeControllable: {value: 1},
            value: 1,
        });
    });

    it('should return state for object mapping', () => {
        expect(makeControllable({value: 1}, null, {'value': 'stateValue'})).toEqual({
            __makeControllable: {value: 1},
            stateValue: 1,
        });
    });

    it('should return handle prop change for string mapping', () => {
        expect(makeControllable({value: 1}, {value: 2}, 'value')).toEqual({
            __makeControllable: {value: 1},
            value: 1,
        });
    });

    it('should return handle prop change for object mapping', () => {
        expect(makeControllable({value: 1}, {stateValue: 2}, {'value': 'stateValue'})).toEqual({
            __makeControllable: {value: 1},
            stateValue: 1,
        });
    });

    it('should set previous even if prop is same as state', () => {
        expect(makeControllable({value: 1}, {value: 1}, 'value')).toEqual({
            __makeControllable: {value: 1}
        });
    });

    it('should no change state when no change to value', () => {
        expect(makeControllable({value: 1}, {value: 1, __makeControllable: {value: 1}}, 'value'))
            .toEqual(null);
    });

    it('should no change state when no change to value with object mapping', () => {
        expect(makeControllable({value: 1}, {stateValue: 1, __makeControllable: {value: 1}}, {'value': 'stateValue'}))
            .toEqual(null);
    });

    it('should no change state when other props are changing', () => {
        expect(makeControllable({value: 1, otherValue: 2}, {value: 1, __makeControllable: {value: 1}}, 'value'))
            .toEqual(null);
    });

    it('mutliple values changes', () => {
        expect(makeControllable(
            {
                value: 1,
                otherValue: 2
            },
            {
                value: 2,
                otherValue: 1,
                __makeControllable: {
                    value: 3,
                    otherValue: 4,
                },
            },
            {
                'value': 'value',
                'otherValue': 'otherValue'
            }
        ))
            .toEqual({
                value: 1,
                otherValue: 2,
                __makeControllable: {
                    value: 1,
                    otherValue: 2,
                },
            });
    });
});