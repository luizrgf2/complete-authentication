import { HTTP_PORT } from '../../config'
import {ExpressServer} from './http/express'


if(!HTTP_PORT) throw new Error("HTTP port is not empty!")

const port = +HTTP_PORT


const express = new ExpressServer()
express.start(port)