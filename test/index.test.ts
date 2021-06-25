import random from '../src';

// Probabilistic, result is always less than or equal to actual set size, chance it is less is below 1e-256 for sizes up to 32656.
const generatedCharacterSetSize = (options:any, targetSize:number) => {
	const set = new Set();
	const length = targetSize * 640;
	const string = random({...options, length});
	for (let i = 0; i < length; i++) {
		set.add(string[i]);
	}

	return set.size;
};

test('main', () => {
  expect(random({length: 0}).length).toBe(0)
	expect(random({length: 10}).length).toBe(10)
	expect(random({length: 100}).length).toBe(100)
	expect(random({length: 100})).toMatch(/^[a-f\d]*$/) // Sanity check, probabilistic
	expect(generatedCharacterSetSize({}, 16)).toBe(16)
});

test('async', async () => {
  expect((await random.async({length: 0})).length).toBe(0)
  expect((await random.async({length: 10})).length).toBe(10)
  expect((await random.async({length: 100})).length).toBe(100)
  expect((await random.async({length: 100}))).toMatch(/^[a-f\d]*$/)
});


test('hex', () => {
	expect(random({length: 0, type: 'hex'}).length).toBe(0)
	expect(random({length: 10, type: 'hex'}).length).toBe(10)
	expect(random({length: 100, type: 'hex'}).length).toBe(100)
	expect(random({length: 100, type: 'hex'})).toMatch(/^[a-f\d]*$/); // Sanity check, probabilistic
	expect(generatedCharacterSetSize({type: 'hex'}, 16)).toBe(16)
});


test('base64', () => {
	expect(random({length: 0, type: 'base64'}).length).toBe(0)
	expect(random({length: 10, type: 'base64'}).length).toBe(10)
	expect(random({length: 100, type: 'base64'}).length).toBe(100)
	expect(random({length: 100, type: 'base64'})).toMatch(/^[a-zA-Z\d/+]*$/) // Sanity check, probabilistic
	expect(generatedCharacterSetSize({type: 'base64'}, 64)).toBe(64)
});


test('url-safe', () => {
	expect(random({length: 0, type: 'url-safe'}).length).toBe(0)
	expect(random({length: 10, type: 'url-safe'}).length).toBe(10)
	expect(random({length: 100, type: 'url-safe'}).length).toBe(100)
	expect(random({length: 100, type: 'url-safe'})).toMatch(/^[\w.~-]*$/) // Sanity check, probabilistic
	expect(generatedCharacterSetSize({type: 'url-safe'}, 66)).toBe(66)
});

test('numeric', () => {
	expect(random({length: 0, type: 'numeric'}).length).toBe(0)
	expect(random({length: 10, type: 'numeric'}).length).toBe(10)
	expect(random({length: 100, type: 'numeric'}).length).toBe(100)
	expect(random({length: 100, type: 'numeric'}), ).toMatch(/^\d*$/) // Sanity check, probabilistic
	expect(generatedCharacterSetSize({type: 'numeric'}, 10)).toBe(10)
});

test('distinguishable', () => {
	expect(random({length: 0, type: 'distinguishable'}).length).toBe(0)
	expect(random({length: 10, type: 'distinguishable'}).length).toBe(10)
	expect(random({length: 100, type: 'distinguishable'}).length).toBe(100)
	expect(random({length: 100, type: 'distinguishable'})).toMatch(/^[CDEHKMPRTUWXY012458]*$/) // Sanity check, probabilistic
	expect(generatedCharacterSetSize({type: 'distinguishable'}, 19)).toBe(19)
});

test('ascii-printable', () => {
	expect(random({length: 0, type: 'ascii-printable'}).length).toBe(0)
	expect(random({length: 10, type: 'ascii-printable'}).length).toBe(10)
	expect(random({length: 100, type: 'ascii-printable'}).length).toBe(100)
	expect(random({length: 100, type: 'ascii-printable'})).toMatch(/^[!"#$%&'()*+,-./\w:;<=>?@[\\\]^`{|}~]*$/) // Sanity check, probabilistic
})

test('alphanumeric', () => {
	expect(random({length: 0, type: 'alphanumeric'}).length).toBe(0)
	expect(random({length: 10, type: 'alphanumeric'}).length).toBe(10)
	expect(random({length: 100, type: 'alphanumeric'}).length).toBe(100)
	expect(random({length: 100, type: 'alphanumeric'})).toMatch(/^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]*$/) // Sanity check, probabilistic
	expect(generatedCharacterSetSize({type: 'alphanumeric'}, 19)).toBe(62)
})

test('characters', () => {
	expect(random({length: 0, characters: '1234'}).length).toBe(0)
	expect(random({length: 10, characters: '1234'}).length).toBe(10)
	expect(random({length: 100, characters: '1234'}).length).toBe(100)
	expect(random({length: 100, characters: '1234'})).toMatch(/^[1-4]*$/) // Sanity check, probabilistic
	expect(generatedCharacterSetSize({characters: '1234'}, 4)).toBe(4)
	expect(generatedCharacterSetSize({characters: '0123456789'}, 10)).toBe(10)
})


test('argument errors', () => {
  // failed
  // expect(() => {
	// 	let a = 1
	// }).toThrow()

	expect(() => {
		random({length: Number.POSITIVE_INFINITY});
	}).toThrow()

	expect(() => {
		random({length: -1});
	}).toThrow()

	expect(() => {
    // @ts-ignore
		random({length: 0, type: 'hex', characters: '1234'});
	}).toThrow()

	expect(() => {
    // @ts-ignore
		random({length: 0, characters: 42});
	}).toThrow()

	expect(() => {
    // @ts-ignore
		random({length: 0, type: 'unknown'});
	}).toThrow()
})
