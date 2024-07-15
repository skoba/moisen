import { useState, useEffect } from "react";
import { useStore } from "@/stores/encounter";

const COMMAND = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  /b|B/,
  /a|A/,
];

const useInitStore = () => {
  const [restCommand, setRestCommand] = useState([...COMMAND]);
  const initStore = useStore((state) => state.init);

  const handler = (e) => {
    // console.log(
    //   "Key KeyDown: " + String.fromCharCode(e.charCode) + "\n" +
    //   "charCode: " + e.charCode + "\n" +
    //   "code: " + e.code + "\n" +
    //   "key: " + e.key + "\n" +
    //   "ALT key KeyDown: " + e.altKey + "\n" +
    //   ""
    // );

    const next = new RegExp(restCommand[0]);
    if (next.test(e.key)) {
      setRestCommand(prev => [...prev.slice(1)]);
    } else if (restCommand.length > 0) {
      setRestCommand([...COMMAND]);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const event = 'keydown';
      const options = undefined;
      window.addEventListener(event, handler, options);

      return () => window.removeEventListener(event, handler, options);
    }
  }, [handler]);

  useEffect(() => {
    if (restCommand.length === 0) {
      alert(`YOU GOT IT!!!`);
      initStore();
      setRestCommand([...COMMAND]);
    }
  }, [restCommand, setRestCommand, initStore]);

  return {
    restCommand,
  };
};

export {
  useInitStore,
};
