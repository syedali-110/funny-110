import { useEffect, useRef } from "react";

export default function Question({
  gifId,
  title,
  subtitle,
  yesAction,
  noAction,
  runaway = false,
  noHoverCountRef,
}) {
  const noRef = useRef(null);

  const moveAnywhereOnScreen = () => {
    const el = noRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = Math.random() * (window.innerWidth - rect.width);
    const y = Math.random() * (window.innerHeight - rect.height);

    el.style.position = "fixed";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.zIndex = 9999;
  };

  const handleNoClick = (e) => {
    noHoverCountRef.current += 1;

    // 🔥 EXACTLY on 3rd click → jump immediately and STOP
    if (runaway && noHoverCountRef.current === 3) {
      e.preventDefault();
      e.stopPropagation();
      moveAnywhereOnScreen();
      return; // ⛔ DO NOT change step
    }

    // 🔥 After 3rd click → always jump
    if (runaway && noHoverCountRef.current > 3) {
      e.preventDefault();
      moveAnywhereOnScreen();
      return;
    }

    // First two clicks behave normally
    noAction();
  };

  useEffect(() => {
    if (!runaway || !noRef.current) return;

    const el = noRef.current;

    const handleHover = () => {
      if (noHoverCountRef.current >= 3) {
        moveAnywhereOnScreen();
      }
    };

    el.addEventListener("mouseenter", handleHover);
    return () => el.removeEventListener("mouseenter", handleHover);
  }, [runaway]);

  return (
    <div className="flex flex-col items-center text-center gap-5 min-w-screen pt-45">
      <div className="min-w-72">
        <div
          className="tenor-gif-embed"
          data-postid={gifId}
          data-share-method="host"
          data-width="100%"
        ></div>
      </div>

      <h1 className="text-2xl font-semibold">{title}</h1>
      {subtitle && <p>{subtitle}</p>}

      <div className="relative w-80 h-24 flex justify-center items-center gap-6">
        <button
          onClick={yesAction}
          className="px-6 py-2 bg-white rounded-full shadow-lg"
        >
          Yes
        </button>

        <button
          ref={noRef}
          onClick={handleNoClick}
          className="px-6 py-2 bg-white rounded-full shadow-lg transition-all"
        >
          No
        </button>
      </div>
    </div>
  );
}
