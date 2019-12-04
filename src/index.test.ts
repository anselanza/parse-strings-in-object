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

test("IP addresses should stay as strings though they look like numbers", () => {
  const before = { aNumber: "192.168", address: "192.168.1.100" };
  const result = parser(before) as typeof before;
  expect(result.aNumber).toBe(192.168);
  expect(typeof result.aNumber).toBe("number");
  expect(result.address).toBe("192.168.1.100");
  expect(typeof result.address).toBe("string");
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

test("parse a nested structure properly", () => {
  const before = {
    topLevel: true,
    topNumber: 1,
    foo: {
      active: "true",
      number: "0",
      anotherNumber: "3.17"
    },
    bar: {
      active: "false",
      number: "10",
      aString: "yo",
      somethingNull: null,
      subSub: {
        thisIsTrue: "true",
        thisIsFalse: "false",
        thisIsNumber: "0.00006"
      }
    },
    justAString: "hello",
    ipAddress: "192.168.1.101",
    alsoNull: "null"
  };

  const result = parser(before) as typeof before;

  const expected = {
    topLevel: true,
    topNumber: 1,
    foo: {
      active: true,
      number: 0,
      anotherNumber: 3.17
    },
    bar: {
      active: false,
      number: 10,
      aString: "yo",
      somethingNull: null,
      subSub: {
        thisIsTrue: true,
        thisIsFalse: false,
        thisIsNumber: 0.00006
      }
    },
    justAString: "hello",
    ipAddress: "192.168.1.101",
    alsoNull: null
  };

  expect(result).toEqual(expected);
  expect(result.topLevel).toEqual(true);
  expect(result.foo.active).toEqual(true);
  expect(result.ipAddress).toEqual("192.168.1.101");
  expect(result.bar.subSub.thisIsFalse).toEqual(false);
  expect(result.bar.subSub.thisIsNumber).toEqual(0.00006);
});
