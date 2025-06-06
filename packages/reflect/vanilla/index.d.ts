import type {
  EnumeratedAttributeOptions,
  ReflectNumberOptions,
  ReflectClampedIntOptions,
} from "@webfeet/reflect";

export type {
  EnumeratedAttributeOptions,
  ReflectNumberOptions,
  ReflectClampedIntOptions,
};

export interface ReflectOptions {
  /** Name of the DOM attribute that the annotated property reflects. Defaults to the lowercased property name. */
  attribute?: string;
}

export interface ReflectDecorator<Value> {
  <This extends HTMLElement>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value>;
}

/**
 * Implements the property to reflect a DOM attribute as a `DOMString`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectString(
  options?: ReflectOptions,
): ReflectDecorator<string>;

/**
 * Implements the property to reflect a DOM attribute as a `USVString` representing a URL.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring-5 | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectURL(
  options?: ReflectOptions,
): ReflectDecorator<string>;

/**
 * Implements the property to reflect an enumerated DOM attribute as a `DOMString`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectEnum<
  Keywords extends string,
  Aliases extends string,
>(
  options: ReflectOptions & EnumeratedAttributeOptions<Keywords, Aliases>,
): ReflectDecorator<Keywords>;

/**
 * Implements the property to reflect an enumerated DOM attribute as a nullable `DOMString`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectNullableEnum<
  Keywords extends string,
  Aliases extends string,
>(
  options: ReflectOptions & EnumeratedAttributeOptions<Keywords, Aliases>,
): ReflectDecorator<Keywords | null>;

/**
 * Implements the property to reflect a DOM attribute as a `boolean`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-boolean | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectBoolean(
  options?: ReflectOptions,
): ReflectDecorator<boolean>;

/**
 * Implements the property to reflect a DOM attribute as a `long`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `long` limited to only non-negative numbers.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectNonNegativeInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectUnsignedInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` limited to only positive numbers.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectPositiveInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` limited to only positive numbers with fallback.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectPositiveIntWithFallback(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` clamped to a given range.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectClampedInt(
  options: ReflectOptions & ReflectClampedIntOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `double`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-double | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectDouble(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `double` limited to only positive numbers.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-double | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectPositiveDouble(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

// TBC: tokenlist, element, frozen array of elements
