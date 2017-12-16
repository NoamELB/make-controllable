import makeControllable from "../index";
import ValidComponent, { DEFAULT_STATE, STATE_KEY_DIFFERENT, STATE_VALUE_DIFFERENT, DEFAULT_MAPPING_KEY } from "./validComponent";
import renderTestComponent, { DEFAULT_NEXT_PROPS } from './renderTestComponent';

describe("makeControllable", () => {
    describe("Invalid arguments", () => {
        it("should not do anything if called completely empty", () => {
            class EmptyComponent extends ValidComponent {
                componentWillReceiveProps(nextProps) {
                    makeControllable();
                }
            }
            const wrapper = renderTestComponent(EmptyComponent);
            expect(wrapper.state).toEqual(DEFAULT_STATE);
        });

        it("should not do anything if forgot to pass 'this'", () => {
            class NoThisComponent extends ValidComponent {
                componentWillReceiveProps(nextProps) {
                    makeControllable(undefined, nextProps, DEFAULT_MAPPING_KEY);
                }
            }
            const wrapper = renderTestComponent(NoThisComponent);
            expect(wrapper.state).toEqual(DEFAULT_STATE);
        });

        it("should not do anything if passed a bad object as 'this'", () => {
            class BadThisComponent extends ValidComponent {
                componentWillReceiveProps(nextProps) {
                    makeControllable({}, nextProps, DEFAULT_MAPPING_KEY);
                }
            }
            const wrapper = renderTestComponent(BadThisComponent);
            expect(wrapper.state).toEqual(DEFAULT_STATE);
        });

        it("should not do anything if there is no state", () => {
            class NoStateComponent extends ValidComponent {
                constructor(props) {
                    super(props);
                    this.state = null;
                }
                componentWillReceiveProps(nextProps) {
                    makeControllable(this, nextProps, DEFAULT_MAPPING_KEY);
                }
            }
            const wrapper = renderTestComponent(NoStateComponent);
            expect(wrapper.state).toEqual(null);
        });

        it("should not do anything if there are no next props", () => {
            class NoNextPropsComponent extends ValidComponent {
                componentWillReceiveProps(nextProps) {
                    makeControllable(this, null, DEFAULT_MAPPING_KEY);
                }
            }
            const wrapper = renderTestComponent(NoNextPropsComponent);
            expect(wrapper.state).toEqual(DEFAULT_STATE);
        });

        it("should not do anything if there are is no mapping", () => {
            class NoMappingComponent extends ValidComponent {
                componentWillReceiveProps(nextProps) {
                    makeControllable(this, nextProps);
                }
            }
            const wrapper = renderTestComponent(NoMappingComponent);
            expect(wrapper.state).toEqual(DEFAULT_STATE);
        });
    });

    describe("Valid arguments", () => {
        describe("Mapping", () => {
            it("should render successfully when passing a string as the mapping", () => {
                class StringMappingComponent extends ValidComponent {
                    componentWillReceiveProps(nextProps) {
                        makeControllable(this, nextProps, DEFAULT_MAPPING_KEY);
                    }
                }
                const wrapper = renderTestComponent(StringMappingComponent);
                expect(wrapper.state).toEqual(DEFAULT_NEXT_PROPS);
            });
            
            it("should not render differently if passing an empty object as the mapping", () => {
                class ObjectKeysMappingComponent extends ValidComponent {
                    componentWillReceiveProps(nextProps) {
                        makeControllable(this, nextProps, {});
                    }
                }
                const wrapper = renderTestComponent(ObjectKeysMappingComponent);
                expect(wrapper.state).toEqual(DEFAULT_STATE);
            });
            
            it("should render successfully when passing an object with only keys as the mapping", () => {
                class ObjectKeysMappingComponent extends ValidComponent {
                    componentWillReceiveProps(nextProps) {
                        makeControllable(this, nextProps, {[DEFAULT_MAPPING_KEY]: ""});
                    }
                }
                const wrapper = renderTestComponent(ObjectKeysMappingComponent);
                expect(wrapper.state).toEqual(DEFAULT_NEXT_PROPS);
            });
            
            it("should render successfully when passing an object as the mapping", () => {
                class ObjectMappingComponent extends ValidComponent {
                    componentWillReceiveProps(nextProps) {
                        makeControllable(this, nextProps, {[DEFAULT_MAPPING_KEY]: STATE_KEY_DIFFERENT});
                    }
                }
                const wrapper = renderTestComponent(ObjectMappingComponent);
                const expectedNextState = Object.assign({[STATE_KEY_DIFFERENT]: STATE_VALUE_DIFFERENT}, DEFAULT_STATE)
                expect(wrapper.state).toEqual(expectedNextState);
            });
        });

        describe("Calling next state", () => {
            let setStateCalledTimes;
            class StateSpyComponent extends ValidComponent {
                setState(state) {
                    super.setState(state);
                    setStateCalledTimes++;
                }
            }
            beforeEach(() => {
                setStateCalledTimes = 0;
            });

            it("should set state on valid components once", () => {
                const wrapper = renderTestComponent(StateSpyComponent);
                expect(setStateCalledTimes).toEqual(1);
            });

            it("should not call next state if there are no new props", () => {
                const wrapper = renderTestComponent(StateSpyComponent, DEFAULT_NEXT_PROPS, DEFAULT_NEXT_PROPS);
                expect(setStateCalledTimes).toEqual(0);
            });

            it("should not call next state if the state value isn't different than the new prop", () => {
                // i dare you to find a better name for it
                class DoesntInitializeStateFromPropsComponent extends StateSpyComponent {
                    constructor(props) {
                        super(props);
                        // override state to always be the default state regardless of props
                        this.state = DEFAULT_STATE;
                    }
                }
                const wrapper = renderTestComponent(DoesntInitializeStateFromPropsComponent, DEFAULT_NEXT_PROPS, DEFAULT_STATE);
                expect(setStateCalledTimes).toEqual(0);
            });
        });

        describe("newStateCallback", () => {
            it("should call the newStateCallback when passed instead of nextState", () => {
                const spy = jest.fn();
                class NewStateCallbackComponent extends ValidComponent {
                    componentWillReceiveProps(nextProps) {
                        makeControllable(this, nextProps, DEFAULT_MAPPING_KEY, spy);
                    }
                }
                const wrapper = renderTestComponent(NewStateCallbackComponent);
                expect(spy).toHaveBeenCalledWith(DEFAULT_NEXT_PROPS);
                expect(wrapper.state).toEqual(DEFAULT_STATE);
            });
        });
    });
});