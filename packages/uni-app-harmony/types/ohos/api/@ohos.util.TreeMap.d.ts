/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit ArkTS
 */
/**
 * TreeMap stores key-value (KV) pairs. Each key must be unique and have only one value.
 * TreeMap is implemented using a red-black tree, which is a binary search tree where keys
 * are stored in sorted order for efficient insertion and removal.
 *
 * @syscap SystemCapability.Utils.Lang
 * @since 8
 */
/**
 * TreeMap stores key-value (KV) pairs. Each key must be unique and have only one value.
 * TreeMap is implemented using a red-black tree, which is a binary search tree where keys
 * are stored in sorted order for efficient insertion and removal.
 *
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @since 10
 */
declare class TreeMap<K, V> {
    /**
     * A constructor used to create a TreeMap object.
     *
     * @param { function } [comparator] - comparator
     * comparator (Optional) User-defined comparison functions.
     * firstValue (required) previous element.
     * secondValue (required) next element.
     * @throws { BusinessError } 10200012 - The TreeMap's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - The type of parameters are invalid.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * A constructor used to create a TreeMap object.
     *
     * @param { function } [comparator] - comparator
     * comparator (Optional) User-defined comparison functions.
     * firstValue (required) previous element.
     * secondValue (required) next element.
     * @throws { BusinessError } 10200012 - The TreeMap's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - The type of parameters are invalid.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    constructor(comparator?: (firstValue: K, secondValue: K) => boolean);
    /**
     * Gets the element number of the hashmap.
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Gets the element number of the hashmap.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    length: number;
    /**
     * Returns whether the Map object contains elements
     *
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns whether the Map object contains elements
     *
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    isEmpty(): boolean;
    /**
     * Returns whether a key is contained in this map
     *
     * @param { K } key - key key need to determine whether to include the key
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns whether a key is contained in this map
     *
     * @param { K } key - key key need to determine whether to include the key
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    hasKey(key: K): boolean;
    /**
     * Returns whether a value is contained in this map
     *
     * @param { V } value - value value value need to determine whether to include the value
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasValue method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns whether a value is contained in this map
     *
     * @param { V } value - value value value need to determine whether to include the value
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasValue method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    hasValue(value: V): boolean;
    /**
     * Returns a specified element in a Map object, or undefined if there is no corresponding element
     *
     * @param { K } key - key key the index in TreeMap
     * @returns { V } value or undefined
     * @throws { BusinessError } 10200011 - The get method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns a specified element in a Map object, or undefined if there is no corresponding element
     *
     * @param { K } key - key key the index in TreeMap
     * @returns { V } value or undefined
     * @throws { BusinessError } 10200011 - The get method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    get(key: K): V;
    /**
     * Obtains the first sorted key in the treemap.
     * Or returns undefined if tree map is empty
     *
     * @returns { K } value or undefined
     * @throws { BusinessError } 10200011 - The getFirstKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains the first sorted key in the treemap.
     * Or returns undefined if tree map is empty
     *
     * @returns { K } value or undefined
     * @throws { BusinessError } 10200011 - The getFirstKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    getFirstKey(): K;
    /**
     * Obtains the last sorted key in the treemap.
     * Or returns undefined if tree map is empty
     *
     * @returns { K } value or undefined
     * @throws { BusinessError } 10200011 - The getLastKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains the last sorted key in the treemap.
     * Or returns undefined if tree map is empty
     *
     * @returns { K } value or undefined
     * @throws { BusinessError } 10200011 - The getLastKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    getLastKey(): K;
    /**
     * Adds all element groups in one map to another map
     *
     * @param { TreeMap<K, V> } map - map map the Map object to add members
     * @throws { BusinessError } 10200011 - The setAll method cannot be bound.
     * @throws { BusinessError } 401 - The type of parameters are invalid.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Adds all element groups in one map to another map
     *
     * @param { TreeMap<K, V> } map - map map the Map object to add members
     * @throws { BusinessError } 10200011 - The setAll method cannot be bound.
     * @throws { BusinessError } 401 - The type of parameters are invalid.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    setAll(map: TreeMap<K, V>): void;
    /**
     * Adds or updates a(new) key-value pair with a key and value specified for the Map object
     *
     * @param { K } key - key key Added or updated targets
     * @param { V } value - value value Added or updated value
     * @returns { Object } the map object after set
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @throws { BusinessError } 401 - The type of parameters are invalid.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Adds or updates a(new) key-value pair with a key and value specified for the Map object
     *
     * @param { K } key - key key Added or updated targets
     * @param { V } value - value value Added or updated value
     * @returns { Object } the map object after set
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @throws { BusinessError } 401 - The type of parameters are invalid.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    set(key: K, value: V): Object;
    /**
     * Remove a specified element from a Map object
     *
     * @param { K } key - key key Target to be deleted
     * @returns { V } Target mapped value
     * @throws { BusinessError } 10200011 - The remove method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Remove a specified element from a Map object
     *
     * @param { K } key - key key Target to be deleted
     * @returns { V } Target mapped value
     * @throws { BusinessError } 10200011 - The remove method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    remove(key: K): V;
    /**
     * Clear all element groups in the map
     *
     * @throws { BusinessError } 10200011 - The clear method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Clear all element groups in the map
     *
     * @throws { BusinessError } 10200011 - The clear method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    clear(): void;
    /**
     * Returns the greatest element smaller than or equal to the specified key
     * if the key does not exist, undefined is returned
     *
     * @param { K } key - key key Objective of comparison
     * @returns { K } key or undefined
     * @throws { BusinessError } 10200011 - The getLowerKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns the greatest element smaller than or equal to the specified key
     * if the key does not exist, undefined is returned
     *
     * @param { K } key - key key Objective of comparison
     * @returns { K } key or undefined
     * @throws { BusinessError } 10200011 - The getLowerKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    getLowerKey(key: K): K;
    /**
     * Returns the least element greater than or equal to the specified key
     * if the key does not exist, undefined is returned
     *
     * @param { K } key - key key Objective of comparison
     * @returns { K } key or undefined
     * @throws { BusinessError } 10200011 - The getHigherKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns the least element greater than or equal to the specified key
     * if the key does not exist, undefined is returned
     *
     * @param { K } key - key key Objective of comparison
     * @returns { K } key or undefined
     * @throws { BusinessError } 10200011 - The getHigherKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    getHigherKey(key: K): K;
    /**
     * Returns a new Iterator object that contains the keys contained in this map
     *
     * @returns { IterableIterator<K> }
     * @throws { BusinessError } 10200011 - The keys method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns a new Iterator object that contains the keys contained in this map
     *
     * @returns { IterableIterator<K> }
     * @throws { BusinessError } 10200011 - The keys method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    keys(): IterableIterator<K>;
    /**
     * Returns a new Iterator object that contains the values contained in this map
     *
     * @returns { IterableIterator<V> }
     * @throws { BusinessError } 10200011 - The values method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns a new Iterator object that contains the values contained in this map
     *
     * @returns { IterableIterator<V> }
     * @throws { BusinessError } 10200011 - The values method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    values(): IterableIterator<V>;
    /**
     * Replace the old value by new value corresponding to the specified key
     *
     * @param { K } key - key key Updated targets
     * @param { V } newValue - newValue newValue Updated the target mapped value
     * @returns { boolean } the boolean type(Is there a target pointed to by the key)
     * @throws { BusinessError } 10200011 - The replace method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Replace the old value by new value corresponding to the specified key
     *
     * @param { K } key - key key Updated targets
     * @param { V } newValue - newValue newValue Updated the target mapped value
     * @returns { boolean } the boolean type(Is there a target pointed to by the key)
     * @throws { BusinessError } 10200011 - The replace method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    replace(key: K, newValue: V): boolean;
    /**
     * Executes the given callback function once for each real key in the map.
     * It does not perform functions on deleted keys
     *
     * @param { function } callbackFn - callbackFn
     * callbackFn (required) A function that accepts up to three arguments.
     * The function to be called for each element.
     * @param { Object } [thisArg] - thisArg
     * thisArg (Optional) The value to be used as this value for when callbackFn is called.
     * If thisArg is omitted, undefined is used as the this value.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 401 - The type of parameters are invalid.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Executes the given callback function once for each real key in the map.
     * It does not perform functions on deleted keys
     *
     * @param { function } callbackFn - callbackFn
     * callbackFn (required) A function that accepts up to three arguments.
     * The function to be called for each element.
     * @param { Object } [thisArg] - thisArg
     * thisArg (Optional) The value to be used as this value for when callbackFn is called.
     * If thisArg is omitted, undefined is used as the this value.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 401 - The type of parameters are invalid.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    forEach(callbackFn: (value?: V, key?: K, map?: TreeMap<K, V>) => void, thisArg?: Object): void;
    /**
     * Returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order
     *
     * @returns { IterableIterator<[K, V]> }
     * @throws { BusinessError } 10200011 - The entries method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order
     *
     * @returns { IterableIterator<[K, V]> }
     * @throws { BusinessError } 10200011 - The entries method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    entries(): IterableIterator<[
        K,
        V
    ]>;
    /**
     * returns an ES6 iterator.Each item of the iterator is a Javascript Object
     *
     * @returns { IterableIterator<[K, V]> }
     * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * returns an ES6 iterator.Each item of the iterator is a Javascript Object
     *
     * @returns { IterableIterator<[K, V]> }
     * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    [Symbol.iterator](): IterableIterator<[
        K,
        V
    ]>;
}
export default TreeMap;
