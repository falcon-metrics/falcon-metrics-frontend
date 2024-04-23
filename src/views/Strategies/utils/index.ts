
export const getFlattenContextList = (contexts) => contexts?.reduce((acc: any, context) => {
  const children = context?.children || [];
  const childrenContexts = children.reduce((acc2: any, childrenLeve2) => {
    const childrenLevel3 = childrenLeve2?.children || [];
    const childrenLevel3Contexts = childrenLevel3.reduce((acc3: any, childrenLeve3) => {
      acc3 = [...acc3, childrenLeve3];
      return acc3;
    }, []);
    acc2 = [...acc2, childrenLeve2, ...childrenLevel3Contexts];
    return acc2;
  }, []);

  acc = [...acc, context, ...childrenContexts];
  return acc;
}, []);
