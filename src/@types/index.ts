/**
 * @file ts索引
 * @author caifeng(caifeng01@baidu.com)
 */

export * from './refItem';

// 类型互斥 - 感觉实现的不优雅待改进~
export type OneOf<T, K> =
    | (T & Partial<Record<keyof K, never>>)
    | (K & Partial<Record<keyof T, never>>);
