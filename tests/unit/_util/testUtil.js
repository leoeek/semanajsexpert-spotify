import { jest } from '@jest/globals'
import { Readable, Writable } from 'stream'

export default class TestUtil {

    static generateReadableStream(data) {
        return new Readable({
            read() {
                for (const item of data) {
                    this.push(item)
                }

                this.push(null)
            }
        })
    }

    static generateWritableStream(data) {
        return new Writable({
            write(chuck, enc, cb) {
                onformdata(chuck)
                cb(null, chuck)
            }
        })
    }

    static defaultHandleParams() {
        const requestStream = TestUtil.generateReadableStream(['body da requisicao'])
        const respose = TestUtil.generateWritableStream(() => {})

        const data = {
            request: Object.assign(requestStream, {
                headers: {},
                method: '',
                url: ''
            }),
            response: {
                writeHead: jest.fn(),
                end: jest.fn()
            }
        }

        return {
            values: () => Object.values(data),
            ...data,
        }
    }
}