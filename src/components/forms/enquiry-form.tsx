"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState, useTransition, type FormEvent } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { buttonClasses } from "@/components/ui/button";
import { AlertIcon, CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import {
  CONTACT_PREFERENCES,
  ENQUIRY_SERVICES,
  HONEYPOT_FIELD,
  LIMITS,
  STARTED_AT_FIELD,
  enquirySchema,
  type Enquiry,
  type EnquiryInput,
} from "@/lib/enquiry/schema";
import { submitEnquiry } from "@/app/actions/enquiry";
import { GENERIC_ERROR, type EnquiryState } from "@/lib/enquiry/state";
import { site } from "@/content/site";

export function EnquiryForm({ defaultServices = [] }: { defaultServices?: string[] }) {
  const formId = useId();
  // `formAction` handles submissions made without JavaScript (the page re-renders
  // with the result). With JavaScript, onSubmit calls the action directly so a
  // network failure becomes a friendly message instead of an error page.
  const [noJsState, formAction] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: "idle" });
  const [clientState, setClientState] = useState<EnquiryState | null>(null);
  const [pending, startTransition] = useTransition();
  const state = clientState ?? noJsState;
  // The success panel stays until the visitor chooses to send another request.
  const [dismissed, setDismissed] = useState<EnquiryState | null>(null);
  // Time of first interaction, so the server can reject submissions made faster than a person could type.
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput, unknown, Enquiry>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      services: defaultServices.filter((s): s is (typeof ENQUIRY_SERVICES)[number] =>
        (ENQUIRY_SERVICES as readonly string[]).includes(s),
      ),
      name: "",
      phone: "",
      email: "",
      address: "",
      lots: "",
      instructions: "",
      strataPlan: "",
      managerName: "",
      managerCompany: "",
    },
  });

  const showSuccess = state.status === "success" && dismissed !== state;

  // Apply the server's verdict: field errors onto the inputs, focus on the message.
  useEffect(() => {
    if (state.status === "success") {
      reset();
      successRef.current?.focus();
    } else if (state.status === "error") {
      for (const [field, message] of Object.entries(state.errors ?? {})) {
        if (message) setError(field as FieldPath<EnquiryInput>, { message });
      }
      errorRef.current?.focus();
    }
  }, [state, reset, setError]);

  // Validate in the browser first; only valid forms reach the server action.
  // Without JavaScript the form posts straight to the server action instead.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    void handleSubmit(() => {
      const data = new FormData(form);
      startTransition(async () => {
        try {
          const result = await submitEnquiry(state, data);
          startTransition(() => setClientState(result));
        } catch {
          startTransition(() => setClientState({ status: "error", message: GENERIC_ERROR }));
        }
      });
    })(event);
  };

  if (showSuccess) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-card border border-brand-200 bg-brand-50 p-8 text-center outline-none"
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-700 text-white">
          <CheckIcon className="size-7" />
        </span>
        <h2 className="mt-5 text-2xl font-semibold">Thanks, your request is with us</h2>
        <p className="mx-auto mt-3 max-w-md text-slate-700">
          We&apos;ll be in touch using the contact method you chose. If it&apos;s urgent,
          call us on{" "}
          <a className="font-semibold text-brand-700 underline underline-offset-4" href={site.phone.href}>
            {site.phone.display}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setDismissed(state)}
          className={buttonClasses("secondary", "md", "mt-6")}
        >
          Send another request
        </button>
      </div>
    );
  }

  const submitting = pending;
  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;
  const describedBy = (name: keyof EnquiryInput) => (errors[name] ? errorId(name) : undefined);

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={onSubmit}
      onFocusCapture={() => {
        if (startedAt === null) setStartedAt(Date.now());
      }}
      aria-busy={submitting}
      className="space-y-10"
    >
      {state.status === "error" && !pending && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 outline-none"
        >
          <AlertIcon className="mt-0.5 size-5 shrink-0 text-red-700" />
          <p>{state.message}</p>
        </div>
      )}

      <fieldset aria-describedby={errors.services ? errorId("services") : undefined}>
        <legend className="text-lg font-semibold text-ink-900">Which services do you need?</legend>
        <p className="mt-1 text-sm text-slate-600">Choose one or more.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {ENQUIRY_SERVICES.map((service) => (
            <label
              key={service}
              className="group flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm text-slate-700 transition-colors hover:border-brand-300 has-checked:border-brand-600 has-checked:bg-brand-50 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600"
            >
              <input
                type="checkbox"
                value={service}
                {...register("services")}
                className="mt-0.5 size-4 shrink-0 accent-brand-700 focus-visible:outline-none"
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
        <FieldError id={errorId("services")} message={errors.services?.message} />
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold text-ink-900">Your contact details</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Your name" htmlFor={fieldId("name")} error={errors.name?.message} errorId={errorId("name")} required>
            <input
              id={fieldId("name")}
              type="text"
              autoComplete="name"
              maxLength={LIMITS.name}
              aria-invalid={!!errors.name}
              aria-describedby={describedBy("name")}
              {...register("name")}
              className={inputClasses(!!errors.name)}
            />
          </Field>
          <Field label="Phone" htmlFor={fieldId("phone")} error={errors.phone?.message} errorId={errorId("phone")} required>
            <input
              id={fieldId("phone")}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              maxLength={LIMITS.phone}
              aria-invalid={!!errors.phone}
              aria-describedby={describedBy("phone")}
              {...register("phone")}
              className={inputClasses(!!errors.phone)}
            />
          </Field>
          <Field label="Email" htmlFor={fieldId("email")} error={errors.email?.message} errorId={errorId("email")} required>
            <input
              id={fieldId("email")}
              type="email"
              autoComplete="email"
              maxLength={LIMITS.email}
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("email")}
              {...register("email")}
              className={inputClasses(!!errors.email)}
            />
          </Field>
          <Field label="Number of lots" htmlFor={fieldId("lots")} error={errors.lots?.message} errorId={errorId("lots")}>
            <input
              id={fieldId("lots")}
              type="text"
              inputMode="numeric"
              maxLength={LIMITS.lots}
              aria-invalid={!!errors.lots}
              aria-describedby={describedBy("lots")}
              {...register("lots")}
              className={inputClasses(!!errors.lots)}
            />
          </Field>
          <Field
            className="sm:col-span-2"
            label="Property address"
            htmlFor={fieldId("address")}
            error={errors.address?.message}
            errorId={errorId("address")}
            required
          >
            <input
              id={fieldId("address")}
              type="text"
              autoComplete="street-address"
              maxLength={LIMITS.address}
              aria-invalid={!!errors.address}
              aria-describedby={describedBy("address")}
              {...register("address")}
              className={inputClasses(!!errors.address)}
            />
          </Field>
          <Field
            className="sm:col-span-2"
            label="Special instructions"
            htmlFor={fieldId("instructions")}
            error={errors.instructions?.message}
            errorId={errorId("instructions")}
          >
            <textarea
              id={fieldId("instructions")}
              rows={5}
              maxLength={LIMITS.instructions}
              aria-invalid={!!errors.instructions}
              aria-describedby={describedBy("instructions")}
              {...register("instructions")}
              className={inputClasses(!!errors.instructions, "min-h-32 py-3")}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold text-ink-900">
          Strata details <span className="font-normal text-slate-600">(optional)</span>
        </legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <Field label="Strata plan number" htmlFor={fieldId("strataPlan")} error={errors.strataPlan?.message} errorId={errorId("strataPlan")}>
            <input
              id={fieldId("strataPlan")}
              type="text"
              maxLength={LIMITS.shortText}
              aria-invalid={!!errors.strataPlan}
              aria-describedby={describedBy("strataPlan")}
              {...register("strataPlan")}
              className={inputClasses(!!errors.strataPlan)}
            />
          </Field>
          <Field label="Strata manager name" htmlFor={fieldId("managerName")} error={errors.managerName?.message} errorId={errorId("managerName")}>
            <input
              id={fieldId("managerName")}
              type="text"
              maxLength={LIMITS.shortText}
              aria-invalid={!!errors.managerName}
              aria-describedby={describedBy("managerName")}
              {...register("managerName")}
              className={inputClasses(!!errors.managerName)}
            />
          </Field>
          <Field
            label="Strata management company"
            htmlFor={fieldId("managerCompany")}
            error={errors.managerCompany?.message}
            errorId={errorId("managerCompany")}
          >
            <input
              id={fieldId("managerCompany")}
              type="text"
              autoComplete="organization"
              maxLength={LIMITS.shortText}
              aria-invalid={!!errors.managerCompany}
              aria-describedby={describedBy("managerCompany")}
              {...register("managerCompany")}
              className={inputClasses(!!errors.managerCompany)}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset aria-describedby={errors.preference ? errorId("preference") : undefined}>
        <legend className="text-lg font-semibold text-ink-900">How should we get back to you?</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {CONTACT_PREFERENCES.map((pref) => (
            <label
              key={pref}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-full border border-line bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 has-checked:border-brand-600 has-checked:bg-brand-50 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600"
            >
              <input
                type="radio"
                value={pref}
                {...register("preference")}
                className="size-4 accent-brand-700 focus-visible:outline-none"
              />
              {pref}
            </label>
          ))}
        </div>
        <FieldError id={errorId("preference")} message={errors.preference?.message} />
      </fieldset>

      {/* Honeypot: hidden from people and assistive tech; bots that fill every field are rejected. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId(HONEYPOT_FIELD)}>Leave this field empty</label>
        <input id={fieldId(HONEYPOT_FIELD)} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <input type="hidden" name={STARTED_AT_FIELD} value={startedAt ?? ""} />

      <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          We keep every enquiry confidential. See our{" "}
          <Link href="/legal/#privacy" className="font-medium text-brand-700 underline underline-offset-4">
            privacy statement
          </Link>
          .
        </p>
        <button type="submit" disabled={submitting} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          {submitting && (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}
          {submitting ? "Sending…" : "Send my request"}
        </button>
      </div>
    </form>
  );
}

function inputClasses(invalid: boolean, extra?: string) {
  return cn(
    "block min-h-12 w-full rounded-xl border bg-white px-4 text-base text-ink-900 shadow-xs transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:outline-2 focus:outline-offset-0 focus:outline-brand-600/30",
    invalid ? "border-red-500" : "border-slate-300 hover:border-slate-400",
    extra,
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink-900">
        {label}
        {required ? (
          <span className="text-red-700" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
      <AlertIcon className="size-4 shrink-0" />
      {message}
    </p>
  );
}
