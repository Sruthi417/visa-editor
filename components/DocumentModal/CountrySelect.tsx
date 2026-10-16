"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

import { EASE } from "./motion";
import "./CountrySelect.scss";

type Option = { value: string; label: string };

type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

/**
 * A dropdown that replaces the browser's select: a soft field, and a floating
 * list that opens beneath it. Works with the keyboard (arrows, Home, End,
 * Enter, Escape and typing a letter) and with a screen reader.
 */
export default function CountrySelect({ label, options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const selected = options[selectedIndex];

  const openList = () => {
    setHighlight(selectedIndex);
    setOpen(true);
  };

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const choose = (index: number) => {
    onChange(options[index].value);
    close();
  };

  // Move focus into the list when it opens, so the keys work at once.
  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  // Keep the highlighted option in view as it moves.
  useEffect(() => {
    if (!open) return;
    document
      .getElementById(`${id}-option-${highlight}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, highlight, id]);

  // A click anywhere outside closes the list.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openList();
    }
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const last = options.length - 1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlight((index) => Math.min(index + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlight((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setHighlight(0);
        break;
      case "End":
        event.preventDefault();
        setHighlight(last);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(highlight);
        break;
      case "Escape":
        // Close only the list, not the whole window behind it.
        event.preventDefault();
        event.stopPropagation();
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        // Typing a letter jumps to the next country that starts with it.
        if (event.key.length === 1 && /\S/.test(event.key)) {
          const letter = event.key.toLowerCase();
          const order = [...options.keys()];
          const next = [...order.slice(highlight + 1), ...order.slice(0, highlight + 1)].find(
            (index) => options[index].label.toLowerCase().startsWith(letter),
          );
          if (next !== undefined) setHighlight(next);
        }
    }
  };

  return (
    <div className="country-select" ref={rootRef}>
      <span className="country-select__label" id={`${id}-label`}>
        {label}
      </span>

      <button
        ref={triggerRef}
        type="button"
        className={`country-select__trigger${open ? " country-select__trigger--open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => (open ? close(false) : openList())}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="country-select__value" id={`${id}-value`}>
          {selected.label}
        </span>
        <motion.span
          className="country-select__chevron"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          aria-hidden="true"
        >
          <HugeiconsIcon icon={ArrowDown01Icon} size={20} strokeWidth={2.2} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            className="country-select__list"
            role="listbox"
            tabIndex={-1}
            aria-labelledby={`${id}-label`}
            aria-activedescendant={`${id}-option-${highlight}`}
            onKeyDown={onListKeyDown}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {options.map((option, index) => {
              const isSelected = index === selectedIndex;

              return (
                <li
                  key={option.value}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  className={`country-select__option${
                    index === highlight ? " country-select__option--highlight" : ""
                  }${isSelected ? " country-select__option--selected" : ""}`}
                  onPointerMove={() => setHighlight(index)}
                  onClick={() => choose(index)}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2.4} />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
