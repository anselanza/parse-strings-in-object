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
  const before = { aNumber: "1", another: "0", andAnother: "42", aFloat: "42.4242",
    aNegativeNumber: '-3.1415', aPositiveNumber: '+3.1415'};
  const result = parser(before) as typeof before;
  expect(result.aNumber).toBe(1);
  expect(result.andAnother).toBe(42);
  expect(result.aFloat).toBe(42.4242)
  expect(result.aNegativeNumber).toBe(-3.1415);
  expect(result.aPositiveNumber).toBe(3.1415);
  expect(typeof result.aNumber).toBe("number");
  expect(typeof result.another).toBe("number");
  expect(typeof result.andAnother).toBe("number");
  expect(typeof result.aFloat).toBe("number");
  expect(typeof result.aNegativeNumber).toBe("number");
  expect(typeof result.aPositiveNumber).toBe("number");
});

test('conversion does not affect real numbers', () => {
  const before = { n0: -1.01, n1: -1, n2: 0, n3: 1, n4: 1.01, n5: +100 };
  const result = parser(before) as typeof before;
  expect(result.n0).toBe(-1.01);
  expect(result.n1).toBe(-1);
  expect(result.n2).toBe(0);
  expect(result.n3).toBe(1);
  expect(result.n4).toBe(1.01);
  expect(result.n5).toBe(100);
})

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
      },
      {
        id: "-2",
        value: "<<"
      },
      {
        id: "+2",
        value: "!>>"
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
      },
      {
        id: -2,
        value: "<<"
      },
      {
        id: 2,
        value: "!>>"
      }
    ]
  });
  expect(result.foo).toEqual(true);
  expect(result.someObjs).toHaveLength(4);
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
      numberNegative: '-10',
      numberPositive: '+10',
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
      numberNegative: -10,
      numberPositive: 10,
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
  expect(result.bar.number).toEqual(10);
  expect(result.bar.numberNegative).toEqual(-10);
  expect(result.bar.numberPositive).toEqual(10);
  expect(result.bar.subSub.thisIsFalse).toEqual(false);
  expect(result.bar.subSub.thisIsNumber).toEqual(0.00006);
});

describe("convert string representations of an arrays into real arrays", () => {
  test("array of strings", () => {
    const before = { list: "test,one,two,three" };
    const result = parser(before) as { list: string[] };
    expect(Array.isArray(result.list)).toBeTruthy();
    expect(typeof result.list).toBe("object");
    expect(result).toEqual({ list: ["test", "one", "two", "three"]})
  });

  test("single-element array (string)", () => {
    const before = { list: "one," };
    const result = parser(before) as { list: string[] };
    expect(Array.isArray(result.list)).toBeTruthy();
    expect(typeof result.list).toBe("object");
    expect(result.list.length).toEqual(1);
    expect(result).toEqual({ list: ["one"]});
  })

  test("single-element array (number)", () => {
    const before = { list: "0.05," };
    const result = parser(before) as { list: number[] };
    expect(Array.isArray(result.list)).toBeTruthy();
    expect(typeof result.list).toBe("object");
    expect(result.list.length).toEqual(1);
    expect(result.list[0]).toEqual(0.05);
    expect(result).toEqual({ list: [0.05]})
  });

  test("single-element array (positive number)", () => {
    const before = { list: "+0.05," };
    const result = parser(before) as { list: number[] };
    expect(Array.isArray(result.list)).toBeTruthy();
    expect(typeof result.list).toBe("object");
    expect(result.list.length).toEqual(1);
    expect(result.list[0]).toEqual(0.05);
    expect(result).toEqual({ list: [0.05]})
  });

  test("array of numbers", () => {
    const before = { list: "-1,0,1,2,4,+8" };
    const result = parser(before) as { list: number[] };
    expect(Array.isArray(result.list)).toBeTruthy();
    expect(typeof result.list).toBe("object");
    expect(result).toEqual({ list: [-1,0,1,2,4,8]})
  });

  test("array of paths", () => {
    const before = { somePaths: "index.ts, ./some-relative-path/some_File.txt, ../../hello.world.txt,one.json,./two.json" };
    const result = parser(before) as { somePaths: string[] };
    expect(Array.isArray(result.somePaths)).toBeTruthy();
    expect(typeof result.somePaths).toBe("object");
    expect(result.somePaths.length).toEqual(5);
    expect(result).toEqual({ somePaths: [
      "index.ts",
      "./some-relative-path/some_File.txt", 
      "../../hello.world.txt",
      "one.json",
      "./two.json"      
    ]})

  })
  
})
