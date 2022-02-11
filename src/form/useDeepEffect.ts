/**
 * @file 依赖深比较useEffect钩子
 * @author caifeng01
 */

import {useEffect, useRef} from 'react';
import _ from 'lodash';

export const KeepDepth = (dep: any[]) => {
    let lastdep = useRef<any[]>([]);
    if (!_.isEqual(dep, lastdep.current)) {
        lastdep.current = dep;
    }
    return lastdep.current;
};

const useDeepEffect = (fun: React.EffectCallback, dep: any[]) => {
    // eslint-disable-next-line @babel/new-cap
    useEffect(fun, KeepDepth(dep));
};

export default useDeepEffect;
