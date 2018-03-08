import "babel-polyfill";
import "whatwg-fetch";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-15";

Enzyme.configure({ adapter: new Adapter() });
const tests = require.context(".", true, /Spec.js/);
tests.keys().forEach(tests);
