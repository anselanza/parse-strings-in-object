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
  expect(result).toEqual({ foo: true, bar: null });
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
  const before = { aNumber: "1", another: "0", andAnother: "42", aFloat: "42.4242" };
  const result = parser(before) as typeof before;
  expect(result.aNumber).toBe(1);
  expect(result.andAnother).toBe(42);
  expect(result.aFloat).toBe(42.4242)
  expect(typeof result.aNumber).toBe("number");
  expect(typeof result.another).toBe("number");
  expect(typeof result.andAnother).toBe("number");
  expect(typeof result.aFloat).toBe("number");
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

describe("convert string representations of an arrays into real arrays", () => {
  test("array of strings", () => {
    const before = { list: '["test","one","two","three"]' };
    const result = parser(before) as { list: string[] };
    expect(Array.isArray(result.list)).toBeTruthy();
    expect(typeof result.list).toBe("object");
    expect(result).toEqual({ list: ["test", "one", "two", "three"]})
  });

  test("single-element array (string)", () => {
    const before = { list: '["one"]' };
    const result = parser(before) as { list: string[] };
    // expect(Array.isArray(result.list)).toBeTruthy();
    // expect(typeof result.list).toBe("object");
    // expect(result.list.length).toEqual(1);
    expect(result).toEqual({ list: ["one"]});
  })

  test("single-element array (number)", () => {
    const before = { list: "[0.05]" };
    const result = parser(before) as { list: number[] };
    expect(Array.isArray(result.list)).toBeTruthy();
    expect(typeof result.list).toBe("object");
    expect(result.list.length).toEqual(1);
    expect(result.list[0]).toEqual(0.05);
    expect(result).toEqual({ list: [0.05]})
  });

  test("array of numnbers", () => {
    const before = { list: "[0,1,2,4,8]" };
    const result = parser(before) as { list: number[] };
    expect(Array.isArray(result.list)).toBeTruthy();
    expect(typeof result.list).toBe("object");
    expect(result).toEqual({ list: [0,1,2,4,8]})
  });

  test("array of paths", () => {
    const before = { "somePaths": '["index.ts", "./some-relative-path/some_File.txt", "../../hello.world.txt","one.json","./two.json"]' };
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

  test("array of nulls, nested in object", () =>{
    const before = { list: "[null,null]"};
    const result = parser(before) as { list: any[] };
    expect(result.list).toHaveLength(2);
    expect(result).toEqual({
      list: [null, null]
    })
  })

  test("array of nulls and other values, nested in object", () =>{
    const before = { list: '[null,null,null, "string", "0", 3]'};
    const result = parser(before) as { list: any[] };
    expect(result.list).toHaveLength(6);
    expect(result).toEqual({
      list: [null, null, null, "string", "0", 3]
    })
  })

  test("various arrays nested", () => {
    const before = {
      one: '["one", "two", "three"]',
      another: '[0,1,2]',
      nestedStuff: `{
        "thisOne": ["single"],
        "anotherOne": [
          {
            "foo": "bar",
            "hello": 0
          },
          {
            "oh": "yeah",
            "more": [null, null, null, 101, 102, 103]
          }
        ]
      }`
    }
    const result = parser(before);
    expect(result).toEqual({
      one: ["one", "two", "three"],
      another: [0,1,2],
      nestedStuff: {
        thisOne: ["single"],
        anotherOne: [
          {
            foo: "bar",
            hello: 0
          },
          {
            oh: "yeah",
            more: [null, null, null, 101, 102, 103]
          }
        ]
      }
    })
  })

})
