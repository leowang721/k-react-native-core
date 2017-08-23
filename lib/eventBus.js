/**
 * @file a simple eventBus
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import events from 'events'

export class EventBus extends events.EventEmitter {
}

var eventBus = new EventBus()
eventBus.EventBus = EventBus

export default eventBus
