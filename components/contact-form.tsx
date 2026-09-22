"use client";

import {FormEvent, useState} from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setSubmitted(true);
  }

  if (submitted) return <p className="form-status" role="status">Form ready for backend integration.</p>;

  return <form className="contact-form" onSubmit={handleSubmit} noValidate>
    <label>Name<input name="name" required placeholder="Your name" /></label>
    <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
    <label>Telegram<input name="telegram" placeholder="@username" /></label>
    <label>Project type<select name="projectType" defaultValue=""><option value="" disabled>Select a direction</option><option>Web Development</option><option>UI/UX Design</option><option>Automation</option><option>Digital Product</option><option>Game / Minecraft</option></select></label>
    <label>Budget<input name="budget" placeholder="From / custom" /></label>
    <label>Deadline<input name="deadline" placeholder="When would you like to launch?" /></label>
    <label className="contact-form__wide">Project description<textarea name="description" required rows={5} placeholder="A few words about the task" /></label>
    <label className="contact-form__check contact-form__wide"><input type="checkbox" required /> <span>I agree with the Privacy Policy.</span></label>
    <button className="form-submit contact-form__wide" type="submit">Send request <span aria-hidden="true">↗</span></button>
  </form>;
}
