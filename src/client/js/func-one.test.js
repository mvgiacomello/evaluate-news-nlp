import { dummyLog } from "./func-one"

test('Is module defined and exported', () => {
    expect(dummyLog).toBeDefined()
})