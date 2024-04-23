import uniqueId from 'lodash/uniqueId';
import get from 'lodash/get';
import { columnClassName, defaultHeaderClassName } from '../constants';

export const onRenderText = (key) => (item) => <div>{get(item, key, '-')}</div>;

export const getDefaultProps = (key?: string) => ({
  className: columnClassName,
  isResizable: true,
  key: uniqueId(),
  headerClassName: defaultHeaderClassName,
  ...(key ? { onRender: onRenderText(key) } : {}),
});
