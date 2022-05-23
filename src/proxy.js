import _ from "lodash";
import debug from "debug";

import { EventDataChanged } from "./events";

const logger = debug("proxy");

export function dataProxy(data, emit) {
  return new Proxy(data, {
    set(target, property, value) {
      const prev = target[property];
      target[property] = value;

      if (!_.isEqual(prev, value)) {
        emit(EventDataChanged, [value, prev, property]);
      }

      return true;
    },
  });
}
