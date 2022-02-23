export function useClickOutside(ref, ref2, cb) {
  document.addEventListener("click", (e) => {
    if (ref.current && !ref2.current.contains(e.target) && !ref.current.contains(e.target)) {
      return cb(e);
    }
  });
}
