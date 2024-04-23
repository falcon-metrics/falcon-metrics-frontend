import React from 'react';

const memo: <T>(c: T) => T = React.memo;

// export function memo<T extends ComponentType<unknown>>(
//   component: T,
//   displayName?: string,
// ): T {
//   return Object.assign(React.memo(component), displayName) as unknown as T;
// }

export default memo;
