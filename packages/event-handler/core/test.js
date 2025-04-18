import { EventHandlerHelper } from "@webfeet/event-handler/with-attribute.js";
import { runTests } from "@webfeet/event-handler-harness";

customElements.define(
  "test-handler",
  class extends HTMLElement {
    static observedAttributes = ["onfoo"];

    #onfoo = new EventHandlerHelper(this, "foo");

    get onfoo() {
      return this.#onfoo.get();
    }
    set onfoo(value) {
      this.#onfoo.set(value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      // in this case, we know 'name' is necessarily 'onfoo' so we can skip any check
      this.#onfoo.fromAttribute(newValue);
    }
  },
);

runTests();
