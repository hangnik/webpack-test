import "./style.css";
import tiger from "./tiger.png";

// console.log(pw);

let env;

if (process.env.NODE_ENV === "development") {
  env = dev;
} else {
  env = pro;
}

console.log(env);

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `<img src="${tiger}"/>`;
});
