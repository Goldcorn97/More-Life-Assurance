"use strict";
const form = document.querySelector(".inquiry-form");
const services = [...document.querySelectorAll(".service-toggle")];
function syncServices() {
  const any = services.some(input => input.checked);
  services[0].setCustomValidity(any ? "" : "Please choose at least one service.");
  document.querySelectorAll(".need-group").forEach(group => {
    const selected = group.querySelector(".service-toggle").checked;
    const details = group.querySelector(".need-details");
    details.disabled = !selected;
    group.querySelector(".optional-coverage").hidden = !selected;
    if (!selected) details.querySelectorAll("input").forEach(input => { input.checked = false; });
  });
}
function syncContact() {
  const text = form.querySelector('[name="contact_preference"]:checked')?.value === "Text message";
  form.querySelector("#phone").required = text;
  form.querySelector("#email").required = !text;
  const confirmation = form.querySelector("#email-confirmation");
  if (confirmation) confirmation.disabled = text;
  document.querySelector("#phone-label").textContent = text ? "Phone number *" : "Phone number (optional)";
  document.querySelector("#email-label").textContent = text ? "Email address (optional)" : "Email address *";
}
if (form) {
 services.forEach(input => input.addEventListener("change", syncServices));
 form.querySelectorAll('[name="contact_preference"]').forEach(input => input.addEventListener("change", syncContact));
 window.addEventListener("pageshow", () => {syncServices(); syncContact();});
 syncServices(); syncContact();
}

if (form) {
 const error = form.querySelector("#form-error");
 form.addEventListener("invalid", () => {
  error.hidden = false;
  error.textContent = "Please check the required fields below: your contact details, at least one service, and permission to contact you.";
 }, true);
 form.addEventListener("input", () => {
  if ([...form.elements].every(el => !el.willValidate || el.validity.valid)) error.hidden = true;
 });
 form.addEventListener("submit", () => { error.hidden = true; });
}
