/* One-shot Tailwind build. Avoids the CLI and file globbing entirely —
   raw content is passed to Tailwind so it runs sandboxed without hanging. */
const fs = require("fs");
const path = require("path");
const flagship = __dirname;
process.chdir(flagship);
const nm = path.join(flagship, "..", "noova-site", "node_modules");
const postcss = require(path.join(nm, "postcss"));
const tailwindcss = require(path.join(nm, "tailwindcss"));
// No autoprefixer: browserslist hangs in sandboxed shells, and the needed
// -webkit- prefixes are hand-written in input.css.

const baseConfig = require(path.join(flagship, "tailwind.config.js"));
const config = Object.assign({}, baseConfig, {
  content: [
    { raw: fs.readFileSync(path.join(flagship, "index.html"), "utf8"), extension: "html" },
    { raw: fs.readFileSync(path.join(flagship, "assets/js/main.js"), "utf8"), extension: "js" },
  ],
});

const input = fs.readFileSync(path.join(flagship, "assets/css/input.css"), "utf8");

postcss([tailwindcss(config)])
  .process(input, {
    from: path.join(flagship, "assets/css/input.css"),
    to: path.join(flagship, "assets/css/style.css"),
    map: false,
  })
  .then((result) => {
    fs.writeFileSync(path.join(flagship, "assets/css/style.css"), result.css);
    console.log("BUILT", result.css.length, "bytes");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
