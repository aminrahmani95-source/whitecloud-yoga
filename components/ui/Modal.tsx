"use client";

import { useEffect, useRef } from "react";

/**
 * مودال بر پایهٔ عنصر بومی <dialog>.
 *
 * دلیل انتخاب <dialog> به‌جای یک div دستی: مرورگر خودش فوکوس را داخل مودال
 * نگه می‌دارد، با Esc می‌بندد، و آن را در لایهٔ بالایی رندر می‌کند. همین
 * سه مورد بخش عمدهٔ دسترس‌پذیریِ یک مودال است و رایگان به دست می‌آید.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  // رویداد close هم با Esc و هم با فراخوانی dialog.close() فعال می‌شود،
  // پس تنها همین یک شنونده هر دو مسیر بستن را پوشش می‌دهد.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  // showModal به‌تنهایی اسکرول پس‌زمینه را در همهٔ مرورگرها قفل نمی‌کند
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="modal-title"
      // کلیک روی خودِ dialog یعنی کلیک روی backdrop؛ کلیک روی محتوا
      // هدفش یکی از فرزندان است و اینجا نمی‌افتد.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="
        m-auto w-[min(34rem,calc(100vw-2rem))] rounded-2xl border border-line
        bg-bg p-0 text-ink shadow-lift
        backdrop:bg-ink/25 backdrop:backdrop-blur-[2px]
      "
    >
      <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-7">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3
            id="modal-title"
            className="text-lg font-semibold leading-snug text-ink"
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="
              -m-1.5 shrink-0 rounded-full p-1.5 text-muted
              transition-colors hover:bg-surface hover:text-ink
            "
          >
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
