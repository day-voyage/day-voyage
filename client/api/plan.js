/**
 * Mocking client-server processing
 */
import _activities from './activities.json'

const TIMEOUT = 100

export default {
  getActivities(cb, timeout) {
    setTimeout(() => cb(_activities), timeout || TIMEOUT)
  }
}
