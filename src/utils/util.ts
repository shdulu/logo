import { getCurrentInstance } from "vue";
import { toRawType, extend, isObject, isArray } from "@vue/shared";

/**
 * Make all properties in T optional
 */
//  type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

// unknown 未知类型不能包含任何值。这类似于any类型，但更安全，因为使用未知值执行任何操作都是非法的：
export const isBool = (val: unknown) => typeof val === "boolean";
export const isNumber = (val: unknown) => typeof val === "number";
export const isHTMLElement = (val: unknown) =>
  toRawType(val).startsWith("HTML");
export function isUndefined(val: any): val is undefined {
  return val === void 0;
}

export function isEmpty(val: unknown) {
  if (
    (!val && val !== 0) ||
    (isArray(val) && !val.length) ||
    (isObject(val) && !Object.keys(val).length)
  )
    return true;
  return false;
}

export function arrayFlat(arr: unknown[]): any {
  return arr.reduce((acm: unknown[], item) => {
    const val = Array.isArray(item) ? arrayFlat(item) : item;
    return acm.concat(val);
  }, []);
}
export const arrayFindIndex = function <T = any>(
  arr: Array<T>,
  pred: (args: T) => boolean
): number {
  return arr.findIndex(pred);
};

export const arrayFind = function <T = any>(
  arr: Array<T>,
  pred: (args: T) => boolean
): any {
  return arr.find(pred);
};

export function deduplicate<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export function arrayToObject<T>(arr: Array<T>): Record<string, T> {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

export function getPropByPath(
  obj: any,
  path: string,
  strict: boolean
): {
  o: unknown;
  k: string;
  v: Nullable<unknown>;
} {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");

  const keyArr = path.split(".");
  let i = 0;
  for (i; i < keyArr.length - 1; i++) {
    if (!tempObj && !strict) break;
    const key = keyArr[i];
    tempObj = tempObj?.[key];
    if (!tempObj && strict) {
      throw new Error("please transfer a valid prop path to form item!");
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj?.[keyArr[i]],
  };
}

export function useGlobalConfig() {
  const vm: any = getCurrentInstance();
  if ("$ELEMENT" in vm.proxy) {
    return vm.proxy.$ELEMENT;
  }
  return {};
}
