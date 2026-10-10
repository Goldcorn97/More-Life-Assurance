"use strict";
document.querySelectorAll(".need-group").forEach(function(group) {
  const toggle = group.querySelector(".service-toggle");
  const details = group.querySelector(".need-details");
  function sync() {
    details.disabled = !toggle.checked;
    if (!toggle.checked) details.querySelectorAll("input").forEach(function(input) {input.checked = false;});
  }
  toggle.addEventListener("change", sync);
  window.addEventListener("pageshow", sync);
  sync();
});
