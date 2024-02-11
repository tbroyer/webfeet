import { runTests } from "@platformer/harness";
import {
  coerceToBoolean,
  coerceToDOMString,
  coerceToDouble,
  coerceToLong,
  coerceToUnsignedLong,
  coerceToUSVString,
} from "@platformer/webidl";
import { enumerated } from "@platformer/microsyntaxes";
import { stringToInteger, stringToDouble } from "@platformer/helpers";

customElements.define(
  "test-string",
  class extends HTMLElement {
    #test = "";
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToDOMString(value);
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = newValue ?? "";
    }
  },
);

customElements.define(
  "test-url",
  class extends HTMLElement {
    #test = "";
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToUSVString(value);
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = this.#parseURL(newValue);
    }
    #parseURL(value) {
      if (value == null) {
        return "";
      }
      try {
        return new URL(value, this.ownerDocument.baseURI).toString();
      } catch (e) {
        return value;
      }
    }
  },
);

const testEnum = enumerated({
  keywords: ["", "one", "two", "three", "missing", "invalid"],
  aliases: { empty: "", un: "one", deux: "two", trois: "three" },
  missing: "missing",
  invalid: "invalid",
});
customElements.define(
  "test-enum",
  class extends HTMLElement {
    #test = "missing";
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToDOMString(value);
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = testEnum(newValue) ?? "";
    }
  },
);
const testNullableEnum = enumerated({
  keywords: ["use-credentials", "anonymous"],
  invalid: "anonymous",
});
customElements.define(
  "test-nullable-enum",
  class extends HTMLElement {
    #test = null;
    get test() {
      return this.#test;
    }
    set test(value) {
      if (value == null) {
        this.removeAttribute("test");
      } else {
        value = coerceToDOMString(value);
        this.setAttribute("test", value);
      }
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = testNullableEnum(newValue) ?? null;
    }
  },
);

customElements.define(
  "test-boolean",
  class extends HTMLElement {
    #test = false;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToBoolean(value);
      this.toggleAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = newValue != null;
    }
  },
);

customElements.define(
  "test-long",
  class extends HTMLElement {
    #test = 42;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToLong(value);
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = stringToInteger(newValue ?? "", false, 42);
    }
  },
);
customElements.define(
  "test-limited-long",
  class extends HTMLElement {
    #test = -1;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToLong(value);
      if (value < 0) {
        throw new DOMException("", "IndexSizeError");
      }
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = stringToInteger(newValue ?? "", true, -1);
    }
  },
);
customElements.define(
  "test-unsigned-long",
  class extends HTMLElement {
    #test = 42;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToUnsignedLong(value);
      if (value < 0 || 0x7fffffff < value) {
        value = 42;
      }
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = stringToInteger(newValue ?? "", true, 42);
    }
  },
);
customElements.define(
  "test-limited-unsigned-long",
  class extends HTMLElement {
    #test = 1;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToUnsignedLong(value);
      if (value === 0) {
        throw new DOMException("", "IndexSizeError");
      }
      if (value < 1 || 0x7fffffff < value) {
        value = 1;
      }
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      let value = stringToInteger(newValue ?? "", true, 1);
      this.#test = value <= 0 ? 1 : value;
    }
  },
);
customElements.define(
  "test-limited-unsigned-long-with-fallback",
  class extends HTMLElement {
    #test = 1;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToUnsignedLong(value);
      if (value < 1 || 0x7fffffff < value) {
        value = 1;
      }
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      let value = stringToInteger(newValue ?? "", true, 1);
      this.#test = value <= 0 ? 1 : value;
    }
  },
);
customElements.define(
  "test-clamped-unsigned-long",
  class extends HTMLElement {
    #test = 100;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToUnsignedLong(value);
      if (value < 0 || 0x7fffffff < value) {
        value = 100;
      }
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = this.#parseClampedInt(newValue ?? "");
    }
    #parseClampedInt(value) {
      let result = /^[ \t\n\f\r]*([+-]?[0-9]+)/.exec(value);
      if (result) {
        let resultInt = parseInt(result[1], 10);
        if (resultInt >= 0) {
          return Math.max(42, Math.min(resultInt, 1337));
        }
      }
      return 100;
    }
  },
);
customElements.define(
  "test-double",
  class extends HTMLElement {
    #test = 0.0;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToDouble(value);
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = stringToDouble(newValue ?? "", false, 0.0);
    }
  },
);
customElements.define(
  "test-limited-double",
  class extends HTMLElement {
    #test = 1.0;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = coerceToDouble(value);
      if (value <= 0) {
        return;
      }
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = stringToDouble(newValue ?? "", true, 1.0);
    }
  },
);

runTests();
