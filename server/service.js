import fs from 'fs'
import fsPromise from 'fs/promises'
import { join, extname } from 'path'
import { type } from 'os'
import config from './config.js'

const { dir: {
    publicDirectory
}} = config

export class Service {
    createFileStream(filename) {
        return fs.createReadStream(filename)
    }

    async getFileInfo(file) {
        // file = home/index.html
        const fullFilePath = join(publicDirectory, file)

        // valida se existe, se não existe gera erro
        await fsPromise.access(fullFilePath);

        const fileType = extname(fullFilePath)

        return {
            type: fileType,
            name: fullFilePath
        }
    }

    async getFileStream(file) {
        const { name, type } = await this.getFileInfo(file)

        return {
            stream: this.createFileStream(name),
            type
        }
    }
}