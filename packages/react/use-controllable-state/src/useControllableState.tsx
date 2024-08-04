import * as React from 'react';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
// ?：表示可选参数
type UseControllableStateParams<T> = {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
};
// 类型别名
// SetStateFn<T> 是一个函数类型，接收一个参数 prevState?: T，返回一个 T 类型的值
type SetStateFn<T> = (prevState?: T) => T;

function useControllableState<T>({
                                   prop,
                                   defaultProp,
                                   onChange = () => {
                                   }
                                 }: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] =
    useUncontrolledState({ defaultProp, onChange });
  //如果传入了 prop，则认为是受控组件，否则是非受控组件
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  //这里的useCallbackRef是为了防止 onChange 回调函数被多次调用
  //与官方的useCallback 的hook一致
  const handleChange = useCallbackRef(onChange);

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>;
        const value = typeof nextValue === 'function' ? setter(prop) : nextValue;
        if (value !== prop) handleChange(value as T);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange]
  );
  return [value, setValue] as const;
}

//Omit<UseControllableStateParams<T>, 'prop'> 将 prop 排除在外，返回一个新的对象
function useUncontrolledState<T>({
                                   defaultProp,
                                   onChange
                                 }: Omit<UseControllableStateParams<T>, 'prop'>) {

  const uncontrolledState = React.useState<T | undefined>(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React.useRef(value);
  const handleChange = useCallbackRef(onChange);
  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);
  return uncontrolledState;
}

export { useControllableState };
