/**
 * @file A simple error handler
 * Using this to support unified treatment of errors: trigger eventBus's `error` event.
 *
 * @author Leo Wang(leowang721@gmail.com)
 */
import eventBus from './eventBus'

export default function errorHandler (e) {
  eventBus.emit('error', e)
}
