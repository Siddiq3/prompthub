const activeLocks = new Set();

let savedScrollY = 0;
let savedStyles = null;

export function lockBodyScroll(lockId = Symbol("body-scroll-lock")) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  const { body } = document;

  if (!activeLocks.size) {
    savedScrollY = window.scrollY;
    savedStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
  }

  activeLocks.add(lockId);

  return () => {
    if (!activeLocks.has(lockId) || typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    activeLocks.delete(lockId);

    if (activeLocks.size || !savedStyles) {
      return;
    }

    const { body: nextBody } = document;
    nextBody.style.overflow = savedStyles.overflow;
    nextBody.style.position = savedStyles.position;
    nextBody.style.top = savedStyles.top;
    nextBody.style.left = savedStyles.left;
    nextBody.style.right = savedStyles.right;
    nextBody.style.width = savedStyles.width;
    window.scrollTo(0, savedScrollY);
    savedStyles = null;
  };
}
