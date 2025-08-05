"use client";

import React, { useState } from "react";
import { announceToScreenReader } from "@/utils/accessibility";

export default function AccessibleModal({
  title,
  children,
  trigger,
}: {
  title: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    announceToScreenReader(`Dialog opened: ${title}`);
    // Create a custom event for our accessibility system
    const event = new CustomEvent("modal:open", {
      detail: { modal: document.getElementById("accessible-modal") },
    });
    document.dispatchEvent(event);
  };

  const closeModal = () => {
    setIsOpen(false);
    announceToScreenReader("Dialog closed");
    // Create a custom event for our accessibility system
    const event = new CustomEvent("modal:close");
    document.dispatchEvent(event);
  };

  return (
    <>
      <div onClick={openModal} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            id="accessible-modal"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            data-modal-open="true"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 id="modal-title" className="text-xl font-bold">
                {title}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close dialog"
                data-modal-close
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
