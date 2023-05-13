import { HTTP_PORT } from '../../config'
import {App} from './http/express'


if(!HTTP_PORT) throw new Error("HTTP port is not empty!")

const port = +HTTP_PORT


const express = App
express.start(port)