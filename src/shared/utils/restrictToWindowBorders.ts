
export const restrictToWindowBorders = (args:any) => {
  const { transform, windowRect, activeNodeRect, active } = args;

  const activeX = active?.data.current?.x ? +active.data.current.x : 0;
  const activeY = active?.data.current?.y ? +active.data.current.y : 0;

  const restrictX = () => {
    if (windowRect && activeNodeRect) {
      const left = windowRect.left - activeX;
      const right = windowRect.right - activeX;

      if (transform.x < left) {
        return left;
      }
      if (transform.x + activeNodeRect.width > right) {
        return right - activeNodeRect.width;
      }
    }

    return transform.x;
  };

  const restrictY = () => {
    if (windowRect && activeNodeRect) {
      const top = windowRect.top - activeY;
      const bottom = windowRect.bottom - activeY;

      if (transform.y < top) {
        return top;
      }
      if (transform.y + activeNodeRect.height > bottom) {
        return bottom - activeNodeRect.height;
      }
    }

    return transform.y;
  };

  return {
    ...transform,
    x: restrictX(),
    y: restrictY(),
  };
};
