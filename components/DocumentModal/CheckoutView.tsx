"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CreditCardIcon,
  DeliveryTruck01Icon,
  Download01Icon,
  GoogleIcon,
  Image01Icon,
  InformationCircleIcon,
  MagicWand01Icon,
  PaypalIcon,
  PrinterIcon,
  Store01Icon,
  Tick02Icon,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";

import { EASE, itemVariants, viewVariants } from "./motion";
import type { ProcessResult } from "./processPhoto";
import { sizeLabel, type PhotoSpec } from "./specs";

// Placeholder prices and delivery times (USD, in cents). Replace them with the
// real price list before launch.
const OPTIONS = [
  {
    id: "digital",
    label: "Digital photo",
    cents: 2299,
    features: [
      { icon: Download01Icon, text: "Instant download after payment" },
      { icon: PrinterIcon, text: "Ready for online applications and self-printing" },
    ],
    note: { icon: Store01Icon, text: "Print it at any photo store or kiosk." },
  },
  {
    id: "prints",
    label: "Digital photo + prints",
    cents: 2599,
    features: [
      { icon: DeliveryTruck01Icon, text: "Printed photos delivered to your door" },
      { icon: Image01Icon, text: "Digital copy for online applications" },
    ],
    note: { icon: InformationCircleIcon, text: "Estimated delivery: 2–3 business days." },
  },
] as const;

const EXTRAS = [
  {
    id: "review",
    label: "Expert review",
    cents: 799,
    icon: UserCheck01Icon,
    text: "A photo specialist double-checks your photo against the official requirements.",
  },
  {
    id: "retouch",
    label: "Light retouching",
    cents: 499,
    icon: MagicWand01Icon,
    text: "Touch-ups for blemishes and stray hairs, without changing how you look.",
  },
] as const;

const METHODS = [
  { id: "card", label: "Card", icon: CreditCardIcon },
  { id: "paypal", label: "PayPal", icon: PaypalIcon },
  { id: "gpay", label: "Google Pay", icon: GoogleIcon },
] as const;

const STEP_NAMES = ["Photo option", "Extras", "Payment"] as const;

type OptionId = (typeof OPTIONS)[number]["id"];
type ExtraId = (typeof EXTRAS)[number]["id"];
type MethodId = (typeof METHODS)[number]["id"];
type Step = 0 | 1 | 2 | "done";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const money = (cents: number) => currency.format(cents / 100);

type Props = {
  titleId: string;
  result: ProcessResult;
  spec: PhotoSpec;
  documentName: string;
  fileName: string;
  /** Back to the result, from the first step. */
  onBack: () => void;
};

export default function CheckoutView({
  titleId,
  result,
  spec,
  documentName,
  fileName,
  onBack,
}: Props) {
  const uid = useId();
  const [step, setStep] = useState<Step>(0);
  const [option, setOption] = useState<OptionId>("digital");
  const [extras, setExtras] = useState<ExtraId[]>([]);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [note, setNote] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [method, setMethod] = useState<MethodId | null>(null);
  const [paying, setPaying] = useState(false);
  const payTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const chosen = OPTIONS.find((item) => item.id === option)!;
  const chosenExtras = EXTRAS.filter((item) => extras.includes(item.id));
  const total = chosen.cents + chosenExtras.reduce((sum, item) => sum + item.cents, 0);

  const emailValid = EMAIL.test(email.trim());
  const emailError = emailTouched && !emailValid;
  const missing = [
    !emailValid && "add your email",
    !agreed && "accept the terms",
    !method && "choose a payment method",
  ].filter(Boolean);
  const canPay = missing.length === 0;

  // Move focus to each new step's heading, so keyboard and screen reader users
  // land at the top of it. Not on first open: the close button has focus then.
  const opened = useRef(false);
  useEffect(() => {
    opened.current = true;
    return () => clearTimeout(payTimer.current);
  }, []);
  const focusHeading = useCallback((el: HTMLHeadingElement | null) => {
    if (el && opened.current) el.focus({ preventScroll: true });
  }, []);

  const back = () => {
    if (step === 0) onBack();
    else if (step !== "done") setStep((step - 1) as Step);
  };

  const toggleExtra = (id: ExtraId) =>
    setExtras((list) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]));

  const pay = (event: FormEvent) => {
    event.preventDefault();
    setEmailTouched(true);
    if (!canPay || paying) return;
    setPaying(true);
    // TODO: hand off to the payment provider (Stripe, PayPal, Google Pay) and
    // only show the download once it confirms. This stub just waits a moment.
    payTimer.current = setTimeout(() => {
      setPaying(false);
      setStep("done");
    }, 1200);
  };

  const continueButton = (onClick: () => void) => (
    <button type="button" className="doc-modal__upload co__cta" onClick={onClick}>
      <span>Continue</span>
      <HugeiconsIcon icon={ArrowRight01Icon} size={20} color="currentColor" strokeWidth={1.5} />
    </button>
  );

  return (
    <motion.div
      className="doc-modal__grid doc-modal__grid--checkout"
      variants={viewVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {/* Left: order summary ------------------------------------------- */}
      <section className="doc-modal__left" aria-label="Order summary">
        <motion.p className="co__eyebrow" variants={itemVariants}>
          Order summary
        </motion.p>

        <motion.div className="co__product" variants={itemVariants}>
          <span
            className="co__thumb"
            style={{
              aspectRatio: `${spec.widthMm} / ${spec.heightMm}`,
              backgroundColor: spec.backgroundColor,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.url} alt="" />
          </span>
          <span className="co__product-text">
            <strong>{documentName}</strong>
            <span>Size: {sizeLabel(spec)}</span>
          </span>
        </motion.div>

        <motion.dl className="co__lines" variants={itemVariants}>
          <div>
            <dt>{chosen.label}</dt>
            <dd>{money(chosen.cents)}</dd>
          </div>
          {chosenExtras.map((item) => (
            <div key={item.id}>
              <dt>{item.label}</dt>
              <dd>+{money(item.cents)}</dd>
            </div>
          ))}
          <div className="co__total">
            <dt>Total</dt>
            <dd>{money(total)}</dd>
          </div>
        </motion.dl>

        <motion.p className="doc-modal__note co__trust" variants={itemVariants}>
          <HugeiconsIcon icon={InformationCircleIcon} size={20} strokeWidth={1.6} />
          <span>
            Prepared to the official requirements for the {documentName}. Final
            acceptance is decided by the issuing authority.
          </span>
        </motion.p>
      </section>

      {/* Right: the current step --------------------------------------- */}
      <section className="doc-modal__right">
        <motion.div className="co__main" variants={itemVariants}>
          {step !== "done" && (
            <>
              <div className="co__head">
                <button
                  type="button"
                  className="co__back"
                  aria-label={step === 0 ? "Back to your photo" : "Previous step"}
                  onClick={back}
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={1.8} />
                </button>
                <span className="co__step-label">
                  Step {step + 1} of {STEP_NAMES.length}
                  <b>{STEP_NAMES[step]}</b>
                </span>
              </div>
              <div className="co__progress" aria-hidden="true">
                {STEP_NAMES.map((name, index) => (
                  <span
                    key={name}
                    className={`co__bar${index <= step ? " co__bar--on" : ""}`}
                  />
                ))}
              </div>
            </>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={String(step)}
              className="co__body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              {step === 0 && (
                <>
                  <h2 id={titleId} ref={focusHeading} tabIndex={-1} className="doc-modal__title co__title">
                    Choose your photo option
                  </h2>

                  <div className="co__options" role="radiogroup" aria-labelledby={titleId}>
                    {OPTIONS.map((item) => {
                      const selected = option === item.id;
                      return (
                        <label
                          key={item.id}
                          className={`co__option${selected ? " co__option--selected" : ""}`}
                        >
                          <input
                            type="radio"
                            className="co__native"
                            name={`${uid}-option`}
                            value={item.id}
                            checked={selected}
                            onChange={() => setOption(item.id)}
                          />
                          <span className="co__option-head">
                            <span className="co__radio" aria-hidden="true" />
                            <span className="co__option-label">{item.label}</span>
                            <span className="co__price">{money(item.cents)}</span>
                          </span>
                          <span className="co__features">
                            {item.features.map((feature) => (
                              <span key={feature.text} className="co__feature">
                                <HugeiconsIcon icon={feature.icon} size={18} strokeWidth={1.6} />
                                {feature.text}
                              </span>
                            ))}
                          </span>
                          <span className="co__info">
                            <HugeiconsIcon icon={item.note.icon} size={16} strokeWidth={1.6} />
                            {item.note.text}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {continueButton(() => setStep(1))}
                </>
              )}

              {step === 1 && (
                <>
                  <div className="co__title-row">
                    <h2 id={titleId} ref={focusHeading} tabIndex={-1} className="doc-modal__title co__title">
                      Add extras <span className="co__optional">(optional)</span>
                    </h2>
                    <button
                      type="button"
                      className="co__skip"
                      onClick={() => {
                        setExtras([]);
                        setStep(2);
                      }}
                    >
                      Skip
                    </button>
                  </div>

                  <div className="co__options">
                    {EXTRAS.map((item) => {
                      const selected = extras.includes(item.id);
                      return (
                        <label
                          key={item.id}
                          className={`co__option${selected ? " co__option--selected" : ""}`}
                        >
                          <input
                            type="checkbox"
                            className="co__native"
                            checked={selected}
                            onChange={() => toggleExtra(item.id)}
                          />
                          <span className="co__option-head">
                            <span className="co__check" aria-hidden="true">
                              <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.6} />
                            </span>
                            <span className="co__option-label">{item.label}</span>
                            <span className="co__price">+{money(item.cents)}</span>
                          </span>
                          <span className="co__features">
                            <span className="co__feature">
                              <HugeiconsIcon icon={item.icon} size={18} strokeWidth={1.6} />
                              {item.text}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {continueButton(() => setStep(2))}
                </>
              )}

              {step === 2 && (
                <form className="co__form" onSubmit={pay} noValidate>
                  <h2 id={titleId} ref={focusHeading} tabIndex={-1} className="doc-modal__title co__title">
                    Contact and payment
                  </h2>

                  <div className="co__field">
                    <label htmlFor={`${uid}-email`} className="co__label">
                      Email
                    </label>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      className={`co__input${emailError ? " co__input--error" : ""}`}
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      onBlur={() => setEmailTouched(true)}
                      aria-invalid={emailError || undefined}
                      aria-describedby={`${uid}-email-hint`}
                    />
                    <span
                      id={`${uid}-email-hint`}
                      className={`co__hint${emailError ? " co__hint--error" : ""}`}
                    >
                      {emailError
                        ? "Enter a valid email address."
                        : "We'll send your order confirmation here."}
                    </span>
                  </div>

                  <div className="co__field">
                    <label htmlFor={`${uid}-note`} className="co__label">
                      Order note <span className="co__optional">(optional)</span>
                    </label>
                    <textarea
                      id={`${uid}-note`}
                      rows={2}
                      maxLength={500}
                      className="co__input co__textarea"
                      placeholder="Special requests, accessibility needs…"
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                    />
                  </div>

                  <label className="co__agree">
                    <input
                      type="checkbox"
                      className="co__native"
                      checked={agreed}
                      onChange={(event) => setAgreed(event.target.checked)}
                    />
                    <span className={`co__check${agreed ? " co__check--on" : ""}`} aria-hidden="true">
                      <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.6} />
                    </span>
                    <span>I agree to the Terms of Use and Privacy Policy.</span>
                  </label>

                  <h3 className="co__subtitle" id={`${uid}-method`}>
                    Payment method
                  </h3>
                  <div className="co__methods" role="radiogroup" aria-labelledby={`${uid}-method`}>
                    {METHODS.map((item) => {
                      const selected = method === item.id;
                      return (
                        <label
                          key={item.id}
                          className={`co__method${selected ? " co__method--selected" : ""}`}
                        >
                          <input
                            type="radio"
                            className="co__native"
                            name={`${uid}-method`}
                            value={item.id}
                            checked={selected}
                            onChange={() => setMethod(item.id)}
                          />
                          <span className="co__radio" aria-hidden="true" />
                          <span className="co__method-label">{item.label}</span>
                          <HugeiconsIcon icon={item.icon} size={22} strokeWidth={1.6} />
                        </label>
                      );
                    })}
                  </div>

                  <button
                    type="submit"
                    className="doc-modal__upload co__cta"
                    disabled={!canPay || paying}
                  >
                    {paying ? (
                      <>
                        <span className="co__spinner" aria-hidden="true" />
                        <span>Processing…</span>
                      </>
                    ) : (
                      <span>Pay {money(total)}</span>
                    )}
                  </button>
                  {!canPay && (
                    <p className="co__missing">
                      To continue, {missing.join(", ")}.
                    </p>
                  )}
                </form>
              )}

              {step === "done" && (
                <div className="co__done">
                  <motion.span
                    className="co__done-icon"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
                  >
                    <HugeiconsIcon icon={Tick02Icon} size={30} strokeWidth={2.4} />
                  </motion.span>
                  <h2 id={titleId} ref={focusHeading} tabIndex={-1} className="doc-modal__title co__title">
                    Your photo is ready
                  </h2>
                  <p>
                    Download your {documentName} and keep a copy somewhere safe.
                    {option === "prints" &&
                      " Your prints will be on their way within 2–3 business days."}
                  </p>
                  <a className="doc-modal__upload co__cta" href={result.url} download={fileName}>
                    <span>Download photo</span>
                    <HugeiconsIcon icon={Download01Icon} size={20} color="currentColor" strokeWidth={1.5} />
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>
    </motion.div>
  );
}
