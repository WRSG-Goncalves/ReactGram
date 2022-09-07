import requireDirectory from 'require-directory'
import {
    namespace,
    slashNotation
  } from '../helpers'

export const controllers = requireDirectory(module, './', {
    rename: namespace
})
  
const controller = (ctrllr, params = {}) => {
    const [controllerName, methodName] = ctrllr.split('@')
    const controller = slashNotation(controllerName, controllers)
    const method = controller[methodName]

    const { middleware:ctrlrmiddleware = [] } = controller
    const {
        middleware = [], postMiddleware = []
    } = method
    Object.keys(params).forEach(name => controller[name] = params[name]);

    return [...ctrlrmiddleware, ...middleware, method, ...postMiddleware]
}

export default controller;