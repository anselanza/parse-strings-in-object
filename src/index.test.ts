import parser from "./";

test('convert "true" and "false" to boolean values', () => {
  const before = { foo: "true", bar: "false" };
  const result = parser(before) as typeof before;
  // expect(result).to.equal({ foo: true, bar: false });
  expect(result.foo).toBe(true);
  expect(result.bar).toBe(false);
});

test("retain actual null values without errors", () => {
  const before = { foo: "true", bar: null };
  const result = parser(before) as typeof before;
  // expect(result).to.equal({ foo: true, bar: false });
  expect(result.foo).toBe(true);
  expect(result.bar).toBe(null);
});

test("convert string representations of nulls into real nulls", () => {
  const before = { foo: "true", bar: "null" };
  const result = parser(before) as typeof before;
  // expect(result).to.equal({ foo: true, bar: false });
  expect(result.foo).toBe(true);
  expect(result.bar).toBe(null);
});

test("retain actual undefined values without errors", () => {
  const before = { foo: "true", bar: undefined };
  const result = parser(before) as typeof before;
  // expect(result).to.equal({ foo: true, bar: false });
  expect(result.foo).toBe(true);
  expect(result.bar).toBe(undefined);
  expect(result.bar).toBeUndefined();
});

test("convert string representations of undefineds into real undefineds", () => {
  const before = { foo: "true", bar: "undefined" };
  const result = parser(before) as typeof before;
  // expect(result).to.equal({ foo: true, bar: false });
  expect(result.foo).toBe(true);
  expect(result.bar).toBe(undefined);
  expect(result.bar).toBeUndefined();
});

test("convert string representations of numbers into real numbers", () => {
  const before = { aNumber: "1", another: "0", andAnother: "42" };
  const result = parser(before) as typeof before;
  expect(result.aNumber).toBe(1);
  expect(result.andAnother).toBe(42);
  expect(typeof result.aNumber).toBe("number");
  expect(typeof result.another).toBe("number");
  expect(typeof result.andAnother).toBe("number");
});

test("convert arrays of string representations of numbers into array of numbers", () => {
  const before = { foo: "true", list: ["1", "2", "3"] };
  const result = parser(before) as typeof before;
  expect(result).toEqual({ foo: true, list: [1, 2, 3] });
  expect(result.list).toHaveLength(3);
});

test("retain arrays of strings properly", () => {
  const before = { foo: "true", list: ["one", "two", "three"] };
  const result = parser(before) as typeof before;
  expect(result).toEqual({ foo: true, list: ["one", "two", "three"] });
  expect(result.list).toHaveLength(3);
});

test("convert array of objects with string representations of numbers", () => {
  const before = {
    foo: "true",
    someObjs: [
      {
        id: "0",
        value: "hello"
      },
      {
        id: "1",
        value: "world"
      }
    ]
  };
  const result = parser(before) as typeof before;
  expect(result).toEqual({
    foo: true,
    someObjs: [
      {
        id: 0,
        value: "hello"
      },
      {
        id: 1,
        value: "world"
      }
    ]
  });
  expect(result.foo).toEqual(true);
  expect(result.someObjs).toHaveLength(2);
});
