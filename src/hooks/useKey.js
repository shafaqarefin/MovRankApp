import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code === key) {
          action(e);
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener(key, callback);
      };
    },
    [action, key]
  );
}
